import flask
import flask_praetorian

from .extensions import guard, db
from .utilities import blacklist
from .users import User
from .preset_users import PRESET_USERS


def login():
    """
    Logs a user in by parsing a POST request containing user credentials and
    issuing a JWT token.

    .. example::
       $ curl http://localhost:5000/login -X POST \
         -d '{"username":"Walter","password":"calmerthanyouare"}'
    """
    req = flask.request.get_json(force=True)
    username = req.get("username", None)
    password = req.get("password", None)
    access_lifespan = req.get("access_lifespan", None)
    refresh_lifespan = req.get("refresh_lifespan", None)
    user = guard.authenticate(username, password)
    return flask.jsonify(
        access_token=guard.encode_jwt_token(
            user,
            override_access_lifespan=access_lifespan,
            override_refresh_lifespan=refresh_lifespan,
            firstname=user.firstname,
            nickname=user.nickname,
            surname=user.surname,
            avatar=user.avatar,
        ),
    )


def refresh():
    """
    Refreshes an existing JWT by creating a new one that is a copy of the old
    except that it has a refrehsed access expiration.

    .. example::
       $ curl http://localhost:5000/refresh -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    old_token = guard.read_token_from_header()
    new_token = guard.refresh_jwt_token(old_token)
    return flask.jsonify(access_token=new_token)


@flask_praetorian.auth_required
def protected():
    """
    A protected endpoint. The auth_required decorator will require a header
    containing a valid JWT

    .. example::
       $ curl http://localhost:5000/protected -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    custom_claims = flask_praetorian.current_custom_claims()
    firstname = custom_claims.pop("firstname", None)
    nickname = custom_claims.pop("nickname", None)
    surname = custom_claims.pop("surname", None)

    if firstname is not None and surname is not None:
        if nickname is None:
            user_string = f"{firstname} {surname}"
        else:
            user_string = f"{firstname} '{nickname}' {surname}"
    else:
        user_string = f"{flask_praetorian.current_user().username}"

    return flask.jsonify(message=f"protected endpoint (allowed user {user_string})")


@flask_praetorian.roles_required("admin")
def protected_admin_required():
    """
    A protected endpoint that requires a role. The roles_required decorator
    will require that the supplied JWT includes the required roles

    .. example::
       $ curl http://localhost:5000/protected_admin_required -X GET \
          -H "Authorization: Bearer <your_token>"
    """
    return flask.jsonify(
        message="protected_admin_required endpoint (allowed user {})".format(
            flask_praetorian.current_user().username,
        )
    )


@flask_praetorian.roles_accepted("operator", "admin")
def protected_operator_accepted():
    """
    A protected endpoint that accepts any of the listed roles. The
    roles_accepted decorator will require that the supplied JWT includes at
    least one of th accepted roles

    .. example::
       $ curl http://localhost/protected_operator_accepted -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    return flask.jsonify(
        message="protected_operator_accepted endpoint (allowed usr {})".format(
            flask_praetorian.current_user().username,
        )
    )


def get_preset_users():
    """
    Fetches all of the preset users

    .. example::
       $ curl http://localhost/get_preset_users -X GET \
    """
    return flask.jsonify(
        preset_users=[
            dict(
                username=u["username"],
                password=u["password"],
                roles=u.get("roles", ""),
            )
            for u in PRESET_USERS
        ]
    )


@flask_praetorian.auth_required
def disable_user():
    """
    Disables a user in the data store

    .. example::
        $ curl http://localhost:5000/disable_user -X POST \
          -d '{"username":"Walter"}'
    """
    req = flask.request.get_json(force=True)
    usr = User.query.filter_by(username=req.get("username", None)).one()
    usr.is_active = False
    db.session.commit()
    return flask.jsonify(message="disabled user {}".format(usr.username))


@flask_praetorian.auth_required
def blacklist_token():
    """
    Blacklists an existing JWT by registering its jti claim in the blacklist.

    .. example::
       $ curl http://localhost:5000/blacklist_token -X POST \
         -d '{"token":"<your_token>"}'
    """
    req = flask.request.get_json(force=True)
    data = guard.extract_jwt_token(req["token"])
    blacklist.add(data["jti"])
    return flask.jsonify(message="token blacklisted ({})".format(req["token"]))


def register():
    """
    Registers a new user by parsing a POST request containing new user info and
    dispatching an email with a registration token

    .. example::
       $ curl http://localhost:5000/register -X POST \
         -d '{
           "username":"Brandt", \
           "password":"herlifewasinyourhands" \
           "email":"brandt@biglebowski.com"
         }'
    """
    logger = flask.current_app.logger
    req = flask.request.get_json(force=True)
    username = req.get("username", None)
    email = req.get("email", None)
    password = req.get("password", None)
    logger.debug("Processing register request for:")
    logger.debug(f"  {username}")
    logger.debug(f"  {password}")
    logger.debug(f"  {email}")
    new_user = User(
        username=username,
        password=guard.hash_password(password),
        roles="operator",
    )
    db.session.add(new_user)
    db.session.commit()
    try:
        guard.send_registration_email(email, user=new_user)
    except Exception as err:
        logger.error(f"Couldn't send registration email: {err}")
        raise
    ret = {
        "message": "successfully sent registration email to user {}".format(
            new_user.username
        )
    }
    return flask.jsonify(ret)


def finalize():
    """
    Finalizes a user registration with the token that they were issued in their
    registration email

    .. example::
       $ curl http://localhost:5000/finalize -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    logger = flask.current_app.logger
    logger.debug(f"Attempting to finalize registration")
    logger.debug(f"Fetching token from header")
    try:
        registration_token = guard.read_token_from_header()
    except Exception as err:
        logger.error(f"Couldn't extract token from header: {str(err)}")
        raise
    logger.debug(f"Retrieved token {registration_token}")
    user = guard.get_user_from_registration_token(registration_token)
    # perform 'activation' of user here...like setting 'active' or something
    logger.debug(f"Registered user {user}")
    ret = {"access_token": guard.encode_jwt_token(user)}
    return flask.jsonify(ret), 200


def register_routes(app):
    app.add_url_rule(
        "/login",
        view_func=login,
        methods=["POST"],
    )
    app.add_url_rule(
        "/refresh",
        view_func=refresh,
    )
    app.add_url_rule(
        "/protected",
        view_func=protected,
    )
    app.add_url_rule(
        "/protected_operator_accepted",
        view_func=protected_operator_accepted,
    )
    app.add_url_rule(
        "/protected_admin_required",
        view_func=protected_admin_required,
    )
    app.add_url_rule(
        "/disable_user",
        view_func=disable_user,
        methods=["POST"],
    )
    app.add_url_rule(
        "/blacklist_token",
        view_func=blacklist_token,
        methods=["POST"],
    )
    app.add_url_rule(
        "/register",
        view_func=register,
        methods=["POST"],
    )
    app.add_url_rule(
        "/finalize",
        view_func=finalize,
        methods=["GET"],
    )
    app.add_url_rule(
        "/get_preset_users",
        view_func=get_preset_users,
        methods=["GET"],
    )

# Basic Usage

This section of the tutorial covers basic auth featurers provided by flask-praetorian.
Source code examples are included to illustrate each concept.

These concepts include:

  * Logging in
  * Protected endpoints
  * Role-required endpoints
  * Role-accepted endpoints

We will navigate to the "Roles" section of our tutorial webapp to explore these
features:

![Roles Section](images/roles.png)


## Logging in

To access protected endpoints of our example app, we will need to provision a
JWT token from our server for the selected user. This token will be used to
access any protected endpoints in our app.

Usually, you will want to add some endpoint, such as `/login`, to your api.
This endpoint will parse user credentials from a request, authenticate the
user and then encode a JWT for future requests. Here is an example of what
such a `login` endpoint looks like this:

```python

@app.route("/login", methods=["POST"])
def login():
    req = flask.request.get_json(force=True)
    username = req.get("username", None)
    password = req.get("password", None)
    user = guard.authenticate(username, password)
    return flask.jsonify(access_token=guard.encode_jwt_token(user))
```

Of course, to authenticate a user, they must already have an account set up in whatever
data-store that your application uses. Though flask-praetorian does not depend on a
particular data mapper (usually an ORM like SQLAlchemy), it does require that
the user class supplies specific methods and properties.
_TODO: link to user class requirements_

Here is an example of some flask code that uses `flask-sqlalchemy` to add a user:

```python
with app.app_context():
    db.create_all()
    db.session.add(
        User(
            username="TheDude",
            password=guard.hash_password("abides"),
        )
    )
    db.session.commit()
```

For convenience, the tutorial creates users ahead of time and the tutorial webapp pre-
populates a drop-down selector with users and their passwords to save time and
frustration typing these in over-and-over.

Our most basic user is 'TheDude' with the password 'abides'. We'll log in with
this user first.

First, make sure that the navigation menu on the left side of the tutorial webapp is
open. Then, select the "Sign In / Sign Out" section:

![Sign In / Sign Out Section](images/sign-in-section.png)

Select 'TheDude' user in the api-tool:

![Pick thedude](images/pick-the-dude.png)

That will automatically populate the username and password fields.

Note that username and pasword fields can be manually changed. You may find it
interesting to explore the requests/responses that happen when you change the user
credentials prior to logging in.

Next, we'll click the button to log in:

![Login Button](images/login-button.png)

The response is a simple json object with one field: `access_token`
This is the token that will be used to access protected endpoints.

![Simple Response](images/just-the-token.png)

Note that when the token is granted, the access meters at the top-right corner of the
screen appear and are filled. Additionally, the title bar will show you the name of the
currently logged in user:

![Start the Clock](images/start-the-clock.png)

We'll dive more into the lifespan concepts in the `Refresh` section. of this tutorial.

!!! danger "Security Vulnerability"
    If you are using flask-praetorian in your app, and create a `login` endpoint
    that accepts user credentials like this, you should make sure to use https.
    Otherwise, your users passwords will be sent in the clear cand could be intercepted.


## Accessing a protected endpoint

Once your user has 'logged in' by securing a JWT, they can access
flask-praetorian protected endpoints by including the token in the request
header. These endpoints are protected, because they've been decorated with
flask-praetorian's `@auth_required` decorator. This means that a request
to these endpoints must carry a valid jwt to gain access:

```python
@app.route("/protected")
@flask_praetorian.auth_required
def protected():
    return flask.jsonify(
        message="protected endpoint (allowed user {})".format(
            flask_praetorian.current_user().username,
        )
    )
```

Let's try to access the 'protected' endpoint in the example app. If the 'access'
permission for your user has expired, you will need to log them in again.

Otherwise, all you need to do is click the "Protected" button which sends a request
to the protected endpoint:

![Protected](images/protected.png)

In this case, the authorization works, and the response carries the JSON
payload returned from the  app's `protected` endpoint.

The flask-praetorian extension by default registers an error_handler with the
flask app when it is initialized. This error handler automatically converts any
PraetorianError exceptions (or derived exceptions) into a json response that
carries the status code, message, and error type. The status code and error
type can be very useful for applications that need to handle specific error
responses.

The available exception types are stored in the exceptions module of flask-praetorian.

!!! todo
    external link to the exceptions source code


## Accessing an endpoint with required roles

In addition to the `@auth_required` decorator, flask-praetorian also provides
decorators that require users to have certain roles to access them.

Each of the additional `@roles_required` and `@roles_accepted` decorators
do not require the `@auth_required` decorator to be explicitly added. They
will implicitly check `@auth_required` prior to checking the roles.
However, explicitly adding an `@auth_required` decorator as well will not
cause any issues (in fact, this was required in earlier versions).

The `@roles_required` decorator keeps users that do not have all of the
required roles from accessing the endpoint:

```python
@app.route("/protected_admin_required")
@flask_praetorian.roles_required("admin")
def protected_admin_required():
    return flask.jsonify(
        message="protected_admin_required endpoint (allowed user {})".format(
            flask_praetorian.current_user().username,
        )
    )
```

Let's try to access a protected endpoint with required roles.

First, try to access the 'protected_admin_required' endpoint with our basic
user 'TheDude'.

![Denied](images/denied.png)

Even though our request has a valid token in the headers, access is not
granted because our user lacks the required role for access.

Next, let's log in as a user with the admin role and see what happens:

![Sign In Admin](images/signin-admin.png)

This time, our 'admin' user 'Walter' is granted access to the protected
endpoint.

![Admin Allowed](images/admin-allowed.png)

Requests does not have to include any human readable indication of who the user
is.  Instead, everything your app needs to identify the user is embedded in the
JWT token.

It's also worth noting that with the `@roles_required` decorator, _each
one of the required roles_ must be possessed by the user or access will not be
granted. This means that even if a user has an 'admin' role, they could not
access an endpoint that required 'admin' *and* 'flunky'. They would have to have
a 'flunky' role. There is no concept of role hierarchy in flask-praetorian.

Accessing an endpoint with accepted roles
.........................................

The last decorator to note is the ``@roles_accepted``. Instead of requiring
all the listed roles, this decorator allows access to users that have any one
of the listed roles:

.. literalinclude:: ../example/basic.py
   :language: python
   :lines: 140-156
   :caption: from `example/basic.py`_

The ``protected_operator_accepted`` endpoint accepts users that have either
the 'admin' role or the 'operator' role.

Let's try out the ``protected_operator_accepted`` endpoint

First, try accessing it with 'TheDude'. You'll see that you are not granted
access because 'TheDude' does not have either the 'admin' or the 'operator'
role.

Next, let's try accessing this endpoint with the 'Donnie' user. This user does
not have the 'admin' role, but he does have the 'operator' role:

.. image:: _static/tutorial-basic-6.png

You should try accessing this endpoint with 'Maude' as well. 'Maude' is both an
'admin' and an 'operator'.

In Conclusion
.............

* 'Logging in' entails checking for valid user credentials and granting a jwt
* The flask-praetorian decorators protect endpoints from unauthorized access
* ``@auth_required`` grants access to requests carrying a valid jwt
* ``@roles_required`` grants access to users that have all the listed roles
* ``@roles_accepted`` grants access to users that have one of the listed roles
* PraetorianErrors are automatically handled and packaged as responses

.. _example/: https://github.com/dusktreader/flask-praetorian/tree/master/example
.. _example/basic.py: https://github.com/dusktreader/flask-praetorian/blob/master/example/basic.py
.. _example/refresh.py: https://github.com/dusktreader/flask-praetorian/blob/master/example/refresh.py
.. _example/blacklist.py: https://github.com/dusktreader/flask-praetorian/blob/master/example/blacklist.py
.. _example/custom_claims.py: https://github.com/dusktreader/flask-praetorian/blob/master/example/custom_claims.py
.. _example/api_tool.py: https://github.com/dusktreader/flask-praetorian/blob/master/example/api_tool.py

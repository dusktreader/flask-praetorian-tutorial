import flask
import logging
import os
import pendulum
import tempfile

from .extensions import guard, db, cors, mail
from .resources import register_routes
from .users import User
from .utilities import fetch_env, blacklist


def create_app(*args, **kwargs):
    """
    Use the app factory pattern to create a flask app for the tutorial
    """

    app = flask.Flask(__name__)
    app.debug = True
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'top secret'
    fetch_env(app, 'SQLITE_TEMP_DIR', default=os.getcwd())
    fetch_env(app, 'JWT_ACCESS_LIFESPAN', default=pendulum.duration(hours=24))
    fetch_env(app, 'JWT_REFRESH_LIFESPAN', default=pendulum.duration(days=30))
    fetch_env(app, 'PRAETORIAN_CONFIRMATION_SENDER')
    fetch_env(app, 'PRAETORIAN_CONFIRMATION_SUBJECT')
    fetch_env(app, 'PRAETORIAN_CONFIRMATION_URI')
    fetch_env(app, 'MAIL_SERVER')
    fetch_env(app, 'EXAMPLE')

    # Initialize the flask-praetorian instance for the app
    guard.init_app(
        app, User,
        is_blacklisted=blacklist.is_blacklisted,
    )

    # Initialize a local database for the tutorial
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///{}'.format(
        tempfile.NamedTemporaryFile(
            dir=app.config['SQLITE_TEMP_DIR'],
            prefix='local', suffix='.db', delete=True,
        )
    )
    db.init_app(app)

    # Initializes CORS so that the api_tool can talk to the tutorial app
    cors.init_app(app)

    # Add in the users
    User.create_users(app)

    # Add the mail extension if MAIL_SERVER is set
    if app.config.get('MAIL_SERVER'):
        mail.init_app(app)

    log_file = os.environ.get('EXAMPLE_LOG')
    if log_file is not None:
        file_handler = logging.FileHandler(log_file)
        file_handler.setLevel(logging.DEBUG)
        app.logger.addHandler(file_handler)
        app.logger.info("logging to {log_file}".format(log_file=log_file))

    register_routes(app)

    return app

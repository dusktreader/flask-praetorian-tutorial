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
    app.logger.debug("SQLITE TEMP DIR: {}".format(app.config['SQLITE_TEMP_DIR']))
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




"""
  roles:
    build: *build_template
    volumes: *volumes_template
    environment:
      <<: *environment_template
      EXAMPLE: resources.roles
      JWT_ACCESS_LIFESPAN: 30s
      JWT_REFRESH_LIFESPAN: 2m
    ports:
      - 5010:5000
    depends_on: *depends_on_template

  refresh:
    build: *build_template
    volumes: *volumes_template
    environment:
      <<: *environment_template
      JWT_ACCESS_LIFESPAN: 30s
      JWT_REFRESH_LIFESPAN: 2m
      EXAMPLE: resources.refresh
    ports:
      - 5020:5000
    depends_on: *depends_on_template

  blacklist:
    build: *build_template
    volumes: *volumes_template
    environment:
      <<: *environment_template
      JWT_ACCESS_LIFESPAN: 10000d
      JWT_REFRESH_LIFESPAN: 10000d
      EXAMPLE: resources.blacklist
    ports:
      - 5030:5000
    depends_on: *depends_on_template

  custom:
    build: *build_template
    volumes: *volumes_template
    environment:
      <<: *environment_template
      EXAMPLE: resources.custom
    ports:
      - 5040:5000
    depends_on: *depends_on_template

  register:
    build: *build_template
    volumes: *volumes_template
    environment:
      <<: *environment_template
      JWT_ACCESS_LIFESPAN: 5m
      JWT_REFRESH_LIFESPAN: 1h
      PRAETORIAN_CONFIRMATION_SENDER: confirmation.sender@praetorian.com
      PRAETORIAN_CONFIRMATION_SUBJECT: confirmation for praetorian regristration example
      PRAETORIAN_CONFIRMATION_URI: 'http://localhost:5000/finalize'
      MAIL_SERVER: mailer
      MAIL_PORT: 25
      EXAMPLE: resources.register
    ports:
      - 5050:5000
    depends_on: *depends_on_template
"""

import flask_cors
import flask_mail
import flask_praetorian
import flask_sqlalchemy

db = flask_sqlalchemy.SQLAlchemy()
guard = flask_praetorian.Praetorian()
cors = flask_cors.CORS()
mail = flask_mail.Mail()

from .extensions import db, guard
from .preset_users import PRESET_USERS


class User(db.Model):
    """
    A generic user model that might be used by an app powered by
    flask-praetorian
    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, unique=True)
    password = db.Column(db.Text)
    roles = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True, server_default="true")
    firstname = db.Column(db.Text)
    surname = db.Column(db.Text)
    nickname = db.Column(db.Text)
    avatar = db.Column(db.Text)
    description = db.Column(db.Text)

    @property
    def rolenames(self):
        try:
            return self.roles.split(",")
        except Exception:
            return []

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.is_active

    @classmethod
    def create_users(cls, app):
        """
        Add users for the example
        """
        with app.app_context():
            db.create_all()
            for preset_user in PRESET_USERS:
                new_user = cls(
                    **{k: v for (k, v) in preset_user.items() if k != "password"}
                )
                new_user.password = guard.hash_password(preset_user["password"])
                db.session.add(new_user)
            db.session.commit()

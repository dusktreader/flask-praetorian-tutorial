from .extensions import db, guard


class User(db.Model):
    """
    A generic user model that might be used by an app powered by
    flask-praetorian
    """
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, unique=True)
    password = db.Column(db.Text)
    roles = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True, server_default='true')
    firstname = db.Column(db.Text)
    surname = db.Column(db.Text)
    nickname = db.Column(db.Text)

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
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
            db.session.add(cls(
                username='TheDude',
                password=guard.hash_password('abides'),
                firstname='Jeffrey',
                nickname='The Dude',
                surname='Lebowski',
            ))
            db.session.add(cls(
                username='Walter',
                password=guard.hash_password('calmerthanyouare'),
                roles='admin',
                firstname='Walter',
                surname='Sobchak',
            ))
            db.session.add(cls(
                username='Donnie',
                password=guard.hash_password('iamthewalrus'),
                roles='operator',
                firstname='Theodore',
                nickname='Donny',
                surname='Kerabatsos',
            ))
            db.session.add(cls(
                username='Maude',
                password=guard.hash_password('andthorough'),
                roles='operator,admin',
                firstname='Maude',
                nickname='Mauddie',
                surname='Lebowski',
            ))
            db.session.commit()

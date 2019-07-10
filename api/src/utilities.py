import os


def fetch_env(app, key, default=None):
    app.config[key] = os.environ.get(key, default)


class Blacklist(set):

    def is_blacklisted(self, jti):
        return jti in self

    def add_jti(self, jti):
        self.add(jti)


blacklist = Blacklist()

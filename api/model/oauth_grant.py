from model.user import *
from model.oauth_client import *

class Grant:
    id = 1
    user_id = 1
    client_id = 1
    client = OAuthClient()
    code = ''

    redirect_uri = ''
    expires = None

    _scopes = ''

    def delete(self):
        return self

    @property
    def scopes(self):
        if self._scopes:
            return self._scopes.split()
        return []

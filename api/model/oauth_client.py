from model.user import *
from db import *

class OAuthClient:    

    @staticmethod
    def fetch(client_id):
        rows = pg_select_rows("select\
									*\
								from\
									oauth_client\
								where\
									id_oauth_client = %s",(client_id, ))

        if len(rows) == 0:
            return None

        c = OAuthClient()
        c.client_id = rows[0]["id_oauth_client"]
        c.client_secret = rows[0]["secret"]
        c._default_scopes = rows[0]["default_scopes"]
        c._redirect_uris = rows[0]["redirect_uris"]

        return c

    @property
    def client_type(self):
        return 'public'

    @property
    def redirect_uris(self):
        if self._redirect_uris:
            return self._redirect_uris.split()
        return []

    @property
    def default_redirect_uri(self):
        return ''

    @property
    def default_scopes(self):
        if self._default_scopes:
            return self._default_scopes.split()
        return []

    @property
    def allowed_grant_types(self):
        types = ['password'] # 'authorization_code', 'password', 'client_credentials', 'refresh_token'
        return types

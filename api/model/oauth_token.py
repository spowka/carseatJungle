import os
from os import urandom
from base64 import b64encode
from datetime import datetime, timedelta
from model.user import *
from model.oauth_client import *
from db import *

class OAuthToken:
    _scopes = None

    def insert(self):        
        self.id = pg_execute("insert into oauth_token(id_oauth_client,\
														id_member,\
														token_type,\
														access_token,\
														refresh_token,\
														expiration,\
														scopes)\
											values(%s, %s, %s, %s, %s, %s, %s)", 
                                                                                (self.client_id,
                                                                                 self.user_id,
                                                                                 self.token_type,
                                                                                 self.access_token,
                                                                                 self.refresh_token,
                                                                                 self.expires,
                                                                                 self._scopes
                                                                                ))

    @property
    def scopes(self):
        if self._scopes:
            return self._scopes.split()
        return []

    @staticmethod
    def fetch(access_token=None, refresh_token=None):

        if access_token:
            rows = pg_select_rows("select\
										*\
									from\
										oauth_token\
									where\
										access_token = %s", (access_token, ))
        elif refresh_token:
            rows = pg_select_rows("select\
										*\
									from\
										oauth_token\
									where\
										refresh_token = %s", (refresh_token, ))
        else:
            return None

        if len(rows) == 0:
            return None

        t = OAuthToken()
        t.id = rows[0]["id_oauth_token"]
        t.client_id = rows[0]["id_oauth_client"]
        t.user_id = rows[0]["id_member"]
        t.user = User(id_user=t.user_id)
        t.token_type = rows[0]["token_type"]
        t.access_token = rows[0]["access_token"]
        t.refresh_token = rows[0]["refresh_token"]
        t.expires = rows[0]["expiration"]
        t._scopes = rows[0]["scopes"]        

        return t

    @staticmethod
    def delete(id_client, id_user):        
        pg_execute("delete from oauth_token where id_oauth_client=%s and id_member=%s", (id_client, id_user))

    @staticmethod
    def disable_user(id_user):        
        pg_execute("delete from oauth_token where id_member=%s", (id_user, ))

    @staticmethod
    def create_token(id_user, client_id):
        # delete old access tokens for user
        OAuthToken.delete(client_id, id_user)

        # insert new access token for user
        random_bytes = urandom(30)
        token_string = b64encode(random_bytes).decode('utf-8')

        random_bytes = urandom(30)
        refresh_string = b64encode(random_bytes).decode('utf-8')

        expires_in = 3600 * 24 * 365 # 1 year
        expires = datetime.utcnow() + timedelta(seconds=expires_in)

        tok = OAuthToken()
        tok.access_token = token_string
        tok.refresh_token = refresh_string
        tok.token_type = 'Bearer'
        tok._scopes = ''
        tok.expires = expires
        tok.client_id = client_id
        tok.user_id = id_user

        tok.insert()

        return tok	

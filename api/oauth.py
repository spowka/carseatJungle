from flask import Response
from datetime import datetime, timedelta
from flask_oauthlib.provider import OAuth2Provider
from model.user import *
from model.oauth_client import *
from model.oauth_grant import *
from model.oauth_token import *

oauth = OAuth2Provider()

def init_oauth(app):
    oauth.init_app(app)
    return oauth

def get_oauth_provider():
    return oauth

@oauth.usergetter
def get_user(username, password, *args, **kwargs):
    try:
        u = User(email=username)
        if not u.is_valid_password(password):
            return None
    except:
        return None

    return u

@oauth.clientgetter
def load_client(client_id):    
    return OAuthClient.fetch(client_id)

@oauth.grantgetter
def load_grant(client_id, code):    
    # not supported
    return None

@oauth.grantsetter
def save_grant(client_id, code, request, *args, **kwargs):
    # not supported
    return None

@oauth.tokengetter
def load_token(access_token=None, refresh_token=None):
    if access_token:
        return OAuthToken.fetch(access_token=access_token)
    elif refresh_token:
        return OAuthToken.fetch(refresh_token=access_token)

@oauth.tokensetter
def save_token(token, request, *args, **kwargs):
    OAuthToken.delete(request.client.client_id, request.user.id_user)

    # expires_in = token.pop('expires_in')
    expires_in = 3600 # 1 hour
    expires = datetime.utcnow() + timedelta(seconds=expires_in)

    tok = OAuthToken()

    tok.access_token = token['access_token']
    tok.refresh_token = token['refresh_token']
    tok.token_type = token['token_type']
    tok._scopes = token['scope']
    tok.expires = expires
    tok.client_id = request.client.client_id
    tok.user_id = request.user.id_user

    tok.insert()

    # db.session.add(tok)
    # db.session.commit()
    return tok

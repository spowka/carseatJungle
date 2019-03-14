from flask import Flask, request, Blueprint, Response, current_app
import requests
from model.oauth_token import *
from model.user import *
from model.user_role import *
from oauth import *
import jsonpickle
import json

api_oauth = Blueprint('api_oauth', __name__)
oauth = get_oauth_provider()

@oauth.token_handler
def access_token():	
    return None


@api_oauth.route('/oauth/login', methods=['POST'])
def oauth_login():
    if not "client_id" in request.form:
        return Response("Missing client_id.", 400)

    client_id = request.form["client_id"]	
    token = None

    if "access_token" in request.form:		
        token = OAuthToken.fetch(access_token=request.form["access_token"])

        if token == None:
            return Response("Invalid token.", 401)

        try:
            user = User(id_user=token.user_id)
        except:
            return Response("Invalid token.", 401)

    elif "email" in request.form and "password" in request.form:
        try:
            user = User(email=request.form["email"], auth_provider="init")
        except:
            return Response("Invalid email or password.", 401)

        if not user.is_valid_password(request.form["password"]):		
            return Response("Invalid email or password.", 401)	

    else:
        return Response("Invalid request.", 400)

    if user.is_activated == 0:			
        return Response("User not activated. Check your email.", 401)

    if user.is_suspended == 1:
        return Response("User is suspended.", 401)

    if token == None:
        token = OAuthToken.create_token(user.id_user, client_id)
    
    if "is_admin" in request.form:        
        if int(request.form["is_admin"]) == 1 and not user.is_admin:            
            return Response("User is not admin.", 401)

    user.access_token = token.access_token

    return Response(get_user_json(user), 200, mimetype='application/json')


@api_oauth.route('/oauth/social_login', methods=['POST'])
def oauth_social_login():
    provider = request.form["provider"]
    social_token = request.form["social_token"]
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    email = request.form["email"]
    client_id = request.form["client_id"]

    # fetch data from google using the access token
    if provider == "google":		
        data = json.loads(requests.get("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token={0}".format(social_token)).content)		

    else:
        return Response("Invalid provider", 400)

    # check if received email matches with the email received in the request
    if not "email" in data or data["email"] != email:
        return Response("Error authenticating the account with the provider", 401)

    # check if an active user exists, insert if not
    try:
        user = User(email=email, auth_provider=provider)
    except:
        user = User()
        user.id_user_role = UserRole.ID_USER_ROLE_DEFAULT
        user.email = email
        user.first_name = first_name
        user.last_name = last_name
        user.password = None
        user.auth_provider = provider
        user.is_activated = 1
        user.is_suspended = 0	
        user.insert()

    token = OAuthToken.create_token(user.id_user, client_id)
    user.access_token = token.access_token

    return Response(get_user_json(user), 200, mimetype='application/json')
    

def get_user_json(user):
    user.password = None
    user.uid = None

    json = {"access_token": user.access_token,
            "id_user": user.id_user,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "id_user_role": user.id_user_role,
            "email": user.email
            }

    return jsonpickle.encode(json, unpicklable=False)
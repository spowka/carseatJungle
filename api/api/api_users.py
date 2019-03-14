import os
import math
import random
import string
from flask import Flask, request, Blueprint, Response, current_app, send_file, jsonify
import requests
import jsonpickle
from model.user import *
from model.user_role import *
from model.oauth_token import *
from api.common import *
from oauth import *
from datetime import datetime
from utils import mail

api_users = Blueprint('api_users', __name__)
oauth = get_oauth_provider()

def sanitize_data(user):
    user.password = None
    user.password_reset_code = None
    return user

@api_users.route("/users", methods=["GET"])
@oauth.require_oauth()
def api_users_get():    
    if not request.oauth.user.is_admin:
        return Response("unauthorized user", 401)

    sort_by, results_page, results_page_size, filter_by = get_select_params(request)

    users, result_count = User.get_users(sort_by = sort_by,
                                         results_page = results_page,
                                         results_page_size=results_page_size,
                                         filter_by=filter_by)

    total_pages = math.ceil(result_count / results_page_size)

    sanitized_users = []

    for u in users:
        sanitized_users.append(sanitize_data(u))

    json_str = jsonpickle.encode({"current_page": results_page, "page_size": results_page_size, "total_count": result_count, "total_pages": total_pages, "sort_by": sort_by, "filter": jsonpickle.encode(filter_by, unpicklable=False), "results": sanitized_users}, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")


@api_users.route("/users/<int:id_user>", methods=["GET"])
@oauth.require_oauth()
def api_users_id_get(id_user):
    if not (request.oauth.user.is_admin or request.oauth.user.id_user == id_user):
        return Response("unauthorized user", 401)

    try:
        u = User(id_user = id_user)
    except:	
        return Response("not found", 404)        

    json_str = jsonpickle.encode(sanitize_data(u), unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")


@api_users.route("/users", methods=["POST"])
@oauth.require_oauth()
def api_users_post():
    if not (request.oauth.user.is_admin):
        return Response("unauthorized user", 401)

    is_json_ok, data, json_error = parse_json(request.data, ["id_user_role", "email", "password", "first_name", "last_name", "is_suspended", "is_activated"])

    if not is_json_ok:
        return Response(json_error, 400)

    if User.check_exists(data["email"]):
        return Response("Email already exists for different user", 409)

    user = User()		    
    user.id_user_role = data["id_user_role"]
    user.email = data["email"]
    user.password = User.encrypt_password(data["password"])
    user.first_name = data["first_name"]
    user.last_name = data["last_name"]
    user.is_suspended = data["is_suspended"]
    user.is_activated = data["is_activated"]    
    user.auth_provider = "init"

    if user.is_activated == 1:
        user.date_activated = datetime.utcnow()

    user.insert()
    user.reload()

    json_str = jsonpickle.encode(user, unpicklable=False)

    return Response(response=json_str, status=201, mimetype="application/json")


@api_users.route("/users/<int:id_user>", methods=["PUT"])
@oauth.require_oauth()
def api_users_id_put(id_user):
    if not (request.oauth.user.is_admin):
        return Response("unauthorized user", 401)

    is_json_ok, data, json_error = parse_json(request.data, ["id_user_role", "email", "password", "first_name", "last_name", "is_suspended", "is_activated"])

    if not is_json_ok:
        return Response(json_error, 400)

    try:
        user = User(id_user = id_user)
    except:	
        return Response("not found", 404)     

    if User.check_exists(data["email"], id_user_ignore=user.id_user):
        return Response("duplicate email", 409)

    user.id_user_role = data["id_user_role"]
    user.email = data["email"]

    if data["password"] != None and data["password"] != "":
        user.password = User.encrypt_password(data["password"])

    user.first_name = data["first_name"]
    user.last_name = data["last_name"]
    user.is_suspended = data["is_suspended"]
    user.is_activated = data["is_activated"]    
    user.auth_provider = "init"

    if user.is_activated == 1 and user.date_activated == None:
        user.date_activated = datetime.utcnow()

    user.update()
    user.reload()

    if user.is_activated == 0 or user.is_suspended == 1:
        OAuthToken.disable_user(user.id_user)

    json_str = jsonpickle.encode(sanitize_data(user), unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")


@api_users.route("/users/<int:id_user>", methods=["PATCH"])
@oauth.require_oauth()
def api_users_id_patch(id_user):
    if not (request.oauth.user.is_admin or request.oauth.user.id_user == id_user):
        return Response("unauthorized user", 401)

    is_json_ok, data, json_error = parse_json(request.data, ["first_name", "last_name"])

    if not is_json_ok:
        return Response(json_error, 400)

    try:
        user = User(id_user = id_user)
    except:	
        return Response("not found", 404)     

    if "password" in data and data["password"] != None and data["password"] != "":
        user.password = User.encrypt_password(data["password"])

    user.fist_name = data["first_name"]
    user.last_name = data["last_name"]  
    user.update()
    user.reload()

    json_str = jsonpickle.encode(sanitize_data(user), unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")


@api_users.route("/users/<int:id_user>", methods=["DELETE"])
@oauth.require_oauth()
def api_users_id_delete(id_user):
    if not (request.oauth.user.is_admin):
        return Response("unauthorized user", 401)

    try:
        user = User(id_user = id_user)
    except:	
        return Response("not found", 404)     

    user.delete()

    return Response("deleted user id {0}".format(user.id_user), 200)


@api_users.route("/users/registration", methods=["POST"])
def api_users_registration_post():
    is_json_ok, data, json_error = parse_json(request.data, ["email", "password", "first_name", "last_name", "client_id"])

    if not is_json_ok:
        return Response(json_error, 400)

    if User.check_exists(data["email"]):
        return Response("Email already exists for different user.", 409)

    user = User()


    user.id_user_role = UserRole.ID_USER_ROLE_DEFAULT
    user.email = data["email"]
    user.password = User.encrypt_password(data["password"])
    user.first_name = data["first_name"]
    user.last_name = data["last_name"]
    user.is_suspended = 0
    user.is_activated = 1
    user.auth_provider = "init"
    user.date_activated = datetime.utcnow()

    user.insert()
    user.reload()

    token = OAuthToken.create_token(user.id_user, data["client_id"])
    user.access_token = token

    json_str = jsonpickle.encode(sanitize_data(user), unpicklable=False)

    return Response(response=json_str, status=201, mimetype="application/json")


@api_users.route("/users/password", methods=["POST"])
def api_users_password_post():
    is_json_ok, data, json_error = parse_json(request.data, ["email", "action"])

    if not is_json_ok:
        return Response(json_error, 400)

    try:
        user = User(email=data["email"])
    except:
        return Response("invalid email", 404)

    if data["action"] == "reset":
        # generate new code with 16 uppercase letters or numbers
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))
        user.password_reset_code = code
        user.update()

        mail.send_mail(current_app.config['MAIL_USERNAME'], [user.email], "Init password change", "Click the following link: <a href='http://127.0.0.1:3000/reset-password?code={0}'>Reset password</a>".format(code))
        
        return Response("password reset link sent", 200)

    elif data["action"] == "new":
        if not "code" in data:
            return Response("missing password reset code", 400)
        
        if not "password" in data:
            return Response("missing new password", 400)

        if data["code"] == "":
            return Response("invalid password reset code", 400)

        if data["code"] != user.password_reset_code:
            return Response("invalid password reset code", 400)

        user.password_reset_code = ""
        user.password = User.encrypt_password(data["password"])

        user.update()
        
        return Response("password changed", 200)
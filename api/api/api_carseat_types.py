import os
import string
import math
import base64
import re
import random
from flask import Flask, request, Blueprint, Response, current_app, send_file, jsonify, send_from_directory
import requests
import jsonpickle
from api.common import *
from model.carseat_type import *
from oauth import *

api_carseat_types = Blueprint("api_carseat_types", __name__)
oauth = get_oauth_provider()

@api_carseat_types.route("/carseat_types", methods=["GET"])
def api_carseat_types_get():
    sort_by, results_page, results_page_size, filter_by = get_select_params(request)

    results, result_count = CarseatType.get_paged(
        sort_by=sort_by,
        results_page=results_page,
        results_page_size=results_page_size,
        filter_by=filter_by)

    total_pages = math.ceil(result_count / results_page_size)
    json_str = jsonpickle.encode({"current_page": results_page, "page_size": results_page_size, "total_count": result_count,
                                  "total_pages": total_pages, "sort_by": sort_by, "results": results}, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_carseat_types.route("/carseat_types/<int:id_carseat_type>", methods=["GET"])
def api_carseat_types_id_get(id_carseat_type):
    try:
        result = CarseatType(id_carseat_type=id_carseat_type)
    except:
        return Response("not found", 404)

    return Response(jsonpickle.encode(result, unpicklable=False), status=200, mimetype="application/json")

@api_carseat_types.route("/carseat_types", methods=["POST"])
@oauth.require_oauth()
def api_carseat_types_post():
    is_json_ok, data, json_error = parse_json(request.data, [
            "name",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"]):
        return Response("unauthorized user", 401)

    carseat_type = CarseatType()
    carseat_type.name = data["name"]
    carseat_type.date_changed = data["date_changed"]

    carseat_type.insert()
    carseat_type.reload()

    json_str = jsonpickle.encode(carseat_type, unpicklable=False)

    return Response(response=json_str, status=201, mimetype="application/json")

@api_carseat_types.route("/carseat_types/<int:id_carseat_type>", methods=["PUT"])
@oauth.require_oauth()
def api_carseat_types_id_put(id_carseat_type):
    is_json_ok, data, json_error = parse_json(request.data, [
            "name",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    try:
        carseat_type = CarseatType(id_carseat_type = id_carseat_type)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"] and request.oauth.user.id_user == carseat_type.id_user):
        return Response("unauthorized user", 401)

    carseat_type.name = data["name"]
    carseat_type.date_changed = data["date_changed"]

    carseat_type.update()
    carseat_type.reload()

    json_str = jsonpickle.encode(carseat_type, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_carseat_types.route("/carseat_types/<int:id_carseat_type>", methods=["DELETE"])
@oauth.require_oauth()
def api_carseat_types_id_delete(id_carseat_type):
    try:
        carseat_type = CarseatType(id_carseat_type=id_carseat_type)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == carseat_type.id_user):
        return Response("unauthorized user", 401)        

    carseat_type.delete()

    return Response("deleted", status=200)    

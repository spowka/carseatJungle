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
from model.carseat_manual import *
from oauth import *

api_carseat_manuals = Blueprint("api_carseat_manuals", __name__)
oauth = get_oauth_provider()

@api_carseat_manuals.route("/carseat_manuals", methods=["GET"])
def api_carseat_manuals_get():
    sort_by, results_page, results_page_size, filter_by = get_select_params(request)

    results, result_count = CarseatManual.get_paged(
        sort_by=sort_by,
        results_page=results_page,
        results_page_size=results_page_size,
        filter_by=filter_by)

    total_pages = math.ceil(result_count / results_page_size)
    json_str = jsonpickle.encode({"current_page": results_page, "page_size": results_page_size, "total_count": result_count,
                                  "total_pages": total_pages, "sort_by": sort_by, "results": results}, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_carseat_manuals.route("/carseat_manuals/<int:id_carseat_manual>", methods=["GET"])
def api_carseat_manuals_id_get(id_carseat_manual):
    try:
        result = CarseatManual(id_carseat_manual=id_carseat_manual)
    except:
        return Response("not found", 404)

    return Response(jsonpickle.encode(result, unpicklable=False), status=200, mimetype="application/json")

@api_carseat_manuals.route("/carseat_manuals", methods=["POST"])
@oauth.require_oauth()
def api_carseat_manuals_post():
    is_json_ok, data, json_error = parse_json(request.data, [
            "id_carseat",
            "position",
            "manual_url",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"]):
        return Response("unauthorized user", 401)

    carseat_manual = CarseatManual()
    carseat_manual.id_carseat = data["id_carseat"]
    carseat_manual.position = data["position"]
    carseat_manual.manual_url = data["manual_url"]
    carseat_manual.date_changed = data["date_changed"]

    carseat_manual.insert()
    carseat_manual.reload()

    json_str = jsonpickle.encode(carseat_manual, unpicklable=False)

    return Response(response=json_str, status=201, mimetype="application/json")

@api_carseat_manuals.route("/carseat_manuals/<int:id_carseat_manual>", methods=["PUT"])
@oauth.require_oauth()
def api_carseat_manuals_id_put(id_carseat_manual):
    is_json_ok, data, json_error = parse_json(request.data, [
            "id_carseat",
            "position",
            "manual_url",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    try:
        carseat_manual = CarseatManual(id_carseat_manual = id_carseat_manual)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"] and request.oauth.user.id_user == carseat_manual.id_user):
        return Response("unauthorized user", 401)

    carseat_manual.id_carseat = data["id_carseat"]
    carseat_manual.position = data["position"]
    carseat_manual.manual_url = data["manual_url"]
    carseat_manual.date_changed = data["date_changed"]

    carseat_manual.update()
    carseat_manual.reload()

    json_str = jsonpickle.encode(carseat_manual, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_carseat_manuals.route("/carseat_manuals/<int:id_carseat_manual>", methods=["DELETE"])
@oauth.require_oauth()
def api_carseat_manuals_id_delete(id_carseat_manual):
    try:
        carseat_manual = CarseatManual(id_carseat_manual=id_carseat_manual)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == carseat_manual.id_user):
        return Response("unauthorized user", 401)        

    carseat_manual.delete()

    return Response("deleted", status=200)    

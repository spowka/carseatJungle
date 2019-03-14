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
from model.ranking_value import *
from oauth import *

api_ranking_values = Blueprint("api_ranking_values", __name__)
oauth = get_oauth_provider()

@api_ranking_values.route("/ranking_values", methods=["GET"])
def api_ranking_values_get():
    sort_by, results_page, results_page_size, filter_by = get_select_params(request)

    results, result_count = RankingValue.get_paged(
        sort_by=sort_by,
        results_page=results_page,
        results_page_size=results_page_size,
        filter_by=filter_by)

    total_pages = math.ceil(result_count / results_page_size)
    json_str = jsonpickle.encode({"current_page": results_page, "page_size": results_page_size, "total_count": result_count,
                                  "total_pages": total_pages, "sort_by": sort_by, "results": results}, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_ranking_values.route("/ranking_values/<int:id_ranking_value>", methods=["GET"])
def api_ranking_values_id_get(id_ranking_value):
    try:
        result = RankingValue(id_ranking_value=id_ranking_value)
    except:
        return Response("not found", 404)

    return Response(jsonpickle.encode(result, unpicklable=False), status=200, mimetype="application/json")

@api_ranking_values.route("/ranking_values", methods=["POST"])
@oauth.require_oauth()
def api_ranking_values_post():
    is_json_ok, data, json_error = parse_json(request.data, [
            "id_ranking_provider",
            "name",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"]):
        return Response("unauthorized user", 401)

    ranking_value = RankingValue()
    ranking_value.id_ranking_provider = data["id_ranking_provider"]
    ranking_value.name = data["name"]
    ranking_value.date_changed = data["date_changed"]

    ranking_value.insert()
    ranking_value.reload()

    json_str = jsonpickle.encode(ranking_value, unpicklable=False)

    return Response(response=json_str, status=201, mimetype="application/json")

@api_ranking_values.route("/ranking_values/<int:id_ranking_value>", methods=["PUT"])
@oauth.require_oauth()
def api_ranking_values_id_put(id_ranking_value):
    is_json_ok, data, json_error = parse_json(request.data, [
            "id_ranking_provider",
            "name",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    try:
        ranking_value = RankingValue(id_ranking_value = id_ranking_value)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"] and request.oauth.user.id_user == ranking_value.id_user):
        return Response("unauthorized user", 401)

    ranking_value.id_ranking_provider = data["id_ranking_provider"]
    ranking_value.name = data["name"]
    ranking_value.date_changed = data["date_changed"]

    ranking_value.update()
    ranking_value.reload()

    json_str = jsonpickle.encode(ranking_value, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_ranking_values.route("/ranking_values/<int:id_ranking_value>", methods=["DELETE"])
@oauth.require_oauth()
def api_ranking_values_id_delete(id_ranking_value):
    try:
        ranking_value = RankingValue(id_ranking_value=id_ranking_value)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == ranking_value.id_user):
        return Response("unauthorized user", 401)        

    ranking_value.delete()

    return Response("deleted", status=200)    

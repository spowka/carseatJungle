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
from model.ranking import *
from oauth import *

api_rankings = Blueprint("api_rankings", __name__)
oauth = get_oauth_provider()

@api_rankings.route("/rankings", methods=["GET"])
def api_rankings_get():
    sort_by, results_page, results_page_size, filter_by = get_select_params(request)

    results, result_count = Ranking.get_paged(
        sort_by=sort_by,
        results_page=results_page,
        results_page_size=results_page_size,
        filter_by=filter_by)

    total_pages = math.ceil(result_count / results_page_size)
    json_str = jsonpickle.encode({"current_page": results_page, "page_size": results_page_size, "total_count": result_count,
                                  "total_pages": total_pages, "sort_by": sort_by, "results": results}, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_rankings.route("/rankings/<int:id_ranking>", methods=["GET"])
def api_rankings_id_get(id_ranking):
    try:
        result = Ranking(id_ranking=id_ranking)
    except:
        return Response("not found", 404)

    return Response(jsonpickle.encode(result, unpicklable=False), status=200, mimetype="application/json")

@api_rankings.route("/rankings", methods=["POST"])
@oauth.require_oauth()
def api_rankings_post():
    is_json_ok, data, json_error = parse_json(request.data, [
            "id_ranking_provider",
            "id_carseat",
            "id_ranking_value",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"]):
        return Response("unauthorized user", 401)

    ranking = Ranking()
    ranking.id_ranking_provider = data["id_ranking_provider"]
    ranking.id_carseat = data["id_carseat"]
    ranking.id_ranking_value = data["id_ranking_value"]
    ranking.date_changed = data["date_changed"]

    ranking.insert()
    ranking.reload()

    json_str = jsonpickle.encode(ranking, unpicklable=False)

    return Response(response=json_str, status=201, mimetype="application/json")

@api_rankings.route("/rankings/<int:id_ranking>", methods=["PUT"])
@oauth.require_oauth()
def api_rankings_id_put(id_ranking):
    is_json_ok, data, json_error = parse_json(request.data, [
            "id_ranking_provider",
            "id_carseat",
            "id_ranking_value",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    try:
        ranking = Ranking(id_ranking = id_ranking)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"] and request.oauth.user.id_user == ranking.id_user):
        return Response("unauthorized user", 401)

    ranking.id_ranking_provider = data["id_ranking_provider"]
    ranking.id_carseat = data["id_carseat"]
    ranking.id_ranking_value = data["id_ranking_value"]
    ranking.date_changed = data["date_changed"]

    ranking.update()
    ranking.reload()

    json_str = jsonpickle.encode(ranking, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_rankings.route("/rankings/<int:id_ranking>", methods=["DELETE"])
@oauth.require_oauth()
def api_rankings_id_delete(id_ranking):
    try:
        ranking = Ranking(id_ranking=id_ranking)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == ranking.id_user):
        return Response("unauthorized user", 401)        

    ranking.delete()

    return Response("deleted", status=200)    

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
from model.ranking_provider import *
from oauth import *

api_ranking_providers = Blueprint("api_ranking_providers", __name__)
oauth = get_oauth_provider()

@api_ranking_providers.route("/ranking_providers", methods=["GET"])
def api_ranking_providers_get():
    sort_by, results_page, results_page_size, filter_by = get_select_params(request)

    results, result_count = RankingProvider.get_paged(
        sort_by=sort_by,
        results_page=results_page,
        results_page_size=results_page_size,
        filter_by=filter_by)

    total_pages = math.ceil(result_count / results_page_size)
    json_str = jsonpickle.encode({"current_page": results_page, "page_size": results_page_size, "total_count": result_count,
                                  "total_pages": total_pages, "sort_by": sort_by, "results": results}, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_ranking_providers.route("/ranking_providers/<int:id_ranking_provider>", methods=["GET"])
def api_ranking_providers_id_get(id_ranking_provider):
    try:
        result = RankingProvider(id_ranking_provider=id_ranking_provider)
    except:
        return Response("not found", 404)

    return Response(jsonpickle.encode(result, unpicklable=False), status=200, mimetype="application/json")

@api_ranking_providers.route("/ranking_providers", methods=["POST"])
@oauth.require_oauth()
def api_ranking_providers_post():
    is_json_ok, data, json_error = parse_json(request.data, [
            "name",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"]):
        return Response("unauthorized user", 401)

    ranking_provider = RankingProvider()
    ranking_provider.name = data["name"]
    ranking_provider.date_changed = data["date_changed"]

    ranking_provider.insert()
    ranking_provider.reload()

    json_str = jsonpickle.encode(ranking_provider, unpicklable=False)

    return Response(response=json_str, status=201, mimetype="application/json")

@api_ranking_providers.route("/ranking_providers/<int:id_ranking_provider>", methods=["PUT"])
@oauth.require_oauth()
def api_ranking_providers_id_put(id_ranking_provider):
    is_json_ok, data, json_error = parse_json(request.data, [
            "name",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    try:
        ranking_provider = RankingProvider(id_ranking_provider = id_ranking_provider)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"] and request.oauth.user.id_user == ranking_provider.id_user):
        return Response("unauthorized user", 401)

    ranking_provider.name = data["name"]
    ranking_provider.date_changed = data["date_changed"]

    ranking_provider.update()
    ranking_provider.reload()

    json_str = jsonpickle.encode(ranking_provider, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_ranking_providers.route("/ranking_providers/<int:id_ranking_provider>", methods=["DELETE"])
@oauth.require_oauth()
def api_ranking_providers_id_delete(id_ranking_provider):
    try:
        ranking_provider = RankingProvider(id_ranking_provider=id_ranking_provider)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == ranking_provider.id_user):
        return Response("unauthorized user", 401)        

    ranking_provider.delete()

    return Response("deleted", status=200)    

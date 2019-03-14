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
from model.shop import *
from oauth import *

api_shops = Blueprint("api_shops", __name__)
oauth = get_oauth_provider()

@api_shops.route("/shops", methods=["GET"])
def api_shops_get():
    sort_by, results_page, results_page_size, filter_by = get_select_params(request)

    results, result_count = Shop.get_paged(
        sort_by=sort_by,
        results_page=results_page,
        results_page_size=results_page_size,
        filter_by=filter_by)

    total_pages = math.ceil(result_count / results_page_size)
    json_str = jsonpickle.encode({"current_page": results_page, "page_size": results_page_size, "total_count": result_count,
                                  "total_pages": total_pages, "sort_by": sort_by, "results": results}, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_shops.route("/shops/<int:id_shop>", methods=["GET"])
def api_shops_id_get(id_shop):
    try:
        result = Shop(id_shop=id_shop)
    except:
        return Response("not found", 404)

    return Response(jsonpickle.encode(result, unpicklable=False), status=200, mimetype="application/json")

@api_shops.route("/shops", methods=["POST"])
@oauth.require_oauth()
def api_shops_post():
    is_json_ok, data, json_error = parse_json(request.data, [
            "name",
            "position",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"]):
        return Response("unauthorized user", 401)

    shop = Shop()
    shop.name = data["name"]
    shop.position = data["position"]
    shop.date_changed = data["date_changed"]

    shop.insert()
    shop.reload()

    json_str = jsonpickle.encode(shop, unpicklable=False)

    return Response(response=json_str, status=201, mimetype="application/json")

@api_shops.route("/shops/<int:id_shop>", methods=["PUT"])
@oauth.require_oauth()
def api_shops_id_put(id_shop):
    is_json_ok, data, json_error = parse_json(request.data, [
            "name",
            "position",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    try:
        shop = Shop(id_shop = id_shop)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"] and request.oauth.user.id_user == shop.id_user):
        return Response("unauthorized user", 401)

    shop.name = data["name"]
    shop.position = data["position"]
    shop.date_changed = data["date_changed"]

    shop.update()
    # shop.reload()

    json_str = jsonpickle.encode(shop, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_shops.route("/shops/<int:id_shop>", methods=["DELETE"])
@oauth.require_oauth()
def api_shops_id_delete(id_shop):
    try:
        shop = Shop(id_shop=id_shop)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == shop.id_user):
        return Response("unauthorized user", 401)

    shop.delete()

    return Response("deleted", status=200)

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
from model.brand import *
from oauth import *

api_brands = Blueprint("api_brands", __name__)
oauth = get_oauth_provider()

@api_brands.route("/brands", methods=["GET"])
def api_brands_get():
    sort_by, results_page, results_page_size, filter_by = get_select_params(request)

    results, result_count = Brand.get_paged(
        sort_by=sort_by,
        results_page=results_page,
        results_page_size=results_page_size,
        filter_by=filter_by)

    total_pages = math.ceil(result_count / results_page_size)
    json_str = jsonpickle.encode({"current_page": results_page, "page_size": results_page_size, "total_count": result_count,
                                  "total_pages": total_pages, "sort_by": sort_by, "results": results}, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_brands.route("/brands/<int:id_brand>", methods=["GET"])
def api_brands_id_get(id_brand):
    try:
        result = Brand(id_brand=id_brand)
    except:
        return Response("not found", 404)

    return Response(jsonpickle.encode(result, unpicklable=False), status=200, mimetype="application/json")

@api_brands.route("/brands", methods=["POST"])
@oauth.require_oauth()
def api_brands_post():
    is_json_ok, data, json_error = parse_json(request.data, [
            "id_origin",
            "name",
            "logo_url",
            "website_url",
            "position",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"]):
        return Response("unauthorized user", 401)

    brand = Brand()
    brand.id_origin = data["id_origin"]
    brand.name = data["name"]
    brand.logo_url = data["logo_url"]
    brand.website_url = data["website_url"]
    brand.position = data["position"]
    brand.date_changed = data["date_changed"]

    brand.insert()
    brand.reload()

    json_str = jsonpickle.encode(brand, unpicklable=False)

    return Response(response=json_str, status=201, mimetype="application/json")

@api_brands.route("/brands/<int:id_brand>", methods=["PUT"])
@oauth.require_oauth()
def api_brands_id_put(id_brand):
    is_json_ok, data, json_error = parse_json(request.data, [
            "id_origin",
            "name",
            "logo_url",
            "website_url",
            "position",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    try:
        brand = Brand(id_brand = id_brand)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"] and request.oauth.user.id_user == brand.id_user):
        return Response("unauthorized user", 401)

    brand.id_origin = data["id_origin"]
    brand.name = data["name"]
    brand.logo_url = data["logo_url"]
    brand.website_url = data["website_url"]
    brand.position = data["position"]
    brand.date_changed = data["date_changed"]

    brand.update()
    brand.reload()

    json_str = jsonpickle.encode(brand, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_brands.route("/brands/<int:id_brand>", methods=["DELETE"])
@oauth.require_oauth()
def api_brands_id_delete(id_brand):
    try:
        brand = Brand(id_brand=id_brand)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == brand.id_user):
        return Response("unauthorized user", 401)        

    brand.delete()

    return Response("deleted", status=200)    

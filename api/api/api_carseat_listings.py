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
from model.carseat_listing import *
from oauth import *

api_carseat_listings = Blueprint("api_carseat_listings", __name__)
oauth = get_oauth_provider()

@api_carseat_listings.route("/carseat_listings", methods=["GET"])
def api_carseat_listings_get():
    sort_by, results_page, results_page_size, filter_by = get_select_params(request)

    results, result_count = CarseatListing.get_paged(
        sort_by=sort_by,
        results_page=results_page,
        results_page_size=results_page_size,
        filter_by=filter_by)

    total_pages = math.ceil(result_count / results_page_size)
    json_str = jsonpickle.encode({"current_page": results_page, "page_size": results_page_size, "total_count": result_count,
                                  "total_pages": total_pages, "sort_by": sort_by, "results": results}, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_carseat_listings.route("/carseat_listings/<int:id_carseat_listing>", methods=["GET"])
def api_carseat_listings_id_get(id_carseat_listing):
    try:
        result = CarseatListing(id_carseat_listing=id_carseat_listing)
    except:
        return Response("not found", 404)

    return Response(jsonpickle.encode(result, unpicklable=False), status=200, mimetype="application/json")

@api_carseat_listings.route("/carseat_listings", methods=["POST"])
@oauth.require_oauth()
def api_carseat_listings_post():
    is_json_ok, data, json_error = parse_json(request.data, [
            "id_carseat",
            "id_shop",
            "listing_url",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"]):
        return Response("unauthorized user", 401)

    carseat_listing = CarseatListing()
    carseat_listing.id_carseat = data["id_carseat"]
    carseat_listing.id_shop = data["id_shop"]
    carseat_listing.listing_url = data["listing_url"]
    carseat_listing.date_changed = data["date_changed"]

    carseat_listing.insert()
    carseat_listing.reload()

    json_str = jsonpickle.encode(carseat_listing, unpicklable=False)

    return Response(response=json_str, status=201, mimetype="application/json")

@api_carseat_listings.route("/carseat_listings/<int:id_carseat_listing>", methods=["PUT"])
@oauth.require_oauth()
def api_carseat_listings_id_put(id_carseat_listing):
    is_json_ok, data, json_error = parse_json(request.data, [
            "id_carseat",
            "id_shop",
            "listing_url",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    try:
        carseat_listing = CarseatListing(id_carseat_listing = id_carseat_listing)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"] and request.oauth.user.id_user == carseat_listing.id_user):
        return Response("unauthorized user", 401)

    carseat_listing.id_carseat = data["id_carseat"]
    carseat_listing.id_shop = data["id_shop"]
    carseat_listing.listing_url = data["listing_url"]
    carseat_listing.date_changed = data["date_changed"]

    carseat_listing.update()
    carseat_listing.reload()

    json_str = jsonpickle.encode(carseat_listing, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_carseat_listings.route("/carseat_listings/<int:id_carseat_listing>", methods=["DELETE"])
@oauth.require_oauth()
def api_carseat_listings_id_delete(id_carseat_listing):
    try:
        carseat_listing = CarseatListing(id_carseat_listing=id_carseat_listing)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == carseat_listing.id_user):
        return Response("unauthorized user", 401)        

    carseat_listing.delete()

    return Response("deleted", status=200)    

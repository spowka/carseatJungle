import os
import string
import math
import base64
import re
import random
from flask import Flask, request, Blueprint, Response, current_app, send_file, jsonify, send_from_directory
import requests
import jsonpickle
from datetime import datetime
from api.common import *
from model.carseat import *
from model.carseat_manual import *
from model.carseat_video import *
from model.carseat_listing import *
from model.ranking import *
from oauth import *

api_carseats = Blueprint("api_carseats", __name__)
oauth = get_oauth_provider()

@api_carseats.route("/carseats", methods=["GET"])
def api_carseats_get():
    sort_by, results_page, results_page_size, filter_by = get_select_params(request)

    carseat_types = None
    if "carseat_types" in request.args: 
        carseat_types = request.args.get("carseat_types")

    is_rear_facing = None
    if "is_rear_facing" in request.args:
        is_rear_facing = request.args.get("is_rear_facing")

    is_i_size_compliant = None
    if "is_i_size_compliant" in request.args:
        is_i_size_compliant = request.args.get("is_i_size_compliant")        

    has_isofix = None
    if "has_isofix" in request.args:
        has_isofix = request.args.get("has_isofix")        

    has_swivel = None
    if "has_swivel" in request.args:
        has_swivel = request.args.get("has_swivel")  

    is_uk_available = None
    if "is_uk_available" in request.args:
        is_uk_available = request.args.get("is_uk_available")                

    results, result_count = Carseat.get_paged(
        sort_by=sort_by,
        results_page=results_page,
        results_page_size=results_page_size,
        filter_by=filter_by,
        carseat_types=carseat_types,
        is_rear_facing=is_rear_facing,
        is_i_size_compliant=is_i_size_compliant,
        has_isofix=has_isofix,
        has_swivel=has_swivel,
        is_uk_available=is_uk_available)

    listings = CarseatListing.get_all()

    for cs in results:
        cs.listings = [l for l in listings if l.id_carseat == cs.id_carseat]

    total_pages = math.ceil(result_count / results_page_size)
    json_str = jsonpickle.encode({"current_page": results_page, "page_size": results_page_size, "total_count": result_count,
                                  "total_pages": total_pages, "sort_by": sort_by, "results": results}, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_carseats.route("/carseats/<int:id_carseat>", methods=["GET"])
def api_carseats_id_get(id_carseat):
    try:
        result = Carseat(id_carseat=id_carseat)
    except:
        return Response("not found", 404)

    result.manuals = CarseatManual.get_all(id_carseat=id_carseat)
    result.videos = CarseatVideo.get_all(id_carseat=id_carseat)

    return Response(jsonpickle.encode(result, unpicklable=False), status=200, mimetype="application/json")

@api_carseats.route("/carseats", methods=["POST"])
@oauth.require_oauth()
def api_carseats_post():
    is_json_ok, data, json_error = parse_json(request.data, [
            "id_brand",
            "id_carseat_type",
            "id_carseat_group",
            "id_child_weight_group",
            "id_child_height_group",
            "model",
            "is_i_size_compliant",
            "has_swivel",
            "is_forward_facing",
            "is_rear_facing",
            "is_sideways",
            "has_isofix",
            "image_url",
            "has_erf",
            "has_advanced_sip",
            "has_travel_system",
            "weight",
            "width",
            "height",
            "depth",
            "angle",
            "car_fitting_list_url",
            "price",
            "is_uk_available",
            "has_uv_canopy",
            "is_swedish_plus_tested",
            "is_aircraft_approved",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"]):
        return Response("unauthorized user", 401)

    for manual in data["manuals"]:
        new_manual = CarseatManual()
        new_manual.id_carseat = id_carseat
        new_manual.manual_url = manual["manual_url"]
        new_manual.insert()
    
    for listing in data["listings"]:
        new_listing = CarseatListing()
        new_listing.id_carseat = id_carseat
        new_listing.listing_url = listing["listing_url"]
        new_listing.id_shop = listing["id_shop"]
        new_listing.insert()

    for video in data["videos"]:
        new_video = CarseatVideo()
        new_video.id_carseat = id_carseat
        new_video.video_url = video["video_url"]
        new_video.insert()

    carseat = Carseat()
    carseat.id_brand = data["id_brand"]
    carseat.id_carseat_type = data["id_carseat_type"]
    carseat.id_carseat_group = data["id_carseat_group"]
    carseat.id_child_weight_group = data["id_child_weight_group"]
    carseat.id_child_height_group = data["id_child_height_group"]
    carseat.model = data["model"]
    carseat.is_i_size_compliant = data["is_i_size_compliant"]
    carseat.has_swivel = data["has_swivel"]
    carseat.is_forward_facing = data["is_forward_facing"]
    carseat.is_rear_facing = data["is_rear_facing"]
    carseat.is_sideways = data["is_sideways"]
    carseat.is_isofix_base_required = data["is_isofix_base_required"]
    carseat.has_isofix = data["has_isofix"]
    carseat.image_url = data["image_url"]
    carseat.has_erf = data["has_erf"]
    carseat.has_advanced_sip = data["has_advanced_sip"]
    carseat.has_travel_system = data["has_travel_system"]
    carseat.weight = data["weight"]
    carseat.width = data["width"]
    carseat.height = data["height"]
    carseat.depth = data["depth"]
    carseat.angle = data["angle"]
    carseat.car_fitting_list_url = data["car_fitting_list_url"]
    carseat.price = data["price"]
    carseat.price_range = data["price_range"]
    carseat.isofix = data["isofix"]
    carseat.isofix_base = data["isofix_base"]
    carseat.direction_of_travel = data["direction_of_travel"]
    carseat.awards = data["awards"]
    carseat.fabrics = data["fabrics"]
    carseat.is_uk_available = data["is_uk_available"]
    carseat.has_uv_canopy = data["has_uv_canopy"]
    carseat.is_swedish_plus_tested = data["is_swedish_plus_tested"]
    carseat.is_aircraft_approved = data["is_aircraft_approved"]
    carseat.date_changed = data["date_changed"]

    carseat.insert()
    carseat.reload()

    json_str = jsonpickle.encode(carseat, unpicklable=False)

    return Response(response=json_str, status=201, mimetype="application/json")

@api_carseats.route("/carseats/<int:id_carseat>", methods=["PUT"])
@oauth.require_oauth()
def api_carseats_id_put(id_carseat):
    is_json_ok, data, json_error = parse_json(request.data, [
            "id_brand",
            "id_carseat_type",
            "id_carseat_group",
            "id_child_weight_group",
            "id_child_height_group",
            "model",
            "is_i_size_compliant",
            "has_swivel",
            "is_forward_facing",
            "is_rear_facing",
            "is_sideways",
            "has_isofix",
            "image_url",
            "has_erf",
            "has_advanced_sip",
            "has_travel_system",
            "weight",
            "width",
            "height",
            "depth",
            "angle",
            "manuals",
            "listings",
            "videos",
            "car_fitting_list_url",
            "price",
            "is_uk_available",
            "has_uv_canopy",
            "is_swedish_plus_tested",
            "is_aircraft_approved",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    try:
        carseat = Carseat(id_carseat = id_carseat)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"] and request.oauth.user.id_user == carseat.id_user):
        return Response("unauthorized user", 401)

    carseat_manuals = CarseatManual.get_all(id_carseat=id_carseat)
    new_manual_urls = map(lambda manual: manual["manual_url"], data["manuals"])
    manual_urls = map(lambda manual: manual.manual_url, carseat_manuals)
    for manual in carseat_manuals:
        if manual.manual_url not in new_manual_urls:
            manual.remove()

    for manual in data["manuals"]:
        if manual["manual_url"] not in manual_urls:
            new_manual = CarseatManual()
            new_manual.id_carseat = id_carseat
            new_manual.manual_url = manual["manual_url"]
            new_manual.position = manual["position"]
            new_manual.date_changed = str(datetime.now())
            new_manual.insert()
    
    carseat_listings = CarseatListing.get_all(id_carseat=id_carseat)
    new_listing_urls = map(lambda listing: listing["listing_url"], data["listings"])
    listing_urls = map(lambda listing: listing.listing_url, carseat_listings)
    for listing in carseat_listings:
        if listing.listing_url not in new_listing_urls:
            listing.remove()
    
    for listing in data["listings"]:
        if listing["listing_url"] not in listing_urls:
            new_listing = CarseatListing()
            new_listing.id_carseat = id_carseat
            new_listing.id_shop = listing["id_shop"]
            new_listing.listing_url = listing["listing_url"]
            new_listing.position = listing["position"]
            new_listing.date_changed = str(datetime.now())
            new_listing.insert()

    carseat_videos = CarseatVideo.get_all(id_carseat=id_carseat)
    new_video_urls = map(lambda video: video["video_url"], data["videos"])
    video_urls = map(lambda video: video.video_url, carseat_videos)
    for video in carseat_videos:
        if video.video_url not in new_video_urls:
            video.remove()

    for video in data["videos"]:
        if video["video_url"] not in video_urls:
            new_video = CarseatVideo()
            new_video.id_carseat = id_carseat
            new_video.video_url = video["video_url"]
            new_video.position = video["position"]
            new_video.date_changed = str(datetime.now())
            new_video.insert()
    
    carseat.id_brand = data["id_brand"]
    carseat.id_carseat_type = data["id_carseat_type"]
    carseat.id_carseat_group = data["id_carseat_group"]
    carseat.id_child_weight_group = data["id_child_weight_group"]
    carseat.id_child_height_group = data["id_child_height_group"]
    carseat.model = data["model"]
    carseat.is_i_size_compliant = data["is_i_size_compliant"]
    carseat.has_swivel = data["has_swivel"]
    carseat.is_forward_facing = data["is_forward_facing"]
    carseat.is_rear_facing = data["is_rear_facing"]
    carseat.is_sideways = data["is_sideways"]
    carseat.is_isofix_base_required = data["is_isofix_base_required"]
    carseat.has_isofix = data["has_isofix"]
    carseat.image_url = data["image_url"]
    carseat.has_erf = data["has_erf"]
    carseat.has_advanced_sip = data["has_advanced_sip"]
    carseat.has_travel_system = data["has_travel_system"]
    carseat.weight = data["weight"]
    carseat.width = data["width"]
    carseat.height = data["height"]
    carseat.depth = data["depth"]
    carseat.angle = data["angle"]
    carseat.car_fitting_list_url = data["car_fitting_list_url"]
    carseat.price = data["price"]
    carseat.price_range = data["price_range"]
    carseat.isofix = data["isofix"]
    carseat.isofix_base = data["isofix_base"]
    carseat.direction_of_travel = data["direction_of_travel"]
    carseat.awards = data["awards"]
    carseat.fabrics = data["fabrics"]
    carseat.is_uk_available = data["is_uk_available"]
    carseat.has_uv_canopy = data["has_uv_canopy"]
    carseat.is_swedish_plus_tested = data["is_swedish_plus_tested"]
    carseat.is_aircraft_approved = data["is_aircraft_approved"]
    carseat.date_changed = data["date_changed"]

    carseat.update()
    carseat.reload()

    json_str = jsonpickle.encode(carseat, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_carseats.route("/carseats/<int:id_carseat>", methods=["DELETE"])
@oauth.require_oauth()
def api_carseats_id_delete(id_carseat):
    try:
        carseat = Carseat(id_carseat=id_carseat)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == carseat.id_user):
        return Response("unauthorized user", 401)  

    carseat_manuals = CarseatManual.get_all(id_carseat=id_carseat)
    carseat_listings = CarseatListing.get_all(id_carseat=id_carseat)
    carseat_videos = CarseatVideo.get_all(id_carseat=id_carseat)
    carseat_rankings = Ranking.get_all(id_carseat=id_carseat)

    for manual in carseat_manuals:
        manual.delete() 

    for listing in carseat_listings:
        listing.delete() 

    for video in carseat_videos:
        video.delete() 

    for ranking in carseat_rankings:
        ranking.delete()

    carseat.delete()

    return Response("deleted", status=200)    
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
from model.carseat_video import *
from oauth import *

api_carseat_videos = Blueprint("api_carseat_videos", __name__)
oauth = get_oauth_provider()

@api_carseat_videos.route("/carseat_videos", methods=["GET"])
def api_carseat_videos_get():
    sort_by, results_page, results_page_size, filter_by = get_select_params(request)

    results, result_count = CarseatVideo.get_paged(
        sort_by=sort_by,
        results_page=results_page,
        results_page_size=results_page_size,
        filter_by=filter_by)

    total_pages = math.ceil(result_count / results_page_size)
    json_str = jsonpickle.encode({"current_page": results_page, "page_size": results_page_size, "total_count": result_count,
                                  "total_pages": total_pages, "sort_by": sort_by, "results": results}, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_carseat_videos.route("/carseat_videos/<int:id_carseat_video>", methods=["GET"])
def api_carseat_videos_id_get(id_carseat_video):
    try:
        result = CarseatVideo(id_carseat_video=id_carseat_video)
    except:
        return Response("not found", 404)

    return Response(jsonpickle.encode(result, unpicklable=False), status=200, mimetype="application/json")

@api_carseat_videos.route("/carseat_videos", methods=["POST"])
@oauth.require_oauth()
def api_carseat_videos_post():
    is_json_ok, data, json_error = parse_json(request.data, [
            "id_carseat",
            "position",
            "video_url",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"]):
        return Response("unauthorized user", 401)

    carseat_video = CarseatVideo()
    carseat_video.id_carseat = data["id_carseat"]
    carseat_video.position = data["position"]
    carseat_video.video_url = data["video_url"]
    carseat_video.date_changed = data["date_changed"]

    carseat_video.insert()
    carseat_video.reload()

    json_str = jsonpickle.encode(carseat_video, unpicklable=False)

    return Response(response=json_str, status=201, mimetype="application/json")

@api_carseat_videos.route("/carseat_videos/<int:id_carseat_video>", methods=["PUT"])
@oauth.require_oauth()
def api_carseat_videos_id_put(id_carseat_video):
    is_json_ok, data, json_error = parse_json(request.data, [
            "id_carseat",
            "position",
            "video_url",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    try:
        carseat_video = CarseatVideo(id_carseat_video = id_carseat_video)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"] and request.oauth.user.id_user == carseat_video.id_user):
        return Response("unauthorized user", 401)

    carseat_video.id_carseat = data["id_carseat"]
    carseat_video.position = data["position"]
    carseat_video.video_url = data["video_url"]
    carseat_video.date_changed = data["date_changed"]

    carseat_video.update()
    carseat_video.reload()

    json_str = jsonpickle.encode(carseat_video, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_carseat_videos.route("/carseat_videos/<int:id_carseat_video>", methods=["DELETE"])
@oauth.require_oauth()
def api_carseat_videos_id_delete(id_carseat_video):
    try:
        carseat_video = CarseatVideo(id_carseat_video=id_carseat_video)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == carseat_video.id_user):
        return Response("unauthorized user", 401)        

    carseat_video.delete()

    return Response("deleted", status=200)    

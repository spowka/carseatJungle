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
from model.child_height_group import *
from oauth import *

api_child_height_groups = Blueprint("api_child_height_groups", __name__)
oauth = get_oauth_provider()

@api_child_height_groups.route("/child_height_groups", methods=["GET"])
def api_child_height_groups_get():
    sort_by, results_page, results_page_size, filter_by = get_select_params(request)

    results, result_count = ChildHeightGroup.get_paged(
        sort_by=sort_by,
        results_page=results_page,
        results_page_size=results_page_size,
        filter_by=filter_by)

    total_pages = math.ceil(result_count / results_page_size)
    json_str = jsonpickle.encode({"current_page": results_page, "page_size": results_page_size, "total_count": result_count,
                                  "total_pages": total_pages, "sort_by": sort_by, "results": results}, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_child_height_groups.route("/child_height_groups/<int:id_child_height_group>", methods=["GET"])
def api_child_height_groups_id_get(id_child_height_group):
    try:
        result = ChildHeightGroup(id_child_height_group=id_child_height_group)
    except:
        return Response("not found", 404)

    return Response(jsonpickle.encode(result, unpicklable=False), status=200, mimetype="application/json")

@api_child_height_groups.route("/child_height_groups", methods=["POST"])
@oauth.require_oauth()
def api_child_height_groups_post():
    is_json_ok, data, json_error = parse_json(request.data, [
            "name",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"]):
        return Response("unauthorized user", 401)

    child_height_group = ChildHeightGroup()
    child_height_group.name = data["name"]
    child_height_group.date_changed = data["date_changed"]

    child_height_group.insert()
    child_height_group.reload()

    json_str = jsonpickle.encode(child_height_group, unpicklable=False)

    return Response(response=json_str, status=201, mimetype="application/json")

@api_child_height_groups.route("/child_height_groups/<int:id_child_height_group>", methods=["PUT"])
@oauth.require_oauth()
def api_child_height_groups_id_put(id_child_height_group):
    is_json_ok, data, json_error = parse_json(request.data, [
            "name",
            "date_changed"])

    if not is_json_ok:
        return Response(json_error, 400)

    try:
        child_height_group = ChildHeightGroup(id_child_height_group = id_child_height_group)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"] and request.oauth.user.id_user == child_height_group.id_user):
        return Response("unauthorized user", 401)

    child_height_group.name = data["name"]
    child_height_group.date_changed = data["date_changed"]

    child_height_group.update()
    child_height_group.reload()

    json_str = jsonpickle.encode(child_height_group, unpicklable=False)

    return Response(response=json_str, status=200, mimetype="application/json")

@api_child_height_groups.route("/child_height_groups/<int:id_child_height_group>", methods=["DELETE"])
@oauth.require_oauth()
def api_child_height_groups_id_delete(id_child_height_group):
    try:
        child_height_group = ChildHeightGroup(id_child_height_group=id_child_height_group)
    except:
        return Response("not found", 404)

    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == child_height_group.id_user):
        return Response("unauthorized user", 401)        

    child_height_group.delete()

    return Response("deleted", status=200)    

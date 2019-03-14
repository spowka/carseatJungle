from flask import current_app, Flask, render_template, request, redirect, url_for, flash, send_file, Blueprint, Response
from datetime import datetime, timedelta
from wsgiref.handlers import format_date_time
from time import mktime
import shutil
import json

def parse_json(data, keys):
    """
    Returns JSON object from data string after validating that all keys are present.

    Returns:
            is_valid, json_obj, error_message
    """
    try:
        j_obj = json.loads(data)	
    except Exception as ex:
        return False, None, "not a valid JSON object: " + repr(ex)

    for key in keys:
        if not key in j_obj:
            return False, None, "missing key '{0}' in JSON object".format(key)

    return True, j_obj, None


def get_select_params(request, default_page=1, default_page_size=10):
    sort_by = None
    if "sort_by" in request.args:
        sort_by = request.args.get("sort_by")
        
    results_page = default_page
    if "page" in request.args:
        results_page = int(request.args.get("page"))

    results_page_size = default_page_size
    if "page_size" in request.args:
        results_page_size = int(request.args.get("page_size"))

    filter_by = None
    if "filter" in request.args:
        filter_by = request.args.get("filter")

    if sort_by in ("null", "undefined", ""):
        sort_by = None

    if not filter_by or filter_by in ("null", "undefined", ""):
        filter_by = None
    else:
        filter_by = json.loads(filter_by)

    return sort_by, results_page, results_page_size, filter_by


def parse_url_params(request, parameter_names=[]):
    parameters = []
    
    for p in parameter_names:
        if p in request.args:
            parameters.append(request.args.get(p))
        else:
            parameters.append(None)

    return parameters

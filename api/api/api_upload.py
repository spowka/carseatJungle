import os
import string
import math
import base64
import re
import random
from flask import Flask, request, Blueprint, Response, current_app, send_file, jsonify, send_from_directory
import requests
import boto3
import jsonpickle
import config
import time
from werkzeug import secure_filename
from api.common import *
from model.carseat import *
from oauth import *

api_upload = Blueprint("api_upload", __name__)
oauth = get_oauth_provider()
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
s3 = boto3.client(
    "s3",
    aws_access_key_id=config.S3_KEY,
    aws_secret_access_key=config.S3_SECRET
)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_file_to_s3(file, bucket_name, dir="", acl="public-read"):
    # This is required in order to avoid file overwrites
    filename = str(time.time()) + "_" + file.filename
    try:
        s3.upload_fileobj(
            file,
            bucket_name,
            dir + filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        print("Something Happened: ", e)
        return e

    return "{}{}{}".format(config.S3_LOCATION, dir, filename)


@api_upload.route("/upload/carseat/<int:id_carseat>", methods=["POST"])
@oauth.require_oauth()
def api_upload_post(id_carseat):
    if "image_file" not in request.files:
        return "No image_file key in request.files"

    file = request.files["image_file"]
    print(file, config.S3_BUCKET)

    if file.filename == "":
        return "Please select a file"

    if file and allowed_file(file.filename):
        file.filename = secure_filename(file.filename)
        output = upload_file_to_s3(
            file, config.S3_BUCKET, 'carseat-images/', acl="public-read")
        return Response(str(output), 200)
    else:
        return Response("File not allowed", 400)

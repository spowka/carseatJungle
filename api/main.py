import sys
import os
from flask import Flask, redirect
from db import *
from api import api_oauth, api_users, api_carseats, api_brands, api_carseat_groups, api_carseat_listings, api_carseat_manuals, api_carseat_types, api_carseat_videos, api_child_height_groups, api_child_weight_groups, api_origins, api_rankings, api_upload, api_ranking_providers, api_ranking_values, api_shops
import requests
from flask_cors import CORS
from oauth import *
from utils.mail import *

app = Flask(__name__)
app.config.from_pyfile("config.py")
app.debug = True
app.threaded = True

app.register_blueprint(api_oauth.api_oauth, url_prefix='/api/v1')
app.register_blueprint(api_users.api_users, url_prefix='/api/v1')
app.register_blueprint(api_carseats.api_carseats, url_prefix='/api/v1')
app.register_blueprint(api_brands.api_brands, url_prefix='/api/v1')
app.register_blueprint(
    api_carseat_groups.api_carseat_groups, url_prefix='/api/v1')
app.register_blueprint(
    api_carseat_listings.api_carseat_listings, url_prefix='/api/v1')
app.register_blueprint(
    api_carseat_manuals.api_carseat_manuals, url_prefix='/api/v1')
app.register_blueprint(
    api_carseat_types.api_carseat_types, url_prefix='/api/v1')
app.register_blueprint(
    api_carseat_videos.api_carseat_videos, url_prefix='/api/v1')
app.register_blueprint(
    api_child_height_groups.api_child_height_groups, url_prefix='/api/v1')
app.register_blueprint(
    api_child_weight_groups.api_child_weight_groups, url_prefix='/api/v1')
app.register_blueprint(api_origins.api_origins, url_prefix='/api/v1')
app.register_blueprint(api_rankings.api_rankings, url_prefix='/api/v1')
app.register_blueprint(api_upload.api_upload, url_prefix='/api/v1')
app.register_blueprint(
    api_ranking_providers.api_ranking_providers, url_prefix='/api/v1')
app.register_blueprint(
    api_ranking_values.api_ranking_values, url_prefix='/api/v1')
app.register_blueprint(api_shops.api_shops, url_prefix='/api/v1')

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
init_pg(app)
init_mail(app)
oauth = init_oauth(app)


@app.route("/")
def index():
    return "API v1.0"


if __name__ == "__main__":
    app.run(debug=True, threaded=True)

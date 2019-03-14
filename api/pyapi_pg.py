import sys
import psycopg2
from psycopg2.extras import RealDictCursor

pg_connection_string = "dbname='carseatjungle' user='carseatjungle' host='carseatjungle.cvps0v8aayng.us-east-2.rds.amazonaws.com' password='csj957dvkn3'"

table_name = sys.argv[1]

if len(sys.argv) > 2:
    class_name = sys.argv[2]
else:
    class_name = table_name[0].upper() + table_name[1:]

if len(sys.argv) > 3:
    api_name = sys.argv[3]
else:
    api_name = 'api_' + table_name + 's'

if len(sys.argv) > 4:
    base_url = sys.argv[4]
else:
    base_url = '/' + table_name + 's'

conn = psycopg2.connect(pg_connection_string)
cur = conn.cursor(cursor_factory=RealDictCursor)

cur.execute("select replace(column_name, 'member', 'user') as column_name, data_type, case when column_name = 'id_{0}' then 'PRI' else '' end as key from INFORMATION_SCHEMA.COLUMNS where table_name = '{0}'".format(table_name))
rows = cur.fetchall()

cur.close()
conn.close()

print('import os')
print('import string')
print('import math')
print('import base64')
print('import re')
print('import random')
print('from flask import Flask, request, Blueprint, Response, current_app, send_file, jsonify, send_from_directory')
print('import requests')
print('import jsonpickle')
print('from api.common import *')
print('from model.{0} import *'.format(class_name.lower()))
print('from oauth import *')
print('')
print('{0} = Blueprint("{0}", __name__)'.format(api_name))
print('oauth = get_oauth_provider()')
print('')

# GET ALL

print('@{0}.route("{1}", methods=["GET"])'.format(api_name, base_url))
print('def {0}_get():'.format(api_name))
print('    sort_by, results_page, results_page_size, filter_by = get_select_params(request)')
print('')
print('    results, result_count = {0}.get_paged('.format(class_name))
print('        sort_by=sort_by,')
print('        results_page=results_page,')
print('        results_page_size=results_page_size,')
print('        filter_by=filter_by)')
print('')
print('    total_pages = math.ceil(result_count / results_page_size)')
print('    json_str = jsonpickle.encode({"current_page": results_page, "page_size": results_page_size, "total_count": result_count,')
print('                                  "total_pages": total_pages, "sort_by": sort_by, "results": results}, unpicklable=False)')
print('')
print('    return Response(response=json_str, status=200, mimetype="application/json")')
print('')

# GET SINGLE

print('@{0}.route("{1}/<int:id_{2}>", methods=["GET"])'.format(api_name, base_url, table_name))
print('def {0}_id_get(id_{1}):'.format(api_name, table_name))
print('    try:')
print('        result = {0}(id_{1}=id_{1})'.format(class_name, table_name))
print('    except:')
print('        return Response("not found", 404)')
print('')
print('    return Response(jsonpickle.encode(result, unpicklable=False), status=200, mimetype="application/json")')
print('')

# INSERT

print('@{0}.route("{1}", methods=["POST"])'.format(api_name, base_url))
print('@oauth.require_oauth()')
print('def {0}_post():'.format(api_name))
print('    is_json_ok, data, json_error = parse_json(request.data, [')

for i, row in enumerate(rows):
    if row["key"] == 'PRI':
        continue

    comma = '])' if i == len(rows) - 1 else ','
    print('            "{0}"{1}'.format(row["column_name"], comma))

    comma = '' if i == len(rows) - 1 else ','

print('')
print('    if not is_json_ok:')
print('        return Response(json_error, 400)')
print('')
print('    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"]):')
print('        return Response("unauthorized user", 401)')
print('')

print('    {0} = {1}()'.format(table_name, class_name))

for i, row in enumerate(rows):
    if row["key"] == 'PRI':
        continue

    print('    {0}.{1} = data["{1}"]'.format(table_name, row["column_name"]))

print('')
print('    {0}.insert()'.format(table_name))
print('    {0}.reload()'.format(table_name))
print('')
print('    json_str = jsonpickle.encode({0}, unpicklable=False)'.format(table_name))
print('')
print('    return Response(response=json_str, status=201, mimetype="application/json")')
print('')

# UPDATE

print('@{0}.route("{1}/<int:id_{2}>", methods=["PUT"])'.format(api_name, base_url, table_name))
print('@oauth.require_oauth()')
print('def {0}_id_put(id_{1}):'.format(api_name, table_name))
print('    is_json_ok, data, json_error = parse_json(request.data, [')

for i, row in enumerate(rows):
    if row["key"] == 'PRI':
        continue

    comma = '])' if i == len(rows) - 1 else ','
    print('            "{0}"{1}'.format(row["column_name"], comma))

    comma = '' if i == len(rows) - 1 else ','

print('')
print('    if not is_json_ok:')
print('        return Response(json_error, 400)')
print('')
print('    try:')
print('        {0} = {1}(id_{0} = id_{0})'.format(table_name, class_name))
print('    except:')
print('        return Response("not found", 404)')
print('')
print('    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == data["id_user"] and request.oauth.user.id_user == {0}.id_user):'.format(table_name))
print('        return Response("unauthorized user", 401)')
print('')

for i, row in enumerate(rows):
    if row["key"] == 'PRI':
        continue

    print('    {0}.{1} = data["{1}"]'.format(table_name, row["column_name"]))

print('')
print('    {0}.update()'.format(table_name))
print('    {0}.reload()'.format(table_name))
print('')
print('    json_str = jsonpickle.encode({0}, unpicklable=False)'.format(table_name))
print('')
print('    return Response(response=json_str, status=200, mimetype="application/json")')
print('')

# DELETE

print('@{0}.route("{1}/<int:id_{2}>", methods=["DELETE"])'.format(api_name, base_url, table_name))
print('@oauth.require_oauth()')
print('def {0}_id_delete(id_{1}):'.format(api_name, table_name))
print('    try:')
print('        {0} = {1}(id_{0}=id_{0})'.format(table_name, class_name))
print('    except:')
print('        return Response("not found", 404)')
print('')
print('    if not (request.oauth.user.is_admin) and not (request.oauth.user.id_user == {0}.id_user):'.format(table_name))
print('        return Response("unauthorized user", 401)        ')
print('')
print('    {0}.delete()'.format(table_name))
print('')
print('    return Response("deleted", status=200)    ')
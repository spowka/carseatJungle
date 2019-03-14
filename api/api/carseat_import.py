import sys
import csv
import re
from db import *

def sanitize_str(text):
    return text.encode('utf-8').decode("utf-8", 'ignore')

def str_to_int(text):
    return text if text and text.isdigit() and text != "No" and text != "N/A" else 0

def str_to_boolean(text):
    return text != "No" and text != "N/A"

def str_to_float(text):
    sanitized = re.sub("[^\d\.]", "", text)
    val = None
    try:
        val = float(sanitized)	
    except:
        pass

    return val

def import_csv_data(filename):
    message = ""

    with open (filename , 'r') as f:
        reader = csv.reader(f)
        columns = next(reader) 
        carseat_groups, carseat_types, child_height_groups, child_weight_groups, origins, brands, ranking_values, carseats, carseat_manuals, carseat_videos, carseat_listings, rankings = set(), set(), set(), set(), set(), set(), set(), list(), list(), list(), [
            ["Mothercare", []],
            ["Mamas&Papas", []],
            ["John Lewis", []],
            ["In Car Safety Centre", []],
            ["Uber Kids", []],
            ["Amazon", []],
            ["Precious Little One", []],
            ["Directly from Manufacturer", []],
            ["Boots", []],
            ["Pram Centre (Glasgow)", []],
            ["Baby Centre (Bournemouth)", []],
            ["Kiddies Kingdom", []],
            ["Argos", []],
            ["SmythsToys", []],
            ["Winstanleys Pramworld", []],
            ["Online4baby", []],
            ["Dunelm", []],
            ["Halfords", []],
            ["Other retailer", []]
        ], [
            ["ADAC", []],
            ["TCS", []],
            ["OAMTC", []],
            ["Which?", []]
        ]
        for data in reader:
            brands.add((data[0], data[57], data[58], data[56]))
            origins.add((data[56],))
            carseat_types.add((data[2],))
            carseat_groups.add((data[3],))
            child_weight_groups.add((data[4],))
            child_height_groups.add((data[5],))
            carseats.append([
                sanitize_str(data[0]),
                sanitize_str(data[2]),
                sanitize_str(data[3]),
                sanitize_str(data[4]),
                sanitize_str(data[5]),
                sanitize_str(data[1]),
                str_to_boolean(sanitize_str(data[6])),
                str_to_boolean(sanitize_str(data[7])),
                str_to_boolean(sanitize_str(data[9])),
                str_to_boolean(sanitize_str(data[10])),
                str_to_boolean(sanitize_str(data[11])),
                str_to_boolean(sanitize_str(data[12])),
                sanitize_str(data[13]),
                str_to_boolean(sanitize_str(data[14])),
                str_to_boolean(sanitize_str(data[15])),
                str_to_boolean(sanitize_str(data[16])),
                str_to_int(sanitize_str(data[17])),
                str_to_int(sanitize_str(data[18])),
                str_to_int(sanitize_str(data[19])),
                str_to_int(sanitize_str(data[20])),
                str_to_int(sanitize_str(data[21])),
                sanitize_str(data[47]),
                str_to_float(sanitize_str(data[52])),
                str_to_boolean(sanitize_str(data[53])),
                str_to_boolean(sanitize_str(data[62])),
                str_to_boolean(sanitize_str(data[63])),
                str_to_boolean(sanitize_str(data[64]))
            ])
            carseat_manuals.append(data[41])
            carseat_videos.append(data[45])

            for i, ranking in enumerate(rankings):
                rankings[i][1].append(data[48 + i])

            for i, listing in enumerate(carseat_listings):
                carseat_listings[i][1].append(data[22 + i])
            
        for origin in origins:
            origin_rows = pg_select_rows('select * from origin where name like %s', origin)
            if len(origin_rows) == 0:
                pg_execute('insert into origin(name) values (%s)', origin)
                message += 'Inserted {0} to origins table'.format(origin[0]) + '<br/>'

        for brand in brands:
            brand_rows = pg_select_rows('select * from brand where name like %s', (brand[0],))
            origin_rows = pg_select_rows('select * from origin where name like %s', (brand[3],))
            if len(brand_rows) == 0:
                pg_execute('insert into brand(name, logo_url, website_url, id_origin) values (%s, %s, %s, %s)', brand[:3] + (origin_rows[0]["id_origin"],))
                message += 'Inserted {0} to brands table'.format(brand[0]) + '<br/>'

        for carseat_group in carseat_groups:
            carseat_group_rows = pg_select_rows('select * from carseat_group where name like %s', carseat_group)
            if len(carseat_group_rows) == 0:
                pg_execute('insert into carseat_group(name) values (%s)', carseat_group)
                message += 'Inserted {0} to carseat_groups table'.format(carseat_group[0]) + '<br/>'

        for carseat_type in carseat_types:
            carseat_type_rows = pg_select_rows('select * from carseat_type where name like %s', carseat_type)
            if len(carseat_type_rows) == 0:
                pg_execute('insert into carseat_type(name) values (%s)', carseat_type)
                message += 'Inserted {0} to carseat_types table'.format(carseat_type[0]) + '<br/>'

        for child_height_group in child_height_groups:
            child_height_group_rows = pg_select_rows('select * from child_height_group where name like %s', child_height_group)
            if len(child_height_group_rows) == 0:
                pg_execute('insert into child_height_group(name) values (%s)', child_height_group)
                message += 'Inserted {0} to child_height_groups table'.format(child_height_group[0]) + '<br/>'

        for child_weight_group in child_weight_groups:
            child_weight_group_rows = pg_select_rows('select * from child_weight_group where name like %s', child_weight_group)
            if len(child_weight_group_rows) == 0:
                pg_execute('insert into child_weight_group(name) values (%s)', child_weight_group)
                message += 'Inserted {0} to child_weight_groups table'.format(child_weight_group[0]) + '<br/>'

        for i, ranking in enumerate(rankings):
            added_ranking_values = []
            for ranking_value in ranking[1]:
                if ranking_value and ranking_value not in added_ranking_values:                    
                    ranking_value_rows = pg_select_rows('select * from ranking_value where name like %s and id_ranking_provider = %s', (ranking_value, i + 1))
                    if len(ranking_value_rows) == 0:
                        pg_execute('insert into ranking_value(id_ranking_provider, name) values (%s, %s)', (i + 1, ranking_value))
                        message += 'Inserted {0}:{1} to ranking_values table'.format(ranking_value, ranking[0]) + '<br/>'
                    added_ranking_values.append(ranking_value)

        pg_execute("delete from carseat_manual", None)
        pg_execute("delete from carseat_video", None)
        pg_execute("delete from carseat_listing", None)
        pg_execute("delete from ranking", None)
        pg_execute("delete from carseat", None)

        for i, carseat in enumerate(carseats):
            brand_rows = pg_select_rows('select * from brand where name like %s', (carseat[0], ))
            carseat[0] = brand_rows[0]["id_brand"]
            carseat_type_rows = pg_select_rows('select * from carseat_type where name like %s', (carseat[1], ))
            carseat[1] = carseat_type_rows[0]["id_carseat_type"]
            carseat_group_rows = pg_select_rows('select * from carseat_group where name like %s', (carseat[2], ))
            carseat[2] = carseat_group_rows[0]["id_carseat_group"]
            child_weight_rows = pg_select_rows('select * from child_weight_group where name like %s', (carseat[3], ))
            carseat[3] = child_weight_rows[0]["id_child_weight_group"]
            child_height_rows = pg_select_rows('select * from child_height_group where name like %s', (carseat[4], ))
            carseat[4] = child_height_rows[0]["id_child_height_group"]
            
            message += 'Inserted {0}/{1} to carseats table'.format(i, len(carseats)) + '<br/>'
            id_carseat = pg_execute('insert into carseat(id_brand, id_carseat_type, id_carseat_group, id_child_weight_group, id_child_height_group, model, is_i_size_compliant, has_swivel, is_forward_facing, is_rear_facing, is_sideways, has_isofix, image_url, has_erf, has_advanced_sip, has_travel_system, weight, width, height, depth, angle, car_fitting_list_url, price, is_uk_available, has_uv_canopy, is_swedish_plus_tested, is_aircraft_approved) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) returning id_carseat', carseat)
            
            carseat_row = pg_select_rows("select * from carseat where id_carseat = %s", (id_carseat,))
            
            if str_to_boolean(carseat_manuals[i]):
                pg_execute('insert into carseat_manual(id_carseat, position, manual_url) values (%s, %s, %s)', (carseat_row[0]["id_carseat"], 1, carseat_manuals[i]))

            if str_to_boolean(carseat_videos[i]):
                pg_execute('insert into carseat_video(id_carseat, position, video_url) values (%s, %s, %s)', (carseat_row[0]["id_carseat"], 1, carseat_videos[i]))

            for listing_index, listing in enumerate(carseat_listings):
                if listing[1][i]:
                    pg_execute('insert into carseat_listing(id_carseat, id_shop, listing_url) values (%s, %s, %s)', (carseat_row[0]["id_carseat"], listing_index, listing[1][i]))

            for ranking_index, ranking in enumerate(rankings):
                ranking_value = ranking[1][i]
                if ranking_value:
                    ranking_value_rows = pg_select_rows('select * from ranking_value where name like %s and id_ranking_provider = %s', (ranking_value, ranking_index + 1))
                    
                    if len(ranking_value_rows) > 0:
                        pg_execute('insert into ranking(id_ranking_provider, id_carseat, id_ranking_value) values (%s, %s, %s)', (ranking_index + 1, carseat_row[0]["id_carseat"], ranking_value_rows[0]["id_ranking_value"]))

        message = '<h1>Data imported succesfully</h1><br/><br/>' + message

    return True, message
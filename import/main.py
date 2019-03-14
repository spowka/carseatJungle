import sys
import csv
import re
from db import *

# init_pg("dbname='carseatjungle' user='carseatjungle' host='carseatjungle.cvps0v8aayng.us-east-2.rds.amazonaws.com' password='csj957dvkn3'")
init_pg("dbname='carseatjungle' user='carseatjungle' host='localhost' password='test123'")

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
	with open (sys.argv[1] , 'r') as f:
		reader = csv.reader(f)
		columns = next(reader) 
		carseat_groups, carseat_types, child_height_groups, child_weight_groups, origins, brands, ranking_values, carseats, carseat_manuals, carseat_videos, carseat_listings, rankings = set(), set(), set(), set(), set(), set(), set(), list(), list(), list(), [
			["Mothercare", []],
			["Mamas&Papas", []],
			["John Lewis", []],
			["In Car Safety Centre", []],
			["UberKids", []],
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
			brands.add((data[0], data[43], data[44], data[45]))
			origins.add((data[43],))
			carseat_types.add((data[4],))
			carseat_groups.add((data[5],))
			child_weight_groups.add((data[6],))
			child_height_groups.add((data[7],))
			carseats.append([
				sanitize_str(data[0]), 						# id_brand 0 Brand
				sanitize_str(data[4]), 						# id_carseat_type 4 Type
				sanitize_str(data[5]), 						# id_carseat_group 5 Group
				sanitize_str(data[6]), 						# id_child_weight_group 6 Child weight
				sanitize_str(data[7]), 						# id_child_height_group 7 Child Height
				sanitize_str(data[1]), 						# model 1 Model
				str_to_boolean(sanitize_str(data[8])), 		# is_i_size_compliant 8 i-Size compliant
				str_to_boolean(sanitize_str(data[9])),		# has_swivel 9 Swivel
				str_to_boolean(sanitize_str(data[11])),		# is_forward_facing 11 Forward facing
				str_to_boolean(sanitize_str(data[12])),		# is_rear_facing 12 Rear-facing
				str_to_boolean(sanitize_str(data[13])),		# is_sideways 13 Sideways
				str_to_boolean(sanitize_str(data[14])),		# has_isofix 14 ISOFIX
				sanitize_str(data[15]),						# image_url 15 Image URL
				str_to_boolean(sanitize_str(data[16])),		# has_erf 16 ERF
				str_to_boolean(sanitize_str(data[17])),		# has_advanced_sip 17 Advanced SIP
				str_to_boolean(sanitize_str(data[18])),		# has_travel_system 18 Travel system
				str_to_int(sanitize_str(data[19])),			# weight 19 Seat Weight [kg]
				str_to_int(sanitize_str(data[20])),			# width 20 Width [mm]
				str_to_int(sanitize_str(data[21])),			# height 21 Height [mm]
				str_to_int(sanitize_str(data[22])),			# depth 22 Depth [mm]
				str_to_int(sanitize_str(data[23])),			# angle 23 Angle
				sanitize_str(data[34]),						# car_fitting_list_url 34 Car Fitting List
				str_to_float(sanitize_str(data[39])),		# price 39 RRP
				str_to_boolean(sanitize_str(data[40])),		# is_uk_available 40 UK Availability
				str_to_boolean(sanitize_str(data[49])),		# has_uv_canopy 49 UV Canopy
				str_to_boolean(sanitize_str(data[50])),		# is_swedish_plus_tested 50 Swedish Plus Test
				str_to_boolean(sanitize_str(data[51])),		# is_aircraft_approved 51 Aircraft Approved

				str_to_boolean(sanitize_str(data[2])), 		# is_isofix_base_required 2 ISOFIX Base Required
				sanitize_str(data[3]), 						# isofix_base 3 ISOFIX Base
				sanitize_str(data[10]), 					# direction_of_travel 10 Direction of travel
				sanitize_str(data[14]),						# isofix 14 ISOFIX
				sanitize_str(data[41]),						# price_range 41 Price Range
				sanitize_str(data[46]),						# awards 46 Awards
				sanitize_str(data[47]),						# fabrics 47 Fabrics
				
			])

			manuals_list = []
			if data[28] != "":
				manuals_list.append(data[28])
			if data[29] != "":				
				manuals_list.append(data[29])
			if data[30] != "":
				manuals_list.append(data[30])
			if data[31] != "":	
				manuals_list.append(data[31])
			carseat_manuals.append(manuals_list)

			videos_list = []
			if data[32] != "":				
				videos_list.append(data[32])
			if data[33] != "":				
				videos_list.append(data[33])
			carseat_videos.append(videos_list)

			for i, ranking in enumerate(rankings):
				rankings[i][1].append(data[35 + i])

			for i, listing in enumerate(carseat_listings):
				carseat_listings[i][1].append(data[24 + i])
			
		for origin in origins:
			origin_rows = pg_select_rows('select * from origin where name like %s', origin)
			if len(origin_rows) == 0:
				pg_execute('insert into origin(name) values (%s)', origin)
				print('Inserted {0} to origins table'.format(origin[0]))

		for brand in brands:
			brand_rows = pg_select_rows('select * from brand where name like %s', (brand[0],))
			origin_rows = pg_select_rows('select * from origin where name like %s', (brand[3],))
			if len(brand_rows) == 0:
				pg_execute('insert into brand(name, logo_url, website_url, id_origin) values (%s, %s, %s, %s)', brand[:3] + (origin_rows[0]["id_origin"],))
				print('Inserted {0} to brands table'.format(brand[0]))

		for carseat_group in carseat_groups:
			carseat_group_rows = pg_select_rows('select * from carseat_group where name like %s', carseat_group)
			if len(carseat_group_rows) == 0:
				pg_execute('insert into carseat_group(name) values (%s)', carseat_group)
				print('Inserted {0} to carseat_groups table'.format(carseat_group[0]))

		for carseat_type in carseat_types:
			carseat_type_rows = pg_select_rows('select * from carseat_type where name like %s', carseat_type)
			if len(carseat_type_rows) == 0:
				pg_execute('insert into carseat_type(name) values (%s)', carseat_type)
				print('Inserted {0} to carseat_types table'.format(carseat_type[0]))

		for child_height_group in child_height_groups:
			child_height_group_rows = pg_select_rows('select * from child_height_group where name like %s', child_height_group)
			if len(child_height_group_rows) == 0:
				pg_execute('insert into child_height_group(name) values (%s)', child_height_group)
				print('Inserted {0} to child_height_groups table'.format(child_height_group[0]))

		for child_weight_group in child_weight_groups:
			child_weight_group_rows = pg_select_rows('select * from child_weight_group where name like %s', child_weight_group)
			if len(child_weight_group_rows) == 0:
				pg_execute('insert into child_weight_group(name) values (%s)', child_weight_group)
				print('Inserted {0} to child_weight_groups table'.format(child_weight_group[0]))

		for i, ranking in enumerate(rankings):
			added_ranking_values = []
			for ranking_value in ranking[1]:
				if ranking_value and ranking_value not in added_ranking_values:
					print('Checking if {0}:{1} exists in ranking_values table'.format(ranking_value, ranking[0]))
					ranking_value_rows = pg_select_rows('select * from ranking_value where name like %s and id_ranking_provider = %s', (ranking_value, i + 1))
					if len(ranking_value_rows) == 0:
						pg_execute('insert into ranking_value(id_ranking_provider, name) values (%s, %s)', (i + 1, ranking_value))
						print('Inserted {0}:{1} to ranking_values table'.format(ranking_value, ranking[0]))
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
			
			print(carseat)
			id_carseat = pg_execute('insert into carseat(id_brand, id_carseat_type, id_carseat_group, id_child_weight_group, id_child_height_group, model, is_i_size_compliant, has_swivel, is_forward_facing, is_rear_facing, is_sideways, has_isofix, image_url, has_erf, has_advanced_sip, has_travel_system, weight, width, height, depth, angle, car_fitting_list_url, price, is_uk_available, has_uv_canopy, is_swedish_plus_tested, is_aircraft_approved, is_isofix_base_required, isofix_base, direction_of_travel, isofix, price_range, awards, fabrics) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) returning id_carseat', carseat)[0][0]
			print('Inserted {0}/{1} to carseats table'.format(i, len(carseats)))
			
			carseat_row = pg_select_rows("select * from carseat where id_carseat = %s", (id_carseat,))
			
			if len(carseat_manuals[i]) > 0:
				for manual in carseat_manuals[i]:
					pg_execute('insert into carseat_manual(id_carseat, position, manual_url) values (%s, %s, %s)', (carseat_row[0]["id_carseat"], 1, manual))

			if len(carseat_videos[i]) > 0:
				for video in carseat_videos[i]:
					pg_execute('insert into carseat_video(id_carseat, position, video_url) values (%s, %s, %s)', (carseat_row[0]["id_carseat"], 1, video))

			for listing_index, listing in enumerate(carseat_listings):
				if listing[1][i]:
					pg_execute('insert into carseat_listing(id_carseat, id_shop, listing_url) values (%s, %s, %s)', (carseat_row[0]["id_carseat"], listing_index, listing[1][i]))

			for ranking_index, ranking in enumerate(rankings):
				ranking_value = ranking[1][i]
				if ranking_value:
					ranking_value_rows = pg_select_rows('select * from ranking_value where name like %s and id_ranking_provider = %s', (ranking_value, ranking_index + 1))
					print((ranking_value, ranking_index + 1), ranking_value_rows)
					if len(ranking_value_rows) > 0:
						pg_execute('insert into ranking(id_ranking_provider, id_carseat, id_ranking_value) values (%s, %s, %s)', (ranking_index + 1, carseat_row[0]["id_carseat"], ranking_value_rows[0]["id_ranking_value"]))

import_csv_data(sys.argv[1])
from db import *

class Carseat(object):
    
    @staticmethod
    def get_carseats(id_carseat = None):
        carseats = []
        rows = pg_select_rows("\
        select\
            cs.*,\
            b.name as brand_name,\
            b.logo_url as brand_logo_url,\
            csg.name as carseat_group_name,\
            cst.name as carseat_type_name,\
            chg.name as child_height_group_name,\
            cwg.name as child_weight_group_name\
        from\
            carseat cs\
        inner join\
            brand b on b.id_brand = cs.id_brand\
        inner join\
            carseat_group csg on csg.id_carseat_group = cs.id_carseat_group\
        inner join\
            carseat_type cst on cst.id_carseat_type = cs.id_carseat_type\
        inner join\
            child_height_group chg on chg.id_child_height_group = cs.id_child_height_group\
        inner join\
            child_weight_group cwg on cwg.id_child_weight_group = cs.id_child_weight_group\
        where\
            (%(id_carseat)s is null or cs.id_carseat = %(id_carseat)s)\
            and b.name <> ''\
            and cs.model <> ''\
        order by\
            b.name,\
            cs.model", 
        {
            "id_carseat": id_carseat
        })

        for row in rows:
            cs = Carseat()
            cs.id_carseat = row["id_carseat"]
            cs.id_brand = row["id_brand"]
            cs.id_carseat_type = row["id_carseat_type"]
            cs.id_carseat_group = row["id_carseat_group"]
            cs.id_child_weight_group = row["id_child_weight_group"]
            cs.id_child_height_group = row["id_child_height_group"]
            cs.model = row["model"]
            cs.is_i_size_compliant = row["is_i_size_compliant"]
            cs.has_swivel = row["has_swivel"]
            cs.is_forward_facing = row["is_forward_facing"]
            cs.is_rear_facing = row["is_rear_facing"]
            cs.is_sideways = row["is_sideways"]
            cs.has_isofix = row["has_isofix"]
            cs.image_url = row["image_url"]
            cs.has_erf = row["has_erf"]
            cs.has_advanced_sip = row["has_advanced_sip"]
            cs.has_travel_system = row["has_travel_system"]
            cs.weight = row["weight"]
            cs.width = row["width"]
            cs.height = row["height"]
            cs.depth = row["depth"]
            cs.angle = row["angle"]
            cs.car_fitting_list_url = row["car_fitting_list_url"]
            
            if row["price"]:
                cs.price = float(row["price"])
            else:
                cs.price = None
            
            cs.is_uk_available = row["is_uk_available"]
            cs.has_uv_canopy = row["has_uv_canopy"]
            cs.is_swedish_plus_tested = row["is_swedish_plus_tested"]
            cs.is_aircraft_approved = row["is_aircraft_approved"]
            cs.date_changed = row["date_changed"]
            cs.brand_name = row["brand_name"]
            cs.brand_logo_url = row["brand_logo_url"]
            cs.carseat_group_name = row["carseat_group_name"]
            cs.carseat_type_name = row["carseat_type_name"]
            cs.child_height_group_name = row["child_height_group_name"]
            cs.child_weight_group_name = row["child_weight_group_name"]
            carseats.append(cs)

        return carseats


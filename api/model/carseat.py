from db import *
from model.carseat_listing import *

class Carseat(object):

    def __init__(self, id_carseat=None, db_row=None):
        if db_row != None:
            self.fill_from_data_row(db_row)
        elif id_carseat != None:
            rows, _ = self.db_select(id_carseat=id_carseat)
            if len(rows) == 0:
                raise KeyError("row not found")
            self.fill_from_data_row(rows[0])

    def fill_from_data_row(self, row):
        self.id_carseat = row["id_carseat"]
        self.id_brand = row["id_brand"]
        self.id_carseat_type = row["id_carseat_type"]
        self.id_carseat_group = row["id_carseat_group"]
        self.id_child_weight_group = row["id_child_weight_group"]
        self.id_child_height_group = row["id_child_height_group"]
        self.model = row["model"]
        self.is_i_size_compliant = row["is_i_size_compliant"]
        self.has_swivel = row["has_swivel"]
        self.is_forward_facing = row["is_forward_facing"]
        self.is_rear_facing = row["is_rear_facing"]
        self.is_sideways = row["is_sideways"]
        self.has_isofix = row["has_isofix"]
        self.image_url = row["image_url"]
        self.has_erf = row["has_erf"]
        self.has_advanced_sip = row["has_advanced_sip"]
        self.has_travel_system = row["has_travel_system"]
        self.weight = float(row["weight"]) if row["weight"] else None
        self.width = row["width"]
        self.height = row["height"]
        self.depth = row["depth"]
        self.angle = row["angle"]
        self.car_fitting_list_url = row["car_fitting_list_url"]
        self.price = float(row["price"]) if row["price"] else None
        self.is_uk_available = row["is_uk_available"]
        self.has_uv_canopy = row["has_uv_canopy"]
        self.is_swedish_plus_tested = row["is_swedish_plus_tested"]
        self.is_aircraft_approved = row["is_aircraft_approved"]
        self.date_changed = row["date_changed"]
        self.is_isofix_base_required = row["is_isofix_base_required"]
        self.isofix_base = row["isofix_base"]
        self.direction_of_travel = row["direction_of_travel"]
        self.isofix = row["isofix"]
        self.price_range = row["price_range"]
        self.awards = row["awards"]
        self.fabrics = row["fabrics"]

        self.brand_name = row["brand_name"]
        self.brand_logo_url = row["brand_logo_url"]
        self.carseat_group_name = row["carseat_group_name"]
        self.carseat_type_name = row["carseat_type_name"]
        self.child_height_group_name = row["child_height_group_name"]
        self.child_weight_group_name = row["child_weight_group_name"]

    def insert(self):
        self.id_carseat = pg_execute("\
        insert into carseat(\
            id_brand,\
            id_carseat_type,\
            id_carseat_group,\
            id_child_weight_group,\
            id_child_height_group,\
            model,\
            is_i_size_compliant,\
            has_swivel,\
            is_forward_facing,\
            is_rear_facing,\
            is_sideways,\
            has_isofix,\
            image_url,\
            has_erf,\
            has_advanced_sip,\
            has_travel_system,\
            weight,\
            width,\
            height,\
            depth,\
            angle,\
            car_fitting_list_url,\
            price,\
            is_uk_available,\
            has_uv_canopy,\
            is_swedish_plus_tested,\
            is_aircraft_approved,\
            date_changed,\
            is_isofix_base_required,\
            isofix_base,\
            direction_of_travel,\
            isofix,\
            price_range,\
            awards,\
            fabrics)\
        values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) returning id_carseat",
                                     (
                                         self.id_brand,
                                         self.id_carseat_type,
                                         self.id_carseat_group,
                                         self.id_child_weight_group,
                                         self.id_child_height_group,
                                         self.model,
                                         self.is_i_size_compliant,
                                         self.has_swivel,
                                         self.is_forward_facing,
                                         self.is_rear_facing,
                                         self.is_sideways,
                                         self.has_isofix,
                                         self.image_url,
                                         self.has_erf,
                                         self.has_advanced_sip,
                                         self.has_travel_system,
                                         self.weight,
                                         self.width,
                                         self.height,
                                         self.depth,
                                         self.angle,
                                         self.car_fitting_list_url,
                                         self.price,
                                         self.is_uk_available,
                                         self.has_uv_canopy,
                                         self.is_swedish_plus_tested,
                                         self.is_aircraft_approved,
                                         self.date_changed,
                                         self.is_isofix_base_required,
                                         self.isofix_base,
                                         self.direction_of_travel,
                                         self.isofix,
                                         self.price_range,
                                         self.awards,
                                         self.fabrics
                                     ))

    def update(self):
        pg_execute("\
        update\
            carseat\
        set\
            id_brand = %s,\
            id_carseat_type = %s,\
            id_carseat_group = %s,\
            id_child_weight_group = %s,\
            id_child_height_group = %s,\
            model = %s,\
            is_i_size_compliant = %s,\
            has_swivel = %s,\
            is_forward_facing = %s,\
            is_rear_facing = %s,\
            is_sideways = %s,\
            has_isofix = %s,\
            image_url = %s,\
            has_erf = %s,\
            has_advanced_sip = %s,\
            has_travel_system = %s,\
            weight = %s,\
            width = %s,\
            height = %s,\
            depth = %s,\
            angle = %s,\
            car_fitting_list_url = %s,\
            price = %s,\
            is_uk_available = %s,\
            has_uv_canopy = %s,\
            is_swedish_plus_tested = %s,\
            is_aircraft_approved = %s,\
            date_changed = %s,\
            is_isofix_base_required = %s,\
            isofix_base = %s,\
            direction_of_travel = %s,\
            isofix = %s,\
            price_range = %s,\
            awards = %s,\
            fabrics = %s\
        where\
            id_carseat = %s",
                   (
                       self.id_brand,
                       self.id_carseat_type,
                       self.id_carseat_group,
                       self.id_child_weight_group,
                       self.id_child_height_group,
                       self.model,
                       self.is_i_size_compliant,
                       self.has_swivel,
                       self.is_forward_facing,
                       self.is_rear_facing,
                       self.is_sideways,
                       self.has_isofix,
                       self.image_url,
                       self.has_erf,
                       self.has_advanced_sip,
                       self.has_travel_system,
                       self.weight,
                       self.width,
                       self.height,
                       self.depth,
                       self.angle,
                       self.car_fitting_list_url,
                       self.price,
                       self.is_uk_available,
                       self.has_uv_canopy,
                       self.is_swedish_plus_tested,
                       self.is_aircraft_approved,
                       self.date_changed,
                       self.is_isofix_base_required,
                       self.isofix_base,
                       self.direction_of_travel,
                       self.isofix,
                       self.price_range,
                       self.awards,
                       self.fabrics,
                       self.id_carseat
                   ))

    def delete(self):
        pg_execute("\
        delete from\
            carseat\
        where\
            id_carseat = %s",
                   (
                       self.id_carseat,
                   ))

    def reload(self):
        rows, _ = self.db_select(id_carseat=self.id_carseat)
        self.fill_from_data_row(rows[0])

    @staticmethod
    def db_select(id_carseat=None,
                  sort_by=None,
                  results_page=None,
                  results_page_size=None,
                  filter_by=None,
                  carseat_types=None,
                  is_rear_facing=None,
                  is_i_size_compliant=None,
                  has_isofix=None,
                  has_swivel=None,
                  is_uk_available=None):
        order_string = " order by b.position, cs.model"
        if sort_by:
            sort_by_sanitized = sanitize(sort_by)
            order_string = " order by {0}".format(sort_by_sanitized)

        limit_string = ""
        if results_page and results_page_size:
            start_record = (results_page - 1) * results_page_size
            limit_string = " offset {0} limit {1}".format(
                int(start_record), int(results_page_size))

        filter_string = ""
        if filter_by and len(filter_by) > 0:
            for f in filter_by:
                field = sanitize(f["id"])

                if field == "brand_name":
                    field = "b.name"
                else:
                    field = "cs." + field

                filter_string += " and {0} ilike '{1}%%'".format(
                    field, sanitize(f["value"]))

        if carseat_types != None:
            filter_string += " and cs.id_carseat_type in ({0})".format(
                sanitize(carseat_types))

        if is_rear_facing != None:
            filter_string += " and cs.is_rear_facing = {0}".format(
                sanitize(is_rear_facing))

        if is_i_size_compliant != None:
            filter_string += " and cs.is_i_size_compliant = {0}".format(
                sanitize(is_i_size_compliant))

        if has_isofix != None:
            filter_string += " and (cs.has_isofix = {0} or lower(isofix) = 'both')".format(
                sanitize(has_isofix))

        if has_swivel != None:
            filter_string += " and cs.has_swivel = {0}".format(
                sanitize(has_swivel))

        if is_uk_available != None:
            filter_string += " and cs.is_uk_available = {0}".format(
                sanitize(is_uk_available))

        return pg_select_rows_with_count("\
            select\
                count(*) over() as row_count,\
                cs.id_carseat,\
                cs.id_brand,\
                cs.id_carseat_type,\
                cs.id_carseat_group,\
                cs.id_child_weight_group,\
                cs.id_child_height_group,\
                cs.model,\
                cs.is_i_size_compliant,\
                cs.has_swivel,\
                cs.is_forward_facing,\
                cs.is_rear_facing,\
                cs.is_sideways,\
                cs.has_isofix,\
                cs.image_url,\
                cs.has_erf,\
                cs.has_advanced_sip,\
                cs.has_travel_system,\
                cs.weight,\
                cs.width,\
                cs.height,\
                cs.depth,\
                cs.angle,\
                cs.car_fitting_list_url,\
                cs.price,\
                cs.is_uk_available,\
                cs.has_uv_canopy,\
                cs.is_swedish_plus_tested,\
                cs.is_aircraft_approved,\
                cs.date_changed,\
                cs.is_isofix_base_required,\
                cs.isofix_base,\
                cs.direction_of_travel,\
                cs.isofix,\
                cs.price_range,\
                cs.awards,\
                cs.fabrics,\
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
                b.name <> ''\
                and cs.model <> ''\
                and (%(id_carseat)s is null or id_carseat = %(id_carseat)s)\
           {0} {1} {2}".format(filter_string, order_string, limit_string),
            {
                "id_carseat": id_carseat
        })

    @staticmethod
    def get_all():
        items = []
        rows, _ = Carseat.db_select()
        for row in rows:
            item = Carseat()
            item.fill_from_data_row(row)
            items.append(item)

        return items

    @staticmethod
    def get_paged(id_carseat=None,
                  sort_by=None,
                  results_page=None,
                  results_page_size=None,
                  filter_by=None,
                  carseat_types=None,
                  is_rear_facing=None,
                  is_i_size_compliant=None,
                  has_isofix=None,
                  has_swivel=None,
                  is_uk_available=None):

        items = []

        rows, row_count = Carseat.db_select(
            id_carseat=id_carseat,
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

        for row in rows:
            item = Carseat()
            item.fill_from_data_row(row)
            items.append(item)

        return items, row_count

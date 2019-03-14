from db import *

class CarseatListing(object):

    def __init__(self, id_carseat_listing=None, db_row=None):
        if db_row != None:
            self.fill_from_data_row(db_row)
        elif id_carseat_listing != None:
            rows, _ = self.db_select(id_carseat_listing=id_carseat_listing)
            if len(rows) == 0:
                raise KeyError("row not found")
            self.fill_from_data_row(rows[0])

    def fill_from_data_row(self, row):
        self.id_carseat_listing = row["id_carseat_listing"]
        self.id_carseat = row["id_carseat"]
        self.id_shop = row["id_shop"]
        self.listing_url = row["listing_url"]
        self.date_changed = row["date_changed"]
        self.shop_name = row["shop_name"]
        self.position = row["position"]

    def insert(self):
        self.id_carseat_listing = pg_execute("\
        insert into carseat_listing(\
            id_carseat,\
            id_shop,\
            listing_url,\
            date_changed)\
        values(%s,%s,%s,%s) returning id_carseat_listing",
        (
            self.id_carseat,
            self.id_shop,
            self.listing_url,
            self.date_changed
        ))

    def update(self):
        pg_execute("\
        update\
            carseat_listing\
        set\
            id_carseat = %s,\
            id_shop = %s,\
            listing_url = %s,\
            date_changed = %s\
        where\
            id_carseat_listing = %s",
        (
            self.id_carseat,
            self.id_shop,
            self.listing_url,
            self.date_changed,
            self.id_carseat_listing
        ))

    def delete(self):
        pg_execute("\
        delete from\
            carseat_listing\
        where\
            id_carseat_listing = %s",
        (
            self.id_carseat_listing,
        ))

    def reload(self):
        rows, _ = self.db_select(id_carseat_listing=self.id_carseat_listing)
        self.fill_from_data_row(rows[0])            

    @staticmethod
    def db_select(id_carseat_listing=None,
                  sort_by=None,
                  results_page=None,
                  results_page_size=None,
                  filter_by=None,
                  id_carseat=None):
        order_string = " order by s.position"
        if sort_by:
            sort_by_sanitized=sanitize(sort_by)
            order_string=" order by {0}".format(sort_by_sanitized)

        limit_string=""
        if results_page and results_page_size:
            start_record=(results_page - 1) * results_page_size
            limit_string=" offset {0} limit {1}".format(
                int(start_record), int(results_page_size))

        filter_string = ""
        if filter_by and len(filter_by) > 0:
            for f in filter_by:
                filter_string += " and {0} ilike '{1}%%'".format(sanitize(f["id"]), sanitize(f["value"]))

        return pg_select_rows_with_count("\
            select\
                count(*) over() as row_count,\
                cl.id_carseat_listing,\
                cl.id_carseat,\
                cl.id_shop,\
                cl.listing_url,\
                cl.date_changed,\
                s.name as shop_name,\
                s.position\
            from\
                carseat_listing cl\
            inner join\
                shop s on s.id_shop = cl.id_shop\
            where\
                (%(id_carseat_listing)s is null or cl.id_carseat_listing = %(id_carseat_listing)s)\
                and (%(id_carseat)s is null or cl.id_carseat = %(id_carseat)s)\
           {0} {1} {2}".format(filter_string, order_string, limit_string),
            {
                "id_carseat_listing": id_carseat_listing,
                "id_carseat": id_carseat,
            })

    @staticmethod
    def get_all(id_carseat=None):
        items = []
        rows, _ = CarseatListing.db_select(id_carseat=id_carseat)
        for row in rows:
            item = CarseatListing()
            item.fill_from_data_row(row)
            items.append(item)
        
        return items

    @staticmethod
    def get_paged(id_carseat_listing=None,
                  sort_by=None,
                  results_page=None,
                  results_page_size=None,
                  filter_by=None):
                  
        items = []

        rows, row_count = CarseatListing.db_select(
            id_carseat_listing=id_carseat_listing,
            sort_by=sort_by,
            results_page=results_page,
            results_page_size=results_page_size,
            filter_by=filter_by)

        for row in rows:
            item = CarseatListing()
            item.fill_from_data_row(row)
            items.append(item)

        return items, row_count

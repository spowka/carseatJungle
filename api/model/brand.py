from db import *

class Brand(object):

    def __init__(self, id_brand=None, db_row=None):
        if db_row != None:
            self.fill_from_data_row(db_row)
        elif id_brand != None:
            rows, _ = self.db_select(id_brand=id_brand)
            if len(rows) == 0:
                raise KeyError("row not found")
            self.fill_from_data_row(rows[0])

    def fill_from_data_row(self, row):
        self.id_brand = row["id_brand"]
        self.id_origin = row["id_origin"]
        self.name = row["name"]
        self.logo_url = row["logo_url"]
        self.website_url = row["website_url"]
        self.position = row["position"]
        self.date_changed = row["date_changed"]
        self.origin_name = row["origin_name"]

    def insert(self):
        self.id_brand = pg_execute("\
        insert into brand(\
            id_origin,\
            name,\
            logo_url,\
            website_url,\
            position,\
            date_changed)\
        values(%s,%s,%s,%s,%s,%s) returning id_brand",
        (
            self.id_origin,
            self.name,
            self.logo_url,
            self.website_url,
            self.position,
            self.date_changed
        ))

    def update(self):
        pg_execute("\
        update\
            brand\
        set\
            id_origin = %s,\
            name = %s,\
            logo_url = %s,\
            website_url = %s,\
            position = %s,\
            date_changed = %s\
        where\
            id_brand = %s",
        (
            self.id_origin,
            self.name,
            self.logo_url,
            self.website_url,
            self.position,
            self.date_changed,
            self.id_brand
        ))

    def delete(self):
        pg_execute("\
        delete from\
            brand\
        where\
            id_brand = %s",
        (
            self.id_brand,
        ))

    def reload(self):
        rows, _ = self.db_select(id_brand=self.id_brand)
        self.fill_from_data_row(rows[0])        

    @staticmethod
    def db_select(id_brand=None,
                  sort_by=None,
                  results_page=None,
                  results_page_size=None,
                  filter_by=None):
        order_string = ""
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
                field = sanitize(f["id"])
                
                if field == "origin_name":
                    field = "o.name"
                else:
                    field = "b." + field

                filter_string += " and {0} ilike '{1}%%'".format(field, sanitize(f["value"]))

        return pg_select_rows_with_count("\
            select\
            count(*) over() as row_count,\
                b.id_brand,\
                b.id_origin,\
                b.name,\
                b.logo_url,\
                b.website_url,\
                b.position,\
                b.date_changed,\
                o.name as origin_name\
            from\
                brand b\
            left join\
                origin o on o.id_origin = b.id_origin\
            where\
                (%(id_brand)s is null or b.id_brand = %(id_brand)s)\
           {0} {1} {2}".format(filter_string, order_string, limit_string),
            {
                "id_brand": id_brand
            })

    @staticmethod
    def get_all():
        items = []
        rows, _ = Brand.db_select()
        for row in rows:
            item = Brand()
            item.fill_from_data_row(row)
            items.append(item)
        
        return items

    @staticmethod
    def get_paged(id_brand=None,
                  sort_by=None,
                  results_page=None,
                  results_page_size=None,
                  filter_by=None):
                  
        items = []

        rows, row_count = Brand.db_select(
            id_brand=id_brand,
            sort_by=sort_by,
            results_page=results_page,
            results_page_size=results_page_size,
            filter_by=filter_by)

        for row in rows:
            item = Brand()
            item.fill_from_data_row(row)
            items.append(item)

        return items, row_count

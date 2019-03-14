from db import *

class Shop(object):

    def __init__(self, id_shop=None, db_row=None):
        if db_row != None:
            self.fill_from_data_row(db_row)
        elif id_shop != None:
            rows, _ = self.db_select(id_shop=id_shop)
            if len(rows) == 0:
                raise KeyError("row not found")
            self.fill_from_data_row(rows[0])

    def fill_from_data_row(self, row):
        self.id_shop = row["id_shop"]
        self.name = row["name"]
        self.position = row["position"]
        self.date_changed = row["date_changed"]

    def insert(self):
        self.id_shop = pg_execute("\
        insert into shop(\
            name,\
            position,\
            date_changed)\
        values(%s,%s,%s) returning id_shop",
        (
            self.name,
            self.position,
            self.date_changed
        ))

    def update(self):
        pg_execute("\
        update\
            shop\
        set\
            name = %s,\
            position = %s,\
            date_changed = %s\
        where\
            id_shop = %s",
        (
            self.name,
            self.position,
            self.date_changed,
            self.id_shop
        ))

    def delete(self):
        pg_execute("\
        delete from\
            shop\
        where\
            id_shop = %s",
        (
            self.id_shop,
        ))

    def reload(self):
        rows, _ = self.db_select(id_shop=self.id_shop)
        self.fill_from_data_row(rows[0])

    @staticmethod
    def db_select(id_shop=None,
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
                if(f['id'] == "position"):
                    if(str.isdigit(f["value"])):
                        filter_string += " and {0} = {1}".format(sanitize(f["id"]), sanitize(f["value"]))
                else:
                    filter_string += " and {0} ilike '{1}%%'".format(sanitize(f["id"]), sanitize(f["value"]))

        return pg_select_rows_with_count("\
            select\
            count(*) over() as row_count,\
                id_shop,\
                name,\
                position,\
                date_changed\
            from\
                shop\
            where\
                (%(id_shop)s is null or id_shop = %(id_shop)s)\
           {0} {1} {2}".format(filter_string, order_string, limit_string),
            {
                "id_shop": id_shop
            })

    @staticmethod
    def get_all():
        items = []
        rows, _ = Shop.db_select()
        for row in rows:
            item = Shop()
            item.fill_from_data_row(row)
            items.append(item)

        return items

    @staticmethod
    def get_paged(id_shop=None,
                  sort_by=None,
                  results_page=None,
                  results_page_size=None,
                  filter_by=None):

        items = []

        rows, row_count = Shop.db_select(
            id_shop=id_shop,
            sort_by=sort_by,
            results_page=results_page,
            results_page_size=results_page_size,
            filter_by=filter_by)

        for row in rows:
            item = Shop()
            item.fill_from_data_row(row)
            items.append(item)

        return items, row_count

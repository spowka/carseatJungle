from db import *

class CarseatGroup(object):

    def __init__(self, id_carseat_group=None, db_row=None):
        if db_row != None:
            self.fill_from_data_row(db_row)
        elif id_carseat_group != None:
            rows, _ = self.db_select(id_carseat_group=id_carseat_group)
            if len(rows) == 0:
                raise KeyError("row not found")
            self.fill_from_data_row(rows[0])

    def fill_from_data_row(self, row):
        self.id_carseat_group = row["id_carseat_group"]
        self.name = row["name"]
        self.date_changed = row["date_changed"]

    def insert(self):
        self.id_carseat_group = pg_execute("\
        insert into carseat_group(\
            name,\
            date_changed)\
        values(%s,%s) returning id_carseat_group",
        (
            self.name,
            self.date_changed
        ))

    def update(self):
        pg_execute("\
        update\
            carseat_group\
        set\
            name = %s,\
            date_changed = %s\
        where\
            id_carseat_group = %s",
        (
            self.name,
            self.date_changed,
            self.id_carseat_group
        ))

    def delete(self):
        pg_execute("\
        delete from\
            carseat_group\
        where\
            id_carseat_group = %s",
        (
            self.id_carseat_group,
        ))

    def reload(self):
        rows, _ = self.db_select(id_carseat_group=self.id_carseat_group)
        self.fill_from_data_row(rows[0])                

    @staticmethod
    def db_select(id_carseat_group=None,
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
                filter_string += " and {0} ilike '{1}%%'".format(sanitize(f["id"]), sanitize(f["value"]))

        return pg_select_rows_with_count("\
            select\
            count(*) over() as row_count,\
                id_carseat_group,\
                name,\
                date_changed\
            from\
                carseat_group\
            where\
                (%(id_carseat_group)s is null or id_carseat_group = %(id_carseat_group)s)\
           {0} {1} {2}".format(filter_string, order_string, limit_string),
            {
                "id_carseat_group": id_carseat_group
            })

    @staticmethod
    def get_all():
        items = []
        rows, _ = CarseatGroup.db_select()
        for row in rows:
            item = CarseatGroup()
            item.fill_from_data_row(row)
            items.append(item)
        
        return items

    @staticmethod
    def get_paged(id_carseat_group=None,
                  sort_by=None,
                  results_page=None,
                  results_page_size=None,
                  filter_by=None):
                  
        items = []

        rows, row_count = CarseatGroup.db_select(
            id_carseat_group=id_carseat_group,
            sort_by=sort_by,
            results_page=results_page,
            results_page_size=results_page_size,
            filter_by=filter_by)

        for row in rows:
            item = CarseatGroup()
            item.fill_from_data_row(row)
            items.append(item)

        return items, row_count

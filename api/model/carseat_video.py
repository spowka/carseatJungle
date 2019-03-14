from db import *

class CarseatVideo(object):

    def __init__(self, id_carseat_video=None, db_row=None):
        if db_row != None:
            self.fill_from_data_row(db_row)
        elif id_carseat_video != None:
            rows, _ = self.db_select(id_carseat_video=id_carseat_video)
            if len(rows) == 0:
                raise KeyError("row not found")
            self.fill_from_data_row(rows[0])

    def fill_from_data_row(self, row):
        self.id_carseat_video = row["id_carseat_video"]
        self.id_carseat = row["id_carseat"]
        self.position = row["position"]
        self.video_url = row["video_url"]
        self.date_changed = row["date_changed"]

    def insert(self):
        self.id_carseat_video = pg_execute("\
        insert into carseat_video(\
            id_carseat,\
            position,\
            video_url,\
            date_changed)\
        values(%s,%s,%s,%s) returning id_carseat_video",
        (
            self.id_carseat,
            self.position,
            self.video_url,
            self.date_changed
        ))

    def update(self):
        pg_execute("\
        update\
            carseat_video\
        set\
            id_carseat = %s,\
            position = %s,\
            video_url = %s,\
            date_changed = %s\
        where\
            id_carseat_video = %s",
        (
            self.id_carseat,
            self.position,
            self.video_url,
            self.date_changed,
            self.id_carseat_video
        ))

    def delete(self):
        pg_execute("\
        delete from\
            carseat_video\
        where\
            id_carseat_video = %s",
        (
            self.id_carseat_video,
        ))

    def reload(self):
        rows, _ = self.db_select(id_carseat_video=self.id_carseat_video)
        self.fill_from_data_row(rows[0])              

    @staticmethod
    def db_select(id_carseat_video=None,
                  sort_by=None,
                  results_page=None,
                  results_page_size=None,
                  filter_by=None,
                  id_carseat=None):
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
                id_carseat_video,\
                id_carseat,\
                position,\
                video_url,\
                date_changed\
            from\
                carseat_video\
            where\
                (%(id_carseat_video)s is null or id_carseat_video = %(id_carseat_video)s)\
                and (%(id_carseat)s is null or id_carseat = %(id_carseat)s)\
           {0} {1} {2}".format(filter_string, order_string, limit_string),
            {
                "id_carseat_video": id_carseat_video,
                "id_carseat": id_carseat,
            })

    @staticmethod
    def get_all(id_carseat=None):
        items = []
        rows, _ = CarseatVideo.db_select(id_carseat=id_carseat)
        for row in rows:
            item = CarseatVideo()
            item.fill_from_data_row(row)
            items.append(item)
        
        return items

    @staticmethod
    def get_paged(id_carseat_video=None,
                  sort_by=None,
                  results_page=None,
                  results_page_size=None,
                  filter_by=None):
                  
        items = []

        rows, row_count = CarseatVideo.db_select(
            id_carseat_video=id_carseat_video,
            sort_by=sort_by,
            results_page=results_page,
            results_page_size=results_page_size,
            filter_by=filter_by)

        for row in rows:
            item = CarseatVideo()
            item.fill_from_data_row(row)
            items.append(item)

        return items, row_count

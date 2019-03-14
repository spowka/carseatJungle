import sys
import psycopg2
from psycopg2.extras import RealDictCursor

pg_connection_string = "dbname='carseatjungle' user='carseatjungle' host='carseatjungle.cvps0v8aayng.us-east-2.rds.amazonaws.com' password='csj957dvkn3'"

table_name = sys.argv[1]
class_name = sys.argv[2]

conn = psycopg2.connect(pg_connection_string)
cur = conn.cursor(cursor_factory=RealDictCursor)

cur.execute("select column_name, replace(column_name, 'member', 'user') as class_column_name, data_type, case when column_name = 'id_{0}' then 'PRI' else '' end as key from INFORMATION_SCHEMA.COLUMNS where table_name = '{0}'".format(table_name))
rows = cur.fetchall()

cur.close()
conn.close()

print('from db import *')
print('')
print('class {0}(object):'.format(class_name))
print('')

# CONSTRUCTOR

print('    def __init__(self, id_{0}=None, db_row=None):'.format(table_name))
print('        if db_row != None:')
print('            self.fill_from_data_row(db_row)')
print('        elif id_{0} != None:'.format(table_name))
print('            rows, _ = self.db_select(id_{0}=id_{0})'.format(table_name))
print('            if len(rows) == 0:')
print('                raise KeyError("row not found")')
print('            self.fill_from_data_row(rows[0])')

# FILL_FROM_DATA_ROW

print('')
print('    def fill_from_data_row(self, row):')
for row in rows:
    if row["data_type"] == 'numeric':
        print('        self.{0} = float(row["{0}"]) if row["{0}"] else None'.format(row["column_name"]))
    else:
        print('        self.{0} = row["{1}"]'.format(row["class_column_name"], row["column_name"]))    

# INSERT

print('')
print('    def insert(self):')
print('        self.id_{0} = pg_execute("\\'.format(table_name))
print('        insert into {0}(\\'.format(table_name))

values = ''
for i, row in enumerate(rows):
    if row["key"] == 'PRI':
        continue

    comma = ')' if i == len(rows) - 1 else ','
    print('            {0}{1}\\'.format(row["column_name"], comma))

    comma = '' if i == len(rows) - 1 else ','
    values += '%s{0}'.format(comma)

print('        values({0}) returning id_{1}",'.format(values, table_name))
print('        (')
for i, row in enumerate(rows):
    if row["key"] == 'PRI':
        continue

    comma = '' if i == len(rows) - 1 else ','
    print('            self.{0}{1}'.format(row["class_column_name"], comma))
print('        ))')    

# UPDATE

print('')
print('    def update(self):')
print('        pg_execute("\\')
print('        update\\')
print('            {0}\\'.format(table_name))
print('        set\\')

for i, row in enumerate(rows):
    if row["key"] == 'PRI':
        continue

    comma = '' if i == len(rows) - 1 else ','
    print('            {0} = %s{1}\\'.format(row["column_name"], comma))

print('        where\\')
print('            id_{0} = %s",'.format(table_name))

print('        (')
for i, row in enumerate(rows):
    if row["key"] == 'PRI':
        continue

    print('            self.{0}{1}'.format(row["class_column_name"], ','))

print('            self.id_{0}'.format(table_name))
print('        ))')    

# DELETE

print('')
print('    def delete(self):')
print('        pg_execute("\\')
print('        delete from\\')
print('            {0}\\'.format(table_name))
print('        where\\')
print('            id_{0} = %s",'.format(table_name))

print('        (')
print('            self.id_{0},'.format(table_name))
print('        ))')    



# DB SELECT

print('')
print('    @staticmethod')
print('    def db_select(id_{0}=None,'.format(table_name))
print('                  sort_by=None,')
print('                  results_page=None,')
print('                  results_page_size=None,')
print('                  filter_by=None):')
print('        order_string = ""')
print('        if sort_by:')
print('            sort_by_sanitized=sort_by.replace("\'", "").replace(\'"\', \'\')')
print('            order_string=" order by {0}".format(sort_by_sanitized)')
print('')
print('        limit_string=""')
print('        if results_page and results_page_size:')
print('            start_record=(results_page - 1) * results_page_size')
print('            limit_string=" offset {0} limit {1}".format(')
print('                int(start_record), int(results_page_size))')
print('')
print('        filter_string = ""')
print('        if filter_by and len(filter_by) > 0:')
print('            for f in filter_by:') 
print('                filter_string += " and {0} ilike \'{1}%%\'".format(sanitize(f["id"]), sanitize(f["value"]))')
print('')
print('        return pg_select_rows_with_count("\\')
print('            select\\')
print('            count(*) over() as row_count,\\')

for i, row in enumerate(rows):
    comma = '' if i == len(rows) - 1 else ','
    print('                {0}{1}\\'.format(row["column_name"], comma))

print('            from\\')
print('                {0}\\'.format(table_name))
print('            where\\')
print('                (%(id_{0})s is null or id_{0} = %(id_{0})s)\\'.format(table_name))
print('           {0} {1} {2}".format(filter_string, order_string, limit_string),')
print('            {')
print('                "id_{0}": id_{0}'.format(table_name))
print('            })')    


# GET ALL

print('')
print('    @staticmethod')
print('    def get_all():')
print('        items = []')
print('        rows, _ = {0}.db_select()'.format(class_name))
print('        for row in rows:')
print('            item = {0}()'.format(class_name))
print('            item.fill_from_data_row(row)')
print('            items.append(item)')
print('        ')
print('        return items')


# GET PAGED

print('')

print('    @staticmethod')
print('    def get_paged(id_{0}=None,'.format(table_name))
print('                  sort_by=None,')
print('                  results_page=None,')
print('                  results_page_size=None,')
print('                  filter_by=None):')
print('                  ')
print('        items = []')
print('')
print('        rows, row_count = {0}.db_select('.format(class_name))
print('            id_{0}=id_{0},'.format(table_name))
print('            sort_by=sort_by,')
print('            results_page=results_page,')
print('            results_page_size=results_page_size,')
print('            filter_by=filter_by)')
print('')
print('        for row in rows:')
print('            item = {0}()'.format(class_name))
print('            item.fill_from_data_row(row)')
print('            items.append(item)')
print('')
print('        return items, row_count')

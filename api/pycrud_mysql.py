import sys
import pymysql

host = "localhost"
user = "root"
password = "root"
db = "stories"

table_name = sys.argv[1]
class_name = sys.argv[2]

conn = pymysql.connect(host=host,
                       user=user,
                       password=password,
                       db=db,
                       charset='utf8mb4',
                       cursorclass=pymysql.cursors.DictCursor)

cur = conn.cursor(pymysql.cursors.DictCursor)     

cur.execute("DESCRIBE {0}".format(table_name))
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
print('            rows = self.db_select(id_{0}=id_{0})'.format(table_name))
print('            if len(rows) == 0:')
print('                raise KeyError("row not found")')
print('            self.fill_from_data_row(rows[0])')

# FILL_FROM_DATA_ROW

print('')
print('    def fill_from_data_row(self, row):')
for row in rows:
    print('        self.{0} = row["{0}"]'.format(row["Field"]))    

# INSERT

print('')
print('    def insert(self):')
print('        self.id_{0} = mysql_execute("\\'.format(table_name))
print('        insert into {0}(\\'.format(table_name))

values = ''
for i, row in enumerate(rows):
    if row["Key"] == 'PRI':
        continue

    comma = ')' if i == len(rows) - 1 else ','
    print('            {0}{1}\\'.format(row["Field"], comma))

    comma = '' if i == len(rows) - 1 else ','
    values += '%s{0}'.format(comma)

print('        values({0})",'.format(values))
print('        (')
for i, row in enumerate(rows):
    if row["Key"] == 'PRI':
        continue

    comma = '' if i == len(rows) - 1 else ','
    print('            self.{0}{1}'.format(row["Field"], comma))
print('        ))')    

# UPDATE

print('')
print('    def update(self):')
print('        mysql_execute("\\')
print('        update\\')
print('            {0}\\'.format(table_name))
print('        set\\')

for i, row in enumerate(rows):
    if row["Key"] == 'PRI':
        continue

    comma = '' if i == len(rows) - 1 else ','
    print('            {0} = %s{1}\\'.format(row["Field"], comma))

print('        where\\')
print('            id_{0} = %s",'.format(table_name))

print('        (')
for i, row in enumerate(rows):
    if row["Key"] == 'PRI':
        continue

    print('            self.{0}{1}'.format(row["Field"], ','))

print('            self.id_{0}'.format(table_name))
print('        ))')    

# DELETE

print('')
print('    def delete(self):')
print('        mysql_execute("\\')
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
print('    def db_select(id_{0}=None):'.format(table_name))
print('        return mysql_select_rows("\\')
print('        select\\')

for i, row in enumerate(rows):
    comma = '' if i == len(rows) - 1 else ','
    print('            {0}{1}\\'.format(row["Field"], comma))

print('        from\\')
print('            {0}\\'.format(table_name))
print('        where\\')
print('            (%(id_{0})s is null or id_{0} = %(id_{0})s)",'.format(table_name))

print('        (')
print('            {{"id_{0}": id_{0}}}'.format(table_name))
print('        ))')    


# GET ALL

print('')
print('    @staticmethod')
print('    def get_all():')
print('        items = []')
print('        rows = {0}.db_select()'.format(class_name))
print('        for row in rows:')
print('            item = {0}()'.format(class_name))
print('            item.fill_from_data_row(row)')
print('            items.append(item)')
print('        ')
print('        return items')

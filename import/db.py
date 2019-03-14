import psycopg2
from psycopg2.extras import RealDictCursor

pg_connection_string = None

def init_pg(connection_string):
    global pg_connection_string
    pg_connection_string = connection_string

def pg_select_rows(sql, parameters):    	    
    conn = psycopg2.connect(pg_connection_string)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    cur.execute(sql, parameters)
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return rows

def pg_select_rows_with_count(sql, parameters):	    
    rows = pg_select_rows(sql, parameters)
    rows_count = 0

    if len(rows) > 0:
        rows_count = rows[0]["row_count"]

    return rows, rows_count


def pg_execute(sql, parameters):
    conn = psycopg2.connect(pg_connection_string)
    cur = conn.cursor()
    cur.execute(sql, parameters)

    if cur.description:
        rows = cur.fetchall()
    else:
        rows = None

    conn.commit()
    cur.close()
    conn.close()

    if rows == None or len(rows) == 0:
        return None
    else:
        return rows

from db import *

class UserRole(object):
    ID_USER_ROLE_ADMIN = 1
    ID_USER_ROLE_USER = 2
    
    ID_USER_ROLE_DEFAULT = 2

    @staticmethod
    def get_roles():
        roles = []
        rows = pg_select_rows("select * from member_role order by id_member_role", None)
        for row in rows:
            r = UserRole()
            r.id_user_role = row["id_member_role"]
            r.name = row["name"]
            roles.append(r)

        return roles

    @staticmethod
    def is_admin(id_user_role):
        return id_user_role == UserRole.ID_USER_ROLE_ADMIN
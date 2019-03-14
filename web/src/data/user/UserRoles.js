export const ID_USER_ROLE_USER = 2;
export const ID_USER_ROLE_ADMIN = 1;

export function getRoleName(idUserRole) {
  if (idUserRole === ID_USER_ROLE_ADMIN) return 'admin';
  else if (idUserRole === ID_USER_ROLE_USER) return 'user';
  else return 'None';
}

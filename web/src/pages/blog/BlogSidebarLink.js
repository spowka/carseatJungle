import React from 'react';
import {Link} from 'react-router-dom';

function BlogSidebarLink({active = false, link = '', text = ''}) {
  return (
    <Link
      to={'/blog/' + link}
      className={`list-group-item list-group-item-action ${
        active ? 'active' : ''
      }`}
    >
      {text}
    </Link>
  );
}

export default BlogSidebarLink;

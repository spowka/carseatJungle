import React from 'react';
import {NavLink, Link} from 'react-router-dom';

function AdminSidebar() {
  return (
    <React.Fragment>
      <div className="pt-4 pb-3 text-center text-white pl-3 pr-4">
        <Link to="/" className="sidebar-logo" />
      </div>
      <nav className="sidebar-nav">
        <NavLink className="sidebar-nav-link" to="/admin/carseats">
          <i className="fas fa-car mr-3" />
          Carseats
        </NavLink>
        <NavLink className="sidebar-nav-link" to="/admin/carseat-types">
          <i className="fas fa-car mr-3" />
          Carseat Types
        </NavLink>
        <NavLink className="sidebar-nav-link" to="/admin/carseat-groups">
          <i className="fas fa-car mr-3" />
          Carseat Groups
        </NavLink>
        <NavLink className="sidebar-nav-link" to="/admin/child-height-groups">
          <i className="fas fa-car mr-3" />
          Child Height Groups
        </NavLink>
        <NavLink className="sidebar-nav-link" to="/admin/child-weight-groups">
          <i className="fas fa-car mr-3" />
          Child Weight Groups
        </NavLink>
        <NavLink className="sidebar-nav-link" to="/admin/brands">
          <i className="fas fa-car mr-3" />
          Brands
        </NavLink>
        <NavLink className="sidebar-nav-link" to="/admin/origins">
          <i className="fas fa-car mr-3" />
          Origins
        </NavLink>
        <NavLink className="sidebar-nav-link" to="/admin/shops">
          <i className="fas fa-car mr-3" />
          Shops
        </NavLink>
        <NavLink className="sidebar-nav-link" to="/admin/ranking-providers">
          <i className="fas fa-car mr-3" />
          Ranking providers
        </NavLink>
        <NavLink className="sidebar-nav-link" to="/admin/ranking-values">
          <i className="fas fa-car mr-3" />
          Ranking values
        </NavLink>
      </nav>
    </React.Fragment>
  );
}

export default AdminSidebar;

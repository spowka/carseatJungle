import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarShow: false,
    };

    this.logoutClick = this.logoutClick.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.toggleMenuMobile = this.toggleMenuMobile.bind(this);
    this.closeMenuMobile = this.closeMenuMobile.bind(this);
    this.closeOnClickOutSide = this.closeOnClickOutSide.bind(this);
  }

  toggleMenuMobile() {
    this.setState(ps => ({
      navbarShow: !ps.navbarShow,
    }));
  }

  closeMenuMobile() {
    this.setState({
      navbarShow: false,
    });
  }

  logoutClick() {
    this.closeMenuMobile();
    const {logout} = this.props;
    logout();
    this.props.history.push('/');
  }

  searchClick() {
    this.closeMenuMobile();
    const {searchToggle} = this.props;
    searchToggle();
  }
  closeOnClickOutSide(e) {
    if (!e.target.closest('.app-header')) this.closeMenuMobile();
  }
  componentDidMount() {
    document.addEventListener('click', this.closeOnClickOutSide);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.closeOnClickOutSide);
  }

  render() {
    return (
      <header className="app-header">
        <nav className="navbar navbar-expand-lg navbar-light bg-header border-0 fixed-top">
          <div className="container py-2">
            <NavLink className="navbar-brand logo-h40" to="/">
              &nbsp;
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              onClick={this.toggleMenuMobile}
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className={`navbar-collapse header-navbar ${
                this.state.navbarShow ? 'header-navbar--open' : ''
              }`}
              onClick={this.closeMenuMobile}
            >
              <ul
                className="navbar-nav ml-auto text-uppercase"
                style={{fontWeight: 900}}
              >
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/guide">
                    Guide
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/library">
                    Library
                  </NavLink>
                </li>
                <li className="nav-item mr-2">
                  <NavLink className="nav-link" to="/blog">
                    Blog
                  </NavLink>
                </li>
                <li className="nav-item ml-2">
                  <NavLink
                    className="nav-link btn btn-primary rounded-lg text-white"
                    to="/filter"
                  >
                    <i className="fas fa-search mr-2" />
                    Search
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default withRouter(
  connect(
    mapStateToProps,
    {},
  )(Header),
);

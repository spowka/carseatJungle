import React, {Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {validateEmail} from '../../common/validation.js';
import {login} from '../../data/user/UserActions.js';
import './style.css';

class Login extends Component {
  constructor(self) {
    super(self);
    this.state = {
      email: 'maria@carseatjungle.com',
      password: 'test123',
    };

    this.checkDataValidity = this.checkDataValidity.bind(this);
    this.clearDataValidity = this.clearDataValidity.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  checkDataValidity() {
    let isOk = true;
    document.getElementById('loginEmail').setCustomValidity('');

    if (this.state.email === '' || !validateEmail(this.state.email)) {
      document
        .getElementById('loginEmail')
        .setCustomValidity('Please enter a valid e-mail.');
      isOk = false;
    }

    return isOk;
  }

  clearDataValidity() {
    document.getElementById('loginEmail').setCustomValidity('');
  }

  loginSubmit(e) {
    e.preventDefault();
    if (!this.checkDataValidity()) return;
    const {login} = this.props;
    login(
      this.state.email,
      this.state.password,
      true, // keep me logged in
    ).then(res => {
      if (res) this.props.history.push('/admin/carseats');
    });
  }

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            position: 'absolute',
            left: '0px',
            right: '0px',
            top: '0px',
            bottom: '0px',
            backgroundColor: '#eeeeee',
          }}
        />
        <div
          className="card border-0 shadow w-100 my-5 mx-auto px-3 px-sm-5 py-5 rounded-lg"
          style={{maxWidth: '370px'}}
        >
          <h4 className="d-block text-center pb-4">Login to your account</h4>
          <form onSubmit={this.loginSubmit}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-fw fa-user" />
                </span>
              </div>
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                onChange={e => {
                  this.clearDataValidity();
                  this.setState({email: e.target.value});
                }}
                placeholder="Email address"
                value={this.state.email}
                required
                autoFocus
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-fw fa-unlock" />
                </span>
              </div>
              <input
                type="password"
                className="form-control form-control-underline"
                id="loginPassword"
                placeholder="Password"
                onChange={e => this.setState({password: e.target.value})}
                value={this.state.password}
                required
              />
            </div>

            {this.props.login_error_message && (
              <div className="ua-error">{this.props.login_error_message}</div>
            )}
            <div className="text-center pt-2">
              <button
                onClick={this.checkDataValidity}
                type="submit"
                className="btn btn-primary ua-btn-primary px-4"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    login_error_message: state.user.login_error_message,
    currentUser: state.user.currentUser,
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {login},
  )(Login),
);

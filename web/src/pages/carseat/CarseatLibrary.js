/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCarseats} from '../../data/carseat/CarseatActions.js';
import CarseatListItem from './CarseatListItem.js';
import BreadCrumb from '../../components/layout/BreadCrumb';
import Spinner from '../../components/layout/Spinner.js';

class CarseatLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCount: 5,
    };
  }

  componentDidMount() {
    const {getCarseats} = this.props;
    getCarseats(null, null, null, null, {isUKAvailable: true});
  }

  render() {
    const {showCount} = this.state;
    const {carseats, isLoading} = this.props;

    return (
      <main className="flex-shrink-0">
        <BreadCrumb history={[{text: 'Home', link: '/'}]} text="Library" />
        <div className="container py-4">
          <h1 className="page-title pb-3">Car Seat library</h1>

          <div className="border-bottom pb-3 clearfix">
            <div className="btn-group float-left" role="group">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-right-0"
                  type="button"
                  data-toggle="dropdown"
                >
                  Brand
                  <i className="fas fa-angle-down ml-2" />
                </button>
                <div className="dropdown-menu border-0 shadow">
                  <a className="dropdown-item" href="#">
                    BeSafe
                  </a>
                  <a className="dropdown-item" href="#">
                    Britax
                  </a>
                </div>
              </div>
              <div className="dropdown border-left">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-left-0 border-radius-right-0"
                  type="button"
                  data-toggle="dropdown"
                >
                  Type
                  <i className="fas fa-angle-down ml-2" />
                </button>
                <div className="dropdown-menu border-0 shadow">
                  <a className="dropdown-item" href="#">
                    Type1
                  </a>
                  <a className="dropdown-item" href="#">
                    Type2
                  </a>
                </div>
              </div>
              <div className="dropdown border-left">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-left-0"
                  type="button"
                  data-toggle="dropdown"
                >
                  Something
                  <i className="fas fa-angle-down ml-2" />
                </button>
                <div className="dropdown-menu border-0 shadow">
                  <a className="dropdown-item" href="#">
                    Something1
                  </a>
                  <a className="dropdown-item" href="#">
                    Something2
                  </a>
                </div>
              </div>
            </div>

            <div className="dropdown float-right mt-2 mt-sm-0">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
              >
                Sort by: Price
                <i className="fas fa-angle-down ml-2" />
              </button>
              <div className="dropdown-menu dropdown-menu-right border-0 shadow">
                <a className="dropdown-item active" href="#">
                  Price
                </a>
                <a className="dropdown-item" href="#">
                  Name
                </a>
              </div>
            </div>
          </div>

          {isLoading && <Spinner />}

          {!isLoading &&
            carseats &&
            carseats.map((cs, i) =>
              i < showCount ? (
                <CarseatListItem carseat={cs} key={cs.id_carseat} />
              ) : null,
            )}

          {!isLoading && carseats && carseats.length > showCount && (
            <div className="text-center pt-4 pb-3">
              <button
                className="btn btn-secondary px-5"
                onClick={() => this.setState({showCount: showCount + 5})}
              >
                Load more ...
              </button>
            </div>
          )}
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.carseat.carseatsPagination.is_loading,
    carseats: state.carseat.carseats,
  };
}

export default connect(
  mapStateToProps,
  {getCarseats},
)(CarseatLibrary);

import React from 'react';
import {connect} from 'react-redux';
import {setFilter} from '../../data/carseat/CarseatActions.js';
import BreadCrumb from '../../components/layout/BreadCrumb';
import FilterFooter from './FilterFooter.js';
import FilterWizard from './FilterWizard.js';
import FilterRecommendations from './FilterRecommendations.js';

class Filter3 extends React.PureComponent {
  render() {
    const {setFilter, filter} = this.props;
    const hasIsofix = filter.hasIsofix;

    return (
      <main className="flex-shrink-0">
        <BreadCrumb
          history={[
            {text: 'Home', link: '/'},
            {text: 'Car seat library', link: '/'},
          ]}
          text="Filter"
        />
        <div className="container py-4">
          <FilterWizard currentStep={3} />

          <h1 className="page-title">
            Should the car seat have ISOFIX connectors?
          </h1>
          <span className="d-block pt-3 pb-4">
            Not all cars have ISOFIX built-in so check your car manual first to
            see if you can install an ISOFIX car seat. Generally, ISOFIX car
            seats are safer because they are easier to install and minimise the
            risk of installing the car seat incorrectly.
          </span>

          <div className="rounded p-5 p-sm-4 mb-4 bg-tint">
            <div className="row">
              <div className="mb-3 mb-md-0 col-md-4">
                <button
                  type="button"
                  className={`btn btn-filter btn-block font-weight-bold text-uppercase ${
                    hasIsofix === true ? 'active' : ''
                  }`}
                  onClick={() => setFilter('hasIsofix', true)}
                  style={{height: '120px'}}
                >
                  Yes
                </button>
              </div>
              <div className="mb-3 mb-md-0 col-md-4">
                <button
                  type="button"
                  className={`btn btn-filter btn-block font-weight-bold text-uppercase ${
                    hasIsofix === false ? 'active' : ''
                  }`}
                  onClick={() => setFilter('hasIsofix', false)}
                  style={{height: '120px'}}
                >
                  No
                </button>
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  className={`btn btn-filter btn-block font-weight-bold text-uppercase ${
                    hasIsofix === null ? 'active' : ''
                  }`}
                  onClick={() => setFilter('hasIsofix', null)}
                  style={{height: '120px'}}
                >
                  Show me all
                </button>
              </div>
            </div>
          </div>

          <FilterFooter nextUrl="/filter4" />
          <FilterRecommendations />
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    filter: state.carseat.filter,
    carseats: state.carseat.carseats,
  };
}

export default connect(
  mapStateToProps,
  {setFilter},
)(Filter3);

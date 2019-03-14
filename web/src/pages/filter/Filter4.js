import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {setFilter} from '../../data/carseat/CarseatActions.js';
import BreadCrumb from '../../components/layout/BreadCrumb';
import FilterFooter from './FilterFooter.js';
import FilterWizard from './FilterWizard.js';
import FilterRecommendations from './FilterRecommendations.js';

class Filter4 extends React.PureComponent {
  render() {
    const {setFilter, filter} = this.props;
    const hasSwivel = filter.hasSwivel;

    if (
      !(
        filter.idCarseatTypes.indexOf(1) > -1 ||
        filter.idCarseatTypes.indexOf(7) > -1 ||
        filter.idCarseatTypes.indexOf(6) > -1
      )
    )
      return <Redirect to="/filter5" />;

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
          <FilterWizard currentStep={4} />

          <h1 className="page-title">Do you want a car seat that swivels?</h1>
          <span className="d-block pt-3 pb-4">
            Car seats which swivel make it easier to put the child in and out of
            the car but this function makes no difference to the safety of the
            car seat. Swivel car seats are generally more expensive on average.
          </span>

          <div className="rounded p-5 p-sm-4 mb-4 bg-tint">
            <div className="row">
              <div className="mb-3 mb-md-0 col-md-4">
                <button
                  type="button"
                  className={`btn btn-filter font-weight-bold btn-block text-uppercase ${
                    hasSwivel === true ? 'active' : ''
                  }`}
                  onClick={() => setFilter('hasSwivel', true)}
                  style={{height: '120px'}}
                >
                  Yes
                </button>
              </div>
              <div className="mb-3 mb-md-0 col-md-4">
                <button
                  type="button"
                  className={`btn btn-filter font-weight-bold btn-block text-uppercase ${
                    hasSwivel === false ? 'active' : ''
                  }`}
                  onClick={() => setFilter('hasSwivel', false)}
                  style={{height: '120px'}}
                >
                  No
                </button>
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  className={`btn btn-filter font-weight-bold btn-block text-uppercase ${
                    hasSwivel === null ? 'active' : ''
                  }`}
                  onClick={() => setFilter('hasSwivel', null)}
                  style={{height: '120px'}}
                >
                  Show me all
                </button>
              </div>
            </div>
          </div>

          <FilterFooter nextUrl="/filter5" />
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
)(Filter4);

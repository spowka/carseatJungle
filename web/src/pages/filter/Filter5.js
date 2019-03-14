import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {setFilter} from '../../data/carseat/CarseatActions.js';
import BreadCrumb from '../../components/layout/BreadCrumb';
import FilterFooter from './FilterFooter.js';
import FilterWizard from './FilterWizard.js';
import FilterRecommendations from './FilterRecommendations.js';

class Filter5 extends React.PureComponent {
  render() {
    const {setFilter, filter} = this.props;
    const isISizeCompliant = filter.isISizeCompliant;

    if (
      !(
        filter.idCarseatTypes.indexOf(1) > -1 ||
        filter.idCarseatTypes.indexOf(4) > -1 ||
        filter.idCarseatTypes.indexOf(6) > -1 ||
        filter.idCarseatTypes.indexOf(5) > -1 ||
        filter.idCarseatTypes.indexOf(3) > -1
      )
    )
      return <Redirect to="/library" />;

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
          <FilterWizard currentStep={5} />

          <h1 className="page-title">
            Do you want a car seat that is i-size compliant?
          </h1>
          <span className="d-block py-3">
            Car seats which conform to the new i-size regulation are:
            <div className="row">
              <div className="col-lg-4">
                <ol className="mb-0 pb-0 pb-lg-2">
                  <li>Safer in a side impact collision</li>
                  <li>Rearward-facing until 15 months</li>
                </ol>
              </div>
              <div className="col-lg-8">
                <ol start="3">
                  <li>Height based, not weight</li>
                  <li>ISOFIX only (prevents misuse) </li>
                </ol>
              </div>
            </div>
          </span>

          <div className="rounded p-5 p-sm-4 mb-4 bg-tint">
            <div className="row">
              <div className="mb-3 mb-md-0 col-md-4">
                <button
                  type="button"
                  className={`btn btn-filter font-weight-bold btn-block text-uppercase ${
                    isISizeCompliant === true ? 'active' : ''
                  }`}
                  onClick={() => setFilter('isISizeCompliant', true)}
                  style={{height: '120px'}}
                >
                  Yes
                </button>
              </div>
              <div className="mb-3 mb-md-0 col-md-4">
                <button
                  type="button"
                  className={`btn btn-filter font-weight-bold btn-block text-uppercase ${
                    isISizeCompliant === false ? 'active' : ''
                  }`}
                  onClick={() => setFilter('isISizeCompliant', false)}
                  style={{height: '120px'}}
                >
                  No
                </button>
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  className={`btn btn-filter font-weight-bold btn-block text-uppercase ${
                    isISizeCompliant === null ? 'active' : ''
                  }`}
                  onClick={() => setFilter('isISizeCompliant', null)}
                  style={{height: '120px'}}
                >
                  Show me all
                </button>
              </div>
            </div>
          </div>
          <FilterFooter nextUrl="/library" />
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
)(Filter5);

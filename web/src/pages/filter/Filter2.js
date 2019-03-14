import React from 'react';
import {connect} from 'react-redux';
import {setFilter} from '../../data/carseat/CarseatActions.js';
import BreadCrumb from '../../components/layout/BreadCrumb';
import FilterFooter from './FilterFooter.js';
import FilterWizard from './FilterWizard.js';
import FilterRecommendations from './FilterRecommendations.js';

class Filter2 extends React.PureComponent {
  render() {
    const {setFilter, filter} = this.props;
    const isRearFacing = filter.isRearFacing;

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
          <FilterWizard currentStep={2} />

          <h1 className="page-title">
            Do you want an extended rear-facing car seat?
          </h1>
          <span className="d-block py-3">
            Extended rear-facing car seats are safer than forward facing seats
            and there are generally two types of car seats within this category:
            <ol>
              <li>
                Extended rear-facing until the child reaches a weight of 18kgs.
              </li>
              <li>
                Extended rear-facing until the child reaches a weight of 25kgs
                (or 23kgs for some seas).
              </li>
            </ol>
          </span>
          <div className="rounded p-5 p-sm-4 mb-4 bg-tint">
            <div className="row">
              <div className="mb-3 mb-md-0 col-md-4">
                <button
                  type="button"
                  className={`btn btn-filter btn-block text-uppercase font-weight-bold ${
                    isRearFacing === true ? 'active' : ''
                  }`}
                  onClick={() => setFilter('isRearFacing', true)}
                  style={{height: '120px'}}
                >
                  Yes
                </button>
              </div>
              <div className="mb-3 mb-md-0 col-md-4">
                <button
                  type="button"
                  className={`btn btn-filter btn-block text-uppercase font-weight-bold ${
                    isRearFacing === false ? 'active' : ''
                  }`}
                  onClick={() => setFilter('isRearFacing', false)}
                  style={{height: '120px'}}
                >
                  No
                </button>
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  className={`btn btn-filter btn-block text-uppercase font-weight-bold ${
                    isRearFacing === null ? 'active' : ''
                  }`}
                  onClick={() => setFilter('isRearFacing', null)}
                  style={{height: '120px'}}
                >
                  {`Show me all`}
                </button>
              </div>
            </div>
          </div>
          <FilterFooter nextUrl="/filter3" />
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
)(Filter2);

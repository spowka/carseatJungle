import React from 'react';
import {connect} from 'react-redux';
import {toggleFilter} from '../../data/carseat/CarseatActions.js';
import BreadCrumb from '../../components/layout/BreadCrumb';
import FilterCard from './FilterCard.js';
import FilterFooter from './FilterFooter.js';
import FilterWizard from './FilterWizard.js';
// import FilterRecommendations from './FilterRecommendations.js';

class Filter1 extends React.Component {
  constructor(props) {
    super(props);

    this.getNextLink = this.getNextLink.bind(this);
  }

  getNextLink() {
    const {filter} = this.props;

    let nextUrl = '/filter3';
    if (filter.idCarseatTypes.indexOf(3) > -1) nextUrl = '/filter2';
    if (filter.idCarseatTypes.indexOf(5) > -1) nextUrl = '/filter2';
    if (filter.idCarseatTypes.indexOf(6) > -1) nextUrl = '/filter2';
    return nextUrl;
  }

  render() {
    const {toggleFilter, filter} = this.props;

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
          <FilterWizard currentStep={1} />

          <h1 className="page-title">
            What type of car seat are you looking for?
          </h1>
          <h3 className="section-title pb-3">
            You can select as many options as you like.
          </h3>

          <div className="rounded p-3 p-sm-4 mb-4 bg-tint">
            <h4 className="card-title">Single group car seats</h4>
            <div className="row mt-2 mt-sm-3">
              <FilterCard
                onClick={() => toggleFilter('idCarseatTypes', 1)}
                active={filter.idCarseatTypes.indexOf(1) !== -1}
                columnClass="col-sm-4 mb-sm-0 mb-3"
                content={
                  <React.Fragment>
                    <span
                      className="d-block filter-bg filter-bg-infant"
                      style={{backgroundPosition: '15% bottom'}}
                    >
                      <span className="d-block font-weight-bold text-uppercase pb-1">
                        Infant
                      </span>
                      <div className="row">
                        <div className="col-7 offset-5 text-left">
                          <small className="">
                            groups 0 and 0+
                            <span className="d-block bg-weight my-2">
                              Up to 13kgs
                            </span>
                            <span className="d-block bg-size">Up to 83cm</span>
                          </small>
                        </div>
                      </div>
                    </span>
                  </React.Fragment>
                }
              />

              <FilterCard
                onClick={() => toggleFilter('idCarseatTypes', 7)}
                active={filter.idCarseatTypes.indexOf(7) !== -1}
                columnClass="col-sm-4 mb-sm-0 mb-3"
                content={
                  <React.Fragment>
                    <span
                      className="d-block filter-bg filter-bg-toddler"
                      style={{backgroundPosition: '13% 170%'}}
                    >
                      <span className="d-block font-weight-bold text-uppercase pb-1">
                        Toddler
                      </span>
                      <div className="row">
                        {/* <div className="col-6">
                          <div className="filter-bg filter-bg-toddler"></div>
                        </div> */}
                        <div className="col-7 offset-5 text-left">
                          <small className="">
                            groups 1
                            <span className="d-block bg-weight my-2">
                              Up to 13kgs
                            </span>
                            <span className="d-block bg-size">&minus;</span>
                          </small>
                        </div>
                      </div>
                    </span>
                  </React.Fragment>
                }
              />

              <FilterCard
                onClick={() => toggleFilter('idCarseatTypes', 4)}
                active={filter.idCarseatTypes.indexOf(4) !== -1}
                columnClass="col-sm-4 mb-sm-0 mb-3"
                content={
                  <React.Fragment>
                    <span
                      className="d-block filter-bg filter-bg-child"
                      style={{backgroundPosition: '13% 185%'}}
                    >
                      <span className="d-block font-weight-bold text-uppercase pb-1">
                        Child
                      </span>
                      <div className="row">
                        {/* <div className="col-6">
                          <div className="filter-bg filter-bg-child"></div>
                        </div> */}
                        <div className="col-7 offset-5 text-left">
                          <small className="">
                            groups 2 and 3
                            <span className="d-block bg-weight my-2">
                              15 &minus; 36kgs
                            </span>
                            <span className="d-block bg-size">
                              100 &minus; 150cm
                            </span>
                          </small>
                        </div>
                      </div>
                    </span>
                  </React.Fragment>
                }
              />
            </div>
          </div>

          <div className="rounded p-3 p-sm-4 mb-4 bg-tint">
            <h5 className="card-title">Combination car seats</h5>
            <div className="row mt-2 mt-sm-3">
              <FilterCard
                onClick={() => toggleFilter('idCarseatTypes', 6)}
                active={filter.idCarseatTypes.indexOf(6) !== -1}
                columnClass="col-lg-3 col-sm-6 mb-3"
                content={
                  <React.Fragment>
                    <span
                      className="d-block filter-bg filter-bg-infant-toddler"
                      style={{backgroundPosition: '13% 135%'}}
                    >
                      <span className="d-block font-weight-bold text-uppercase">
                        Infant / Toddler
                      </span>
                      <small className="d-block">groups 0+ and 1</small>
                      <div className="row">
                        {/* <div className="col-6">
                          <div className="filter-bg filter-bg-infant-toddler"></div>
                        </div> */}
                        <div className="col-7 offset-5 text-left">
                          <small>
                            <span className="d-block bg-weight my-2">
                              Up to 18kgs
                            </span>
                            <span className="d-block bg-size">
                              40 &minus; 105cm
                            </span>
                          </small>
                        </div>
                      </div>
                    </span>
                  </React.Fragment>
                }
              />
              <FilterCard
                onClick={() => toggleFilter('idCarseatTypes', 3)}
                active={filter.idCarseatTypes.indexOf(3) !== -1}
                columnClass="col-lg-3 col-sm-6 mb-3"
                content={
                  <React.Fragment>
                    <span
                      className="d-block filter-bg filter-bg-infant-toddler"
                      style={{backgroundPosition: '13% 135%'}}
                    >
                      <span className="d-block font-weight-bold text-uppercase">
                        Toddler / Child
                      </span>
                      <small className="d-block">groups 1, 2 and 1</small>
                      <div className="row">
                        {/* <div className="col-6">
                          <div className="filter-bg filter-bg-toddler-child"></div>
                        </div> */}
                        <div className="col-7 offset-5 text-left">
                          <small>
                            <span className="d-block bg-weight my-2">
                              9 &minus; 36kgs
                            </span>
                            <span className="d-block bg-size">
                              61 &minus; 135cm
                            </span>
                          </small>
                        </div>
                      </div>
                    </span>
                  </React.Fragment>
                }
              />

              <FilterCard
                onClick={() => toggleFilter('idCarseatTypes', 5)}
                active={filter.idCarseatTypes.indexOf(5) !== -1}
                columnClass="col-lg-3 col-sm-6 mb-3"
                content={
                  <React.Fragment>
                    <span
                      className="d-block filter-bg filter-bg-infant-toddler-child"
                      style={{backgroundPosition: '13% 137%'}}
                    >
                      <span className="d-block font-weight-bold text-uppercase">
                        Infant/Toddler/Child
                      </span>
                      <small className="d-block">groups 1, 2 and 1</small>
                      <div className="row">
                        {/* <div className="col-6">
                          <div className="filter-bg filter-bg-infant-toddler-child"></div>
                        </div> */}
                        <div className="col-7 offset-5 text-left">
                          <small>
                            <span className="d-block bg-weight my-2">
                              9 &minus; 36kgs
                            </span>
                            <span className="d-block bg-size">
                              61 &minus; 135cm
                            </span>
                          </small>
                        </div>
                      </div>
                    </span>
                  </React.Fragment>
                }
              />

              <FilterCard
                onClick={() => toggleFilter('idCarseatTypes', 8)}
                active={filter.idCarseatTypes.indexOf(8) !== -1}
                columnClass="col-lg-3 col-sm-6 mb-3"
                content={
                  <React.Fragment>
                    <span
                      className="d-block filter-bg filter-bg-infant-toddler-child"
                      style={{backgroundPosition: '13% 137%'}}
                    >
                      <span className="d-block font-weight-bold text-uppercase">
                        All in one
                      </span>
                      <small className="d-block">groups 0+, 1, 2 and 3</small>
                      <div className="row">
                        {/* <div className="col-6">
                          <div className="filter-bg filter-bg-infant-toddler-child"></div>
                        </div> */}
                        <div className="col-7 offset-5 text-left">
                          <small>
                            <span className="d-block bg-weight my-2">
                              0 &minus; 36kgs
                            </span>
                            <span className="d-block bg-size">
                              61 &minus; 135cm
                            </span>
                          </small>
                        </div>
                      </div>
                    </span>
                  </React.Fragment>
                }
              />
            </div>
          </div>
          <FilterFooter nextUrl="/filter2" />
          {/* <FilterRecommendations /> */}
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
  {toggleFilter},
)(Filter1);

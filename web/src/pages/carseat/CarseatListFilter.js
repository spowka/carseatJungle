import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toggleFilter, setFilter} from '../../data/carseat/CarseatActions.js';
import CarseatListFilterList from './CarseatListFilterList.js';

class CarseatListFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const {carseatTypes, filter, toggleFilter, setFilter} = this.props;
    const {showFiltersMobile} = this.state;

    return (
      <div className="bg-light rounded-lg mb-3 py-3">
        {/* eslint-disable-next-line */}
        <a
          className="font-weight-bold text-dark d-block px-4"
          style={{textDecoration: 'none'}}
          onClick={() =>
            this.setState({
              showFiltersMobile: !showFiltersMobile,
            })
          }
        >
          Your selection
        </a>
        <div
          id="filters"
          className={`${showFiltersMobile ? '' : 'd-none'} d-lg-block`}
        >
          <div className="row px-3 mt-2">
            <div className="col-lg mb-3 mb-lg-0">
              <CarseatListFilterList
                title="Car Seat Type"
                items={carseatTypes.map(g => ({
                  id: g.id_carseat_type,
                  name: g.name,
                }))}
                selectedValues={filter.idCarseatTypes}
                toggle={id => toggleFilter('idCarseatTypes', id)}
              />
            </div>
            <div className="col-lg mb-3 mb-lg-0">
              <CarseatListFilterList
                title="Rear Facing"
                items={[
                  {id: null, name: 'Show all'},
                  {id: true, name: 'Yes'},
                  {id: false, name: 'No'},
                ]}
                selectedValues={[filter.isRearFacing]}
                toggle={id => setFilter('isRearFacing', id)}
              />
            </div>
            <div className="col-lg mb-3 mb-lg-0">
              <CarseatListFilterList
                title="I-Size Compliant"
                items={[
                  {id: null, name: 'Show all'},
                  {id: true, name: 'Yes'},
                  {id: false, name: 'No'},
                ]}
                selectedValues={[filter.isISizeCompliant]}
                toggle={id => setFilter('isISizeCompliant', id)}
              />
            </div>
            <div className="col-lg mb-3 mb-lg-0">
              <CarseatListFilterList
                title="ISOFIX"
                items={[
                  {id: null, name: 'Show all'},
                  {id: true, name: 'Yes'},
                  {id: false, name: 'No'},
                ]}
                selectedValues={[filter.hasIsofix]}
                toggle={id => setFilter('hasIsofix', id)}
              />
            </div>
            <div className="col-lg">
              <CarseatListFilterList
                title="Swivel"
                items={[
                  {id: null, name: 'Show all'},
                  {id: true, name: 'Yes'},
                  {id: false, name: 'No'},
                ]}
                selectedValues={[filter.hasSwivel]}
                toggle={id => setFilter('hasSwivel', id)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filter: state.carseat.filter,
    carseatTypes: state.carseatType.carseatTypes,
  };
}

export default connect(
  mapStateToProps,
  {toggleFilter, setFilter},
)(CarseatListFilter);

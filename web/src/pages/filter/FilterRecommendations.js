import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Spinner from '../../components/layout/Spinner.js';
import {getCarseats} from '../../data/carseat/CarseatActions.js';
import FilterRecommendationsItem from './FilterRecommendationsItem.js';

class FilterRecommendations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCount: 3,
    };

    this.refreshList = this.refreshList.bind(this);
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.filter, prevProps.filter)) {
      this.refreshList();
    }
  }

  refreshList() {
    const {getCarseats, filter} = this.props;
    const {showCount} = this.state;

    getCarseats(0, showCount, null, null, filter);
  }

  render() {
    const {carseats, isLoading} = this.props;

    return (
      <div className="mt-5">
        <h4 className="section-title pb-3">Recommended Car Seats:</h4>
        {isLoading && <Spinner />}
        {!isLoading && (
          <div className="row">
            {carseats &&
              carseats.map((cs, i) =>
                i < this.state.showCount ? (
                  <FilterRecommendationsItem carseat={cs} key={cs.id_carseat} />
                ) : null,
              )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.carseat.carseatsPagination.is_loading,
    carseats: state.carseat.carseats,
    filter: state.carseat.filter,
  };
}

export default connect(
  mapStateToProps,
  {getCarseats},
)(FilterRecommendations);

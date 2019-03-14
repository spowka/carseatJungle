/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {PDFDownloadLink} from '@react-pdf/renderer';
import {getCarseats} from '../../data/carseat/CarseatActions.js';
import CarseatListItem from './CarseatListItem.js';
import CarseatListFilter from './CarseatListFilter.js';
import {generatePDF} from './CarseatListPDF.js';
import BreadCrumb from '../../components/layout/BreadCrumb.js';
import Spinner from '../../components/layout/Spinner.js';

class CarseatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFiltersMobile: false,
      showCount: 5,
      pdfDownloadActive: false,
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
    getCarseats(0, 9999, null, null, filter);
  }

  render() {
    const {carseats, isLoading} = this.props;
    const {pdfDownloadActive, showCount} = this.state;

    return (
      <main className="flex-shrink-0">
        <BreadCrumb
          history={[
            {text: 'Home', link: '/'},
            {text: 'Car seat library', link: '/seats'},
          ]}
          text="Popular"
        />
        <div className="container py-4">
          {carseats && carseats.length === 0 && (
            <div className="alert alert-success rounded-lg py-3 px-4">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  <strong className="d-block">
                    Your car seat search didn't return any results.
                  </strong>
                  Try changing your search criteria below.
                </div>
              </div>
            </div>
          )}

          {carseats && carseats.length > 0 && (
            <div className="alert alert-success rounded-lg py-3 px-4">
              <div className="row">
                <div className="col-md-12 col-lg-8">
                  <strong className="d-block">
                    Congratulations! Your search returned {carseats.length}{' '}
                    results.
                  </strong>
                  You can see the selections you made below and you can filter
                  and sort the list too.
                </div>
                <div className="col-md-12 col-lg-4 text-center text-lg-right mt-2 mt-lg-0">
                  <div className="d-table w-100 h-100">
                    <div className="d-table-cell w-100 h-100 align-middle">
                      {carseats && (
                        <React.Fragment>
                          {!pdfDownloadActive && (
                            <button
                              type="button"
                              className="btn btn-secondary px-4"
                              onClick={() =>
                                this.setState({pdfDownloadActive: true})
                              }
                            >
                              <i className="fas fa-file-download mr-2" />
                              Generate PDF list
                            </button>
                          )}

                          {pdfDownloadActive && (
                            <PDFDownloadLink
                              document={generatePDF(this.props.carseats)}
                              fileName=" MyCarSeatJungleList.pdf"
                            >
                              {({loading}) => (
                                <button
                                  type="button"
                                  className="btn btn-secondary px-4"
                                  disabled={loading}
                                >
                                  <i className="fas fa-file-download mr-2" />
                                  {loading
                                    ? 'Generating document...'
                                    : 'Download PDF list'}
                                </button>
                              )}
                            </PDFDownloadLink>
                          )}
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <CarseatListFilter />

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
    filter: state.carseat.filter,
  };
}

export default connect(
  mapStateToProps,
  {getCarseats},
)(CarseatList);

import React from 'react';
import {Link} from 'react-router-dom';

function FilterFooter({nextUrl}) {
  return (
    <div className="rounded bg-tint py-3 px-4">
      <div className="row">
        <div className="col-md-8 text-muted">
          <div className="d-table w-100 h-100">
            <div className="d-table-cell w-100 h-100 align-middle">
              Not sure what you need? Check out our{' '}
              <a href="/guide" target="_blank" className="text-underline">
                Essential Guide to Buying a Car Seat
              </a>
              .
            </div>
          </div>
        </div>
        <div className="col-md-4 text-center text-sm-right mt-3 mt-sm-0">
          <Link to={nextUrl}>
            <button
              type="button"
              className="btn btn-primary rounded text-uppercase px-5 btn-sm-block font-weight-bold"
            >
              Next
              <i className="fas fa-angle-right ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FilterFooter;

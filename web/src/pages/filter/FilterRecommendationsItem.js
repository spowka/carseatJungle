import React from 'react';
import {Link} from 'react-router-dom';

const FilterRecommendationsItem = ({carseat}) => {
  return (
    <div className="col-lg-4 mb-4 mb-lg-0">
      <div className="card rounded-lg">
        <div className="card-body text-dark">
          <div className="text-center mb-4">
            <img alt="" src={carseat.image_url} style={{height: 120 + 'px'}} />
          </div>
          <Link
            to={`/carseat/${carseat.id_carseat}`}
            className="d-block text-dark font-weight-bold"
          >
            {carseat.model} by {carseat.brand_name}
          </Link>
          <div>
            <span className="text-muted mr-1">Approx. price:</span>
            <strong>
              {carseat.price ? '£ ' + carseat.price.toFixed(2) : 'N/A'}
            </strong>
          </div>
          <div className="row mt-3">
            <div className="col-6 pr-2">
              <Link to="/" className="btn btn-buy-v w-100">
                <small>Buy from:</small>
                <img
                  alt="mothercare"
                  src="/images/logo-mothercare.png"
                  style={{height: 15 + 'px'}}
                />
              </Link>
            </div>
            <div className="col-6 pl-2">
              <Link to="/" className="btn btn-buy-v w-100">
                <small className="d-block">Buy from:</small>
                <img
                  alt="mamas&amp;papas"
                  src="/images/logo-mamasandpapas.png"
                  style={{height: 25 + 'px'}}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterRecommendationsItem;

/* eslint-disable */
import React from 'react';
import {Link} from 'react-router-dom';

const CarseatListItem = ({carseat}) => {
  let direction = carseat.is_forward_facing ? 'Forward' : '';
  if (carseat.is_rear_facing && direction !== '') direction += '/';
  direction = direction + (carseat.is_rear_facing ? 'Rear' : '');
  if (carseat.is_sideways && direction !== '') direction += '/';
  direction = direction + (carseat.is_sideways ? 'Sideways' : '');
  let installation = carseat.has_isofix ? 'ISOFIX or belt' : 'Belt';

  return (
    <div className="border-bottom py-3">
      <div className="row">
        <div className="col-sm-2 text-center">
          <img alt="" src={carseat.image_url} className="list-image" />
        </div>
        <div className="col">
          <Link
            to={`/carseat/${carseat.id_carseat}`}
            className="list-title mb-1"
          >
            {carseat.model} by {carseat.brand_name}
          </Link>
          <span className="d-block mb-3">
            <small className="d-inline-block mr-2">Brand:</small>
            {carseat.brand_logo_url && (
              <img
                alt="brand logo"
                className="list-brand"
                src={carseat.brand_logo_url}
              />
            )}
          </span>
          <div className="bg-light rounded py-2 px-3">
            <div className="row">
              <div className="col-sm-6">
                <small>
                  <table className="table table-sm mb-0">
                    <tbody>
                      <tr>
                        <td
                          className="text-muted border-top-0"
                          style={{width: '100px'}}
                        >
                          Type:
                        </td>
                        <td className="border-top-0">
                          {carseat.carseat_type_name}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-muted">Direction:</td>
                        <td>{direction}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Installation:</td>
                        <td>{installation}</td>
                      </tr>
                    </tbody>
                  </table>
                </small>
              </div>
              <div className="col-sm-6">
                <small>
                  <table className="table table-sm mb-0">
                    <tbody>
                      <tr>
                        <td
                          className="text-muted border-top-0"
                          style={{width: '100px'}}
                        >
                          Group:
                        </td>
                        <td className="border-top-0">
                          {carseat.carseat_group_name}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-muted">Child weight:</td>
                        <td>{carseat.child_weight_group_name}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Child height:</td>
                        <td>{carseat.child_height_group_name}</td>
                      </tr>
                    </tbody>
                  </table>
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <span className="list-price mt-1 mb-2">
            {carseat.price ? '£ ' + carseat.price.toFixed(2) : 'N/A'}
          </span>
          <a className="btn btn-block btn-buy-v">
            <small>Buy from:</small>
            <img
              alt="mothercare"
              src="/images/logo-mothercare.png"
              style={{height: '15px'}}
            />
          </a>
          <a className="btn btn-block btn-buy-v">
            <small className="d-block">Buy from:</small>
            <img
              alt="mamas&papas"
              src="/images/logo-mamasandpapas.png"
              style={{height: '25px'}}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarseatListItem;

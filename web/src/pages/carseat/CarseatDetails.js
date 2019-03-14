import React from 'react';
import {connect} from 'react-redux';
import {getCarseatDetails} from '../../data/carseat/CarseatActions';
import BreadCrumb from '../../components/layout/BreadCrumb';

class CarseatDetails extends React.PureComponent {
  componentDidMount() {
    const {
      match: {params},
    } = this.props;
    this.props.getCarseatDetails(params.id);
  }

  render() {
    const {carseatDetails, match} = this.props;
    if (
      !carseatDetails ||
      carseatDetails.id_carseat !== parseInt(match.params.id, 10)
    )
      return <div>loading...</div>;

    const {
      carseat_type_name,
      image_url,
      brand_name,
      brand_logo_url,
      carseat_group_name,
      child_height_group_name,
      child_weight_group_name,
      price,
      is_rear_facing,
      is_sideways,
      is_forward_facing,
      has_swivel,
      has_erf,
      has_advanced_sip,
    } = carseatDetails;

    return (
      <main className="flex-shrink-0">
        <BreadCrumb
          history={[
            {text: 'Home', link: '/'},
            {text: 'Car seat library', link: '/seats'},
          ]}
          text="Details"
        />

        <div className="container py-4">
          <h1 className="page-title mb-4">{carseat_type_name}</h1>
          <div className="row">
            <div className="col-md-4">
              <img alt={carseat_type_name} src={image_url} className="w-100" />
            </div>
            <div className="col-md-8">
              <div className="row mt-5 mt-md-0">
                <div className="col-7 clearfix">
                  {/* eslint-disable-next-line */}
                  <a
                    className="btn btn-buy-v float-left mr-2"
                    style={{width: '130px'}}
                    href="#"
                  >
                    <small>Buy from:</small>
                    <img
                      alt="mothercare"
                      src="/images/logo-mothercare.png"
                      style={{height: '15px'}}
                    />
                  </a>
                  {/* eslint-disable-next-line */}
                  <a
                    className="btn btn-buy-v float-left"
                    style={{width: '130px'}}
                    href="#"
                  >
                    <small className="d-block">Buy from:</small>
                    <img
                      alt="mamas&papas"
                      src="/images/logo-mamasandpapas.png"
                      style={{height: '25px'}}
                    />
                  </a>
                </div>
                <div className="col-5 text-right">
                  <img
                    alt={brand_name}
                    src={brand_logo_url}
                    className="details-brand"
                  />
                </div>
              </div>

              <div className="bg-light py-3 px-4 rounded mt-4">
                <table className="table table-sm mb-0">
                  <tbody>
                    <tr>
                      <td
                        className="text-muted border-top-0"
                        style={{width: '120px'}}
                      >
                        Type:
                      </td>
                      <td className="border-top-0">{carseat_type_name}</td>
                    </tr>
                    <tr>
                      <td className="text-muted" style={{width: '100px'}}>
                        Group:
                      </td>
                      <td>{carseat_group_name}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Child weight:</td>
                      <td>{child_weight_group_name}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Child height:</td>
                      <td>{child_height_group_name}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Direction:</td>
                      {is_rear_facing && <td>Rear - facing</td>}
                      {is_sideways && <td>Side - Ways</td>}
                      {is_forward_facing && <td>Forward - Facing</td>}
                    </tr>
                    <tr>
                      <td className="text-muted">Installation:</td>
                      {/* ISOFIX or belt */}
                      <td>{'???'}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Advanced SIP:</td>
                      <td>{has_advanced_sip ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">ERF:</td>
                      <td>{has_erf ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Swivel:</td>
                      <td>{has_swivel ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Seat weight:</td>
                      <td>{'???'}</td>
                    </tr>
                    <tr>
                      <td className="text-muted">Approx. price:</td>
                      <td>
                        <i className="fas fa-pound-sign mr-2" />
                        <strong>{price}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row mt-3">
                <div className="col-sm-6">
                  {/* eslint-disable-next-line */}
                  <a
                    href="#"
                    className="btn btn-secondary btn-block mt-3 text-left"
                  >
                    <i className="fas fa-file-download mr-2" />
                    Download manual
                  </a>
                </div>
                <div className="col-sm-6">
                  {/* eslint-disable-next-line */}
                  <a
                    href="#"
                    className="btn btn-secondary btn-block mt-3 text-left"
                  >
                    <i className="fas fa-video mr-2" />
                    Watch installation video
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps({carseat: {carseatDetails}}) {
  return {
    carseatDetails,
  };
}

export default connect(
  mapStateToProps,
  {getCarseatDetails},
)(CarseatDetails);

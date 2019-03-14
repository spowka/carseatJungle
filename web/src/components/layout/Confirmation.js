import React, {Component} from 'react';

export default class Confirmation extends Component {
  constructor(self) {
    super(self);

    this.deleteClick = this.deleteClick.bind(this);
  }

  deleteClick() {
    if (this.props.onConfirm) {
      this.props.onConfirm(this.props.id);
    }
  }

  render() {
    return (
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={{
          display: 'block',
          background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
        }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title d-inline-block text-truncate pr-2">
                <i
                  className="fac fas fa-fw fa-minus mr-2"
                  style={{backgroundColor: '#E1564B'}}
                />
                {this.props.title}
              </h5>
              <button
                id="confirmationClose"
                type="button"
                className="close"
                onClick={this.props.onClose}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p className="text-muted">{this.props.message}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success btn-min-width btn-rounded"
                onClick={this.deleteClick}
              >
                {this.props.buttonLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

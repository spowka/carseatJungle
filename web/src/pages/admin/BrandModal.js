import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  FormGroup,
  Input,
} from 'reactstrap';
import connect from 'react-redux/es/connect/connect';
import {getOrigins} from '../../data/origin/OriginActions.js';

class BrandModal extends React.Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      name: '',
      position: '',
      logo_url: '',
      website_url: '',
      id_origin: '',
    };

    this.onOpened = this.onOpened.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({target: {value, name}}) {
    this.setState({
      [name]: value,
    });
  }

  onOpened() {
    const {brand} = this.props;
    const {name, position, logo_url, website_url, id_origin} = brand;
    this.setState({
      name: name || '',
      position: position || '',
      logo_url: logo_url || '',
      website_url: website_url || '',
      id_origin: id_origin || '',
    });
  }

  componentDidMount() {
    const {getOrigins} = this.props;
    getOrigins();
  }

  render() {
    const {isOpen, closeModal, origins, onSubmit = () => {}} = this.props;
    const {name, position, logo_url, website_url, id_origin} = this.state;
    return (
      <Modal
        onOpened={this.onOpened}
        isOpen={!!isOpen}
        toggle={closeModal}
        size="sm"
      >
        <ModalHeader>
          <div className="modal-header-inner">
            <div className="funding-modal-title">
              {isOpen === 'UPDATE' ? name : 'ADD NEW BRAND'}
            </div>
            <button
              type="button"
              className="close funding-modal-close"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Brand Name</Label>
              <Input name="name" onChange={this.handleChange} value={name} />
            </FormGroup>
            <FormGroup>
              <Label>Position</Label>
              <Input
                name="position"
                onChange={this.handleChange}
                value={position}
              />
            </FormGroup>
            <FormGroup>
              <Label>Logo Url</Label>
              <Input
                name="logo_url"
                onChange={this.handleChange}
                value={logo_url}
              />
            </FormGroup>
            <FormGroup>
              <Label>Website Url</Label>
              <Input
                name="website_url"
                onChange={this.handleChange}
                value={website_url}
              />
            </FormGroup>
            <FormGroup>
              <Label>Origin</Label>
              <Input
                type="select"
                onChange={this.handleChange}
                name="id_origin"
              >
                <option value="">Select Origin</option>
                {origins.map((item, key) => (
                  <option
                    key={key}
                    selected={item.id_origin === id_origin}
                    value={item.id_origin}
                  >
                    {item.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => onSubmit(this.state)}>
            Submit
          </Button>{' '}
          <Button color="secondary" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    origins: state.origin.origins,
  };
}
export default connect(
  mapStateToProps,
  {getOrigins},
)(BrandModal);

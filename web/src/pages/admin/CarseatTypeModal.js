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

class CarseatTypeModal extends React.Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      name: '',
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
    const {carseatType} = this.props;
    const {name} = carseatType;
    this.setState({
      name: name || '',
    });
  }

  render() {
    const {isOpen, closeModal, onSubmit = () => {}} = this.props;
    const {name} = this.state;

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
              {isOpen === 'UPDATE' ? name : 'ADD NEW SHOP'}
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
              <Label>Shop Name</Label>
              <Input name="name" onChange={this.handleChange} value={name} />
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

export default CarseatTypeModal;

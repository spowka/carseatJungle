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

class RankingProviderModal extends React.Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      name: '',
      position: '',
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
    const {rankingProvider} = this.props;
    const {name} = rankingProvider;
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
              {isOpen === 'UPDATE' ? name : 'ADD NEW ORIGIN'}
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
              <Label>Group Name</Label>
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

export default RankingProviderModal;

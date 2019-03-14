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

class RankingValueModal extends React.Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      name: '',
      id_ranking_provider: '',
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
    const {rankingValue} = this.props;
    const {name} = rankingValue;
    this.setState({
      name: name || '',
    });
  }

  render() {
    const {isOpen, closeModal, rankingValue, onSubmit = () => {}} = this.props;
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
              <Label>Name</Label>
              <Input name="name" onChange={this.handleChange} value={name} />
            </FormGroup>

            <FormGroup>
              <Label>Provider</Label>
              <Input
                type="select"
                onChange={this.handleChange}
                name="id_ranking_provider"
              >
                <option selected disabled>
                  Select Provider
                </option>
                {this.props.rankingProviders.map((p, key) => (
                  <option
                    key={`${name}-${key}`}
                    selected={
                      rankingValue.id_ranking_provider === p.id_ranking_provider
                    }
                    value={p.id_ranking_provider}
                  >
                    {p.name}
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

export default RankingValueModal;

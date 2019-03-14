import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import {connect} from 'react-redux';
import {getShops} from '../../data/shop/ShopActions';

class CarseatAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedShop: '1',
      item: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.renderShops = this.renderShops.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    if (this.props.shopsEnabled) {
      this.props.getShops();
    }
  }

  handleInputChange({target: {name, value}}) {
    this.setState({
      [name]: value,
    });
  }

  reset() {
    this.setState({
      selectedShop: '1',
      item: '',
    });
  }

  addItem() {
    this.props.addItem(
      this.props.name.toLowerCase(),
      this.state.item,
      this.state.selectedShop,
    );
    this.setState({
      selectedShop: '1',
      item: '',
    });
    this.props.modalToggle({
      target: {
        name: this.props.name,
      },
    });
  }

  renderShops() {
    return (
      <FormGroup>
        <Label>Shop</Label>
        <Input
          type="select"
          onChange={e =>
            this.setState({
              selectedShop: e.target.value,
            })
          }
          value={this.props.selectedShop}
        >
          {this.props.shops.shops.map(shop => {
            return (
              <option key={shop.id_shop} value={shop.id_shop}>
                {shop.name}
              </option>
            );
          })}
        </Input>
      </FormGroup>
    );
  }

  render() {
    const {isOpenModal2, modalToggle, title, name, shopsEnabled} = this.props;
    return (
      <Modal
        isOpen={isOpenModal2}
        toggle={modalToggle}
        className={''}
        onClosed={this.reset}
      >
        <ModalHeader>Add New {title}</ModalHeader>
        <ModalBody>
          {shopsEnabled ? this.renderShops() : null}
          <FormGroup>
            <Label>{title}</Label>
            <Input
              type={'text'}
              name="item"
              onChange={this.handleInputChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" name={name} onClick={this.addItem}>
            Save
          </Button>{' '}
          <Button color="secondary" name={name} onClick={modalToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    shops: state.shop,
  };
}

export default connect(
  mapStateToProps,
  {
    getShops,
  },
)(CarseatAddModal);

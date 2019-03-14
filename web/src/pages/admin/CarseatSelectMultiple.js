import React from 'react';
import {Button, FormGroup, Label, Input, Row} from 'reactstrap';
import {connect} from 'react-redux';
import {getShops} from '../../data/shop/ShopActions';
import CarseatAddModal from './CarseatAddModal';

class CarseatSelectMultiple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChoice: '',
      selectedShop: 0,
    };
  }

  render() {
    const {
      modalToggle,
      addItem,
      removeSelected,
      isOpenModal2,
      name,
      selected = [],
      shopsEnabled,
    } = this.props;

    const {selectedChoice} = this.state;

    return (
      <div className={'collapse_con'}>
        <FormGroup>
          <Label>{name}</Label>
          <Input
            type="select"
            name={name}
            id={name}
            multiple
            onChange={e =>
              this.setState({
                selectedChoice: e.target.value,
              })
            }
            value={[selectedChoice]}
          >
            {selected.map((item, key) => {
              const itemUrl = item[name.toLowerCase().slice(0, -1) + '_url'];
              return (
                <option key={key} value={itemUrl}>
                  {itemUrl}
                </option>
              );
            })}
          </Input>
        </FormGroup>
        <Row className={'btn_con'}>
          <Button
            className={'add_new'}
            name={name}
            onClick={modalToggle}
            size={'sm'}
          >
            Add
          </Button>
          <Button
            className={'add_new'}
            name={name}
            onClick={() => {
              console.log(selectedChoice);
              removeSelected(selectedChoice);
            }}
            size={'sm'}
            color="danger"
          >
            Remove
          </Button>
        </Row>
        <div>
          <CarseatAddModal
            title={name.slice(0, -1)}
            isOpenModal2={isOpenModal2}
            modalToggle={modalToggle}
            addItem={addItem}
            shopsEnabled={shopsEnabled}
            name={name}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    shops: state.shops,
  };
}

export default connect(
  mapStateToProps,
  {
    getShops,
  },
)(CarseatSelectMultiple);

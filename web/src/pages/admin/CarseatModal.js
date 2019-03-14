import React from 'react';
import {
  Container,
  Row,
  Col,
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
import {connect} from 'react-redux';
import axios from 'axios';
import {getCarseatTypes} from '../../data/carseatType/CarseatTypeActions';
import {getCarseatGroups} from '../../data/carseatGroup/CarseatGroupActions';
import {getChildHeightGroups} from '../../data/childHeightGroup/ChildHeightGroupActions';
import {getChildWeightGroups} from '../../data/childWeightGroup/ChildWeightGroupActions';
import {getBrands} from '../../data/brand/BrandActions';
import {getOrigins} from '../../data/origin/OriginActions';
import {getShops} from '../../data/shop/ShopActions';
import {getRankingProviders} from '../../data/rankingProvider/RankingProviderActions';
import {getRankingValues} from '../../data/rankingValue/RankingValueActions';
import CustomInput from 'reactstrap/es/CustomInput';
import {getCarseatDetails} from '../../data/carseat/CarseatActions';
import SelectMultiple from './CarseatSelectMultiple';

class CarseatModal extends React.Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.defaultState = {
      collapseListings: false,
      collapseVideos: false,
      collapseManuals: false,
      dataIsLoad: false,
      brand_name: '',
      depth: 0,
      has_advanced_sip: false,
      has_erf: false,
      has_isofix: false,
      has_swivel: false,
      has_travel_system: false,
      has_uv_canopy: false,
      height: 0,
      is_aircraft_approved: false,
      is_forward_facing: false,
      is_i_size_compliant: false,
      is_rear_facing: false,
      is_sideways: false,
      is_swedish_plus_tested: false,
      is_uk_available: false,
      is_isofix_base_required: false,
      image_url: '',
      isofix_base: '',
      direction_of_travel: '',
      isofix: '',
      price_range: '',
      awards: '',
      fabrics: '',
      model: '',
      price: 0,
      weight: 0,
      width: 0,
      angle: 0,
      videos: [],
      listings: [],
      manuals: [],
      uploading: false,
    };
    this.state = this.defaultState;
    this.onOpened = this.onOpened.bind(this);
    this.onClosed = this.onClosed.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.removeSelectedItem = this.removeSelectedItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange({target: {value, name}}) {
    this.setState({
      [name]: value,
    });
  }

  handleCheckboxChange({target: {checked, name}}) {
    this.setState({
      [name]: checked,
    });
  }

  handleFileUpload({target: {files}}) {
    const imageFile = files[0];
    this.setState(
      {
        image_url: URL.createObjectURL(imageFile),
        uploading: true,
      },
      async () => {
        const formData = new FormData();
        formData.append('image_file', imageFile);
        const {data} = await axios.post(
          `/api/v1/upload/carseat/${this.state.id_carseat}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        this.setState({
          image_url: data,
          uploading: false,
        });
      },
    );
  }

  toggle({target: {name}}) {
    this.setState({
      ['collapse' + name]: !this.state['collapse' + name],
    });
  }

  // TODO move to parent page.
  componentDidMount() {
    const {
      getCarseatGroups,
      getChildWeightGroups,
      getChildHeightGroups,
      getBrands,
      getCarseatTypes,
      getShops,
      getOrigins,
      getRankingProviders,
      getRankingValues,
    } = this.props;
    getCarseatGroups();
    getChildWeightGroups();
    getChildHeightGroups();
    getBrands();
    getCarseatTypes();
    getShops();
    getOrigins();
    getRankingProviders();
    getRankingValues();
  }

  onOpened() {
    const {editingCarseat = null, isOpen, getCarseatDetails} = this.props;
    if (isOpen !== 'UPDATE') return this.setState(this.defaultState);
    getCarseatDetails(editingCarseat).then(() => {
      const {carseatDetails} = this.props;
      this.setState({
        ...carseatDetails,
        dataIsLoad: true,
      });
    });
  }

  onClosed() {
    this.setState({
      dataIsLoad: false,
    });
  }

  removeSelectedItem(listName, item) {
    const selectedItems = this.state[listName];

    const newSelectedItems = selectedItems.filter(selectedItem => {
      console.log(
        item,
        selectedItem[`${listName.slice(0, -1)}_url`],
        listName.slice(0, -1),
      );
      return item !== selectedItem[`${listName.slice(0, -1)}_url`];
    });
    this.setState({
      [listName]: newSelectedItems,
    });
  }

  addItem(listName, item, id_shop) {
    const selectedItems = this.state[listName];
    console.log(listName, item, selectedItems);
    const newSelectedItems = [
      ...selectedItems,
      {
        [`${listName.slice(0, -1)}_url`]: item,
        date_changed: Date.now(),
        position: selectedItems.length + 1,
        ...(id_shop >= 0 ? {id_shop} : {}),
      },
    ];
    this.setState({
      [listName]: newSelectedItems,
    });
  }

  render() {
    const {
      isOpen,
      closeModal,
      onSubmit = () => {},
      brands,
      carseatTypes,
      carseatGroup,
      childHeightGroups,
      childWeightGroup,
      carseatDetails,
    } = this.props;

    let {
      brand_name,
      depth,
      has_advanced_sip,
      has_erf,
      has_isofix,
      has_swivel,
      has_travel_system,
      has_uv_canopy,
      height,
      is_aircraft_approved,
      is_forward_facing,
      is_i_size_compliant,
      is_rear_facing,
      is_sideways,
      is_swedish_plus_tested,
      is_uk_available,
      is_isofix_base_required,
      image_url,
      isofix_base,
      direction_of_travel,
      isofix,
      price_range,
      awards,
      fabrics,
      model,
      price,
      weight,
      width,
      angle,
      videos,
      listings,
      manuals,
      collapseListings,
      collapseManuals,
      collapseVideos,
      dataIsLoad,
    } = this.state;
    console.log('this.state', this.state);

    return (
      <Modal
        onOpened={this.onOpened}
        onClosed={this.onClosed}
        isOpen={!!isOpen}
        toggle={closeModal}
        size="lg"
        width={800}
        style={{width: '1000px'}}
      >
        <ModalHeader>
          <div className="modal-header-inner">
            <div className="funding-modal-title">{brand_name}</div>
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
          {!dataIsLoad && isOpen === 'UPDATE' ? (
            ''
          ) : (
            <Form>
              <Container>
                <Row>
                  <Col>
                    <Select
                      handleChange={this.handleChange}
                      selected={carseatDetails}
                      items={brands}
                      label={'Brand'}
                      field={'id_brand'}
                    />
                    <FormGroup>
                      <Label>Carseat Image</Label>
                      <input
                        type="file"
                        className="file-input"
                        name="carseat-img"
                        id="carseat-img"
                        onChange={this.handleFileUpload}
                      />
                      <label
                        htmlFor="carseat-img"
                        className="carseat-image-holder"
                      >
                        <img className="carseat-image" src={image_url} alt="" />
                      </label>
                    </FormGroup>
                    <Select
                      handleChange={this.handleChange}
                      selected={carseatDetails}
                      items={carseatGroup}
                      label={'Group'}
                      field={'id_carseat_group'}
                    />
                    <Select
                      handleChange={this.handleChange}
                      selected={carseatDetails}
                      items={carseatTypes}
                      label={'Type'}
                      field={'id_carseat_type'}
                    />
                    <Select
                      handleChange={this.handleChange}
                      selected={carseatDetails}
                      items={childHeightGroups}
                      label={'Child Height Group'}
                      field={'id_child_height_group'}
                    />
                    <Select
                      handleChange={this.handleChange}
                      selected={carseatDetails}
                      items={childWeightGroup}
                      label={'Child Weight Group'}
                      field={'id_child_weight_group'}
                    />
                    <FormGroup>
                      <Label>Direction of Travel</Label>
                      <Input
                        type={'text'}
                        name="direction_of_travel"
                        onChange={this.handleChange}
                        value={direction_of_travel}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Price Range</Label>
                      <Input
                        type={'text'}
                        name="price_range"
                        onChange={this.handleChange}
                        value={price_range}
                      />
                    </FormGroup>
                    <SelectMultiple
                      selected={listings}
                      label={'Listings'}
                      name={'Listings'}
                      modalToggle={this.toggle}
                      addItem={this.addItem}
                      shopsEnabled={true}
                      removeSelected={item =>
                        this.removeSelectedItem('listings', item)
                      }
                      isOpenModal2={collapseListings}
                    />
                    <SelectMultiple
                      selected={manuals}
                      label={'Manuals'}
                      name={'Manuals'}
                      modalToggle={this.toggle}
                      addItem={this.addItem}
                      removeSelected={item =>
                        this.removeSelectedItem('manuals', item)
                      }
                      isOpenModal2={collapseManuals}
                    />
                    <SelectMultiple
                      selected={videos}
                      label={'Videos'}
                      name={'Videos'}
                      modalToggle={this.toggle}
                      addItem={this.addItem}
                      removeSelected={item =>
                        this.removeSelectedItem('videos', item)
                      }
                      isOpenModal2={collapseVideos}
                    />
                  </Col>
                  <Col>
                    <div className={'inpCon'}>
                      <FormGroup>
                        <Label>Model</Label>
                        <Input
                          type={'text'}
                          name="model"
                          onChange={this.handleChange}
                          value={model}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Debit</Label>
                        <Input
                          type={'number'}
                          name="depth"
                          onChange={this.handleChange}
                          value={depth & depth}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Height</Label>
                        <Input
                          type={'number'}
                          name="height"
                          onChange={this.handleChange}
                          value={height & height}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Width</Label>
                        <Input
                          type={'number'}
                          name="width"
                          onChange={this.handleChange}
                          value={width & width}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Weight</Label>
                        <Input
                          type={'number'}
                          name="weight"
                          onChange={this.handleChange}
                          value={weight & weight}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Price</Label>
                        <Input
                          type={'number'}
                          name="price"
                          onChange={this.handleChange}
                          value={price & price}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Angle</Label>
                        <Input
                          type={'number'}
                          name="angle"
                          onChange={this.handleChange}
                          value={angle & angle}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>ISOFIX</Label>
                        <Input
                          type={'number'}
                          name="isofix"
                          onChange={this.handleChange}
                          value={isofix}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>ISOFIX Base</Label>
                        <Input
                          type={'number'}
                          name="isofix_base"
                          onChange={this.handleChange}
                          value={isofix_base}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Awards</Label>
                        <Input
                          type={'text'}
                          name="awards"
                          onChange={this.handleChange}
                          value={awards}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Fabrics</Label>
                        <Input
                          type={'text'}
                          name="fabrics"
                          onChange={this.handleChange}
                          value={fabrics}
                        />
                      </FormGroup>
                    </div>
                    <div className={'checkCon'}>
                      <CheckBox
                        handleChange={this.handleCheckboxChange}
                        field={'has_advanced_sip'}
                        label={'Has Advanced Sip'}
                        selected={has_advanced_sip}
                      />
                      <CheckBox
                        handleChange={this.handleCheckboxChange}
                        field={'has_erf'}
                        label={'Has Erf.'}
                        selected={has_erf}
                      />
                      <CheckBox
                        handleChange={this.handleCheckboxChange}
                        field={'has_isofix'}
                        label={'Has Iso Fix'}
                        selected={has_isofix}
                      />
                      <CheckBox
                        handleChange={this.handleCheckboxChange}
                        field={'has_swivel'}
                        label={'Has Swivel'}
                        selected={has_swivel}
                      />
                      <CheckBox
                        handleChange={this.handleCheckboxChange}
                        field={'has_travel_system'}
                        label={'Has Travel System'}
                        selected={has_travel_system}
                      />
                      <CheckBox
                        handleChange={this.handleCheckboxChange}
                        field={'has_uv_canopy'}
                        label={'Has uv Canopy'}
                        selected={has_uv_canopy}
                      />
                      <CheckBox
                        handleChange={this.handleCheckboxChange}
                        field={'is_aircraft_approved'}
                        label={'Aircraft Approved'}
                        selected={is_aircraft_approved}
                      />
                      <CheckBox
                        handleChange={this.handleCheckboxChange}
                        field={'is_forward_facing'}
                        label={'Forward Facing'}
                        selected={is_forward_facing}
                      />
                      <CheckBox
                        handleChange={this.handleCheckboxChange}
                        field={'is_i_size_compliant'}
                        label={'Size Compliant'}
                        selected={is_i_size_compliant}
                      />
                      <CheckBox
                        handleChange={this.handleCheckboxChange}
                        field={'is_rear_facing'}
                        label={'Rear Facing'}
                        selected={is_rear_facing}
                      />
                      <CheckBox
                        handleChange={this.handleCheckboxChange}
                        field={'is_sideways'}
                        label={'Sideways'}
                        selected={is_sideways}
                      />
                      <CheckBox
                        handleChange={this.handleCheckboxChange}
                        field={'is_swedish_plus_tested'}
                        label={'Swedish Plus Tested'}
                        selected={is_swedish_plus_tested}
                      />
                      <CheckBox
                        handleChange={this.handleCheckboxChange}
                        field={'is_uk_available'}
                        label={'UK Available'}
                        selected={is_uk_available}
                      />
                      <CheckBox
                        handleChange={this.handleCheckboxChange}
                        field={'is_isofix_base_required'}
                        label={'ISOFIX Base Required'}
                        selected={is_isofix_base_required}
                      />
                    </div>
                  </Col>
                </Row>
              </Container>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            disabled={this.state.uploading}
            onClick={() => onSubmit(this.state)}
          >
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

function Select({items = [], selected, label, handleChange, field}) {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input type="select" onChange={handleChange} name={field}>
        {items.map((item, key) => (
          <option
            key={key}
            value={item[field]}
            selected={item[field] === selected[field]}
          >
            {item.name}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
}

function CheckBox({handleChange, field, label, selected = false}) {
  return (
    <CustomInput
      type="checkbox"
      checked={selected}
      value={selected}
      id={field}
      onChange={handleChange}
      name={field}
      label={label}
    />
  );
}

function mapStateToProps(state) {
  return {
    brands: state.brand.brands,
    carseatDetails: state.carseat.carseatDetails,
    carseatTypes: state.carseatType.carseatTypes,
    carseatGroup: state.carseatGroup.carseatGroups,
    childHeightGroups: state.childHeightGroup.childHeightGroups,
    childWeightGroup: state.childWeightGroup.childWeightGroups,
  };
}

export default connect(
  mapStateToProps,
  {
    getCarseatDetails,
    getCarseatGroups,
    getChildWeightGroups,
    getChildHeightGroups,
    getBrands,
    getCarseatTypes,
    getShops,
    getOrigins,
    getRankingProviders,
    getRankingValues,
  },
)(CarseatModal);

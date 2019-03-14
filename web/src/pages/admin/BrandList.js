import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactTable from 'react-table';
import {
  getBrands,
  deleteBrand,
  updateBrand,
  createBrand,
} from '../../data/brand/BrandActions.js';

import Confirmation from '../../components/layout/Confirmation.js';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar.js';
import 'react-table/react-table.css';
import './admin.css';
import BrandModal from './BrandModal.js';

class BrandList extends Component {
  constructor(self) {
    super(self);
    this.state = {
      selectedItem: null,
      isDeleting: false,
      isOpenModal: false,
      editingBrand: {},
    };

    this.fetchData = this.fetchData.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItemClick = this.deleteItemClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.closeEditingModal = this.closeEditingModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.updateBrand = this.updateBrand.bind(this);
    this.addItem = this.addItem.bind(this);
    this.createNewBrand = this.createNewBrand.bind(this);
  }

  tableColumns = [
    {
      Header: 'Name',
      accessor: 'name',
      style: {
        paddingTop: '12px',
        width: '100',
      },
    },
    {
      Header: 'Position',
      accessor: 'position',
      filterable: false,
      width: 80,
      style: {
        paddingTop: '12px',
      },
    },
    {
      Header: 'Logo Url',
      accessor: 'logo_url',
      style: {
        paddingTop: '12px',
      },
    },
    {
      Header: 'Website Url',
      accessor: 'website_url',
      style: {
        paddingTop: '12px',
      },
    },
    {
      id_origin: 'edit',
      Header: 'Origin',
      accessor: 'origin_name',
      style: {
        paddingTop: '12px',
      },
    },
    {
      id: 'edit',
      accessor: 'id_brand',
      filterable: false,
      Cell: ({value}) => (
        <div className="clearfix">
          <div className="btn-group btn-group-sm float-right" role="group">
            <button
              onClick={() => this.editItem({value})}
              type="button"
              className="btn btn-secondary border-radius-right-0"
            >
              <i className="far fa-fw fa-edit" />
            </button>
            <button
              onClick={() => this.deleteItemClick({value})}
              type="button"
              className="btn btn-danger border-left border-radius-left-0"
            >
              <i className="far fa-fw fa-trash-alt" />
            </button>
          </div>
        </div>
      ),
    },
  ];

  fetchData(state) {
    const {getBrands} = this.props;
    let sortBy = '';

    for (let i = 0; i < state.sorted.length; i++) {
      if (sortBy !== '') sortBy += ',';
      sortBy += state.sorted[i].id + (state.sorted[i].desc ? ' desc' : '');
    }

    const filter = encodeURIComponent(JSON.stringify(state.filtered));
    getBrands(state.page + 1, state.pageSize, sortBy, filter);
  }

  getDeleteMessage() {
    return (
      <>
        Are you sure you want to delete the brand{' '}
        <strong className="text-dark">
          {this.state.selectedItem ? this.state.selectedItem.name : ''}
        </strong>
        ? This action cannot be undone.
      </>
    );
  }

  editItem({value: id}) {
    const {brands = []} = this.props;
    const brand = brands.find(s => s.id_brand === id);

    this.setState({
      isOpenModal: 'UPDATE',
      editingBrand: brand || {},
    });
  }

  addItem() {
    this.setState({
      isOpenModal: 'CREATE',
    });
  }

  closeEditingModal() {
    this.setState({
      isOpenModal: false,
      editingBrand: {},
    });
  }

  closeAddModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  deleteItemClick(id) {
    this.setState({
      selectedItem: this.props.brands.filter(u => u.id_brand === id.value)[0],
      isDeleting: true,
    });
  }

  deleteItem(id) {
    this.setState({selectedItem: null, isDeleting: false});
    const {deleteBrand} = this.props;
    const {
      current_page,
      page_size,
      sort_by,
      filter,
    } = this.props.brandsPagination;

    deleteBrand(id).then(() =>
      getBrands(current_page, page_size, sort_by, filter),
    );
  }

  async createNewBrand({name, position, logo_url, website_url, id_origin}) {
    await this.props
      .createBrand({
        name,
        position,
        logo_url,
        website_url,
        id_origin,
        date_changed: new Date(),
      })
      .catch(() => {
        this.setState({isOpenModal: false});
        console.log('error');
        return;
      });
    const {
      current_page,
      page_size,
      sort_by,
      filter,
    } = this.props.brandsPagination;

    getBrands(current_page, page_size, sort_by, filter);
    this.setState({isOpenModal: false});
  }

  async updateBrand({name, position, logo_url, website_url, id_origin}) {
    const {editingBrand} = this.state;
    await this.props
      .updateBrand(editingBrand.id_brand, {
        ...editingBrand,
        name,
        position,
        logo_url,
        website_url,
        id_origin,
      })
      .catch(() => {
        this.setState({isOpenModal: false});
        console.log('error');
        return;
      });
    this.setState({
      isOpenModal: false,
      editingBrand: {},
    });
  }

  render() {
    const {currentUser, isLoggingIn, brands, brandsPagination} = this.props;
    if (isLoggingIn) return null;
    if (!currentUser) return <Redirect to="/login" />;
    let {isOpenModal} = this.state;

    return (
      <div className="d-table w-100 h-100">
        <div className="d-table-cell bg-dark sidebar align-top">
          <AdminSidebar />
        </div>
        <div className="d-table-cell p-5 align-top">
          <div className="mb-4 clearfix">
            <h1 className="page-title float-left text-dark mr-3">Brands</h1>
            <button
              onClick={this.addItem}
              className="float-left mt-2 btn btn-primary rounded-lg px-3"
            >
              <i className="fas fa-plus mr-2" />
              Add new
            </button>
          </div>
          <div>
            <ReactTable
              manual
              filterable
              data={brands}
              columns={this.tableColumns}
              defaultPageSize={15}
              pages={brandsPagination.total_pages}
              pageSizeOptions={[10, 15, 20, 50]}
              showPageSizeOptions={true}
              loading={brandsPagination.is_loading}
              onFetchData={this.fetchData}
              className="-striped -highlight"
            />
            {this.state.isDeleting && (
              <Confirmation
                id={this.state.selectedItem.id_brand}
                title="Delete brand"
                message={this.getDeleteMessage()}
                buttonLabel={'Delete'}
                onConfirm={this.deleteItem}
                onClose={() =>
                  this.setState({selectedItem: null, isDeleting: false})
                }
              />
            )}
          </div>
          <BrandModal
            isOpen={this.state.isOpenModal}
            brand={this.state.editingBrand}
            closeModal={
              isOpenModal === 'UPDATE'
                ? this.closeEditingModal
                : this.closeAddModal
            }
            onSubmit={
              isOpenModal === 'UPDATE' ? this.updateBrand : this.createNewBrand
            }
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    isLoggingIn: state.user.isLoggingIn,
    brands: state.brand.brands,
    brandsPagination: state.brand.brandsPagination,
  };
}

export default connect(
  mapStateToProps,
  {getBrands, deleteBrand, updateBrand, createBrand},
)(BrandList);

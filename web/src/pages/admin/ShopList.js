import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactTable from 'react-table';
import {
  getShops,
  deleteShop,
  updateShop,
  createShop,
} from '../../data/shop/ShopActions.js';
import Confirmation from '../../components/layout/Confirmation.js';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar.js';
import 'react-table/react-table.css';
import './admin.css';
import ShopModal from './ShopModal.js';

class ShopList extends Component {
  constructor(self) {
    super(self);
    this.state = {
      selectedItem: null,
      isDeleting: false,
      isOpenModal: false,
      editingShop: {},
    };

    this.fetchData = this.fetchData.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItemClick = this.deleteItemClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.closeEditingModal = this.closeEditingModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.updateShop = this.updateShop.bind(this);
    this.addItem = this.addItem.bind(this);
    this.createNewShop = this.createNewShop.bind(this);
  }

  tableColumns = [
    {
      Header: 'Name',
      accessor: 'name',
      width: 500,
      style: {paddingTop: '12px'},
    },
    {
      Header: 'Position',
      accessor: 'position',
      width: 80,
      style: {textAlign: 'right', paddingTop: '12px'},
    },
    {
      id: 'edit',
      accessor: 'id_shop',
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
    const {getShops} = this.props;
    let sortBy = '';

    for (let i = 0; i < state.sorted.length; i++) {
      if (sortBy !== '') sortBy += ',';
      sortBy += state.sorted[i].id + (state.sorted[i].desc ? ' desc' : '');
    }

    const filter = encodeURIComponent(JSON.stringify(state.filtered));
    getShops(state.page + 1, state.pageSize, sortBy, filter);
  }

  getDeleteMessage() {
    return (
      <>
        Are you sure you want to delete the shop{' '}
        <strong className="text-dark">
          {this.state.selectedItem ? this.state.selectedItem.name : ''}
        </strong>
        ? This action cannot be undone.
      </>
    );
  }

  editItem({value: id}) {
    const {shops = []} = this.props;
    const shop = shops.find(s => s.id_shop === id);

    this.setState({
      isOpenModal: 'UPDATE',
      editingShop: shop || {},
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
      editingShop: {},
    });
  }

  closeAddModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  deleteItemClick(id) {
    this.setState({
      selectedItem: this.props.shops.filter(u => u.id_shop === id.value)[0],
      isDeleting: true,
    });
  }

  deleteItem(id) {
    this.setState({selectedItem: null, isDeleting: false});
    const {deleteShop} = this.props;
    const {
      current_page,
      page_size,
      sort_by,
      filter,
    } = this.props.shopsPagination;

    deleteShop(id).then(() =>
      getShops(current_page, page_size, sort_by, filter),
    );
  }

  async createNewShop({name, position}) {
    await this.props
      .createShop({
        name,
        position,
        date_changed: new Date(),
      })
      .catch(() => {
        this.setState({
          isOpenModal: false,
        });
        console.log('error');
        return;
      });
    const {
      current_page,
      page_size,
      sort_by,
      filter,
    } = this.props.shopsPagination;

    getShops(current_page, page_size, sort_by, filter);
    this.setState({isOpenModal: false});
  }

  async updateShop({name, position}) {
    const {editingShop} = this.state;
    await this.props
      .updateShop(editingShop.id_shop, {
        ...editingShop,
        name,
        position,
      })
      .catch(() => {
        this.setState({isOpenModal: false});
        console.log('error');
        return;
      });
    this.setState({
      isOpenModal: false,
      editingShop: {},
    });
  }

  render() {
    const {currentUser, isLoggingIn, shops, shopsPagination} = this.props;
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
            <h1 className="page-title float-left text-dark mr-3">Shops</h1>
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
              data={shops}
              columns={this.tableColumns}
              defaultPageSize={15}
              pages={shopsPagination.total_pages}
              pageSizeOptions={[10, 15, 20, 50]}
              showPageSizeOptions={true}
              loading={shopsPagination.is_loading}
              onFetchData={this.fetchData}
              className="-striped -highlight"
            />
            {this.state.isDeleting && (
              <Confirmation
                id={this.state.selectedItem.id_shop}
                title="Delete shop"
                message={this.getDeleteMessage()}
                buttonLabel={'Delete'}
                onConfirm={this.deleteItem}
                onClose={() =>
                  this.setState({selectedItem: null, isDeleting: false})
                }
              />
            )}
          </div>
          <ShopModal
            isOpen={this.state.isOpenModal}
            shop={this.state.editingShop}
            closeModal={
              isOpenModal === 'UPDATE'
                ? this.closeEditingModal
                : this.closeAddModal
            }
            onSubmit={
              isOpenModal === 'UPDATE' ? this.updateShop : this.createNewShop
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
    shops: state.shop.shops,
    shopsPagination: state.shop.shopsPagination,
  };
}

export default connect(
  mapStateToProps,
  {getShops, deleteShop, updateShop, createShop},
)(ShopList);

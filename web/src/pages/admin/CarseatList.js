import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactTable from 'react-table';
import {
  getCarseats,
  deleteCarseat,
  updateCarseat,
  createCarseat,
} from '../../data/carseat/CarseatActions.js';
import Confirmation from '../../components/layout/Confirmation.js';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar.js';
import 'react-table/react-table.css';
import './admin.css';
import CarseatModal from './CarseatModal.js';

class CarseatList extends Component {
  constructor(self) {
    super(self);
    this.state = {
      selectedItem: null,
      isDeleting: false,
      isOpenModal: false,
      editingCarseat: null,
    };

    this.fetchData = this.fetchData.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItemClick = this.deleteItemClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.closeEditingModal = this.closeEditingModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.updateCarseat = this.updateCarseat.bind(this);
    this.addItem = this.addItem.bind(this);
    this.createNewCarseat = this.createNewCarseat.bind(this);
  }

  tableColumns = [
    {
      Header: 'Brand',
      accessor: 'brand_name',
      style: {
        paddingTop: '12px',
      },
    },
    {
      Header: 'Model',
      accessor: 'model',
      style: {
        paddingTop: '12px',
      },
    },
    {
      id: 'edit',
      accessor: 'id_carseat',
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
    const {getCarseats} = this.props;
    let sortBy = '';

    for (let i = 0; i < state.sorted.length; i++) {
      if (sortBy !== '') sortBy += ',';
      sortBy += state.sorted[i].id + (state.sorted[i].desc ? ' desc' : '');
    }

    const filter = encodeURIComponent(JSON.stringify(state.filtered));
    getCarseats(state.page + 1, state.pageSize, sortBy, filter);
  }

  getDeleteMessage() {
    return (
      <>
        Are you sure you want to delete the carseat{' '}
        <strong className="text-dark">
          {this.state.selectedItem ? this.state.selectedItem.name : ''}
        </strong>
        ? This action cannot be undone.
      </>
    );
  }

  editItem({value: id}) {
    this.setState({
      isOpenModal: 'UPDATE',
      editingCarseat: id,
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
      editingCarseat: null,
    });
  }

  closeAddModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  deleteItemClick(id) {
    this.setState({
      selectedItem: this.props.carseats.filter(
        u => u.id_carseat === id.value,
      )[0],
      isDeleting: true,
    });
  }

  deleteItem(id) {
    this.setState({selectedItem: null, isDeleting: false});
    const {deleteCarseat} = this.props;
    const {
      current_page,
      page_size,
      sort_by,
      filter,
    } = this.props.carseatsPagination;

    deleteCarseat(id).then(() =>
      getCarseats(current_page, page_size, sort_by, filter),
    );
  }

  async createNewCarseat(carseat) {
    await this.props.createCarseat(carseat).catch(() => {
      console.log('error');
      return;
    });
    const {
      current_page,
      page_size,
      sort_by,
      filter,
    } = this.props.carseatsPagination;

    getCarseats(current_page, page_size, sort_by, filter);
    this.setState({isOpenModal: false});
  }

  async updateCarseat(carseat) {
    const {editingCarseat} = this.state;
    await this.props.updateCarseat(editingCarseat, carseat).catch(() => {
      this.setState({isOpenModal: false});
      console.log('error');
      return;
    });
    this.setState({
      isOpenModal: false,
      editingCarseat: null,
    });
  }

  render() {
    const {currentUser, isLoggingIn, carseats, carseatsPagination} = this.props;
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
            <h1 className="page-title float-left text-dark mr-3">Carseats</h1>
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
              data={carseats}
              columns={this.tableColumns}
              defaultPageSize={15}
              pages={carseatsPagination.total_pages}
              pageSizeOptions={[10, 15, 20, 50]}
              showPageSizeOptions={true}
              loading={carseatsPagination.is_loading}
              onFetchData={this.fetchData}
              className="-striped -highlight"
            />
            {this.state.isDeleting && (
              <Confirmation
                id={this.state.selectedItem.id_carseat}
                title="Delete carseat"
                message={this.getDeleteMessage()}
                buttonLabel={'Delete'}
                onConfirm={this.deleteItem}
                onClose={() =>
                  this.setState({selectedItem: null, isDeleting: false})
                }
              />
            )}
          </div>
          <CarseatModal
            isOpen={this.state.isOpenModal}
            editingCarseat={this.state.editingCarseat}
            closeModal={
              isOpenModal === 'UPDATE'
                ? this.closeEditingModal
                : this.closeAddModal
            }
            onSubmit={
              isOpenModal === 'UPDATE'
                ? this.updateCarseat
                : this.createNewCarseat
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
    carseats: state.carseat.carseats,
    carseatsPagination: state.carseat.carseatsPagination,
  };
}

export default connect(
  mapStateToProps,
  {getCarseats, deleteCarseat, updateCarseat, createCarseat},
)(CarseatList);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactTable from 'react-table';

import {
  getCarseatTypes,
  deleteCarseatType,
  updateCarseatType,
  createCarseatType,
} from '../../data/carseatType/CarseatTypeActions';
import Confirmation from '../../components/layout/Confirmation.js';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar.js';
import 'react-table/react-table.css';
import './admin.css';
import CarseatTypeModal from './CarseatTypeModal';

class CarseatTypeList extends Component {
  constructor(self) {
    super(self);
    this.state = {
      selectedItem: null,
      isDeleting: false,
      isOpenModal: false,
      editingCarseatType: {},
    };

    this.fetchData = this.fetchData.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItemClick = this.deleteItemClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.closeEditingModal = this.closeEditingModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.updateCarseatType = this.updateCarseatType.bind(this);
    this.addItem = this.addItem.bind(this);
    this.createNewCarseatType = this.createNewCarseatType.bind(this);
  }

  tableColumns = [
    {Header: 'Name', accessor: 'name', width: 500, style: {paddingTop: '12px'}},
    {
      id: 'edit',
      accessor: 'id_carseat_type',
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
    const {getCarseatTypes} = this.props;
    let sortBy = '';

    for (let i = 0; i < state.sorted.length; i++) {
      if (sortBy !== '') sortBy += ',';
      sortBy += state.sorted[i].id + (state.sorted[i].desc ? ' desc' : '');
    }

    const filter = encodeURIComponent(JSON.stringify(state.filtered));
    getCarseatTypes(state.page + 1, state.pageSize, sortBy, filter);
  }

  getDeleteMessage() {
    return (
      <>
        Are you sure you want to delete this carseat type{' '}
        <strong className="text-dark">
          {this.state.selectedItem ? this.state.selectedItem.name : ''}
        </strong>
        ? This action cannot be undone.
      </>
    );
  }

  editItem({value: id}) {
    const {carseatTypes = []} = this.props;
    const carseatType = carseatTypes.find(s => s.id_carseat_type === id);

    this.setState({
      isOpenModal: 'UPDATE',
      editingCarseatType: carseatType || {},
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
      editingCarseatType: {},
    });
  }

  closeAddModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  deleteItemClick(id) {
    const {carseatTypes} = this.props;
    this.setState({
      selectedItem: carseatTypes.find(u => u.id_carseat_type === id.value),
      isDeleting: true,
    });
  }

  deleteItem(id) {
    this.setState({selectedItem: null, isDeleting: false});
    const {deleteCarseatType, getCarseatTypes} = this.props;
    const {
      current_page,
      page_size,
      sort_by,
      filter,
    } = this.props.carseatTypesPagination;

    deleteCarseatType(id).then(() =>
      getCarseatTypes(current_page, page_size, sort_by, filter),
    );
  }

  async createNewCarseatType({name}) {
    const {createCarseatType, getCarseatTypes} = this.props;
    await createCarseatType({
      name,
      date_changed: new Date(),
    }).catch(() => {
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
    } = this.props.carseatTypesPagination;

    getCarseatTypes(current_page, page_size, sort_by, filter);
    this.setState({isOpenModal: false});
  }

  async updateCarseatType({name}) {
    const {editingCarseatType} = this.state;
    await this.props
      .updateCarseatType(editingCarseatType.id_carseat_type, {
        ...editingCarseatType,
        name,
      })
      .catch(() => {
        this.setState({isOpenModal: false});
        console.log('error');
        return;
      });
    this.setState({
      isOpenModal: false,
      editingCarseatType: {},
    });
  }

  render() {
    const {
      currentUser,
      isLoggingIn,
      carseatTypes,
      carseatTypesPagination,
    } = this.props;

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
            <h1 className="page-title float-left text-dark mr-3">
              Carseat Types
            </h1>
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
              data={carseatTypes}
              columns={this.tableColumns}
              defaultPageSize={15}
              careatTypesPagination
              pages={carseatTypesPagination.total_pages}
              pageSizeOptions={[10, 15, 20, 50]}
              showPageSizeOptions={true}
              loading={carseatTypesPagination.is_loading}
              onFetchData={this.fetchData}
              className="-striped -highlight"
            />
            {this.state.isDeleting && (
              <Confirmation
                id={this.state.selectedItem.id_carseat_type}
                title="Delete Carseat Type"
                message={this.getDeleteMessage()}
                buttonLabel={'Delete'}
                onConfirm={this.deleteItem}
                onClose={() =>
                  this.setState({selectedItem: null, isDeleting: false})
                }
              />
            )}
          </div>

          <CarseatTypeModal
            isOpen={this.state.isOpenModal}
            carseatType={this.state.editingCarseatType}
            closeModal={
              isOpenModal === 'UPDATE'
                ? this.closeEditingModal
                : this.closeAddModal
            }
            onSubmit={
              isOpenModal === 'UPDATE'
                ? this.updateCarseatType
                : this.createNewCarseatType
            }
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({user, carseatType}) {
  return {
    currentUser: user.currentUser,
    isLoggingIn: user.isLoggingIn,
    carseatTypes: carseatType.carseatTypes,
    carseatTypesPagination: carseatType.carseatTypesPagination,
  };
}

export default connect(
  mapStateToProps,
  {
    getCarseatTypes,
    deleteCarseatType,
    updateCarseatType,
    createCarseatType,
  },
)(CarseatTypeList);

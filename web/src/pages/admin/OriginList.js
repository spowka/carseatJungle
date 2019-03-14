import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactTable from 'react-table';
import {
  getOrigins,
  deleteOrigin,
  updateOrigin,
  createOrigin,
} from '../../data/origin/OriginActions.js';
import Confirmation from '../../components/layout/Confirmation.js';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar.js';
import 'react-table/react-table.css';
import './admin.css';
import OriginModal from './OriginModal.js';

class OriginList extends Component {
  constructor(self) {
    super(self);
    this.state = {
      selectedItem: null,
      isDeleting: false,
      isOpenModal: false,
      editingOrigin: {},
    };

    this.fetchData = this.fetchData.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItemClick = this.deleteItemClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.closeEditingModal = this.closeEditingModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.updateOrigin = this.updateOrigin.bind(this);
    this.addItem = this.addItem.bind(this);
    this.createNewOrigin = this.createNewOrigin.bind(this);
  }

  tableColumns = [
    {
      Header: 'Name',
      accessor: 'name',
      style: {
        paddingTop: '12px',
      },
    },
    {
      id: 'edit',
      accessor: 'id_origin',
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
    const {getOrigins} = this.props;
    let sortBy = '';

    for (let i = 0; i < state.sorted.length; i++) {
      if (sortBy !== '') sortBy += ',';
      sortBy += state.sorted[i].id + (state.sorted[i].desc ? ' desc' : '');
    }

    const filter = encodeURIComponent(JSON.stringify(state.filtered));
    getOrigins(state.page + 1, state.pageSize, sortBy, filter);
  }

  getDeleteMessage() {
    return (
      <>
        Are you sure you want to delete the origin{' '}
        <strong className="text-dark">
          {this.state.selectedItem ? this.state.selectedItem.name : ''}
        </strong>
        ? This action cannot be undone.
      </>
    );
  }

  editItem({value: id}) {
    const {origins = []} = this.props;
    const origin = origins.find(s => s.id_origin === id);

    this.setState({
      isOpenModal: 'UPDATE',
      editingOrigin: origin || {},
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
      editingOrigin: {},
    });
  }

  closeAddModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  deleteItemClick(id) {
    this.setState({
      selectedItem: this.props.origins.filter(u => u.id_origin === id.value)[0],
      isDeleting: true,
    });
  }

  deleteItem(id) {
    this.setState({selectedItem: null, isDeleting: false});
    const {deleteOrigin} = this.props;
    const {
      current_page,
      page_size,
      sort_by,
      filter,
    } = this.props.originsPagination;

    deleteOrigin(id).then(() =>
      getOrigins(current_page, page_size, sort_by, filter),
    );
  }

  async createNewOrigin({name}) {
    await this.props
      .createOrigin({
        name,
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
    } = this.props.originsPagination;

    getOrigins(current_page, page_size, sort_by, filter);
    this.setState({isOpenModal: false});
  }

  async updateOrigin({name}) {
    const {editingOrigin} = this.state;
    await this.props
      .updateOrigin(editingOrigin.id_origin, {
        ...editingOrigin,
        name,
      })
      .catch(() => {
        this.setState({isOpenModal: false});
        console.log('error');
        return;
      });
    this.setState({
      isOpenModal: false,
      editingOrigin: {},
    });
  }

  render() {
    const {currentUser, isLoggingIn, origins, originsPagination} = this.props;
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
            <h1 className="page-title float-left text-dark mr-3">Origins</h1>
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
              data={origins}
              columns={this.tableColumns}
              defaultPageSize={15}
              pages={originsPagination.total_pages}
              pageSizeOptions={[10, 15, 20, 50]}
              showPageSizeOptions={true}
              loading={originsPagination.is_loading}
              onFetchData={this.fetchData}
              className="-striped -highlight"
            />
            {this.state.isDeleting && (
              <Confirmation
                id={this.state.selectedItem.id_origin}
                title="Delete origin"
                message={this.getDeleteMessage()}
                buttonLabel={'Delete'}
                onConfirm={this.deleteItem}
                onClose={() =>
                  this.setState({selectedItem: null, isDeleting: false})
                }
              />
            )}
          </div>
          <OriginModal
            isOpen={this.state.isOpenModal}
            origin={this.state.editingOrigin}
            closeModal={
              isOpenModal === 'UPDATE'
                ? this.closeEditingModal
                : this.closeAddModal
            }
            onSubmit={
              isOpenModal === 'UPDATE'
                ? this.updateOrigin
                : this.createNewOrigin
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
    origins: state.origin.origins,
    originsPagination: state.origin.originsPagination,
  };
}

export default connect(
  mapStateToProps,
  {getOrigins, deleteOrigin, updateOrigin, createOrigin},
)(OriginList);

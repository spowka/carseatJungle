import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactTable from 'react-table';
import {
  getCarseatGroups,
  deleteCarseatGroup,
  updateCarseatGroup,
  createCarseatGroup,
} from '../../data/carseatGroup/CarseatGroupActions.js';
import Confirmation from '../../components/layout/Confirmation.js';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar.js';
import 'react-table/react-table.css';
import './admin.css';
import CarseatGroupModal from './CarseatGroupModal.js';

class CarseatGroupList extends Component {
  constructor(self) {
    super(self);
    this.state = {
      selectedItem: null,
      isDeleting: false,
      isOpenModal: false,
      editingCarseatGroup: {},
    };

    this.fetchData = this.fetchData.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItemClick = this.deleteItemClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.closeEditingModal = this.closeEditingModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.updateCarseatGroup = this.updateCarseatGroup.bind(this);
    this.addItem = this.addItem.bind(this);
    this.createNewCarseatGroup = this.createNewCarseatGroup.bind(this);
  }

  tableColumns = [
    {Header: 'Name', accessor: 'name', width: 580, style: {paddingTop: '12px'}},
    {
      id: 'edit',
      accessor: 'id_carseat_group',
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
    const {getCarseatGroups} = this.props;
    let sortBy = '';

    for (let i = 0; i < state.sorted.length; i++) {
      if (sortBy !== '') sortBy += ',';
      sortBy += state.sorted[i].id + (state.sorted[i].desc ? ' desc' : '');
    }

    const filter = encodeURIComponent(JSON.stringify(state.filtered));
    getCarseatGroups(state.page + 1, state.pageSize, sortBy, filter);
  }

  getDeleteMessage() {
    return (
      <>
        Are you sure you want to delete the group{' '}
        <strong className="text-dark">
          {this.state.selectedItem ? this.state.selectedItem.name : ''}
        </strong>
        ? This action cannot be undone.
      </>
    );
  }

  editItem({value: id}) {
    const {carseatGroups = []} = this.props;
    console.log(carseatGroups);
    const carseatGroup = carseatGroups.find(s => s.id_carseat_group === id);

    this.setState({
      isOpenModal: 'UPDATE',
      editingCarseatGroup: carseatGroup || {},
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
      editingCarseatGroup: {},
    });
  }

  closeAddModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  deleteItemClick(id) {
    this.setState({
      selectedItem: this.props.carseatGroups.filter(
        u => u.id_carseat_group === id.value,
      )[0],
      isDeleting: true,
    });
  }

  deleteItem(id) {
    this.setState({selectedItem: null, isDeleting: false});
    const {deleteCarseatGroup} = this.props;
    const {
      current_page,
      page_size,
      sort_by,
      filter,
    } = this.props.carseatGroupsPagination;

    deleteCarseatGroup(id).then(() =>
      getCarseatGroups(current_page, page_size, sort_by, filter),
    );
  }

  async createNewCarseatGroup({name}) {
    await this.props
      .createCarseatGroup({
        name,
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
    } = this.props.carseatGroupsPagination;

    getCarseatGroups(current_page, page_size, sort_by, filter);
    this.setState({isOpenModal: false});
  }

  async updateCarseatGroup({name}) {
    const {editingCarseatGroup} = this.state;
    await this.props
      .updateCarseatGroup(editingCarseatGroup.id_carseat_group, {
        ...editingCarseatGroup,
        name,
      })
      .catch(() => {
        this.setState({isOpenModal: false});
        console.log('error');
        return;
      });
    this.setState({
      isOpenModal: false,
      editingCarseatGroup: {},
    });
  }

  render() {
    const {
      currentUser,
      isLoggingIn,
      carseatGroups,
      carseatGroupsPagination,
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
              Carseat Groups
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
              data={carseatGroups}
              columns={this.tableColumns}
              defaultPageSize={15}
              pages={carseatGroupsPagination.total_pages}
              pageSizeOptions={[10, 15, 20, 50]}
              showPageSizeOptions={true}
              loading={carseatGroupsPagination.is_loading}
              onFetchData={this.fetchData}
              className="-striped -highlight"
            />
            {this.state.isDeleting && (
              <Confirmation
                id={this.state.selectedItem.id_carseat_group}
                title="Delete carseatGroup"
                message={this.getDeleteMessage()}
                buttonLabel={'Delete'}
                onConfirm={this.deleteItem}
                onClose={() =>
                  this.setState({selectedItem: null, isDeleting: false})
                }
              />
            )}
          </div>
          <CarseatGroupModal
            isOpen={this.state.isOpenModal}
            carseatGroup={this.state.editingCarseatGroup}
            closeModal={
              isOpenModal === 'UPDATE'
                ? this.closeEditingModal
                : this.closeAddModal
            }
            onSubmit={
              isOpenModal === 'UPDATE'
                ? this.updateCarseatGroup
                : this.createNewCarseatGroup
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
    carseatGroups: state.carseatGroup.carseatGroups,
    carseatGroupsPagination: state.carseatGroup.carseatGroupsPagination,
  };
}

export default connect(
  mapStateToProps,
  {
    getCarseatGroups,
    deleteCarseatGroup,
    updateCarseatGroup,
    createCarseatGroup,
  },
)(CarseatGroupList);

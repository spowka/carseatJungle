import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactTable from 'react-table';
import {
  getChildWeightGroups,
  deleteChildWeightGroup,
  updateChildWeightGroup,
  createChildWeightGroup,
} from '../../data/childWeightGroup/ChildWeightGroupActions.js';
import Confirmation from '../../components/layout/Confirmation.js';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar.js';
import 'react-table/react-table.css';
import './admin.css';
import ChildWeightGroupModal from './ChildWeightGroupModal.js';

class ChildWeightGroupList extends Component {
  constructor(self) {
    super(self);
    this.state = {
      selectedItem: null,
      isDeleting: false,
      isOpenModal: false,
      editingChildWeightGroup: {},
    };

    this.fetchData = this.fetchData.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItemClick = this.deleteItemClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.closeEditingModal = this.closeEditingModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.updateChildWeightGroup = this.updateChildWeightGroup.bind(this);
    this.addItem = this.addItem.bind(this);
    this.createNewChildWeightGroup = this.createNewChildWeightGroup.bind(this);
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
      accessor: 'id_child_weight_group',
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
    const {getChildWeightGroups} = this.props;
    let sortBy = '';

    for (let i = 0; i < state.sorted.length; i++) {
      if (sortBy !== '') sortBy += ',';
      sortBy += state.sorted[i].id + (state.sorted[i].desc ? ' desc' : '');
    }

    const filter = encodeURIComponent(JSON.stringify(state.filtered));
    getChildWeightGroups(state.page + 1, state.pageSize, sortBy, filter);
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
    const {childWeightGroups = []} = this.props;
    const childWeightGroup = childWeightGroups.find(
      s => s.id_child_weight_group === id,
    );

    this.setState({
      isOpenModal: 'UPDATE',
      editingChildWeightGroup: childWeightGroup || {},
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
      editingChildWeightGroup: {},
    });
  }

  closeAddModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  deleteItemClick(id) {
    this.setState({
      selectedItem: this.props.childWeightGroups.filter(
        u => u.id_child_weight_group === id.value,
      )[0],
      isDeleting: true,
    });
  }

  deleteItem(id) {
    this.setState({selectedItem: null, isDeleting: false});
    const {deleteChildWeightGroup} = this.props;
    const {
      current_page,
      page_size,
      sort_by,
      filter,
    } = this.props.childWeightGroupsPagination;

    deleteChildWeightGroup(id).then(() =>
      getChildWeightGroups(current_page, page_size, sort_by, filter),
    );
  }

  async createNewChildWeightGroup({name}) {
    await this.props
      .createChildWeightGroup({
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
    } = this.props.childWeightGroupsPagination;

    getChildWeightGroups(current_page, page_size, sort_by, filter);
    this.setState({isOpenModal: false});
  }

  async updateChildWeightGroup({name}) {
    const {editingChildWeightGroup} = this.state;
    await this.props
      .updateChildWeightGroup(editingChildWeightGroup.id_child_weight_group, {
        ...editingChildWeightGroup,
        name,
      })
      .catch(() => {
        this.setState({isOpenModal: false});
        console.log('error');
        return;
      });
    this.setState({
      isOpenModal: false,
      editingChildWeightGroup: {},
    });
  }

  render() {
    const {
      currentUser,
      isLoggingIn,
      childWeightGroups,
      childWeightGroupsPagination,
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
              Child Weight Groups
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
              data={childWeightGroups}
              columns={this.tableColumns}
              defaultPageSize={15}
              pages={childWeightGroupsPagination.total_pages}
              pageSizeOptions={[10, 15, 20, 50]}
              showPageSizeOptions={true}
              loading={childWeightGroupsPagination.is_loading}
              onFetchData={this.fetchData}
              className="-striped -highlight"
            />
            {this.state.isDeleting && (
              <Confirmation
                id={this.state.selectedItem.id_child_weight_group}
                title="Delete childWeightGroup"
                message={this.getDeleteMessage()}
                buttonLabel={'Delete'}
                onConfirm={this.deleteItem}
                onClose={() =>
                  this.setState({selectedItem: null, isDeleting: false})
                }
              />
            )}
          </div>
          <ChildWeightGroupModal
            isOpen={this.state.isOpenModal}
            childWeightGroup={this.state.editingChildWeightGroup}
            closeModal={
              isOpenModal === 'UPDATE'
                ? this.closeEditingModal
                : this.closeAddModal
            }
            onSubmit={
              isOpenModal === 'UPDATE'
                ? this.updateChildWeightGroup
                : this.createNewChildWeightGroup
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
    childWeightGroups: state.childWeightGroup.childWeightGroups,
    childWeightGroupsPagination:
      state.childWeightGroup.childWeightGroupsPagination,
  };
}

export default connect(
  mapStateToProps,
  {
    getChildWeightGroups,
    deleteChildWeightGroup,
    updateChildWeightGroup,
    createChildWeightGroup,
  },
)(ChildWeightGroupList);

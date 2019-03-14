import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {getUsers, deleteUser} from '../../data/user/UserActions.js';
import Confirmation from '../../components/layout/Confirmation.js';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar.js';

class UserList extends Component {
  constructor(self) {
    super(self);
    this.state = {
      selectedItem: null,
      isDeleting: false,
    };

    this.fetchData = this.fetchData.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItemClick = this.deleteItemClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  tableColumns = [
    {
      Header: 'Email',
      accessor: 'email',
      width: 300,
      style: {paddingTop: '12px'},
    },
    {
      Header: 'First name',
      accessor: 'first_name',
      width: 150,
      style: {paddingTop: '12px'},
    },
    {
      Header: 'Last name',
      accessor: 'last_name',
      width: 150,
      style: {paddingTop: '12px'},
    },
    {
      Header: 'Activated',
      width: 90,
      id: 'is_activated',
      accessor: d => (d.is_activated === 1 ? '✅' : ''),
      filterable: false,
      style: {textAlign: 'center', paddingTop: '14px'},
    },
    {
      Header: 'Suspended',
      width: 90,
      id: 'is_suspended',
      accessor: d => (d.is_suspended === 1 ? '✅' : ''),
      filterable: false,
      style: {textAlign: 'center', paddingTop: '14px'},
    },
    {
      id: 'edit',
      accessor: 'id_user',
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
    const {getUsers} = this.props;
    let sortBy = '';

    for (let i = 0; i < state.sorted.length; i++) {
      if (sortBy !== '') sortBy += ',';
      sortBy += state.sorted[i].id + (state.sorted[i].desc ? ' desc' : '');
    }

    const filter = encodeURIComponent(JSON.stringify(state.filtered));

    getUsers(state.page + 1, state.pageSize, sortBy, filter);
  }

  getDeleteMessage() {
    return (
      <>
        Are you sure you want to delete the user{' '}
        <strong className="text-dark">
          {this.state.selectedItem
            ? this.state.selectedItem.first_name +
              ' ' +
              this.state.selectedItem.last_name
            : ''}
        </strong>
        ? This action cannot be undone.
      </>
    );
  }

  editItem(id) {
    /* eslint-disable-next-line */
    console.log('edit', id.value);
  }

  deleteItemClick(id) {
    this.setState({
      selectedItem: this.props.users.filter(u => u.id_user === id.value)[0],
      isDeleting: true,
    });
  }

  deleteItem(id) {
    this.setState({selectedItem: null, isDeleting: false});
    const {deleteUser} = this.props;
    const {
      current_page,
      page_size,
      sort_by,
      filter,
    } = this.props.usersPagination;

    deleteUser(id).then(() =>
      getUsers(current_page, page_size, sort_by, filter),
    );
  }

  render() {
    const {currentUser, isLoggingIn, users, usersPagination} = this.props;
    if (isLoggingIn) return null;
    if (!currentUser) return <Redirect to="/login" />;

    return (
      <div className="d-table w-100 h-100">
        <div className="d-table-cell bg-dark sidebar align-top">
          <AdminSidebar />
        </div>
        <div className="d-table-cell p-5 align-top">
          <div className="mb-4 clearfix">
            <h1 className="page-title float-left text-dark mr-3">Users</h1>
          </div>
          <div>
            <ReactTable
              manual
              filterable
              data={users}
              columns={this.tableColumns}
              defaultPageSize={15}
              pages={usersPagination.total_pages}
              pageSizeOptions={[10, 15, 20, 50]}
              showPageSizeOptions={true}
              loading={usersPagination.is_loading}
              onFetchData={this.fetchData}
              className="-striped -highlight"
            />
            {this.state.isDeleting && (
              <Confirmation
                id={this.state.selectedItem.id_user}
                title="Delete user"
                message={this.getDeleteMessage()}
                buttonLabel={'Delete'}
                onConfirm={this.deleteItem}
                onClose={() =>
                  this.setState({selectedItem: null, isDeleting: false})
                }
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    isLoggingIn: state.user.isLoggingIn,
    users: state.user.users,
    usersPagination: state.user.usersPagination,
  };
}

export default connect(
  mapStateToProps,
  {getUsers, deleteUser},
)(UserList);

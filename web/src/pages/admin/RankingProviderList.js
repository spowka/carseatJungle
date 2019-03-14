import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import ReactTable from 'react-table';
import {
  getRankingProviders,
  deleteRankingProvider,
  updateRankingProvider,
  createRankingProvider,
} from '../../data/rankingProvider/RankingProviderActions.js';
import Confirmation from '../../components/layout/Confirmation.js';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar.js';
import 'react-table/react-table.css';
import './admin.css';
import RankingProviderModal from './RankingProviderModal.js';

class RankingProviderList extends Component {
  constructor(self) {
    super(self);
    this.state = {
      selectedItem: null,
      isDeleting: false,
      isOpenModal: false,
      editingRankingProvider: {},
    };

    this.fetchData = this.fetchData.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItemClick = this.deleteItemClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.closeEditingModal = this.closeEditingModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.updateRankingProvider = this.updateRankingProvider.bind(this);
    this.addItem = this.addItem.bind(this);
    this.createNewRankingProvider = this.createNewRankingProvider.bind(this);
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
      accessor: 'id_ranking_provider',
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
    const {getRankingProviders} = this.props;
    let sortBy = '';

    for (let i = 0; i < state.sorted.length; i++) {
      if (sortBy !== '') sortBy += ',';
      sortBy += state.sorted[i].id + (state.sorted[i].desc ? ' desc' : '');
    }

    const filter = encodeURIComponent(JSON.stringify(state.filtered));
    getRankingProviders(state.page + 1, state.pageSize, sortBy, filter);
  }

  getDeleteMessage() {
    return (
      <>
        Are you sure you want to delete the provider{' '}
        <strong className="text-dark">
          {this.state.selectedItem ? this.state.selectedItem.name : ''}
        </strong>
        ? This action cannot be undone.
      </>
    );
  }

  editItem({value: id}) {
    const {rankingProviders = []} = this.props;
    const rankingProvider = rankingProviders.find(
      s => s.id_ranking_provider === id,
    );

    this.setState({
      isOpenModal: 'UPDATE',
      editingRankingProvider: rankingProvider || {},
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
      editingRankingProvider: {},
    });
  }

  closeAddModal() {
    this.setState({
      isOpenModal: false,
    });
  }

  deleteItemClick(id) {
    this.setState({
      selectedItem: this.props.rankingProviders.filter(
        u => u.id_ranking_provider === id.value,
      )[0],
      isDeleting: true,
    });
  }

  deleteItem(id) {
    this.setState({selectedItem: null, isDeleting: false});
    const {deleteRankingProvider} = this.props;
    const {
      current_page,
      page_size,
      sort_by,
      filter,
    } = this.props.rankingProvidersPagination;

    deleteRankingProvider(id).then(() =>
      getRankingProviders(current_page, page_size, sort_by, filter),
    );
  }

  async createNewRankingProvider({name}) {
    await this.props
      .createRankingProvider({
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
    } = this.props.rankingProvidersPagination;

    getRankingProviders(current_page, page_size, sort_by, filter);
    this.setState({isOpenModal: false});
  }

  async updateRankingProvider({name}) {
    const {editingRankingProvider} = this.state;
    await this.props
      .updateRankingProvider(editingRankingProvider.id_ranking_provider, {
        ...editingRankingProvider,
        name,
      })
      .catch(() => {
        this.setState({isOpenModal: false});
        console.log('error');
        return;
      });
    this.setState({
      isOpenModal: false,
      editingRankingProvider: {},
    });
  }

  render() {
    const {
      currentUser,
      isLoggingIn,
      rankingProviders,
      rankingProvidersPagination,
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
              Ranking Providers
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
              data={rankingProviders}
              columns={this.tableColumns}
              defaultPageSize={15}
              pages={rankingProvidersPagination.total_pages}
              pageSizeOptions={[10, 15, 20, 50]}
              showPageSizeOptions={true}
              loading={rankingProvidersPagination.is_loading}
              onFetchData={this.fetchData}
              className="-striped -highlight"
            />
            {this.state.isDeleting && (
              <Confirmation
                id={this.state.selectedItem.id_ranking_provider}
                title="Delete rankingProvider"
                message={this.getDeleteMessage()}
                buttonLabel={'Delete'}
                onConfirm={this.deleteItem}
                onClose={() =>
                  this.setState({selectedItem: null, isDeleting: false})
                }
              />
            )}
          </div>
          <RankingProviderModal
            isOpen={this.state.isOpenModal}
            rankingProvider={this.state.editingRankingProvider}
            closeModal={
              isOpenModal === 'UPDATE'
                ? this.closeEditingModal
                : this.closeAddModal
            }
            onSubmit={
              isOpenModal === 'UPDATE'
                ? this.updateRankingProvider
                : this.createNewRankingProvider
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
    rankingProviders: state.rankingProvider.rankingProviders,
    rankingProvidersPagination:
      state.rankingProvider.rankingProvidersPagination,
  };
}

export default connect(
  mapStateToProps,
  {
    getRankingProviders,
    deleteRankingProvider,
    updateRankingProvider,
    createRankingProvider,
  },
)(RankingProviderList);

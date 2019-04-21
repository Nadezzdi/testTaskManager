import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTaskList} from './actions/action'
import NewTaskModal from './components/NewTask'
import TaskList from './components/TaskList'


class App extends Component {
  
  render() {
    const  {removeTask} = this.props;
    return (
      <div className="page">
        <div className="container header mb-2 mt-2">
          <div className="row">
            <div className="col-lg-12 col-md-12 d-flex">
              <h2>Список задач</h2>
              <NewTaskModal/>
            </div>
          </div>
        </div>
        <div className="container">
          <TaskList removeTaskFunc={removeTask}/>
        </div>
      </div>
    )
  }
  
  componentDidMount() {
    this.props.fetchTaskList()
  }
}

function mapStateToProps(state) {
  return {
  }
}

const mapDispatchToProps = dispatch => ({
  fetchTaskList: () => dispatch(fetchTaskList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

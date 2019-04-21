import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { removeTask } from '../actions/action'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
library.add( faPen, faTrashAlt)

class TaskList extends Component {
  
  constructor(props) {
    super(props);
    this.handleClickRemove = this.handleClickRemove.bind(this)
  }
  
  handleClickRemove(id) {
    this.props.removeTask(id);
  }
  
  handleClickEdit(id) {
    console.log("click handle edit");
  }
  
  render() {
    console.log("TaskList");
    const {list, count, hasError, isLoading} = this.props.taskListData;
    if (hasError)
      return(
        <div>Error</div>
      )
      
    if (isLoading)
      return(
        <div className="spinner-border" role="status">
          <span className="sr-only">Загрузка...</span>
        </div>
      )
      
    if (count ===0)
      return(<div>н/д</div>)
    
    const listItems = list.map((task) =>
      <div className="row" key={task.id}>
        <div className="coД col-lg-2 col-md-3 col-sm-4 col-4 border">Задача №{task.id}</div>
        <div className="col col-lg-8 col-md-7 col-sm-6 col-6 border"><p className="text-truncate">{task.title}</p></div>
        <div className="col col-lg-2 col-md-2 col-sm-2 col-2 border">
          <Link 
           to={{ 
             pathname: `/items/${task.id}`, 
             state: { selectedTask : task} 
           }} >
            <FontAwesomeIcon icon="pen" color="gray"/>
          </Link>
          <button className="btn" onClick={() => this.handleClickRemove(task.id)}>
            <FontAwesomeIcon icon="trash-alt" color="red" />
          </button>
        </div>
      </div>)
      
    return (
      <div className="table">
        {listItems}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    taskListData: {
      list: state.taskList,
      count: state.taskCount,
      hasError : state.taskListHasError,
      isLoading: state.taskListIsLoading,
    },
  }
}
const mapDispatchToProps = dispatch => ({
  removeTask: (id) => {dispatch(removeTask(id))}
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);

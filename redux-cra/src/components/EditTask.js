import React  from 'react';
import { connect } from 'react-redux';
import { Button, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { removeTask } from '../actions/action'


class EditTaskPage extends React.Component{
  constructor(props) {
    super(props)
    //var id = parseInt(props.match.params.number, 10);
    var selectedTask = props.location.state.selectedTask

    this.state = {
      editTask: selectedTask,
      defaulTitle: selectedTask.title,
      changed: false,
      status: "success",
    }
  

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleOnSaveClick = this.handleOnSaveClick.bind(this);
  }
  
  render() {
    return(
      <div className="container header mb-2 mt-2 ml-auto">
          <div className="row">
            <div className="col-lg-12 col-md-12 d-flex">
              <h2>Задача №{this.state.editTask.id}</h2>
              <Button variant="outline-success" className="ml-auto" onClick={this.handleRemove}>Удалить</Button>
            </div>
            <div className="col-lg-12 col-md-12">
              <Form.Group controlId="taskTitle">
                  <Form.Label>Краткое описание</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="title" 
                    required
                    defaultValue={this.state.editTask.title} 
                    onChange={(e)=>this.handleOnChange(e)}
                  />
                </Form.Group>
            </div>
            <div className="col-lg-12 col-md-12">
            {
            ( this.state.changed) ?
              <Button onClick={()=> {this.handleOnSaveClick()}}>Сохранить</Button>
              :
              <Link to={`/items/`} className="btn btn-outline-primary">Вернуться в список</Link>
            }
            </div>
        </div>
      </div>
      )
  }
  
  handleRemove() {
    this.props.removeTask(this.state.editTask.id);
    this.nextPath('/items')
  }
  
  handleOnChange(e) {
   this.setState({
    changed: (e.target.value !== e.target.defaultValue),
    editTask: {...this.state.editTask, title: e.target.value}
   });
  }
  
  handleOnSaveClick() {
    console.log("save " + JSON.stringify(this.state.editTask));
    var task = this.state.editTask;
    
    fetch(`https://test.megapolis-it.ru/api/list/${task.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: `{"title" : "${task.title}"}`
    })
    .then (response => {
        if (response.status >= 400) { 
          throw new Error("Bad response from server");
        }
        return response.json()
    })
    .then (json => {
      if (!json.success)
        throw new Error(json.error || "Unsuccess response status with unknown error");
      this.nextPath('/items');
    })
    .catch(err => {
      console.error(err)
    });
    
  }
  
  nextPath(path) {
    this.props.history.push(path);
  }
}

function mapStateToProps(state) {
  return {
    taskList: state.taskList,
  }
}

const mapDispatchToProps = dispatch => ({
  removeTask: (id) => dispatch(removeTask(id)),
})


export default connect(mapStateToProps, mapDispatchToProps)(EditTaskPage);
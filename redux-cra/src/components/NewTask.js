import React  from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form} from 'react-bootstrap';

import { addTask } from '../actions/action'


class NewTaskModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      show: false,
      invalidTitle: false
    };
    
    this.inputTitleRef = React.createRef();
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true, invalidTitle: false });
  }
  
  
  handleSubmit(event) {
    event.preventDefault();
    var newTaskTitle = this.inputTitleRef.current.value
    if (newTaskTitle) {
      this.props.addTask(newTaskTitle);
    }
    else
    {
      this.setState({invalidTitle: true})
    }
  }
  
  
  render() {
    const {isLoading, hasError} = this.props;
    
    return(
      <div className="ml-auto">
        <Button variant="outline-success" onClick={this.handleShow}>Добавить</Button>
        <Modal 
          show={this.state.show} 
          onHide={this.handleClose} 
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Title>
            <div className="container text-right">
              <Button variant="outline-danger" onClick={() => this.handleClose()}>Закрыть</Button>
            </div>
          </Modal.Title>
          <Modal.Body>
          {
            isLoading 
            ? 
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            :
            <Form
              noValidate
              onSubmit={e => this.handleSubmit(e)}
            >
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Краткое описание</Form.Label>
                <Form.Control type="text" name="title" required ref={this.inputTitleRef} />
                <div className="my-invalid-feedback">
                  {this.state.invalidTitle ? "Заголовок не может быть пустым" : null}
                </div>
              </Form.Group>
              <Button variant="outline-success" type="submit">
                Создать
              </Button>
             {hasError ? 
                <div className="alert alert-danger" role="alert">
                  Ошибка во время сохранения!
                </div> : null}
            </Form>
          }
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoading : state.taskAddLoading,
    hasError : state.taskAddErrored,
  }
}

const mapDispatchToProps = dispatch => ({
  addTask: (newTask) => dispatch(addTask(newTask)),
})


export default connect(mapStateToProps, mapDispatchToProps)(NewTaskModal);
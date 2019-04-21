import {
  RECEIVE_LIST,
  LIST_HAS_ERRORED,
  LIST_IS_LOADING,
  TASK_ADD_LOADING,
  TASK_ADD_ERROR,
  TASK_ADD,
  REMOVE_TASK,
} from '../actions/action.js'

const defaultState = {
    taskList: [],
    taskCount: 0,
    taskListHasError: '',
    taskListIsLoading: false,
    
    taskAddLoading : false,
    taskAddErrored : false,
    
    editedTask: {}
}


export default (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_LIST:
      return {
        ...defaultState,
        taskList: action.taskList,
        taskCount: action.taskCount
      };
    case LIST_HAS_ERRORED:
      return{
        ...defaultState,
        taskListHasError: action.error || "Uncknown error",
      };
    case LIST_IS_LOADING:
      return{
        ...defaultState,
        taskListIsLoading: true,
      };
    
    case TASK_ADD_LOADING:
      return{
        ...state,
        taskAddLoading: true,
        taskAddErrored: false,
      };
    case TASK_ADD_ERROR:
      return{
        ...state,
        taskAddLoading: false,
        taskAddErrored: true,
      };
    /*
      should have incorrect bahavour
      in case list was changed from another client
    */
    case TASK_ADD:
      return{
        ...state,
        taskAddLoading: false,
        taskAddErrored: false,
        taskList: [...state.taskList, action.newTask],
      }
    case REMOVE_TASK:
      return{
        ...state,
        taskCount: state.taskCount -1,
        taskList: state.taskList.filter((item) => item.id !== action.id)
     }
    default:
      console.log(action.type)
      return state
  }
}
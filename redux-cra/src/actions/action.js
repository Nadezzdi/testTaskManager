import fetch from 'cross-fetch'

export const RECEIVE_LIST = 'RECEIVE_LIST'
function receiveList(json) {
  return {
    type: RECEIVE_LIST,
    taskList: json.data,
    taskCount: json.length,
  }
}

export const LIST_HAS_ERRORED = 'LIST_HAS_ERRORED'
export function erroredList(err) {
  return {
    type: LIST_HAS_ERRORED,
    error: err,
  };
}

export const LIST_IS_LOADING = 'LIST_IS_LOADING'
export function loadingList(bool) {
  return {
    type: LIST_IS_LOADING,
  };
}

export function fetchTaskList() {
  return (dispatch) => {
    dispatch(loadingList());
    fetch('https://test.megapolis-it.ru/api/list')
    .then(
      response => {
        if (response.status >= 400) {
          throw new Error("Bad response from the server");
        }
        return response.json()
      }
    )
    .then(json => {
      if (!json.success)
        throw new Error(json.error || "Unsuccess response status with unknown error");
      dispatch(receiveList(json))
    })
    .catch(err => {
      console.error(err);
      dispatch(erroredList(err))
    });
  }
}

export const TASK_ADD_LOADING = 'TASK_ADD_LOADING'
export function taskAddLoading() {
  return {
    type: TASK_ADD_LOADING,
  }
}

export const TASK_ADD_ERROR = 'TASK_ADD_ERROR'
export function taskAddError() {
    return {
    type: TASK_ADD_ERROR,
  }
}

export const TASK_ADD = 'TASK_ADD'
export function taskAddFinish(newId, newTaskTitle) {
  return {
    type: TASK_ADD,
    newTask: {
      id: newId,
      title: newTaskTitle,
    }
  }
}


export function addTask(newTaskTitle) {
  return (dispatch) => {
    dispatch(taskAddLoading());
    fetch('https://test.megapolis-it.ru/api/list', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: `{"title" : "${newTaskTitle}"}`
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
      dispatch(taskAddFinish(json.id, newTaskTitle))
    })
    .catch(err => {
      dispatch(taskAddError())
      console.error(err)
    });
  }
}

export const REMOVE_TASK = 'REMOVE_TASK'
export function doRemoveTask(id){
  return {
    type: REMOVE_TASK,
    id: id,
  }
}


export function removeTask(id) {
  return (dispatch) => {
    fetch(`https://test.megapolis-it.ru/api/list/${id}`, {
      method: 'DELETE'
    })
    .then (response => {
      if (response.status >= 400) { 
        throw new Error("Bad response from server");
      }
      return response.json()
    })
    .then( json => {
      if (json.success)
        dispatch(doRemoveTask(id))
    })
    .catch(err => {
      console.error(err)
    });
  }
}


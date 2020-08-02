import {createStore} from 'redux';

const initState = {
    projects: [],
    activeProject: {title: 'Project Not Found'},
    scrumVisibility: true,
    formVisibility: false,
    listVisibility: false
};  

const reducer = (state=initState, action) => {
    let tempState={...state};
    switch(action.type) {
      case 'UPDATE_PROJECT_INFORMATION':
          tempState.activeProject = action.activeProject;
          tempState.projects = action.projects;
          return tempState;
      case 'NEW_PROJECT_ADDITION':
        tempState.activeProject = action.activeProject;
        tempState.projects = action.projects;
        tempState.scrumVisibility = action.scrumVisibility;
        tempState.formVisibility = action.formVisibility
        return tempState;
      case 'ACTIVE_PROJECT_SELECTION': 
        tempState.activeProject = action.activeProject;
        tempState.scrumVisibility = action.scrumVisibility;
        tempState.formVisibility = action.formVisibility;
        return tempState;
      case 'NEW_PROJECT_FORM':
        tempState.formVisibility = action.formVisibility;
        tempState.scrumVisibility = action.scrumVisibility;
        tempState.listVisibility = action.listVisibility;
      case 'MOUNT_HANDLING':
        tempState.projects = action.projects;
        tempState.activeProject = action.activeProject;
        return tempState;
      case 'TOGGLE_LIST_VISIBILITY':
        tempState.listVisibility = action.listVisibility;
        return tempState;
      default:  
        return state;
    }
  }

export default reducer;
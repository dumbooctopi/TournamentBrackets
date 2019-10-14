import { ADD_USER } from '../constants/actionTypes'
import { LOGGED_IN } from '../constants/actionTypes'
// import { LOGGED_OUT } from '../constants/actionTypes'

const initialState = {
  isLoggedIn: false,
  users: []
};
function rootReducer(state = initialState, action) {

  switch(action.type){
    case ADD_USER: {
      return Object.assign({}, state, {
        users: state.users.concat(action.payload)
      })
    }
    case LOGGED_IN: {
      return Object.assign({}, state, {
        isLoggedIn: true
      })
    }
    // case LOGGED_OUT: {
    //   return Object.assign({}, state, {
    //     isLoggedIn: false
    //   })
    // }
    default: return state
  }
};
export default rootReducer;

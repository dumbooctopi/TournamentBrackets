import { ADD_USER, ADD_TOURNAMENT } from '../constants/actionTypes';
import { LOGGED_IN } from '../constants/actionTypes';
// import { LOGGED_OUT } from '../constants/actionTypes'

const initialState = {
  isLoggedIn: false,
  users: [],
  tournaments: []
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      return Object.assign({}, state, {
        users: state.users.concat(action.payload)
      });
    }
    case LOGGED_IN: {
      return Object.assign({}, state, {
        isLoggedIn: true
      });
    }
    // case LOGGED_OUT: {
    //   return Object.assign({}, state, {
    //     isLoggedIn: false
    //   })
    // }
    case ADD_TOURNAMENT: {
      return Object.assign({}, state, {
        tournaments: state.tournaments.concat(action.payload)
      });
    }
    default:
      return state;
  }
}
export default rootReducer;

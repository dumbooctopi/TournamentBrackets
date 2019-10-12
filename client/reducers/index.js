import { ADD_USER } from '../constants/actionTypes'
const initialState = {
  users: ['BOBBY', "JOSEPH", "DAVE"]
};
function rootReducer(state = initialState, action) {
  console.log("PAYLOAD", action.payload)
  if (action.type === ADD_USER) {
    return Object.assign({}, state, {
      users: state.users.concat(action.payload)
    });
  }

  return state;
};
export default rootReducer;

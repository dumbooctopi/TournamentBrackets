import { ADD_USER } from '../constants/actionTypes'
const initialState = {
  users: ['BOBBY', "JOSEPH", "DAVE"]
};
function rootReducer(state = initialState, action) {
  if (action.type === ADD_USER) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }

  return state;
};
export default rootReducer;

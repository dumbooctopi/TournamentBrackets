const initialState = {
  users: []
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

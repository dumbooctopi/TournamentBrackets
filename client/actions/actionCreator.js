
export function addUser(payload) {
  return { type: "ADD_USER", payload }
};

export function logIn() {
  return { type: "LOGGED_IN"}
};

export function loggedOut(payload) {
  return { type: "LOGGED_OUT", payload }
};



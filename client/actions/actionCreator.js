import * as types from '../constants/actionTypes';

export function addUser(payload) {
  return { type: types.ADD_USER, payload };
}

export function logIn() {
  return { type: types.LOGGED_IN };
}

export function loggedOut(payload) {
  return { type: types.LOGGED_OUT, payload };
}

export function addTournament(payload) {
  return { type: types.ADD_TOURNAMENT, payload };
}

import { ADD_USER } from '../constants/actionTypes';

export function addUser(payload) {
  return { type: "ADD_USER", payload }
};

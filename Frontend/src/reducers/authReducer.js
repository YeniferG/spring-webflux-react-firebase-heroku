import * as actions from '../actions/authActions'

export const initialState = {
  email: null,
  uid: null, 
  name : null, 
  photo: null
}

export default function authReducer(state = initialState, action) {
  console.log("action.payload ", action.payload)
  switch (action.type) {
    case actions.LOGIN:
      const payload = action.payload;
      console.log("login", payload)
      return {...state, email: payload.email, uid: payload.uid,  name: payload.displayName, photo: payload.photoURL }
    case actions.LOGOUT:
      return initialState
    default:
      return state
  }
}

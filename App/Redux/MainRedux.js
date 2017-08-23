import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Izzati from 'react-native-izzati'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  mainRequest: ['params'],
  mainSuccess: ['out'],
  mainFailure: null,
  updateParams: ['params']
})

export const MainTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  params: '{"text": "me"}',
  fetching: null,
  out: "",
  error: null
})

export const send = (params) => {
  return (dispatch) => {
    console.log(params)
    dispatch(Creators.mainRequest(params))
    let i = new Izzati("http://192.168.100.113:5020/")
    return i.send({text: JSON.parse(params), response: {base64: true} }).then(out => {
      dispatch(Creators.mainSuccess(i.prefixJpg(out.base64)))
    }).catch(err => {
      dispatch(Creators.mainFailure())
      console.log(err)
    })
  }
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { params }) =>
  state.merge({ fetching: true, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { out } = action
  return state.merge({ fetching: false, error: null, out })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, out: {text: ""} })

export const update = (state, { params }) =>
  state.merge({params})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MAIN_REQUEST]: request,
  [Types.MAIN_SUCCESS]: success,
  [Types.MAIN_FAILURE]: failure,
  [Types.UPDATE_PARAMS]: update
})

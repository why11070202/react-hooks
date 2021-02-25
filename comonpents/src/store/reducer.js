const defaultState = {
  role: null
}
export default (state = defaultState, action) => {
  if (action.type === 'CHANGE_ROLE') {
    return action.value
  }
  return state
}

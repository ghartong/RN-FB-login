const GET_USER = 'GET_USER'
const SET_LOGGED_IN = 'SET_LOGGED_IN'
const SET_USER_FB = 'SET_USER_FB'

export const actionTypes = {
    GET_USER,
    SET_LOGGED_IN,
    SET_USER_FB
}

export const actionCreators = {
    getUser: () => ({
        type: GET_USER
    }),
    setLoggedIn: (isLoggedIn) => ({
        type: SET_LOGGED_IN,
        msg: isLoggedIn
    }),
    setUserFB: (id, avatar, name, accessToken) => ({
        type: SET_USER_FB,
        fb: {
            id, avatar, name, accessToken
        }
    })
}

export const thunks = {}

export const actions = Object.assign({}, thunks, actionCreators)

const initState = {
    loggedIn: false,
    firstName: 'John',
    lastName: 'Doe',
    fb: {
        id: '',
        avatar: '',
        name: '',
        accessToken: '',
    }
}

const ACTION_HANDLERS = {
    [GET_USER]: (state, action) => state.userReducer,
    [SET_LOGGED_IN]: (state, action) =>
        Object.assign({}, state, { loggedIn: action.msg }),
    [SET_USER_FB]: (state, action) =>
        Object.assign({}, state, { fb: action.fb }),
}

// ------------------------------------
// Reducer
// ------------------------------------
function userReducer(state = initState, action) {
    console.log('calling user reducer', action)
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

export default userReducer

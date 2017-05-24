import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const LOGIN      = 'LOGIN';
const SIGNUP     = 'SIGNUP';


/* ------------   ACTION CREATORS     ------------------ */

const login = user => ({type: LOGIN, user});
const signup = user => ({type: SIGNUP, user});


/* ------------       REDUCER     ------------------ */

export function loginReducer (user = null, action) {
    switch (action.type) {

        case LOGIN:
            return action.user;

        case SIGNUP:
            return action.user;

        default:
            return null;
    }
}


/* ------------       DISPATCHERS     ------------------ */

export const loginUser = (em, pw) => dispatch => {
    axios.post('/login', {email: em, password: pw})
        .then(res => res.data)
        .then(user => dispatch(login(user)))
        .catch((err) => {
            console.error(err)
        });
}

export const signupUser = (em, pw) => dispatch => {

    axios.post('/signup', {email: em, password: pw})
        .then(res => res.data)
        .then(user => dispatch(signup(user)))
        .catch((err) => {
            console.error(err)
        });
}

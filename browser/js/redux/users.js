import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_USERS';
const CREATE     = 'CREATE_USER';
const REMOVE     = 'REMOVE_USER';
const UPDATE     = 'UPDATE_USER';
const LOGIN      = 'LOGIN';
// const SIGNUP     = 'SIGNUP';


/* ------------   ACTION CREATORS     ------------------ */

const init  = users => ({ type: INITIALIZE, users });
const create = user  => ({ type: CREATE, user });
const remove = id    => ({ type: REMOVE, id });
const update = user  => ({ type: UPDATE, user });
// const login = user => ({type: LOGIN, user});


/* ------------       REDUCER     ------------------ */

export function userReducer (users = [], action) {
  switch (action.type) {

    case INITIALIZE:
      return action.users;

    case CREATE:
      return [action.user, ...users];

    case REMOVE:
      return users.filter(user => user.id !== action.id);

    case UPDATE:
      return users.map(user => (
        action.user.id === user.id ? action.user : user
      ));

     // case LOGIN:
     //    return action.user;

    default:
      return users;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchUsers = () => dispatch => {
  axios.get('/api/users')
       .then(res => dispatch(init(res.data)));
};

// export const loginUser = (em, pw) => dispatch => {
//     axios.post('/login', {email: em, password: pw})
//         .then(res => res.data)
//         .then(user => dispatch(login(user)))
//         .catch((err) => {
//             console.error(err)
//         })
// }

export const fetchSingleUser = (email) => dispatch => {
    axios.get('/api/users')
        .then(res => res.data)
        .then(users => users.filter(user => user.email === email))
        .then()
        .catch(console.error);
};



// optimistic
export const removeUser = id => dispatch => {
  dispatch(remove(id));
  axios.delete(`/api/users/${id}`)
       .catch(err => console.error(`Removing user: ${id} unsuccesful`, err));
};

export const addUser = user => dispatch => {
  axios.post('/api/users', user)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error(`Creating user: ${user} unsuccesful`, err));
};

export const updateUser = (id, user) => dispatch => {
  axios.put(`/api/users/${id}`, user)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating user: ${user} unsuccesful`, err));
};

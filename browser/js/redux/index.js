import { combineReducers } from 'redux';
import {userReducer} from './users';
import {loginReducer} from './login';
import stories from './stories';

export default combineReducers({ userReducer, loginReducer, stories });

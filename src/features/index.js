import { combineReducers } from 'redux';

import userReducers from '~/features/user'

const rootReducer = combineReducers({
    users: userReducers,
});

export default rootReducer;
import { combineReducers } from 'redux';

import userReducers from '~/features/user';
import addressesReducers from '~/features/addresses';
import nhaTroListReducer from './nhaTroList';

const rootReducer = combineReducers({
    users: userReducers,
    addresses: addressesReducers,
    nhaTroList: nhaTroListReducer,
});

export default rootReducer;

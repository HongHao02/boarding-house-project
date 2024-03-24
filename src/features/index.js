import { combineReducers } from 'redux';

import userReducers from '~/features/user'
import addressesReducers from '~/features/addresses'

const rootReducer = combineReducers({
    users: userReducers,
    addresses: addressesReducers,
});

export default rootReducer;
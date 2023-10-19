import { legacy_createStore as createStore } from 'redux';
import reducers from '../reducers/index';
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(reducers,composeWithDevTools())

export default store;
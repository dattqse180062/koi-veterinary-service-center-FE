import { createStore, combineReducers } from 'redux';
import { rootReducer  } from './reducers';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: () => any;
    }
}

const store = createStore(
    rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Cho phép sử dụng Redux DevTools nếu có
);

export default store;

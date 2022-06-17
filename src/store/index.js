import { createStore } from 'redux';

const carouselReducer = (state=0, action) => {
    if(action.type === 'NEXT') {
        return action.payload;
    } else if (action.type === 'PREV') {
        return action.payload;
    }

    return state;
}

const store = createStore(carouselReducer);

export default store;
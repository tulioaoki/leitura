import {CHANGE_SORT, INITIAL_SORT} from "../actions/sort";

export default function sort (state = {}, action) {
    switch(action.type) {
        case INITIAL_SORT :
            return {
                ...state,
                sort:action.sort
            };
        case CHANGE_SORT:
            return{
                ...state,
                sort:action.sort,
            };
        default :
            return state
    }
}
import { GET_DATA, GET_DATA_FAILURE } from "../actions/types";

export default function dataReducer(state = {}, action) {

    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                ...action.payload
            };
        case GET_DATA_FAILURE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }

}
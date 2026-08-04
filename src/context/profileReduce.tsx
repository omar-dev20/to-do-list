import type { UserAction, UserState } from "./profileContext"; 
function profileReducer(state: UserState, action: UserAction) {
    switch (action.type) {
        case 'FETCH_START':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                user: null,
                loading: false,
                error: action.error,
            };
        case 'CLEAR_USER':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
}
export default profileReducer;
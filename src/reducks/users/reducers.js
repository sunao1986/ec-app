import * as  Actions from './actions';
import {initialState} from '../store/initialState';

export const UsersReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case Actions.SIGN_IN:
            return {
                // 現在のstoreのp状態はstateでいける
                ...state,
                ...action.payload
                // isSighedIn: action.payload.isSighedIn,
                // uid: createAction.payload.uid,
                // username: action.payload.username
            }
        case Actions.SIGN_OUT:
            return {
                ...action.payload
            }
        default:
            return state
    }
}
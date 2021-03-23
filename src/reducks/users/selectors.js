import {createSelector} from 'reselect';

const usersSelector = (state) => state.users;

export const getIsSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
)

export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
)
export const getUserName = createSelector(
    [usersSelector],
    state => state.username
)
export const getUserRole = createSelector(
    [usersSelector],
    state => state.role
);

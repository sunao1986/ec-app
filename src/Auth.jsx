import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenAuthState } from './reducks/users/operations';
import { getIsSignedIn } from './reducks/users/selectors';

const Auth = ({children}) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);
    useEffect(() => {
        if (!isSignedIn) {
            console.log(isSignedIn);
            dispatch(listenAuthState())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isSignedIn) {
        return <></>
    } else {
        return children
        // return <div>サインインしてます</div>
    }

}

export default Auth
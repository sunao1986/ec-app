import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {push} from "connected-react-router";
import {getUserId, getUserName} from '../reducks/users/selectors';
import {signOut} from '../reducks/users/operations';

const Home = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const uid = getUserId(selector)
    const username = getUserName(selector)

    return(
        <div>
            <h2>ホーム</h2>
            <button onClick={()=> dispatch(push('/signin'))}>
                サインインへ
            </button>
            <button onClick={()=> dispatch(push('/signup'))}>
                新規登録へ
            </button>
            <button onClick={()=> dispatch(signOut())}>
                サインアウト
            </button>
            <p>ユーザーID：{uid}</p>
            <p>ユーザー名：{username}</p>
        </div>
    )
}

export default Home
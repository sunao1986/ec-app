import { signInAction } from './actions';
import { signOutAction } from './actions';
import { push } from 'connected-react-router';
import { auth, db, FirebaseTimestamp } from '../../firebase/index';

//ログインしてなかったらサインインページへ
export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid

                db.collection('users').doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()

                        dispatch(signInAction({
                            isSignedIn: true,
                            role: data.role,
                            uid: uid,
                            username: data.username
                        }))
                    })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
};

export const resetPassword = (email) => {
    return async (dispatch) => {
        if (email === "") {
            alert("必須項目を入力してください")
            return false
        } else {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('メールアドレスにリセットメールを送りました')
                    dispatch(push('/signin'))
                }).catch(() => {
                    alert('パスワードリセットに失敗しました')

                })

        }

    }
}



export const signIn = (email, password) => {
    return async (dispatch) => {
        if (email === "" || password === "") {
            alert("必須項目を入力してください")
            return false
        }

        return auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user
                if (user) {
                    const uid = user.uid

                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data()

                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username
                            }))
                            dispatch(push('/'))
                        })
                }
            })
    }
}

//ボタンを押したら登録する関数
export const signUp = (username, email, password, cofirmPassword) => {
    return async (dispatch) => {
        // vallidation
        if (username === "" || email === "" || password === "" || cofirmPassword === "") {
            alert("必須項目を入力してください")
            //何も実行せずに終了
            return false
        }
        if (password !== cofirmPassword) {
            alert("パスワードが一致しません")
            //何も実行せずに終了
            return false
        }
        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user

                if (user) {
                    const uid = user.uid
                    const timestamp = FirebaseTimestamp.now()

                    const userInitialData = {
                        created_at: timestamp,
                        email: email,
                        role: "customer",
                        uid: uid,
                        updated_at: timestamp,
                        username: username
                    }

                    db.collection('users').doc(uid).set(userInitialData)
                        .then(() => {
                            dispatch(push('/'))
                        })
                }
            })

    }
}

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(signOutAction());
                dispatch(push('/signin'))
            })
    }
}
import { db, FirebaseTimestamp } from "../../firebase";
import {push} from 'connected-react-router';

const productsRef = db.collection('products')

export const saveProducts = (name, description, category, gender, price) => {
    return async (dispatch) => {
        const timeStump = FirebaseTimestamp.now

        const data = {
            category: category,
            description: description,
            gender: gender,
            name: name,
            //文字列をintの10進数に変える
            price: parseInt(price,10)
        }

        const ref = productsRef.doc()
        const id = ref.id
        data.id = id
        data.create_at = timeStump

        return productsRef.doc(id).set(data)
            .then(() => {
                dispatch(push('/'))
            }).catch((error)=>{
                throw new Error(error)
            })
    }
}
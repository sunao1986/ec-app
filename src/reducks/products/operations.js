import { db, FirebaseTimestamp } from "../../firebase";
import { push } from 'connected-react-router';
import {deleteProductAction, fetchProductsAction} from "./actions"

const productsRef = db.collection('products')

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
      productsRef.doc(id).delete()
        .then(() => {
          const prevProducts = getState().products.list
          const nextProducts = prevProducts.filter(product => product.id !== id)
          dispatch(deleteProductAction(nextProducts))
        })
    }
  }

export const fetchProducts = () => {
    return async (dispatch) => {
      productsRef.orderBy('updated_at', 'desc').get()
      // query = (gender !== "") ? query.where('gender', '==', gender) : query;
      // query = (category !== "") ? query.where('category', '==', category) : query;
      // query.get()
        .then(snapshots => {
          const productList = []
          snapshots.forEach(snapshot => {
            const product = snapshot.data()
            productList.push(product)
          })
          dispatch(fetchProductsAction(productList))
        })
    }
  }

export const saveProduct = (id, name, description, category, gender, price, images, sizes) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now();

        const data = {
            category: category,
            description: description,
            gender: gender,
            name: name,
            images: images,
            sizes: sizes,
            price: parseInt(price, 10),
            updated_at: timestamp
        }

        if (id === "") {
            const ref = productsRef.doc();
            id = ref.id;
            data.id = id;
            data.created_at = timestamp;
        }
        return productsRef.doc(id).set(data, { merge: true })
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
}
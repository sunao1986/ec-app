import {makeStyles} from "@material-ui/styles";
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { db } from '../firebase';
import HTMLReactParser from 'html-react-parser';

const useStyles = makeStyles((theme) => ({
    sliderBox: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 24px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 400,
            width: 400
        },
    },
    detail: {
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto 16px auto',
            height: 320,
            width: 320
        },
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            height: 'auto',
            width: 400
        },
    },
    price: {
        fontSize: 36
    }
}))

const returnCodeToBr = (text) => {
    if(text === "") {
        return text
    } else {
        return HTMLReactParser(text.replace(/\r?\n/g, '<br>'))
    }
}


const ProductDetail = () => {

    const classes = useStyles()
    const selector = useSelector(state => state)
    const path = selector.router.location.pathname
    console.log(path);
    const id = path.split('/product/')[1]

    const [product, setProduct] = useState(null);
    console.log(product);

    useEffect(() => {
        db.collection('products').doc(id).get().then(doc => {
            const data = doc.data()
            setProduct(data)
        })
        // eslint-disable-next-line
    },[])


    return(
        <section className="c-section-wrapin">
            <h2>商品詳細ページ</h2>
            {product && (
                <div className="p-glid__row">
                    <div className={classes.sliderBox}>

                    </div>
                    <div className={classes.detail}>
                        <h2 className="u-text__headline">{product.name}</h2>
                        <p className={classes.price}>{product.price.toLocaleString()}</p>
                        <div className="module-spacer--small"></div>
                        <div className="module-spacer--small"></div>
                        <p>{returnCodeToBr(product.description)}</p>
                    </div>
                </div>
            )}

        </section>
    )
}
export default ProductDetail
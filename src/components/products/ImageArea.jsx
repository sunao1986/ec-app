import React, {useCallback} from 'react';
import {storage} from "../../firebase/index"
import {makeStyles} from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import ImagePreview from './ImagePreview';
// import {useDispatch} from "react-redux";

const useStyles = makeStyles({
    icon: {
        height: 48,
        width: 48
    }
})

const ImageArea = (props) => {

    const classes = useStyles();
    // const dispatch = useDispatch();
    const images = props.images;

    const deleteImage = useCallback(async (id) => {
        const ret = window.confirm('この画像を削除しますか？')
        if (!ret) {
            return false
        } else {
            const newImages = images.filter(image => image.id !== id);
            props.setImages(newImages);
            return storage.ref('images').child(id).delete()
        }
    // eslint-disable-next-line
    }, [images])

    const uploadImage = useCallback((event) => {
        // dispatch(showLoadingAction("uploading..."))
        const file = event.target.files;
        let blob = new Blob(file, { type: "image/jpeg" });

        // Generate random 16 digits strings
        const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N=16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

        const uploadRef = storage.ref('images').child(fileName);
        const uploadTask = uploadRef.put(blob);

        uploadTask.then(() => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = {id: fileName, path: downloadURL};
                props.setImages((prevState => [...prevState, newImage]))
                // dispatch(hideLoadingAction())
            });
        }).catch(() => {
            console.log("エラー");
            // dispatch(hideLoadingAction())
        });
    // eslint-disable-next-line
    }, [props.setImages])

    return(
        <div>
            <div className={"p-grid__listimages"}>
            {images.length > 0 && (
                    images.map(image => <ImagePreview delete={deleteImage} id={image.id} path={image.path} key={image.id} /> )
                )}
            </div>
            <div className={"u-text-right"}>
                <span>商品画像を登録</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input className={"u-display-none"} type="file"id="image"
                               onChange={(event) => uploadImage(event)}
                        />
                    </label>
                </IconButton>
            </div>

        </div>
    )
}

export default ImageArea
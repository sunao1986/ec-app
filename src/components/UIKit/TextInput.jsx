import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = (props) => {
    return(
        <TextField
            fullWidth={props.fullWidth}
            label={props.label}
            margin="dense"
            maltiline={props.multilene}
            required={props.required}
            rows={props.rows}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
        />
    )
}

export default TextInput
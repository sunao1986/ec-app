import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles({
    "formControl": {
        marginButtom: 16,
        minWidth: 128,
        width: "100%"
    }
})

const SelectBox = (props) => {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel >{props.label}</InputLabel>
            <Select
                value={props.value} required={props.required}
                onChange={(e) => props.select(e.target.value)}
            >
                {props.options.map((option) => {
                    return <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
};

export default SelectBox
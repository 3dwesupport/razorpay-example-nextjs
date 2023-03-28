import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";
import styles from '@/styles/Home.module.css'

/**
 * Render selectInputBox on screen
 * @param props
 * @constructor
 */
export const SelectInputBox = (props: any) => {
    const {label, defaultValue, items, onFieldChange, selectInputStyle, disabled = false, key} = props;

    //handle onChange event on select Fields
    const handleOnChange = (e: any) => {
        if (onFieldChange) {
            onFieldChange(e)
        }
    }

    return (
        <FormControl disabled={disabled} style={styles} className={styles.selectInputBox + " " + selectInputStyle}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={defaultValue}
                label={label}
                onChange={(e) => handleOnChange(e)}>
                {items && items.map((item: any) => {
                    return <MenuItem key={item} value={item}>{key ? item[key] : item}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}
import styles from "@/styles/Home.module.css";
import React from "react";
import {CircularProgress} from "@mui/material";

/**
  render loading icon on screen
 * @param params
 * @constructor
 */
export function Loading(params: any) {
    return (
        <div className={styles.loading}>
            {/*<CircularProgress className={styles.spin} variant="determinate" value={90} size={90} />*/}
            <CircularProgress disableShrink size={90}  />
        </div>
    )
}
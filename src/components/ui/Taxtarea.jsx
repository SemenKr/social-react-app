import React from "react";
import styles from "./Textarea.module.scss";

export const Textarea = ({ input, meta, ...props }) => {
    const isError = meta.error && meta.touched;
    return (
        <div className={`${styles.formControl} ${isError ? styles.error : ''}`}>
            <textarea {...input} {...props} placeholder={input.placeholder} wrap="soft" id="" rows="2" />
            {isError && <span>{meta.error}</span>}
        </div>
    );
};

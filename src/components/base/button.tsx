import React from "react";
import styles from "../../style/button.module.css";

type ButtonProps = {
    children: string | React.ReactNode;
    onClick(): void;
    variant?: "fill" | "empty";
};

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "fill" }) => {
    const style = variant === "fill" ? styles.fill : variant === "empty" ? styles.empty : "";
    return (
        <button className={`${styles.button} ${style}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;

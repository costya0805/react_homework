import React, {useState} from "react";
import styles from "../../style/input.module.css";
import SearchIcon from '../../assets/search.tsx';
import CrossIcon from '../../assets/cross.tsx';

type InputProps = {
    id: string;
    label?: string;
    placeholder?: string;
    isRequired?: boolean;
    width?: number;
    description?: string;
    value?: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onClear?(): void;
};

const Input: React.FC<InputProps> = (props) => {
    const {
        id,
        label,
        isRequired,
        width = 296,
        description,
        onChange,
        onClear,
    } = props;
    const [value, setValue] = useState(props.value|| '');
    return (
        <div className={styles.inputComponent}>
            {label ? (
                <div className={styles.label}>
                    <label htmlFor={id}>{label}</label>
                    {isRequired && <span className={styles.required}>*</span>}
                </div>
            ) : null}
            {id === 'search' ? (
                <div className={styles.search}>
                    <SearchIcon/>
                </div>
            ) : null}
            <input
                type={id === "password" ? id : "text"}
                id={id}
                className={`${styles.input} ${id === 'search' ? styles.inputSearch : ''} ${description ? styles.inputError : ''}`}
                style={{maxWidth: `${width}px`, width: `${width}px`}}
                placeholder={props.placeholder || ''}
                required={isRequired}
                value={value}
                onChange={(e)=>{
                    const value = e.target.value
                    setValue(value||'')
                    onChange(e)
                }}
            />
            {id === 'search' && value ? (
                <div
                    className={styles.cross}
                    onClick={()=> {
                        setValue('')
                        onClear && onClear()
                    }}
                >
                    <CrossIcon/>
                </div>
            ) : null}
            {description && <span className={styles.description}>{description}</span>}
        </div>
    );
};

export default Input;

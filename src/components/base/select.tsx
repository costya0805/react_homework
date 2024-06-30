import React, { useEffect, useRef, useState } from "react";
import styles from "../../style/select.module.css";
import Wrapper from "../../assets/wrapper";

type SelectProps = {
    label: string;
    options: { [key: string]: string };
    id: string;
    placeholder?: string;
    onChange: any;
};

const Select: React.FC<SelectProps> = ({ label, options, id, placeholder = "Не выбрано", onChange }) => {
    const nullLabel = placeholder;
    const selectRef = useRef<HTMLDivElement>(null);
    const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
    const [selectedElement, setSelectedElement] = useState<{ key: string; label: string }>({
        key: "0",
        label: placeholder,
    });

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpenSelect(false);
            document.removeEventListener("mousedown", handleClickOutside);
        }
    };

    useEffect(() => {
        if (isOpenSelect) {
            document.addEventListener("mousedown", handleClickOutside);
        }
    }, [isOpenSelect]);

    const setItem = (element: HTMLLIElement) => {
        const key = element.getAttribute("value") || "";
        const label = key === "0" ? nullLabel : element.textContent || "";

        setSelectedElement({ key: key, label: label });
        setIsOpenSelect(false);

        onChange(id, key);
    };

    const isElementSelected = selectedElement.key !== "0";

    return (
        <div className={styles.selectComponent}>
            <label htmlFor={"select" + id} className={styles.label}>
                {label}
            </label>
            <div className={styles.select} ref={selectRef}>
                <div
                    className={`${styles.selectInput} ${isOpenSelect ? styles.orangeBorder : ""}`}
                    onClick={() => setIsOpenSelect(!isOpenSelect)}
                >
                    <input
                        placeholder={selectedElement.label}
                        className={isElementSelected ? styles.selectedLabel : ""}
                        id={"select" + id}
                        type="text"
                        readOnly
                    />
                    <div className={`${styles.selectWrapper} ${isOpenSelect ? styles.selectWrapperOpen : ""}`}>
                        <Wrapper />
                    </div>
                </div>
                {isOpenSelect ? (
                    <ul className={styles.dropdown}>
                        {Object.entries(options).map((el) => (
                            <li
                                className={styles.element}
                                key={el[0]}
                                value={el[0]}
                                onClick={(event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                                    setItem(event.currentTarget);
                                }}
                            >
                                {el[1]}
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
        </div>
    );
};

export default Select;

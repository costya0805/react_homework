import React, { useEffect, useState } from "react";
import Button from "../base/button.tsx";
import styles from "../../style/modal.module.css";
import Input from "../base/input.tsx";
import Close from "../../assets/close.tsx";
import { trylogIn } from "../../redux/entities/auth.ts";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";

type AuthorizationProps = {
    onClose(): void;
};

const Authorization: React.FC<AuthorizationProps> = ({ onClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.authReducer);

    const handleAuth = () => {
        if (!!username && !!password) {
            const body = JSON.stringify({
                username,
                password,
            });
            dispatch(trylogIn(body));
        }
        if (!username) {
            setErrorUsername("Обязательное поле");
        }
        if (!password) {
            setErrorPassword("Обязательное поле");
        }
    };

    useEffect(() => {
        if (loading === "failed") {
            setErrorUsername("что-то не так c логином");
            setErrorPassword("или с паролем");
        }
        if (loading === "succeeded") {
            onClose();
        }
    }, [loading]);

    return (
        <div className={styles.modal}>
            <div className={styles.header}>
                <h1 className={styles.label}>Авторизация</h1>
                <div className={styles.cross} onClick={onClose}>
                    <Close />
                </div>
            </div>
            <div className={styles.inputs}>
                <Input
                    id={"login"}
                    label={"Логин"}
                    placeholder={"Введите логин"}
                    isRequired
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setErrorUsername("");
                    }}
                    description={errorUsername}
                />
                <Input
                    id={"password"}
                    label={"Пароль"}
                    placeholder={"Введите пароль"}
                    isRequired
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (loading === "failed") setErrorUsername("");
                        setErrorPassword("");
                    }}
                    description={errorPassword}
                />
            </div>
            <div className={styles.buttons}>
                <Button onClick={handleAuth}>Войти</Button>
                <Button onClick={onClose} variant={"empty"}>
                    Отменить
                </Button>
            </div>
        </div>
    );
};

export default Authorization;

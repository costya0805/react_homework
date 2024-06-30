import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import styles from "../../style/header.module.css";
import Button from "../base/button";
import Modal from "../base/modal";
import Authorization from "../modals/authorization";
import { logOut, checkLoackalStorage } from "../../redux/entities/auth.ts";
import UserAvatar from "./userAvatar.tsx";
import { useEffect } from "react";

const Header: React.FC = () => {
    const auth = useAppSelector((state) => state.authReducer.auth);
    const loading = useAppSelector((state) => state.authReducer.loading);
    const dispatch = useAppDispatch();
    const handleLogOut = () => {
        dispatch(logOut());
    };
    useEffect(() => {
        dispatch(checkLoackalStorage());
    }, []);
    return (
        <header className={styles.main}>
            <div className={styles.title}>Фильмопоиск</div>
            {loading !== "idle" && (
                <>
                    {!auth && <Modal content={Authorization} title={"Войти"} />}
                    {auth && (
                        <div className={styles.userBlock}>
                            <UserAvatar />
                            <Button onClick={handleLogOut} children={"Выйти"} variant="empty" />
                        </div>
                    )}
                </>
            )}
        </header>
    );
};

export default Header;

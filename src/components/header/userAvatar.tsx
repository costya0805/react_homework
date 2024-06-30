import UserIcon from "../../assets/user";
import styles from "../../style/userAvatar.module.css";
const UserAvatar: React.FC = () => {
    return (
        <div className={styles.main}>
            <UserIcon />
        </div>
    );
};

export default UserAvatar;

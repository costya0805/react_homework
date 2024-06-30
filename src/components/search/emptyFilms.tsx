import styles from "../../style/emptyFilms.module.css";
const EmptyFilms: React.FC = () => {
    return (
        <div className={styles.body}>
            <div className={styles.main}>Фильмы не найдены</div>
            <div className={styles.secondary}>Измените запрос и попробуйте снова</div>
        </div>
    );
};

export default EmptyFilms;

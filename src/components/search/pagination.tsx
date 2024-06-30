import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import Arrow from "../../assets/arrow";
import styles from "../../style/pagination.module.css";
import { searchParamsSlice } from "../../redux/entities/searchParams";
import { useSearchParams } from "react-router-dom";

const Pagination: React.FC = () => {
    const { page, total_pages } = useAppSelector((state) => state.searchReducer);
    const { setPage } = searchParamsSlice.actions;
    const dispatch = useAppDispatch();
    const [_, setSearchParams] = useSearchParams({ page: "1" });
    const handleClick = (newPage: number) => {
        dispatch(setPage(newPage));
        setSearchParams({ page: String(newPage) });
    };
    return (
        <div className={styles.body}>
            <button
                className={`${styles.left} ${styles.arrow}`}
                onClick={() => handleClick(page - 1)}
                disabled={page <= 1}
            >
                <Arrow width={5.73} height={11.56} />
            </button>
            <p>{[page]}</p>
            <button
                className={`${styles.rigth} ${styles.arrow}`}
                onClick={() => handleClick(page + 1)}
                disabled={page >= total_pages}
            >
                <Arrow width={5.73} height={11.56} />
            </button>
        </div>
    );
};

export default Pagination;

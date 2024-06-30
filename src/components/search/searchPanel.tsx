import styles from "../../style/searchPanel.module.css";
import Select from "../base/select";
import { useSearchParams } from "react-router-dom";
import { GENRES, YEARS } from "../../constans/constans";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux.ts";
import { setGenre, setReleaseYear } from "../../redux/entities/searchParams.ts";

type QueryParams = {
    page: string;
    title?: string;
    genre?: string;
    release_year?: string;
};

const SearchPanel: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const getQuery = (): { [key in string]: string } => {
        const title = searchParams.get("title");
        const genre = searchParams.get("genre");
        const release_year = searchParams.get("release_year");
        const querySet: QueryParams = { page: String(1) };
        if (title) {
            querySet.title = title;
        }
        if (genre) {
            querySet.genre = genre;
        }
        if (release_year) {
            querySet.release_year = release_year;
        }
        return querySet;
    };

    const handleReleaseYear = (id: string, key: string) => {
        if (key !== "0") {
            setSearchParams({ ...getQuery(), ...{ [id]: key } });
        } else {
            let params = getQuery();
            delete params[id];
            setSearchParams(params);
        }
        let data = key === "0" ? undefined : key;
        if (id === "genre") {
            dispatch(setGenre(data));
        }
        if (id === "release_year") {
            dispatch(setReleaseYear(data));
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.name}>Фильтры</div>
            <div className={styles.selects}>
                <Select label="Жанр" options={GENRES} id="genre" onChange={handleReleaseYear} />
                <Select label="Год выпуска" options={YEARS} id="release_year" onChange={handleReleaseYear} />
            </div>
        </div>
    );
};

export default SearchPanel;

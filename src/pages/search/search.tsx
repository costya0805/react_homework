import React, { useEffect } from "react";
import { filmsApi } from "../../redux/services/films.ts";
import { useSearchParams } from "react-router-dom";
import FilmSnipet from "../../components/search/filmSnipet.tsx";

import Loading from "../../assets/loading.tsx";
import SearchPanel from "../../components/search/searchPanel.tsx";
import Pagination from "../../components/search/pagination.tsx";

import styles from "./search.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux.ts";
import { searchParamsSlice, setTitle } from "../../redux/entities/searchParams.ts";
import Input from "../../components/base/input.tsx";
import EmptyFilms from "../../components/search/emptyFilms.tsx";

type QueryParams = {
    page: string;
    title?: string;
    genre?: string;
    release_year?: string;
};

const FilmsList: React.FC = () => {
    const { reed_query, page, genre, total_pages, title, release_year } = useAppSelector(
        (state) => state.searchReducer
    );

    const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
    const dispatch = useAppDispatch();
    const { setDataFromQuery, setTotalPages } = searchParamsSlice.actions;

    useEffect(() => {
        if (reed_query) {
            const page = Number(searchParams.get("page"));
            const title = searchParams.get("title") === null ? undefined : searchParams.get("title");
            const genre = searchParams.get("genre") === null ? undefined : searchParams.get("genre");
            const release_year =
                searchParams.get("release_year") === null ? undefined : searchParams.get("release_year");
            const querySet: QueryParams = { page: String(page) };
            if (genre) {
                querySet.genre = genre;
            }
            if (title) {
                querySet.title = title;
            }
            if (release_year) {
                querySet.release_year = release_year;
            }
            setSearchParams(querySet);
            dispatch(setDataFromQuery({ page, genre, title, release_year, reed_query: false }));
        }
    }, []);

    const { data, isLoading } = filmsApi.useGetFilmsQuery({ page, genre, title, release_year });

    useEffect(() => {
        if (!reed_query && (data?.total_pages || data?.total_pages === 0) && data.total_pages !== total_pages) {
            dispatch(setTotalPages(data.total_pages));
        }
    }, [data?.total_pages]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value === "" ? undefined : e.target.value;
        dispatch(setTitle(newTitle));
        const querySet: QueryParams = { page: "1" };
        if (newTitle) {
            querySet.title = newTitle;
        }
        const genre = searchParams.get("genre");
        const release_year = searchParams.get("release_year");
        if (genre) {
            querySet.genre = genre;
        }
        if (release_year) {
            querySet.release_year = release_year;
        }
        setSearchParams(querySet);
    };

    const handleClear = () => {
        dispatch(setTitle(undefined));

        const querySet: QueryParams = { page: "1" };
        const genre = searchParams.get("genre");
        const release_year = searchParams.get("release_year");
        if (genre) {
            querySet.genre = genre;
        }
        if (release_year) {
            querySet.release_year = release_year;
        }
        setSearchParams(querySet);
    };

    if (reed_query) return <></>;
    if (!reed_query)
        return (
            <div className={styles.body}>
                <SearchPanel />
                <div className={styles.rightPanel}>
                    <Input
                        id={"search"}
                        placeholder={"Название фильма"}
                        onChange={handleChange}
                        onClear={handleClear}
                        width={400}
                    />
                    <div className={styles.list}>
                        {isLoading && (
                            <div className={styles.loadBody}>
                                <Loading />
                            </div>
                        )}
                        {!isLoading && !data?.search_result.length && <EmptyFilms />}
                        {!!data?.search_result.length &&
                            data.search_result.map((film) => <FilmSnipet key={film.id} film={film} />)}
                    </div>
                    {!isLoading && total_pages > 1 && <Pagination />}
                </div>
            </div>
        );
};

export default FilmsList;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IFilm } from "../../models/IFilm";
import styles from "../../style/filmSnipet.module.css";
import Rating from "../rating/rating";

const FilmSnipet: React.FC<{ film: IFilm }> = ({ film }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`film/${film.id}`);
    };
    return (
        <div onClick={handleClick} className={styles.body}>
            <img className={styles.poster} src={film.poster} />
            <div className={styles.textInfo}>
                <div className={styles.topInfo}>
                    <p className={styles.filmName}>{film.title}</p>
                    <Rating filmId={film.id} />
                </div>
                <div className={styles.atributes}>
                    <FilmAttribut about="Жанр" data={film.genre} />
                    <FilmAttribut about="Год выпуска" data={film.release_year} />
                    <FilmAttribut about="Описание" data={film.description} />
                </div>
            </div>
        </div>
    );
};

const FilmAttribut: React.FC<{ about: string; data: string | number }> = ({ about, data }) => {
    return (
        <div className={styles.atribute}>
            <p className={styles.atributeName}>{about}</p>
            <p className={styles.atributeData}>{data}</p>
        </div>
    );
};
export default FilmSnipet;

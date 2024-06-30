import React from 'react';
import {IFilm} from '../../models/IFilm.ts';
import styles from '../../style/filmBigSnipet.module.css'
import Rating from '../rating/rating.tsx';

type FilmBigSnipetProps = {
    filmInfo: IFilm,
};

const FilmBigSnipet: React.FC<FilmBigSnipetProps> = ({filmInfo}) => {
    const titles: {[key:string]:string} = {
        genre: 'Жанр',
        release_year: 'Год выпуска',
        rating: 'Рейтинг',
    };
    
    const infoMap: string[] = ['genre', 'release_year', 'rating'];
    return (
        <div className={styles.filmBigSnipet}>
            <img className={styles.poster} src={filmInfo.poster}/>
            <div>
                <div className={styles.header}>
                    <h1>{filmInfo.title}</h1>
                    <Rating filmId = {filmInfo.id}/>
                </div>
                <div className={styles.info}>
                    {infoMap.map((item, index) => {
                        return <p key={index}><span>{titles[item]}:</span> {String(filmInfo[item])}</p>
                    })}
                    <span className={styles.descriptionTitle}>Описание</span>
                    <p className={styles.description}>{filmInfo.description}</p>
                </div>
            </div>
        </div>
    )
}

export default FilmBigSnipet;
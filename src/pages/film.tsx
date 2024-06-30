import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/redux";
import { getFilm } from "../redux/entities/films";
import Loading from "../assets/loading";
import FilmBigSnipet from "../components/filmBigSnipet/filmBigSnipet.tsx";
import ActorsList from "../components/actorsList/actorsList.tsx";

const Film: React.FC = () => {
    const dispatch = useAppDispatch();

    const { filmId } = useParams();
    const filmInfo = useAppSelector((state) => state.filmsReducer.entities[Number(filmId)]);
    const filmLoading = useAppSelector((state) => state.filmsReducer.loading);

    useEffect(() => {
        if (!filmInfo && typeof filmId === "string") dispatch(getFilm(filmId));
    }, []);

    const Error = () => {
        return <div>Ошибка при загрузке информации о фильме</div>;
    };

    const FilmInfo = () => {
        return (
            <div>
                <FilmBigSnipet filmInfo={filmInfo} />
                {filmInfo.actors && <ActorsList actors={filmInfo.actors} />}
            </div>
        );
    };

    if (filmLoading === "failed") {
        return <Error />;
    } else if (filmLoading === "succeeded" && filmInfo) {
        return <FilmInfo />;
    } else {
        <Loading />;
    }
};
export default Film;

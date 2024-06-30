import React from "react";
import styles from "../../style/actorsList.module.css";
import { IActor } from "../../models/IActor.ts";

type ActorsListProps = {
    actors: IActor[];
};

type ActorProps = {
    photo: string;
    name: string;
};
const ActorsList: React.FC<ActorsListProps> = (props) => {
    const { actors } = props;
    const Actor = (props: ActorProps) => {
        const { photo, name } = props;
        return (
            <div className={styles.actor}>
                <img src={photo} />
                <span>{name}</span>
            </div>
        );
    };
    return (
        <div className={styles.actorsList}>
            <h2>Актёры</h2>
            <div className={styles.actors}>
                {actors.map((actor, index) => {
                    return <Actor key={index} photo={actor.photo} name={actor.name} />;
                })}
            </div>
        </div>
    );
};

export default ActorsList;

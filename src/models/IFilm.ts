import { IActor } from "./IActor";

export interface IFilm {
    id: number;
    title: string;
    description: string;
    release_year: number;
    poster: string; //base64 img
    genre: string;
    rating: string; //float
    total_rates_count: string; //int
    actors: IActor[];
}

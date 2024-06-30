import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IFilm } from "../../models/IFilm";

const BASE_URL = "http://localhost:3030/api/v1";

export const getFilm = createAsyncThunk<IFilm, string, { rejectValue: string }>(
    "films/getFilm",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/movie/${id}`);
            const result = await response.json();
            return result;
        } catch (e) {
            return rejectWithValue("Не удалось загрузить фильм");
        }
    }
);

export const rateFilm = createAsyncThunk(
    "films/rateFilm",
    async (params: { rating: number; filmId: string; token: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/rateMovie/`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${params.token}`,
                },
                body: JSON.stringify({ movieId: params.filmId, user_rate: params.rating }),
            });
            const result = await response.json();
            if (result.error) {
                return rejectWithValue(result.error);
            }

            let current_ratings = localStorage.getItem("film_ratings");

            current_ratings = !!current_ratings ? JSON.parse(current_ratings) : {};

            let new_current_rating = JSON.stringify({ ...current_ratings, [params.filmId]: params.rating });

            localStorage.setItem("film_ratings", new_current_rating);

            return undefined;
        } catch (e) {
            return rejectWithValue("Не удалось оценить фильм");
        }
    }
);

export interface IFilmsState {
    entities: { [key in number]: IFilm };
    loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = { entities: {}, loading: "idle" } satisfies IFilmsState as IFilmsState;

export const filmsSlice = createSlice({
    name: "films",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFilm.fulfilled, (state, action) => {
                state.entities[action.payload.id] = action.payload;
                state.loading = "succeeded";
            })
            .addCase(getFilm.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(getFilm.rejected, (state) => {
                state.loading = "failed";
            });
    },
});

export const {} = filmsSlice.actions;

export default filmsSlice.reducer;

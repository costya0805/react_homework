import { createSlice } from "@reduxjs/toolkit";

import { ISerchParamsStore } from "../../models/ISearchParamsStore";

const initialState: ISerchParamsStore = {
    page: 1,
    title: undefined,
    release_year: undefined,
    genre: undefined,
    total_pages: 1,
    reed_query: true,
};

export const searchParamsSlice = createSlice({
    name: "searchParams",
    initialState: initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setTotalPages: (state, action) => {
            state.total_pages = action.payload;
        },
        setDataFromQuery: (state, action) => {
            state.title = action.payload.title === "" ? undefined : action.payload.title;
            state.release_year = action.payload.release_year === "" ? undefined : action.payload.release_year;
            state.genre = action.payload.genre === "" ? undefined : action.payload.genre;
            state.page = action.payload.page;
            state.reed_query = action.payload.reed_query;
        },
        setTitle: (state, action) => {
            state.title = action.payload === "" ? undefined : action.payload;
            state.page = 1;
        },
        setGenre: (state, action) => {
            state.genre = action.payload === "" ? undefined : action.payload;
            state.page = 1;
        },
        setReleaseYear: (state, action) => {
            state.release_year = action.payload === "" ? undefined : action.payload;
            state.page = 1;
        },
    },
});

export const selectTotalPages = (state: ISerchParamsStore) => state.total_pages;

export const { setPage, setDataFromQuery, setTotalPages, setTitle, setGenre, setReleaseYear } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;

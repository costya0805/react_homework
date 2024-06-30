import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFilm } from "../../models/IFilm";
import { ISearchParams } from "../../models/ISearchParams";

const BASE_URL = "http://localhost:3030/api/v1";

export const filmsApi = createApi({
    reducerPath: "filmsList",
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
    endpoints: (builder) => ({
        getFilms: builder.query<{ search_result: IFilm[]; total_pages: number }, ISearchParams>({
            query: ({ page, genre, title, release_year }) => ({
                url: `search`,
                params: { page: page, genre: genre, title: title, release_year: release_year },
            }),
        }),
    }),
});

export const { useGetFilmsQuery } = filmsApi;
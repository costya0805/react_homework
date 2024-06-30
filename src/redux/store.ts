import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { filmsApi } from "./services/films";
import searchReducer from "./entities/searchParams";
import filmsReducer from "./entities/films";
import authReducer from "./entities/auth";

const rootReducer = combineReducers({
    searchReducer,
    filmsReducer,
    authReducer,
    [filmsApi.reducerPath]: filmsApi.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(filmsApi.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

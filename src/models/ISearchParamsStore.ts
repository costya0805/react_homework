import { ISearchParams } from "./ISearchParams";

export interface ISerchParamsStore extends ISearchParams{
    reed_query: boolean,
    total_pages: number,
}
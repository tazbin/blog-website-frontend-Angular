import { Subscription } from "rxjs";

export interface AllBlogsModel {
    sub: Subscription,
    error: string,
    loading: boolean,
    items: any[],
    totalBlogs: number,
    totalPages: number[],
    currentPage: number
}

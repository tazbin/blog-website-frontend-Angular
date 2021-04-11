import { Subscription } from "rxjs";

export interface CategoriesModel {
    sub: Subscription,
    error: string,
    loading: boolean,
    items: {
        _id: string,
        name: string,
        count: number
    }[],
    totalBlogs: number,
    currentCategoryId: string
}

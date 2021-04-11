import { Subscription } from "rxjs";

export interface CategoryList {
    sub: Subscription,
    error: string,
    loading: boolean,
    items: {
        _id: string,
        name: string,
        count?: number
    }[]
}

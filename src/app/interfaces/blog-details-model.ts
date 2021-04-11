import { Subscription } from "rxjs";

export interface BlogDetailsModel {
    sub: Subscription,
    error: string,
    loading: boolean,
    blogId: string,
    data: any
}

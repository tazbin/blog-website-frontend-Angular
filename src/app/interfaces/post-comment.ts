import { Subscription } from "rxjs";

export interface PostComment {
    sub: Subscription,
    error: string,
    loading: boolean,
    success: boolean;
    body: {
        blogId: string,
        body: string
    }
}

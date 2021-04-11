import { Subscription } from "rxjs";

export interface PostReact {
    sub: Subscription,
    error: string,
    loading: boolean,
    body: {
        blogId: string,
        reactName: string
    }
}

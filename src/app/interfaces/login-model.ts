import { Subscription } from "rxjs";

export interface LoginModel {
    sub: Subscription,
    error: string,
    loading: boolean,
    data: {
        email: string,
        password: string
    }
}

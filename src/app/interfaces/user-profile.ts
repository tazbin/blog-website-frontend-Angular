import { Subscription } from "rxjs";

export interface UserProfile {
    sub: Subscription,
    error: string,
    loading: boolean,
    data: {
        img?: string,
        _id: string,
        email?: string,
        first_name: string,
        last_name?: string,
        role: string,
        joined?: string,
        job?: string,
        address?: string,
        about?: string
    },
    hasReact?: string
}

import { User, AuthToken } from "tweeter-shared"

export interface ErrorView {
    displayErrorMessage: (message: string) => void
}

export interface InfoView {
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string) => void
}

export interface MessageView extends ErrorView {
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string) => void
    clearLastInfoMessage: () => void
}

export interface NavigatorView extends ErrorView {
    setIsLoading: (value: boolean) => void
    updateUserInfo: (
        currentUser: User, 
        displayedUser: User | null, 
        authToken: AuthToken, 
        remember: boolean
    ) => void
    navigate: (path: string) => void
}

export class Presenter<V extends ErrorView | InfoView> {
    private _view: V;

    protected constructor(view: V) {
        this._view = view;
    }

    protected get view(): V {
        return this._view;
    }
}

import { AuthToken, User } from "tweeter-shared";
import { NavigatorView, Presenter } from "./Presenter";
import { UserService } from "../service/UserService";

export abstract class ValidateAndNavigatePresenter<N extends NavigatorView> extends Presenter<N> {
    protected service: UserService;
    
    public constructor(view: N) {
        super(view);
        this.service = new UserService();
    }

    protected doCheckButtonStatus(...fields: string[]): boolean {
        return fields.some(field => !field);
    }

    protected async doAuthenticationWithLoading(
        authAction: () => Promise<[user: User, authToken: AuthToken]>,
        navAction: () => void,
        rememberMe: boolean,
        operationDescription: string
    ): Promise<void> {
        try {
            this.doAsyncFailureReportingOperation(async () => {
                this.view.setIsLoading(true);
    
                this.doAuthenticationActionAndNavigate(
                  authAction,
                  navAction,
                  rememberMe
                );
            }, operationDescription);
        } finally {
            this.view.setIsLoading(false);
        }
    }
    
    private async doAuthenticationActionAndNavigate(
        authAction: () => Promise<[user: User, authToken: AuthToken]>,
        navAction: () => void,
        rememberMe: boolean
    ): Promise<void> {
        const [user, authToken] = await authAction();

        this.view.updateUserInfo(user, user, authToken, rememberMe);

        navAction();
    }
}
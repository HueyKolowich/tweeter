import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../../service/UserService";

export interface LoginView {
    setIsLoading: (value: boolean) => void,
    updateUserInfo: (
        currentUser: User, 
        displayedUser: User | null, 
        authToken: AuthToken, 
        remember: boolean
    ) => void,
    navigate: (path: string) => void,
    displayErrorMessage: (message: string) => void
}

export class LoginPresenter {
    private view: LoginView;
    private userService: UserService;

    public constructor(view: LoginView) {
        this.view = view;
        this.userService = new UserService();
    }

    public checkSubmitButtonStatus(alias: string, password: string): boolean {
        return !alias || !password;
    };

    public loginOnEnter(
        event: React.KeyboardEvent<HTMLElement>, 
        alias: string, 
        password: string,
        rememberMe: boolean,
        originalUrl: string | undefined
    ) {
        if (event.key == "Enter" && !this.checkSubmitButtonStatus(alias, password)) {
            this.doLogin(alias, password, rememberMe, originalUrl);
        }
    };

    public async doLogin(
        alias: string, 
        password: string, 
        rememberMe: boolean,
        originalUrl: string | undefined
    ) {
        try {
          this.view.setIsLoading(true);
    
          const [user, authToken] = await this.userService.login(alias, password);
    
          this.view.updateUserInfo(user, user, authToken, rememberMe);
    
          if (!!originalUrl) {
            this.view.navigate(originalUrl);
          } else {
            this.view.navigate("/");
          }
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to log user in because of exception: ${error}`
          );
        } finally {
          this.view.setIsLoading(false);
        }
    };
}
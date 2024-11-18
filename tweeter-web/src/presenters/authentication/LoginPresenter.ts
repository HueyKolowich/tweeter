import { UserService } from "../../service/UserService";
import { NavigatorView, Presenter } from "../Presenter";

export class LoginPresenter extends Presenter<NavigatorView> {
    private userService: UserService;

    public constructor(view: NavigatorView) {
        super(view);
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
          this.doAsyncFailureReportingOperation(async () => {
            this.view.setIsLoading(true);
      
            const [user, authToken] = await this.userService.login(alias, password);
      
            this.view.updateUserInfo(user, user, authToken, rememberMe);
      
            if (!!originalUrl) {
              this.view.navigate(originalUrl);
            } else {
              this.view.navigate("/");
            }
          }, 'log user in');
        } finally {
          this.view.setIsLoading(false);
        }
    };
}
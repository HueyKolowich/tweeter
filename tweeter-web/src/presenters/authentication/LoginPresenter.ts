import { NavigatorView } from "../Presenter";
import { ValidateAndNavigatePresenter } from "../ValidateAndNavigatePresenter";

export class LoginPresenter extends ValidateAndNavigatePresenter<NavigatorView> {
    public checkSubmitButtonStatus(alias: string, password: string): boolean {
        return this.doCheckButtonStatus(alias, password);
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
        this.doAuthenticationWithLoading(
          async () => this.service.login(alias, password),
          () => {
            if (!!originalUrl) {
              this.view.navigate(originalUrl);
            } else {
              this.view.navigate("/");
            }
          },
          rememberMe,
          'log user in'
        );
    };
}
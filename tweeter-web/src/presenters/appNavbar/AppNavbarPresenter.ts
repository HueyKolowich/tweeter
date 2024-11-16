import { AuthToken } from "tweeter-shared";
import { UserService } from "../../service/UserService";

export interface AppNavbarView {
    clearUserInfo: () => void,
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string) => void,
    displayErrorMessage: (message: string, bootstrapClasses?: string) => void,
    clearLastInfoMessage: () => void
}

export class AppNavbarPresenter {
    private view: AppNavbarView;
    private userService: UserService;

    public constructor(view: AppNavbarView) {
        this.view = view;
        this.userService = new UserService();
    }

    public async logOut(authToken: AuthToken | null) {
        this.view.displayInfoMessage("Logging Out...", 0);
    
        try {
          await this.userService.logout(authToken!);
    
          this.view.clearLastInfoMessage();
          this.view.clearUserInfo();
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to log user out because of exception: ${error}`
          );
        }
    };
}
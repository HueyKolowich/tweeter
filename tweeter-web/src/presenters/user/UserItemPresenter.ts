import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../../service/UserService";
import { ErrorView, Presenter } from "../Presenter";

export interface UserItemView extends ErrorView {
    changeDisplayedUser: (user: User) => void
}

export class UserItemPresenter extends Presenter<UserItemView> {
    private userService: UserService;

    constructor(view: UserItemView) {
        super(view);
        this.userService = new UserService();
    }

    public async navigateToUser(event: React.MouseEvent, authToken: AuthToken, currentUser: User): Promise<void> {
        event.preventDefault();
    
        try {
          const alias = this.extractAlias(event.target.toString());
    
          const user = await this.userService.getUser(authToken!, alias);
    
          if (!!user) {
            if (currentUser!.equals(user)) {
              this.view.changeDisplayedUser(currentUser!);
            } else {
              this.view.changeDisplayedUser(user);
            }
          }
        } catch (error) {
          this.view.displayErrorMessage(`Failed to get user because of exception: ${error}`);
        }
    };
    
    private extractAlias(value: string): string {
        const index = value.indexOf("@");
        return value.substring(index);
    };
}
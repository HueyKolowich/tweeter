import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../service/UserService";

export interface UserItemView {
    changeDisplayedUser: (user: User) => void
    displayErrorMessage: (message: string) => void
}

export class UserItemPresenter {
    private _view: UserItemView;
    private userService: UserService;

    constructor(view: UserItemView) {
        this._view = view;
        this.userService = new UserService();
    }

    public async navigateToUser(event: React.MouseEvent, authToken: AuthToken, currentUser: User): Promise<void> {
        event.preventDefault();
    
        try {
          const alias = this.extractAlias(event.target.toString());
    
          const user = await this.userService.getUser(authToken!, alias);
    
          if (!!user) {
            if (currentUser!.equals(user)) {
              this._view.changeDisplayedUser(currentUser!);
            } else {
              this._view.changeDisplayedUser(user);
            }
          }
        } catch (error) {
          this._view.displayErrorMessage(`Failed to get user because of exception: ${error}`);
        }
    };
    
    private extractAlias(value: string): string {
        const index = value.indexOf("@");
        return value.substring(index);
    };
}
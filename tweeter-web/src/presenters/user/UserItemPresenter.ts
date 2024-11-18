import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../../service/UserService";
import { View, Presenter } from "../Presenter";

export interface UserItemView extends View {
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

        this.doAsyncFailureReportingOperation(async () => {
          const alias = this.extractAlias(event.target.toString());
    
          const user = await this.userService.getUser(authToken!, alias);
    
          if (!!user) {
            if (currentUser!.equals(user)) {
              this.view.changeDisplayedUser(currentUser!);
            } else {
              this.view.changeDisplayedUser(user);
            }
          }
        }, 'get user');
    };
    
    private extractAlias(value: string): string {
        const index = value.indexOf("@");
        return value.substring(index);
    };
}
import { User } from "tweeter-shared";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "./UserInfoHook";
import { useState } from "react";
import { UserItemView, UserItemPresenter } from "../../presenters/user/UserItemPresenter";

interface UserNavigation {
  navigateToUser: (event: React.MouseEvent) => Promise<void>
}

const useUserNavigation = (): UserNavigation => {
    const { setDisplayedUser, currentUser, authToken } = useUserInfo();
    const { displayErrorMessage } = useToastListener();

    const listener: UserItemView = {
      changeDisplayedUser: (user: User) => setDisplayedUser(user),
      displayErrorMessage: displayErrorMessage
    }
  
    const [presenter] = useState(new UserItemPresenter(listener));
  
    const navigateToUser = (event: React.MouseEvent): Promise<void> => {
      return presenter.navigateToUser(event, authToken!, currentUser!);
    };

    return {
      navigateToUser
    };
};

export default useUserNavigation;
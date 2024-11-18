import { User } from "tweeter-shared";
import { PagedPresenter } from "../PagedPresenter";
import { FollowService } from "../../service/FollowService";

export abstract class UserItemListPresenter extends PagedPresenter<User, FollowService> {
    protected createService(): FollowService {
        return new FollowService();
    }
}
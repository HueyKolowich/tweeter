import { AuthToken, Status } from "tweeter-shared";
import { ServerFacade } from "../net/ServerFacade";

export class StatusService {
    private serverFacade = new ServerFacade();

    public async loadMoreFeedItems(
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        const pagedUserItemRequest = {
            token: authToken.token,
            userAlias: userAlias,
            pageSize: pageSize,
            lastItem: lastItem?.dto || null
        };
        return this.serverFacade.loadMoreFeedItems(pagedUserItemRequest);
    };
    
    public async loadMoreStoryItems(
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        const pagedUserItemRequest = {
            token: authToken.token,
            userAlias: userAlias,
            pageSize: pageSize,
            lastItem: lastItem?.dto || null
        };
        return this.serverFacade.loadMoreStoryItems(pagedUserItemRequest);
    };

    public async postStatus(
        authToken: AuthToken,
        newStatus: Status
      ): Promise<void> {
        const statusRequest = {
            token: authToken.token,
            userAlias: newStatus.user.alias,
            newStatus: newStatus.dto
        }
        this.serverFacade.postStatus(statusRequest)
      };
}
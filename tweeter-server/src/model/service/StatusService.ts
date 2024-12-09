import { Status, FakeData, StatusDto } from "tweeter-shared";
import { ItemService } from "./ItemService";

export class StatusService extends ItemService<StatusDto, Status> {
    public async loadMoreFeedItems(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDto | null
    ): Promise<[StatusDto[], boolean]> {
        return this.getFakeData(lastItem, pageSize, userAlias, FakeData.instance.getPageOfStatuses.bind(FakeData.instance));
    };
    
    public async loadMoreStoryItems(
        token: string,
        userAlias: string,
        pageSize: number,
        lastItem: StatusDto | null
    ): Promise<[StatusDto[], boolean]> {
        return this.getFakeData(lastItem, pageSize, userAlias, FakeData.instance.getPageOfStatuses.bind(FakeData.instance));
    };

    public async postStatus(
        token: string,
        newStatus: StatusDto
      ): Promise<void> {
        console.log(`No persistence yet so... here it is for your viewing pleasure dear server: ${newStatus.post}`);
      };
}
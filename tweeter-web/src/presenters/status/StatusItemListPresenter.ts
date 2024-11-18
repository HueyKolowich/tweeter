import { Status } from "tweeter-shared";
import { PagedPresenter } from "../PagedPresenter";
import { StatusService } from "../../service/StatusService";

export abstract class StatusItemListPresenter extends PagedPresenter<Status, StatusService> {
    protected createService(): StatusService {
        return new StatusService();
    }
}
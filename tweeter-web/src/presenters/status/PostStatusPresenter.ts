import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../../service/StatusService";
import { MessageView, Presenter } from "../Presenter";

export interface PostStatusView extends MessageView {
    setPost: (value: string) => void
    setIsLoading: (status: boolean) => void
}

export class PostStatusPresenter extends Presenter<PostStatusView> {
    private _statusService: StatusService;

    constructor(view: PostStatusView) {
        super(view);
        this._statusService = new StatusService();
    }

    public get statusService(): StatusService {
        return this._statusService;
    }

    public async submitPost(post: string, currentUser: User, authToken: AuthToken) {
        try {
            this.doAsyncFailureReportingOperation(async () => {
                this.view.setIsLoading(true);
                this.view.displayInfoMessage("Posting status...", 0);
            
                const status = new Status(post, currentUser, Date.now());
            
                await this.statusService.postStatus(authToken, status);
            
                this.view.setPost("");
                this.view.displayInfoMessage("Status posted!", 2000);
            }, 'post the status');
        } finally {
            this.view.clearLastInfoMessage();
            this.view.setIsLoading(false);
        }
    };

    public clearPost(event: React.MouseEvent) {
        event.preventDefault();
        this.view.setPost("");
    };
}
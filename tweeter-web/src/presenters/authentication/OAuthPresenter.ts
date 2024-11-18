import { Presenter, InfoView } from "../Presenter";

export class OAuthPresenter extends Presenter<InfoView> {
    public constructor(view: InfoView) {
        super(view);
    }

    public displayInfoMessageWithDarkBackground(message: string): void {
        this.view.displayInfoMessage(message, 3000, "text-white bg-primary");
    }
}
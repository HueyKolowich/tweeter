import { Presenter, View } from "../Presenter";

export interface OAuthView extends View {
    displayInfoMessage: (message: string, duration: number, bootstrapClasses?: string) => void
}

export class OAuthPresenter extends Presenter<OAuthView> {
    public constructor(view: OAuthView) {
        super(view);
    }

    public displayInfoMessageWithDarkBackground(message: string): void {
        this.view.displayInfoMessage(message, 3000, "text-white bg-primary");
    }
}
import { Toast } from "../../components/toaster/Toast";
import { ErrorView, Presenter } from "../Presenter";

export interface ToasterView extends ErrorView {
    deleteToast: (id: string) => void
}

export class ToasterPresenter extends Presenter<ToasterView> {
    constructor(view: ToasterView) {
        super(view);
    }

    public deleteExpiredToasts(toastList: Toast[]) {
        const now = Date.now();
    
        for (let toast of toastList) {
          if (
            toast.expirationMillisecond > 0 &&
            toast.expirationMillisecond < now
          ) {
            this.view.deleteToast(toast.id);
          }
        }
    };
}
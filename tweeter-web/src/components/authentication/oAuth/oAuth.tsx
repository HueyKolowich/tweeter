import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import useToastListener from '../../toaster/ToastListenerHook';
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

interface Props {
    toastMessage: string
    id: string
    name: string
    icon: [IconPrefix, IconName]
}

const OAuth = (props: Props) => {
    const { displayInfoMessage } = useToastListener();

    const displayInfoMessageWithDarkBackground = (message: string): void => {
      displayInfoMessage(message, 3000, "text-white bg-primary");
    };

    return (
        <button
            type="button"
            className="btn btn-link btn-floating mx-1"
            onClick={() =>
                displayInfoMessageWithDarkBackground(
                    props.toastMessage
                )
            }
            >
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={props.id}>{props.name}</Tooltip>}
            >
                <FontAwesomeIcon icon={props.icon} />
            </OverlayTrigger>
        </button>
    );
};

export default OAuth;
import "./PostStatus.css";
import { useState } from "react";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "../userInfo/UserInfoHook";
import { PostStatusPresenter, PostStatusView } from "../../presenters/status/PostStatusPresenter";

interface Props {
  presenter?: PostStatusPresenter
}

const PostStatus = (props: Props) => {
  const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
    useToastListener();

  const { currentUser, authToken } = useUserInfo();
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const listener: PostStatusView = {
    setPost: setPost,
    setIsLoading: setIsLoading,
    displayInfoMessage: displayInfoMessage,
    displayErrorMessage: displayErrorMessage,
    clearLastInfoMessage: clearLastInfoMessage
  };

  const [presenter] = useState(props.presenter ?? new PostStatusPresenter(listener));

  const submitPost = async (event: React.MouseEvent) => {
    event.preventDefault();

    presenter.submitPost(post, currentUser!, authToken!);
  };

  const clearPost = (event: React.MouseEvent) => {
    presenter.clearPost(event);
  };

  const checkButtonStatus: () => boolean = () => {
    return !post.trim() || !authToken || !currentUser;
  };

  return (
    <div className={isLoading ? "loading" : ""}>
      <form>
        <div className="form-group mb-3">
          <textarea
            className="form-control"
            id="postStatusTextArea"
            rows={10}
            placeholder="What's on your mind?"
            aria-label="statustextfield"
            value={post}
            onChange={(event) => {
              setPost(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <button
            id="postStatusButton"
            className="btn btn-md btn-primary me-1"
            aria-label="postStatus"
            type="button"
            disabled={checkButtonStatus()}
            style={{ width: "8em" }}
            onClick={(event) => submitPost(event)}
          >
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <div>Post Status</div>
            )}
          </button>
          <button
            id="clearStatusButton"
            className="btn btn-md btn-secondary"
            aria-label="clearStatus"
            type="button"
            disabled={checkButtonStatus()}
            onClick={(event) => clearPost(event)}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostStatus;

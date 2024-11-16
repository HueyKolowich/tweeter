import "./PostStatus.css";
import { useState } from "react";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "../userInfo/UserInfoHook";
import { PostStatusPresenter, PostStatusView } from "../../presenters/status/PostStatusPresenter";

const PostStatus = () => {
  const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
    useToastListener();

  const { currentUser, authToken } = useUserInfo();
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const listener: PostStatusView = {
    setPost: (value: string) => setPost(value),
    setIsLoading: (status: boolean) => setIsLoading(status),
    displayInfoMessage: (message: string, duration: number) => displayInfoMessage(message, duration),
    displayErrorMessage: (message: string) => displayErrorMessage(message),
    clearLastInfoMessage: () => clearLastInfoMessage
  };

  const [presenter] = useState(new PostStatusPresenter(listener));

  const submitPost = async (event: React.MouseEvent) => {
    presenter.submitPost(event, post, currentUser!, authToken!);
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

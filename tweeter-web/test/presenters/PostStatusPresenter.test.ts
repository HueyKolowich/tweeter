import { mock, instance, spy, when, verify, anyOfClass, anyNumber, deepEqual, anyString } from 'ts-mockito';
import { PostStatusPresenter, PostStatusView } from '../../src/presenters/status/PostStatusPresenter';
import { StatusService } from '../../src/service/StatusService';
import { AuthToken, Status, User } from 'tweeter-shared';

describe('PostStatusPresenter', () => {
    let mockPostStatusView: PostStatusView;
    let postStatusPresenter: PostStatusPresenter;
    let mockStatusService: StatusService;

    const user = new User('test', 'user', 'testuser', '');
    const authToken = new AuthToken('test', Date.now());
    
    beforeEach(() => {
        mockPostStatusView = mock<PostStatusView>();
        const mockPostStatusViewInstance = instance(mockPostStatusView);

        const postStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusViewInstance));
        postStatusPresenter = instance(postStatusPresenterSpy);

        mockStatusService = mock<StatusService>();
        const mockStatusServiceInstance = instance(mockStatusService);

        when(postStatusPresenterSpy.statusService).thenReturn(mockStatusServiceInstance);
    });

    it('tells the view to display a posting status message', async () => {
        await postStatusPresenter.submitPost('test post message', user, authToken);
        verify(mockPostStatusView.displayInfoMessage('Status posted!', 2000));
    });

    it('calls postStatus on the post status service with the correct status string and auth token', async () => {
        await postStatusPresenter.submitPost('test post message', user, authToken);
        verify(mockStatusService.postStatus(
            authToken,
            deepEqual(new Status('test post message', user, anyNumber()))
        )).once();
    });

    it('on post status success, tells the view to clear the last info message, clear the post, and display a status posted message', async () => {
        await postStatusPresenter.submitPost('test post message', user, authToken);
        verify(mockPostStatusView.clearLastInfoMessage());
        verify(mockPostStatusView.setPost(''));
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000));
    });

    it('on post status failure, tells the view to display an error message and clear the last info message and does not tell it to clear the post or display a status posted message', async () => {
        const error = new Error('An error occurred');
        when(mockStatusService.postStatus(authToken, deepEqual(new Status('test post message', user, anyNumber())))).thenThrow(error);

        await postStatusPresenter.submitPost('test post message', user, authToken);
        
        verify(mockPostStatusView.displayErrorMessage('Failed to post the status because of exception: Error: An error occurred')).once();
        verify(mockPostStatusView.setPost('')).never();
        verify(mockPostStatusView.displayInfoMessage("Status posted!", 2000));
    });
});
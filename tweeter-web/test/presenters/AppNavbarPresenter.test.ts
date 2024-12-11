import { AuthToken, User } from 'tweeter-shared';
import { AppNavbarPresenter, AppNavbarView } from '../../src/presenters/appNavbar/AppNavbarPresenter';
import { instance, mock, spy, verify, when } from 'ts-mockito';
import { UserService } from '../../src/service/UserService';

describe('AppNavbarPresenter', () => {
    let mockAppNavbarView: AppNavbarView;
    let appNavbarPresenter: AppNavbarPresenter;
    let mockUserService: UserService;
    
    const user = new User('test', 'user', 'testuser', '');
    const authToken = new AuthToken('test', Date.now());
    
    beforeEach(() => {
        mockAppNavbarView = mock<AppNavbarView>();
        const mockAppNavbarViewInstance = instance(mockAppNavbarView);

        const appNavbarPresenterSpy = spy(new AppNavbarPresenter(mockAppNavbarViewInstance));
        appNavbarPresenter = instance(appNavbarPresenterSpy);

        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        when(appNavbarPresenterSpy.userService).thenReturn(mockUserServiceInstance);
    });

    it('tells the view to display a logging out message', async () => {
        await appNavbarPresenter.logOut(authToken, user);
        verify(mockAppNavbarView.displayInfoMessage("Logging Out...", 0)).once();
    });

    it('calls logout on the user service with the correct auth token', async () => {
        await appNavbarPresenter.logOut(authToken, user);
        verify(mockUserService.logout(authToken, user)).once();
    });

    it('on logout success, tells the view to clear the last info message and clear the user info', async () => {
        await appNavbarPresenter.logOut(authToken, user);
        verify(mockAppNavbarView.clearLastInfoMessage()).once();
        verify(mockAppNavbarView.clearUserInfo()).once();
    });

    it('on logout failure, the presenter tells the view to display an error message and does not tell it to clear the last info message or clear the user info', async () => {
        const error = new Error('An error occurred');
        when(mockUserService.logout(authToken, user)).thenThrow(error);

        await appNavbarPresenter.logOut(authToken, user);
        
        verify(mockAppNavbarView.displayErrorMessage('Failed to log user out because of exception: Error: An error occurred')).once();
        verify(mockAppNavbarView.clearLastInfoMessage()).never();
        verify(mockAppNavbarView.clearUserInfo()).never();
    });
});
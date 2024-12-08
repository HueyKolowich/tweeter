import PostStatus from '../../src/components/postStatus/PostStatus';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import { PostStatusPresenter } from '../../src/presenters/status/PostStatusPresenter';
import { instance, mock, verify } from 'ts-mockito';
import { AuthToken, User } from 'tweeter-shared';
import useUserInfo from '../../src/components/userInfo/UserInfoHook';

jest.mock("../../src/components/userInfo/UserInfoHook", () => ({
    ...jest.requireActual("../../src/components/userInfo/UserInfoHook"),
    __esModule: true,
    default: jest.fn(),
}));

describe('PostStatus Component', () => {
    let mockUser: User;
    let mockAuthToken: AuthToken;

    beforeAll(() => {
        mockUser = mock<User>();
        const mockUserInstance = instance(mockUser);

        mockAuthToken = mock<AuthToken>();
        const mockAuthTokenInstance = instance(mockAuthToken);

        (useUserInfo as jest.Mock).mockReturnValue({
            currentUser: mockUserInstance,
            authToken: mockAuthTokenInstance,
        });
    });

    it('when first rendered the Post Status and Clear buttons are both disabled', async () => {
        const { postStatusButton, clearStatusButton } = renderPostStatusAndGetElements();
        expect(postStatusButton).toBeDisabled();
        expect(clearStatusButton).toBeDisabled();
    });

    it('both buttons are enabled when the text field has text', async () => {
        const { statusField, postStatusButton, clearStatusButton, user } = renderPostStatusAndGetElements();

        await user.type(statusField, 'test status post');

        expect(postStatusButton).toBeEnabled();
        expect(clearStatusButton).toBeEnabled();
    });

    it('both buttons are disabled when the text field is cleared', async () => {
        const { statusField, postStatusButton, clearStatusButton, user } = renderPostStatusAndGetElements();

        await user.type(statusField, 'test status post');

        expect(postStatusButton).toBeEnabled();
        expect(clearStatusButton).toBeEnabled();

        await user.clear(statusField);

        expect(postStatusButton).toBeDisabled();
        expect(clearStatusButton).toBeDisabled();
    });

    it('The presenter\'s postStatus method is called with correct parameters when the Post Status button is pressed', async () => {
        const mockPresenter = mock<PostStatusPresenter>();
        const mockPresenterInstance = instance(mockPresenter);

        const { statusField, postStatusButton, user } = renderPostStatusAndGetElements(mockPresenterInstance);

        await user.type(statusField, 'test status post');
        await user.click(postStatusButton);

        verify(mockPresenter.submitPost('test status post', mockUser, mockAuthToken));
    });
});

const renderPostStatus = (presenter?: PostStatusPresenter) => {
    return render(
        <>
            {!!presenter ? (
                    <PostStatus presenter={presenter} />
                ) : (
                    <PostStatus />
                )
            }
        </>
    );
} 

const renderPostStatusAndGetElements = (presenter?: PostStatusPresenter) => {
    const user = userEvent.setup();

    renderPostStatus(presenter);

    const statusField = screen.getByLabelText('statustextfield');
    const postStatusButton = screen.getByLabelText('postStatus');
    const clearStatusButton = screen.getByLabelText('clearStatus');

    return { statusField, postStatusButton, clearStatusButton, user };
}

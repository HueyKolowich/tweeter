import Login from '../../src/components/authentication/login/Login';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { LoginPresenter } from '../../src/presenters/authentication/LoginPresenter';
import { anything, instance, mock, verify } from 'ts-mockito';

library.add(fab);

describe('Login Component', () => {
    it('start with the sign in button disabled', () => {
        const { signInButton } = renderLoginAndGetElements('/');
        expect(signInButton).toBeDisabled();
    });

    it('enables the sign in button if both alias and password fields have text', async () => {
        const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElements('/');
        
        await user.type(aliasField, 'test');
        await user.type(passwordField, 'test');
        expect(signInButton).toBeEnabled();
    });

    it('disables the sign in button if either field is cleared', async () => {
        const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElements('/');
        
        await user.type(aliasField, 'test');
        await user.type(passwordField, 'test');
        expect(signInButton).toBeEnabled();

        await user.clear(aliasField);
        expect(signInButton).toBeDisabled();

        await user.type(aliasField, 'test');
        expect(signInButton).toBeEnabled();

        await user.clear(passwordField);
        expect(signInButton).toBeDisabled();
    });

    it('calls the presenter\'s login method with the correct parameters when the sign in button is pressed', async () => {
        const mockPresenter = mock<LoginPresenter>();
        const mockPresenterInstance = instance(mockPresenter);

        const originalUrl = 'https://testurl.com';
        const alias = 'testalias';
        const password = 'testpassword';

        const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElements(originalUrl, mockPresenterInstance);

        await user.type(aliasField, alias);
        await user.type(passwordField, password);
        await user.click(signInButton);

        verify(mockPresenter.doLogin(alias, password, anything(), originalUrl)).once();
    });
});

const renderLogin = (originalUrl: string, presenter?: LoginPresenter) => {
    return render(
        <MemoryRouter>
            {!!presenter ? 
                (<Login originalUrl={originalUrl} presenter={presenter} />) 
            : 
                (<Login originalUrl={originalUrl} />)
            }
        </MemoryRouter>
    );
} 

const renderLoginAndGetElements = (originalUrl: string, presenter?: LoginPresenter) => {
    const user = userEvent.setup();

    renderLogin(originalUrl, presenter);

    const signInButton = screen.getByRole('button', { name: /Sign in/i });
    const aliasField = screen.getByLabelText('Alias');
    const passwordField = screen.getByLabelText('Password');

    return { signInButton, aliasField, passwordField, user };
}

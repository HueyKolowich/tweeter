/**
 * @jest-environment node
 */

import { instance, spy } from "ts-mockito";
import { ServerFacade } from "../../src/net/ServerFacade";
import { PagedItemRequest, RegisterRequest, TweeterRequest, UserDto } from "tweeter-shared";

describe('Server Facade', () => {
    let serverFacade: ServerFacade;

    const registerRequest: RegisterRequest = {
        firstName: 'John',
        lastName: 'Smith',
        password: 'testpassword',
        userAlias: '@John',
        imageStringBase64: 'test',
        imageFileExtension: '.png'
    }

    const tweeterRequest: TweeterRequest = {
        token: 'test-token',
        userAlias: '@John'
    }

    const pagedItemRequest: PagedItemRequest<UserDto> = {
        ...tweeterRequest,
        pageSize: 10,
        lastItem: null
    }

    beforeEach(() => {
        const serverFacadeSpy = spy(new ServerFacade());
        serverFacade = instance(serverFacadeSpy);
    });

    it('verifies that a call to /user/register through register() succeeds', async () => {
        const [user, authToken] = await serverFacade.register(registerRequest);
        expect(user).not.toBeNull();
        expect(authToken).not.toBeNull();
    });

    it('verifies that a call to /follower/list through getMoreFollowers() succeeds', async () => {
        const [items, hasMore] = await serverFacade.getMoreFollowers(pagedItemRequest);
        expect(items).not.toBeNull();
        expect(hasMore).not.toBeNull();
    });

    it('verifies that a call to /follower/count through getFollowerCount() succeeds', async () => {
        const count = await serverFacade.getIsFollowerCount(tweeterRequest);
        expect(count).not.toBeNull();
    });
});
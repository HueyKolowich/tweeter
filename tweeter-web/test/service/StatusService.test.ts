/**
 * @jest-environment node
 */

import { instance, spy } from "ts-mockito";
import { StatusService } from "../../src/service/StatusService";
import { AuthToken } from "tweeter-shared";

describe('Status Service', () => {
    let statusService: StatusService;

    const userAlias = '@Test';
    const authToken = new AuthToken('test-token', Date.now());
    const pageSize = 10;
    const lastItem = null;

    beforeEach(() => {
        const statusServiceSpy = spy(new StatusService());
        statusService = instance(statusServiceSpy);
    });

    it('returns a user\'s story pages', async () => {
        const [items, hasMore] = await statusService.loadMoreStoryItems(authToken, userAlias, pageSize, lastItem);
        expect(items).not.toBeNull();
        expect(hasMore).not.toBeNull();
    });
});
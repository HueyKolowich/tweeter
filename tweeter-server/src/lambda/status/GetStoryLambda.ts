import { PagedItemRequest, PagedItemResponse, Status, StatusDto } from 'tweeter-shared';
import { StatusService } from '../../model/service/StatusService';
import { handlePagedRequest } from '../util/HandlePagedRequest';

export const handler = async (request: PagedItemRequest<StatusDto>): Promise<PagedItemResponse<StatusDto>> => {
    const statusService = new StatusService(Status);
    return handlePagedRequest(request, statusService.loadMoreStoryItems.bind(statusService));
}
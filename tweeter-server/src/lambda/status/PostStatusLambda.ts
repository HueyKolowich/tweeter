import { StatusRequest, Status } from 'tweeter-shared';
import { StatusService } from '../../model/service/StatusService';

export const handler = async (request: StatusRequest): Promise<void> => {
    const statusService = new StatusService(Status);
    statusService.postStatus(request.token, request.newStatus);
}
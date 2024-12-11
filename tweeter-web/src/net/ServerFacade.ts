import {
  AuthenticationResponse,
  AuthToken,
  CountResponse,
  FollowActionRequest,
  IsFollowerResponse,
  LoginRequest,
  PagedItemRequest,
  PagedItemResponse,
  RegisterRequest,
  Status,
  StatusDto,
  StatusRequest,
  TotalCountResponse,
  TweeterRequest,
  User,
  UserDto,
  UserResponse,
  } from "tweeter-shared";
  import { ClientCommunicator } from "./ClientCommunicator";
import { TweeterResponse } from "tweeter-shared/dist/model/net/response/TweeterResponse";
  
export class ServerFacade {
  private SERVER_URL = "https://3fet06tmq7.execute-api.us-east-1.amazonaws.com/Dev";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  public async getMoreFollowees(
    request: PagedItemRequest<UserDto>
  ): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
    PagedItemRequest<UserDto>,
    PagedItemResponse<UserDto>
    >(request, "/followee/list");

    const items = this.validateNetworkDataReturn<User[]>(response.success, response.items, User.fromDto);

    return this.returnOrThrowIfNoSuccess<[User[] | null, boolean | null]>(
      response, 
      [items, response.hasMore], 
      'No followees found'
    ) as [User[], boolean];
  }

  public async getMoreFollowers(
    request: PagedItemRequest<UserDto>
  ): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
    PagedItemRequest<UserDto>,
    PagedItemResponse<UserDto>
    >(request, "/follower/list");

    const items = this.validateNetworkDataReturn<User[]>(response.success, response.items, User.fromDto);

    return this.returnOrThrowIfNoSuccess<[User[] | null, boolean | null]>(
      response, 
      [items, response.hasMore], 
      'No followers found'
    ) as [User[], boolean];
  }

  public async getIsFollowerStatus(
    request: FollowActionRequest
  ): Promise<boolean> {
    const response = await this.clientCommunicator.doPost<
    FollowActionRequest,
    IsFollowerResponse
    >(request, "/follow-action/status");

    const status: boolean | null = this.validateNetworkDataReturn<boolean>(response.success, response.status) || false;

    return this.returnOrThrowIfNoSuccess<boolean | null>(
      response, 
      status, 
      'Could not determine if user is followed'
    ) as boolean;
  }

  public async getIsFolloweeCount(
    request: TweeterRequest
  ): Promise<number> {
    const response = await this.clientCommunicator.doPost<
    TweeterRequest,
    CountResponse
    >(request, "/followee/count");

    const count = this.validateNetworkDataReturn<number>(response.success, response.count);

    return this.returnOrThrowIfNoSuccess<number | null>(
      response, 
      count, 
      'Could not get followee count'
    ) as number;
  }

  public async getIsFollowerCount(
    request: TweeterRequest
  ): Promise<number> {
    const response = await this.clientCommunicator.doPost<
    TweeterRequest,
    CountResponse
    >(request, "/follower/count");

    const count = this.validateNetworkDataReturn<number>(response.success, response.count);

    return this.returnOrThrowIfNoSuccess<number | null>(
      response, 
      count, 
      'Could not get follower count'
    ) as number;
  }

  public async follow(
    request: FollowActionRequest
  ): Promise<[followerCount: number, followeeCount: number]> {
    const response = await this.clientCommunicator.doPost<
    FollowActionRequest,
    TotalCountResponse
    >(request, "/follow-action/follow");

    const followerCount = this.validateNetworkDataReturn<number>(response.success, response.followerCount);
    const followeeCount = this.validateNetworkDataReturn<number>(response.success, response.followeeCount);

    return this.returnOrThrowIfNoSuccess<[number | null, number | null]>(
      response, 
      [followerCount, followeeCount], 
      'Could not get follow counts'
    ) as [number, number];
  }

  public async unfollow(
    request: FollowActionRequest
  ): Promise<[followerCount: number, followeeCount: number]> {
    const response = await this.clientCommunicator.doPost<
    FollowActionRequest,
    TotalCountResponse
    >(request, "/follow-action/unfollow");

    const followerCount = this.validateNetworkDataReturn<number>(response.success, response.followerCount);
    const followeeCount = this.validateNetworkDataReturn<number>(response.success, response.followeeCount);

    return this.returnOrThrowIfNoSuccess<[number | null, number | null]>(
      response, 
      [followerCount, followeeCount], 
      'Could not get follow counts'
    ) as [number, number];
  }

  public async loadMoreFeedItems(
    request: PagedItemRequest<StatusDto>
  ): Promise<[Status[], boolean]> {
    const response = await this.clientCommunicator.doPost<
    PagedItemRequest<StatusDto>,
    PagedItemResponse<StatusDto>
    >(request, "/feed/list");

    const items = this.validateNetworkDataReturn<Status[]>(response.success, response.items, Status.fromDto);
    
    return this.returnOrThrowIfNoSuccess<[Status[] | null, boolean | null]>(
      response, 
      [items, response.hasMore], 
      'No feed items found'
    ) as [Status[], boolean];
  }

  public async loadMoreStoryItems(
    request: PagedItemRequest<StatusDto>
  ): Promise<[Status[], boolean]> {
    const response = await this.clientCommunicator.doPost<
    PagedItemRequest<StatusDto>,
    PagedItemResponse<StatusDto>
    >(request, "/story/list");

    const items = this.validateNetworkDataReturn<Status[]>(response.success, response.items, Status.fromDto);

    return this.returnOrThrowIfNoSuccess<[Status[] | null, boolean | null]>(
      response, 
      [items, response.hasMore], 
      'No story items found'
    ) as [Status[], boolean];
  }

  public async postStatus(request: StatusRequest): Promise<void> {
    await this.clientCommunicator.doPost<
    StatusRequest,
    void
    >(request, "/status-action/post");
  }

  public async getUser(
    request: TweeterRequest
  ): Promise<User | null> {
    const response = await this.clientCommunicator.doPost<
    TweeterRequest,
    UserResponse
    >(request, "/user/get-user");

    const user = this.validateNetworkDataReturn<User>(response.success, response.userDto, User.fromDto);

    return this.returnOrThrowIfNoSuccess<User | null>(
      response, 
      user, 
      'Could not get user'
    ) as User;
  }

  public async login(
    request: LoginRequest
  ): Promise<[User, AuthToken]> {
    const response = await this.clientCommunicator.doPost<
    LoginRequest,
    AuthenticationResponse
    >(request, "/user/login");

    const user = this.validateNetworkDataReturn<User>(response.success, response.userDto, User.fromDto);
    const authToken = this.validateNetworkDataReturn<AuthToken>(response.success, response.token, AuthToken.fromTokenString);

    return this.returnOrThrowIfNoSuccess<[User | null, AuthToken | null]>(
      response, 
      [user, authToken], 
      'Unable to successfully login'
    ) as [User, AuthToken];
  }

  public async register(
    request: RegisterRequest
  ): Promise<[User, AuthToken]> {
    const response = await this.clientCommunicator.doPost<
    RegisterRequest,
    AuthenticationResponse
    >(request, "/user/register");

    const user = this.validateNetworkDataReturn<User>(response.success, response.userDto, User.fromDto);
    const authToken = this.validateNetworkDataReturn<AuthToken>(response.success, response.token, AuthToken.fromTokenString);

    return this.returnOrThrowIfNoSuccess<[User | null, AuthToken | null]>(
      response, 
      [user, authToken], 
      'Unable to successfully register'
    ) as [User, AuthToken];
  }

  public async logout(
    request: TweeterRequest
  ): Promise<void> {
    await this.clientCommunicator.doPost<
    TweeterRequest,
    void
    >(request, "/user/logout");
  }

  private returnOrThrowIfNoSuccess<T, V>(
    response: TweeterResponse,
    input: [T, V],
    errorMessage: string
  ): [Exclude<T, null>, Exclude<V, null>];
  
  private returnOrThrowIfNoSuccess<T>(
    response: TweeterResponse,
    input: T,
    errorMessage: string
  ): Exclude<T, null>;
  
  private returnOrThrowIfNoSuccess<T, V>(
    response: TweeterResponse,
    input: T | [T, V],
    errorMessage: string
  ): Exclude<T, null> | [Exclude<T, null>, Exclude<V, null>] {
    if (response.success) {
      if (Array.isArray(input)) {
        const [obj1, obj2] = input;
        if (obj1 === null || obj2 === null) {
          throw new Error(errorMessage);
        }
        return [obj1, obj2] as [Exclude<T, null>, Exclude<V, null>];
      } else {
        if (input === null) {
          throw new Error(errorMessage);
        }
        return input as Exclude<T, null>;
      }
    } else {
      console.error(response);
      throw new Error(response.message!);
    }
  }
  
  private validateNetworkDataReturn<T>(
    successStatus: boolean, 
    entity: any,
    dtoConversion?: (item: any) => any, 
  ): T | null {
    if (successStatus && entity) {
        if (Array.isArray(entity)) {
            return entity.map(item => dtoConversion ? dtoConversion(item) : item) as T;
        }
        return dtoConversion ? dtoConversion(entity) : entity;
    }
    return null;
  }
}
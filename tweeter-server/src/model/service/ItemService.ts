import { User, Status, UserDto, StatusDto, FakeData } from "tweeter-shared";

export abstract class ItemService<DtoType extends UserDto | StatusDto, EntityType extends User | Status> {
    constructor(private readonly entityClass: { fromDto(dto: DtoType | null): EntityType | null }) {}

    protected async getFakeData(
        lastItem: DtoType | null,
        pageSize: number,
        userAlias: string,
        fakeDataOperation: (lastItem: EntityType | null, limit: number, omit?: string | null) => [EntityType[], boolean]
    ): Promise<[DtoType[], boolean]> {
        const lastEntity = this.entityClass.fromDto(lastItem);

        const [items, hasMore] = fakeDataOperation(lastEntity, pageSize, userAlias ?? null);
        
        const dtos: DtoType[] = items.map(item => (item as EntityType).dto as DtoType);

        return [dtos, hasMore];
    }

    protected async getItemCount(userAlias: string, countOperation: (userAlias: string) => number | PromiseLike<number>): Promise<number> {
        return countOperation(userAlias);
    }
}
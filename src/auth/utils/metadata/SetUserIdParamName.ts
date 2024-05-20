import { SetMetadata } from "@nestjs/common";

export const UserIdName = (paramsName: string) => SetMetadata('userId', paramsName);
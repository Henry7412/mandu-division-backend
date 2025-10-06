import { IsInt, IsOptional, Min } from "class-validator";
import { Transform, Type } from "class-transformer";

export class PaginationListDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(1)
    page: number = 1;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(1)
    pageSize: number = 10;
}
import { IsString, MaxLength, IsOptional, IsInt, IsPositive } from 'class-validator';

export class StoreDivisionDto {

    @IsString()
    @MaxLength(45)
    name: string;

    @IsOptional()
    @IsInt()
    parentDivisionId?: number;

    @IsInt()
    @IsPositive()
    level: number;

    @IsInt()
    @IsPositive()
    collaborators: number;

    @IsOptional()
    @IsString()
    ambassador?: string;
}
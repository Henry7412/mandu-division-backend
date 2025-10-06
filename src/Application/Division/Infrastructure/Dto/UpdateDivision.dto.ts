import {
    IsOptional,
    IsString,
    IsPositive,
    IsInt,
    MaxLength
} from 'class-validator';

export class UpdateDivisionDto {
    @IsString()
    @IsOptional()
    @MaxLength(45)
    name: string;

    @IsOptional()
    @IsInt()
    parentDivision?: number;

    @IsInt()
    @IsOptional()
    @IsPositive()
    level: number;

    @IsInt()
    @IsOptional()
    @IsPositive()
    collaborators: number;

    @IsOptional()
    @IsString()
    ambassador?: string;
}

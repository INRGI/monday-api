import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePostDTO{
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    content: string;

    @IsString()
    @IsOptional()
    title: string;
}
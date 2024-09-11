import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto{
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name:string;
}

export default UpdateCategoryDto;
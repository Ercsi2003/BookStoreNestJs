import { IsBoolean, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty({message: 'Name is required!'})
    title: string;

    @IsString()
    @IsNotEmpty({message: 'Author is required!'})
    author: string;

    @IsInt()
    @Min(1800)
    publishYear: number;

    @IsString()
    @IsNotEmpty({message: 'ISBN is required!'})
    isbn: string;

    @IsBoolean()
    reserved: boolean;




}
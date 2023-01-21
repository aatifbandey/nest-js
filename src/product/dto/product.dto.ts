import { IsNotEmpty, isNotEmpty, IsNumber, isNumber, IsString } from "class-validator";

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  description?: string;
}

export class ProductIdDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

}
import { IsNotEmpty, isNotEmpty, IsNumber, isNumber, IsString } from "class-validator";
import { ProductLinkDto } from "./productLink.dto";

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  description?: string;

  productLink?: ProductLinkDto;
}

export class ProductIdDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

}
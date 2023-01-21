import { IsNotEmpty, IsNumber } from "class-validator";

export class ProductIdDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

}
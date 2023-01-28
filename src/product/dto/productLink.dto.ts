import { IsNotEmpty, IsString } from "class-validator";

export class ProductLinkDto {
  @IsString()
  @IsNotEmpty()
  url: string
}
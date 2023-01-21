import { Body, Controller, Delete, HttpCode, HttpStatus, Post } from "@nestjs/common";
// import { Product } from "@prisma/client";
import { ProductDto, ProductIdDto } from "./dto";
import { ProductService } from "./product.service";

@Controller('product')

export class ProductController {
  constructor(
    private product: ProductService
  ){

  }

  @HttpCode(HttpStatus.OK)
  @Post('add')
  addProduct(@Body() product: ProductDto) { // ProductDto-- will add validation
    return this.product.addProduct(product)
  }

  @Delete('delete')
  deleteProduct(@Body() product: ProductIdDto){
    return this.product.deleteProduct(product)
  }

}
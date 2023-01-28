import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { Product } from "@prisma/client";
// import { FileInterceptor } from '@nestjs/platform-express';
// import {diskStorage} from 'multer';
// import { extname } from 'path';

import { ProductDto, ProductIdDto } from './dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private product: ProductService) {}

  @HttpCode(HttpStatus.OK)
  @Post('add')
  @UsePipes(ValidationPipe)
  addProduct(@Body() product: ProductDto) {
    // ProductDto-- will add validation
    return this.product.addProduct(product);
  }

  @Delete('delete')
  deleteProduct(@Body() product: ProductIdDto) {
    return this.product.deleteProduct(product);
  }

  @Get('/:id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.product.getProductDetails(id);
  }
  // @UseInterceptors(FileInterceptor('file', {
  //   dest: './uploads',
  //   storage: diskStorage({
  //     destination: './uploads',
  //     filename: (req, file, callback) =>{
  //       const uniqueSuffix = Date.now()+'_'+ Math.round(Math.random()*1e9);
  //       const ext = extname(file.originalname);
  //       const filename = `${uniqueSuffix}${ext}`
  //        callback(null, filename);
  //     }
  //   })
  // }))
}

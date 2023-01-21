import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';
import { ProductIdDto } from './dto/productid.dto';

@Injectable({})
export class ProductService {
  constructor(private prisma: PrismaService) // private config: ConfigService
  {}
  async addProduct(dto: ProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: {
          title: dto.title,
          price: Number(dto.price),
          description: dto.description,
        },
      });
      return {
        id: Number(product.id),
      };
    } catch (error) {
      console.log({ error });
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // P2002 is error code from prismafor duplicate entry
          throw new ForbiddenException('Error');
        }
      }
      throw error;
    }
  }

  async deleteProduct(dto: ProductIdDto) {
    try {
      const product = await this.prisma.product.delete({
        where: {
          id: Number(dto.id),
        },
      });

      return {
        id: Number(product.id),
      };
    } catch (error) {
     
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // P2002 is error code from prismafor duplicate entry
          throw new ForbiddenException('Error');
        }
      }
      throw error;
    }
  }
}

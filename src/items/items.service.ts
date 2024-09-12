import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Item, ItemStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findAll(): Promise<Item[]> {
    return await this.prismaService.item.findMany();
  }

  async findById(id: string): Promise<Item> {
    const found = this.prismaService.item.findUnique({ where: { id } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const { name, price, description } = createItemDto;
    return await this.prismaService.item.create({
      data: {
        name,
        price,
        description,
        status: ItemStatus.ON_SALE,
      },
    });
  }

  async updateStatus(id: string): Promise<Item> {
    const item = this.prismaService.item.update({
      data: {
        status: 'SOLD_OUT',
      },
      where: {
        id,
      },
    });
    return item;
  }

  async delete(id: string) {
    await this.prismaService.item.delete({
      where: {
        id,
      },
    });
  }
}

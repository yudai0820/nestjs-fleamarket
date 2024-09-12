import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [PrismaModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}

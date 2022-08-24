import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";

import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from "./category.model";

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [SequelizeModule.forFeature([Category])],
  exports: [CategoryService]
})
export class CategoryModule {}

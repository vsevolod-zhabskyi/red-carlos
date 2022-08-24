import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";

import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from "./news.model";
import { CategoryModule } from "../category/category.module";

@Module({
  providers: [NewsService],
  controllers: [NewsController],
  imports: [
    SequelizeModule.forFeature([News]),
    CategoryModule
  ]
})
export class NewsModule {}

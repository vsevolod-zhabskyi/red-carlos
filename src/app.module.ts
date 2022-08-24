import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";

import {NewsModule} from "./news/news.module";
import { CategoryModule } from './category/category.module';
import { News } from "./news/news.model";
import { Category } from "./category/category.model";
import { NewsCategory } from "./news/news-category.mode";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [News, Category, NewsCategory],
      autoLoadModels: true,
    }),
    NewsModule,
    CategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

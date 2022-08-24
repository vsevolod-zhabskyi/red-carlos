import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import {NewsService} from "./news.service";

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Post('/generate')
  generate() {
    return this.newsService.generate();
  }

  @Get()
  getAll(@Query('page') page?: number) {
    return this.newsService.getAll(page);
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.newsService.getOne(id);
  }

  @Get('/byCategory/:categoryName')
  getByCategory(@Param('categoryName') categoryName: string,
                @Query('page') page?: number) {
    return this.newsService.getByCategory(categoryName, page);
  }
}

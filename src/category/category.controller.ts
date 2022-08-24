import {Controller, Get, Post} from '@nestjs/common';
import {CategoryService} from "./category.service";

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @Post('/generate')
  generate() {
    return this.categoryService.generate();
  }
}

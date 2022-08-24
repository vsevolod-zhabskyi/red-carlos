import { Injectable } from '@nestjs/common';
import { News, NewsCreationAttributes } from "./news.model";
import { InjectModel } from "@nestjs/sequelize";
import { faker } from "@faker-js/faker";
import { CategoryService } from "../category/category.service";
import { Category } from "../category/category.model";
import { FindOptions } from "sequelize";

@Injectable()
export class NewsService {
  generateCount = Number(process.env.GENERATE_NEWS_QUANTITY);
  maxNewsParagraphs = Number(process.env.GENERATE_MAX_NEWS_PARAGRAPHS);
  maxNewsLikes = Number(process.env.GENERATE_MAX_NEWS_LIKES);

  newsLimit = Number(process.env.NEWS_QUERY_LIMIT);

  constructor(
    @InjectModel(News) private newsRepository: typeof News,
    private categoryService: CategoryService
  ) {}

  async getAll(page: number) {
    const query = {
      include: { all: true },
      offset: undefined,
      limit: undefined
    } as FindOptions<News>

    if (page !== undefined) {
      query.offset = (page - 1) * this.newsLimit;
      query.limit = this.newsLimit;
    }

    return this.newsRepository.findAll(query);
  }

  async getOne(id: number) {
    return this.newsRepository.findByPk(id, {
      include: {all: true}
    });
  }

  async getByCategory(categoryName: string, page: number) {
    categoryName = categoryName.toLowerCase();

    const query = {
      include: [{
        model: Category,
        where: { name: categoryName }
      }],
      offset: undefined,
      limit: undefined,
    }

    if (page !== undefined) {
      query.offset = (page - 1) * this.newsLimit;
      query.limit = this.newsLimit;
    }

    return this.newsRepository.findAll(query);
  }

  async generate() {
    const categories = await this.categoryService.getAll();

    const news = [];

    for (let i = 0; i < this.generateCount; i++) {
      const randomCategoryIndex = this.generateRandomInt(0, categories.length - 1);
      const randomCategory = categories[randomCategoryIndex];

      const oneNews = this.generateOneNews();

      const createdNews = await this.newsRepository.create(oneNews);

      await createdNews.$set("categories", [randomCategory.id]);
      createdNews.categories = [randomCategory];

      news.push(createdNews);
    }

    return news;
  }

  generateOneNews(): NewsCreationAttributes {
    return {
      title: faker.lorem.sentence(7),
      description: faker.lorem.paragraphs(this.maxNewsParagraphs),
      likesQuantity: this.generateRandomInt(0, this.maxNewsLikes),
      image: faker.image.city()
    }
  }

  generateRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { faker } from "@faker-js/faker";

import { Category, CategoryCreationAttributes } from "./category.model";

@Injectable()
export class CategoryService {
  generateCount = Number(process.env.GENERATE_CATEGORIES_QUANTITY);

  constructor(@InjectModel(Category) private categoryRepository: typeof Category) {}

  async generate() {
    const categories = [];

    for (let i = 0; i < this.generateCount; i++) {
      const category = this.generateCategory();

      const createdCategory = await this.categoryRepository.create(category);

      categories.push(createdCategory);
    }

    return categories;
  }

  async getAll() {
    return await this.categoryRepository.findAll();
  }

  async getOneByName(name) {
    return await this.categoryRepository.findOne({ where: {name} });
  }


  generateCategory(): CategoryCreationAttributes {
    return {
      name: faker.word.noun()
    }
  }
}

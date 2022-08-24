import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";

import { NewsCategory } from "../news/news-category.mode";
import { News } from "../news/news.model";

export interface CategoryCreationAttributes {
  name: string;
}

@Table({tableName: 'category', underscored: false})
export class Category extends Model<Category, CategoryCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => News, () => NewsCategory)
  news: News[];
}

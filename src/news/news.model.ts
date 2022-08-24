import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";

import { Category } from "../category/category.model";
import { NewsCategory } from "./news-category.mode";

export interface NewsCreationAttributes {
  title: string;
  description: string;
  likesQuantity?: number;
  image?: string;
}

@Table({tableName: 'news', underscored: false})
export class News extends Model<News, NewsCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  likesQuantity: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 0,
  })
  image: string;

  @BelongsToMany(() => Category, () => NewsCategory)
  categories: Category[];
}

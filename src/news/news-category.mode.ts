import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Category } from '../category/category.model';
import { News } from './news.model';

@Table({
  tableName: 'news_category',
  underscored: true,
  createdAt: false,
  updatedAt: false,
})
export class NewsCategory extends Model<NewsCategory> {
  @PrimaryKey
  @ForeignKey(() => News)
  @Column({
    type: DataType.INTEGER,
  })
  newsId: number;

  @PrimaryKey
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  categoryId: number;
}

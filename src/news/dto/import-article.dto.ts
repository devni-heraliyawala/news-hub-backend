import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ArticleSource } from './article-source.dto';

export class ImportArticleDto {
  @ValidateNested()
  @Type(() => ArticleSource)
  source: ArticleSource;

  // @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  urlToImage: string;

  @IsNotEmpty()
  publishedAt: string;

  @IsNotEmpty()
  content: string;
}

import { IsNotEmpty } from 'class-validator';

export class ArticleSource {
  // @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;
}

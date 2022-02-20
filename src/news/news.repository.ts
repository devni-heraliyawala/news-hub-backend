import { EntityRepository, Repository } from 'typeorm';
import { Article } from './article.entity';
import { ImportArticleDto } from './dto/import-article.dto';

@EntityRepository(Article)
export class NewsRepository extends Repository<Article> {
  async getAllArticles(
    page: number,
    limit: number,
  ): Promise<{ articles: Article[]; count: number }> {
    const skip = (page - 1) * limit;

    const [list, count] = await Promise.all([
      this.find({
        order: { id: 'DESC' },
        skip,
        take: limit,
      }),
      this.count(),
    ]);

    return { articles: list, count };
  }

  async getArticle(id: string): Promise<Article> {
    return await this.findOne(id);
  }

  async saveArticle(dto: ImportArticleDto): Promise<Article> {
    const {
      source,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
    } = dto;

    const article = this.create({
      source,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
    });

    return await this.save(article);
  }
}

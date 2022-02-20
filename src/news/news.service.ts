import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ImportArticleDto } from './dto/import-article.dto';
import { NewsSearchSourceDto } from './dto/news-search-source.dto';
import { NewsRepository } from './news.repository';

import * as NewsAPI from 'newsapi';
import { ConfigService } from '@nestjs/config';
import { NewsSearchTopHeadlinesDto } from './dto/news-search-top-headlines.dto';
import { NewsSearchEverythingDto } from './dto/news-search-everything.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsRepository)
    private newsRepository: NewsRepository,
    private readonly configService: ConfigService,
  ) {}
  private readonly NEWS_API_KEY = this.configService.get('NEWS_API_KEY');
  private readonly newsapi = new NewsAPI(this.NEWS_API_KEY);

  public async newsSearchEverything(
    dto: NewsSearchEverythingDto,
  ): Promise<any> {
    const {
      keywords,
      searchIn,
      sources,
      domains,
      excludeDomains,
      from,
      to,
      language,
      sortBy,
      pageSize,
      page,
    } = dto;

    // You must include at least one q, source, or domain
    return await this.newsapi.v2
      .everything({
        q: keywords,
        searchIn,
        sources,
        domains,
        excludeDomains,
        from,
        to,
        language,
        sortBy,
        pageSize,
        page,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  public async newsSearchTopHeadlines(
    dto: NewsSearchTopHeadlinesDto,
  ): Promise<any> {
    const { country, category, language, sources, keywords, pageSize, page } =
      dto;

    // All options passed to topHeadlines are optional, but you need to include at least one of them
    return await this.newsapi.v2
      .topHeadlines({
        q: keywords,
        category,
        language,
        country,
        sources,
        pageSize,
        page,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  public async newsSearchSources(dto: NewsSearchSourceDto): Promise<any> {
    const { category, language, country } = dto;

    // All options are optional
    return await this.newsapi.v2
      .sources({
        category,
        language,
        country,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw new HttpException(
          {
            message: err.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  public async getAllArticles(
    page: number,
    limit: number,
  ): Promise<{ articles: Article[]; count: number }> {
    return await this.newsRepository.getAllArticles(page, limit);
  }

  public async getArticle(id: string): Promise<Article> {
    const found = await this.newsRepository.getArticle(id);
    if (!found) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }
    return found;
  }

  public async saveArticle(dto: ImportArticleDto): Promise<Article> {
    return await this.newsRepository.saveArticle(dto);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Article } from './article.entity';
import { ImportArticleDto } from './dto/import-article.dto';
import { NewsSearchEverythingDto } from './dto/news-search-everything.dto';
import { NewsSearchSourceDto } from './dto/news-search-source.dto';
import { NewsSearchTopHeadlinesDto } from './dto/news-search-top-headlines.dto';
import { NewsService } from './news.service';
import { NewsEverythingValidationPipe } from './pipes/news-everything-validation.pipe';
import { NewsSourceValidationPipe } from './pipes/news-source-validation.pipe';
import { NewsTopHeadlineValidationPipe } from './pipes/news-top-headline-validation.pipe';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Post('news-search/everything')
  public async newsSearchEverything(
    @Body(NewsEverythingValidationPipe) dto: NewsSearchEverythingDto,
  ): Promise<any> {
    return await this.newsService.newsSearchEverything(dto);
  }

  @Post('news-search/top-headlines')
  public async newsSearchTopHeadlines(
    @Body(NewsTopHeadlineValidationPipe) dto: NewsSearchTopHeadlinesDto,
  ): Promise<any> {
    return await this.newsService.newsSearchTopHeadlines(dto);
  }

  @Post('news-search/sources')
  public async newsSearchSources(
    @Body(NewsSourceValidationPipe) dto: NewsSearchSourceDto,
  ): Promise<any> {
    return await this.newsService.newsSearchSources(dto);
  }

  @Get('articles/all')
  public async getAllArticles(
    @Query(
      'page',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    page: number,
    @Query(
      'limit',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    limit: number,
  ): Promise<{ articles: Article[]; count: number }> {
    return await this.newsService.getAllArticles(page, limit);
  }

  @Get('articles/:id')
  public async getArticle(@Param('id') id: string): Promise<Article> {
    return await this.newsService.getArticle(id);
  }

  @Post('article')
  public async saveArticle(@Body() dto: ImportArticleDto): Promise<Article> {
    return await this.newsService.saveArticle(dto);
  }
}

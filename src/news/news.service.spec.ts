import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { NewsRepository } from './news.repository';
import { NewsService } from './news.service';

const mockNewsRepository = () => ({
  getAllArticles: jest.fn(),
  getArticle: jest.fn(),
});

describe('NewsService', () => {
  let newsService: NewsService;
  let newsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        NewsService,
        { provide: NewsRepository, useFactory: mockNewsRepository },
      ],
    }).compile();

    newsService = module.get(NewsService);
    newsRepository = module.get(NewsRepository);
  });

  describe('getAllArticles', () => {
    it('calls NewsRepository.getAllArticles and returns the result', async () => {
      newsRepository.getAllArticles.mockResolvedValue('someValue');
      const result = await newsService.getAllArticles(1, 5);
      expect(result).toEqual('someValue');
    });
  });

  describe('getArticle', () => {
    it('calls NewsRepository.getArticle and returns the result', async () => {
      const mockArticle = {
        id: 'someId',
        author: 'author',
        title: 'title',
        description: 'description',
        url: 'url',
        urlToImage: 'https://images.wsj.net/im-484743/social',
        publishedAt: '2022-02-16T04:15:00Z',
        content: 'content',
        source: {
          id: null,
          name: 'source',
        },
      };

      newsRepository.getArticle.mockResolvedValue(mockArticle);
      const result = await newsService.getArticle('someId');
      expect(result).toEqual(mockArticle);
    });

    it('calls NewsRepository.getArticle and handles an error', async () => {
      newsRepository.getArticle.mockResolvedValue(null);
      expect(newsService.getArticle('someId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

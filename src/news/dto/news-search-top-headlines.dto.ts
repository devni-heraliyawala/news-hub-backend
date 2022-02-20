import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Category } from '../static/enums/category.enum';
import { Country } from '../static/enums/country.enum';
import { Language } from '../static/enums/language.enum';

export class NewsSearchTopHeadlinesDto {
  @IsOptional()
  @IsEnum(Country)
  country: Country;

  @IsOptional()
  @IsEnum(Category)
  category: Category;

  @IsOptional()
  @IsEnum(Language)
  language: Language;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sources: string[];

  @IsOptional()
  @IsArray()
  keywords: string[];

  @IsOptional()
  @IsInt()
  @Min(20)
  @Max(100)
  pageSize: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  page: number;
}

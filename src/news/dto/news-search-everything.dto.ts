import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Language } from '../static/enums/language.enum';
import { SearchInType } from '../static/enums/search-in-type.enum';
import { SortingType } from '../static/enums/sorting-type.enum';

export class NewsSearchEverythingDto {
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  keywords: string[];

  @IsOptional()
  @IsArray()
  @IsEnum(SearchInType, { each: true })
  searchIn: SearchInType[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sources: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  domains: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  excludeDomains: string[];

  @IsOptional()
  @IsString()
  @Matches(/^(\d{4})-(\d{2})-(\d{2})$/)
  from: string;

  @IsOptional()
  @IsString()
  @Matches(/^(\d{4})-(\d{2})-(\d{2})$/)
  to: string;

  @IsOptional()
  @IsEnum(Language)
  language: Language;

  @IsOptional()
  @IsEnum(SortingType)
  sortBy: SortingType;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  page: number;
}

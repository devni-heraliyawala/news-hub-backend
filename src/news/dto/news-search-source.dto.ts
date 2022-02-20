import { IsEnum, IsOptional } from 'class-validator';
import { Category } from '../static/enums/category.enum';
import { Country } from '../static/enums/country.enum';
import { Language } from '../static/enums/language.enum';

export class NewsSearchSourceDto {
  @IsOptional()
  @IsEnum(Category)
  category: Category;

  @IsOptional()
  @IsEnum(Language)
  language: Language;

  @IsOptional()
  @IsEnum(Country)
  country: Country;
}

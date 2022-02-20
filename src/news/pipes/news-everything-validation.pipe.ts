import { HttpException, HttpStatus, PipeTransform } from '@nestjs/common';
import { SearchInType } from '../static/enums/search-in-type.enum';
import { SortingType } from '../static/enums/sorting-type.enum';

export class NewsEverythingValidationPipe implements PipeTransform {
  transform(value: any) {
    const dto = value;
    const validationEligibleFields = ['keywords', 'sources', 'domains'];

    const optionalEmptyFields = [];

    for (const i in dto) {
      // check the field is null or empty array
      if (dto[i] == null || (Array.isArray(dto[i]) && !dto[i].length)) {
        switch (i) {
          case 'searchIn': //set default search in types to all
            dto[i] = [
              SearchInType.CONTENT,
              SearchInType.TITLE,
              SearchInType.DESCRIPTION,
            ];
            break;
          case 'sortBy':
            dto[i] = SortingType.PUBLISHED_AT; //set default soerting type to published date
            break;
          case 'pageSize':
            dto[i] = 20; //set default page size
            break;
          case 'page':
            dto[i] = 1; //set default page number
            break;
          default:
            dto[i] = ''; //set empty string for all null values since the fields can be optional
            optionalEmptyFields.push(i); // to check all the optional fields are null or empty to trigger a validation
            break;
        }
      }

      // transform keywords array to according to the NEWS API q field format "keyword 1 OR keyword 2 OR keyword 3"
      if (i == 'keywords' && dto[i] != '') {
        dto[i] = dto[i].join(' OR ');
      }

      if (i == 'sources' && dto[i] != '') {
        dto[i] = dto[i].join(',');
      }

      if (i == 'domains' && dto[i] != '') {
        dto[i] = dto[i].join(',');
      }

      if (i == 'excludeDomains' && dto[i] != '') {
        dto[i] = dto[i].join(',');
      }

      if (i == 'to' && dto[i] != '') {
        if (this.isFutureDate(dto[i])) {
          throw new HttpException(
            {
              message: `Provided 'to' date (${dto[i]}) is a future date. Please provide a valid date.`,
            },
            HttpStatus.PRECONDITION_FAILED,
          );
        }
      }
    }

    const filteredArray = optionalEmptyFields.filter((value) =>
      validationEligibleFields.includes(value),
    );

    if (filteredArray.length === validationEligibleFields.length) {
      throw new HttpException(
        {
          message: `You should specify atleast one option out of ${validationEligibleFields.join(
            ', ',
          )}.`,
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    return dto;
  }

  isFutureDate = (idate) => {
    const today = new Date().getTime();
    const date1 = idate.split('-');
    const date2 = new Date(date1[0], date1[1] - 1, date1[2]).getTime();
    return today - date2 < 0;
  };
}

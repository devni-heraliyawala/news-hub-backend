import { HttpException, HttpStatus, PipeTransform } from '@nestjs/common';

export class NewsTopHeadlineValidationPipe implements PipeTransform {
  transform(value: any) {
    const dto = value;
    const validationEligibleFields = [
      'country',
      'category',
      'language',
      'sources',
      'keywords',
    ];

    const optionalEmptyFields = [];

    for (const i in dto) {
      // check the field is null or empty array
      if (dto[i] == null || (Array.isArray(dto[i]) && !dto[i].length)) {
        switch (i) {
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
}

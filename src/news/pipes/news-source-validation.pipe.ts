import { PipeTransform } from '@nestjs/common';

export class NewsSourceValidationPipe implements PipeTransform {
  transform(value: any) {
    const dto = value;
    for (const i in dto) {
      if (dto[i] == null) {
        dto[i] = '';
      }
    }
    return dto;
  }
}

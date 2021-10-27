import { PipeTransform } from '@nestjs/common';

interface FilterFormDataOptions {
  fields: Array<string>;
}

export class FilterFormDataPipe implements PipeTransform {
  constructor(private options?: FilterFormDataOptions) {}

  transform(value: Array<Express.Multer.File>) {
    const { fields } = this.options;

    return Object.entries(value).reduce((acc, [key, value]) => {
      if (fields.includes(key)) {
        acc[key] = value;
      }

      return acc;
    }, {});
  }
}

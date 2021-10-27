import { PipeTransform } from '@nestjs/common';

export class ExtractFormDataPipe implements PipeTransform {
  transform(value: { [key: string]: any }) {
    return Object.values(value).reduce((acc, val) => ({ ...acc, ...val }), {});
  }
}

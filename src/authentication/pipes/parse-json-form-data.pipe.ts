import { PipeTransform } from '@nestjs/common';

interface ParseJSONFormDataPipeOptions {
  fields: Array<string | { name: string; newName: string }>;
}

export class ParseJSONFormDataPipe implements PipeTransform {
  constructor(private options?: ParseJSONFormDataPipeOptions) {}

  transform(value: { [key: string]: Array<Express.Multer.File> }) {
    const { fields } = this.options;

    return Object.entries(value).reduce((acc, [key, value]) => {
      const foundField = fields.find(
        (field) => key === (typeof field === 'string' ? field : field.name),
      );

      if (!foundField) {
        acc[key] = value;
      } else {
        const newKey =
          typeof foundField === 'string' ? foundField : foundField.newName;

        acc[newKey] = JSON.parse(value[0].buffer.toString());
      }

      return acc;
    }, {});
  }
}

import { Column } from 'typeorm';

export class Avatar {
  @Column()
  filename: string;

  @Column()
  url: string;
}

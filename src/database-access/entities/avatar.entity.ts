import { Column } from 'typeorm';

export class Avatar {
  @Column()
  description: string;

  @Column()
  size: number;

  @Column()
  url: string;
}

import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

import { Avatar } from './avatar.entity';

@Entity()
export class User {
  @Column(() => Avatar)
  avatar?: Avatar;

  @Column({ default: new Date() })
  createdDate?: Date;

  @Column()
  email: string;

  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ default: new Date() })
  updatedAt?: Date;
}

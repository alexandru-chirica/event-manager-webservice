import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

import { Avatar } from './avatar.entity';

@Entity()
export class User {
  @Column(() => Avatar)
  avatar: Avatar;

  @Column({ default: new Date() })
  createdDate: Date;

  @Column()
  firstName: string;

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ default: new Date() })
  updatedAt: Date;
}

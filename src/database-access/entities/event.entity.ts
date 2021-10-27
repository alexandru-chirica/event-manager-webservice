import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Event {
  @Column({ default: new Date() })
  createdDate?: Date;

  @Column()
  endDate: Date;

  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  location: string;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column({ default: new Date() })
  updatedAt?: Date;

  @Column()
  userId: string;
}

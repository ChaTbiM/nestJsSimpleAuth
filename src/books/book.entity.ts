import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import * as bcrypt from 'bcrypt';
import { BookRo } from './books.ro';

@Entity()
export class Book {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Exclude()
  visibility: boolean;

  toResponseObject(): BookRo {
    const { id, title, description, image } = this;
    const responseObject: BookRo = {
      id,
      title,
      description,
      image,
    };
    return responseObject;
  }
}

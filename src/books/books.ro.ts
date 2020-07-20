import { ObjectID } from 'typeorm';

export class BookRo {
  id: ObjectID;
  title: string;
  description: string;
  image: string;
}

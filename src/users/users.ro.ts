import { ObjectID } from 'typeorm';

export class UserRo {
  id: ObjectID;
  email: string;
  firstName: string;
  lastName: string;
}

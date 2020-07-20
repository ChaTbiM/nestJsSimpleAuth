import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  BeforeInsert,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { UserRo } from './users.ro';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hasPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true): UserRo {
    const { id, firstName, lastName, email } = this;
    const responseObject: UserRo = {
      id,
      firstName,
      lastName,
      email,
    };

    return responseObject;
  }
}

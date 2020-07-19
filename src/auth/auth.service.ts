import { debug } from 'console';
import { Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { UserRo } from '../users/users.ro';
import { JwtPayload } from './interface/jwt-payload.interface';
import { RegistrationStatus } from './interface/registrationStatus.interface';
import { CreateUserDto } from './../users/users.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  private readonly logger = new Logger(AuthService.name);

  async register(user: CreateUserDto) {
    let status: RegistrationStatus = {
      success: true,
      message: 'user register',
    };
    try {
      await this.usersService.register(user);
    } catch (err) {
      //debug(err);
      status = { success: false, message: err };
    }
    return status;
  }
  createToken(user: User) {
    //debug('get the expiration');
    const expiresIn = 3600;
    //debug('sign the token');
    //debug(user);

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
      },
      'Codebrains',
      { expiresIn },
    );
    //debug('return the token');
    //debug(accessToken);
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUserToken(payload: JwtPayload): Promise<User> {
    return await this.usersService.findById(payload.id);
  }
  async validateUser(email: string, password: string): Promise<UserRo> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.comparePassword(password)) {
      this.logger.log('password check success');
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}

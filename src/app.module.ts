import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

let envPath = '.env.development';
process.env.NODE_ENV = 'development';

if (process.env.NODE_ENV == 'production') envPath = '.env.production';
else if (process.env.NODE_ENV == 'staging') envPath = '.env.staging';

const con = new ConfigService();
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envPath,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
console.log(con.get('title'), 'cooon');

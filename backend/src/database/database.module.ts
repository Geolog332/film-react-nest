import { Module } from '@nestjs/common';
import { configProvider } from 'src/app.config.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/../*/**/*.entity{.js, .ts}'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [configProvider],
})
export class DatabaseModule {}

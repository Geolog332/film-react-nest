import { Module } from '@nestjs/common';
import { configProvider } from 'src/app.config.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseType = configService.get<'postgres' | 'mongodb'>(
          'DATABASE_DRIVER',
        );

        // Общая конфигурация
        const commonConfig = {
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          entities: [__dirname + '/../*/**/*.entity{.js, .ts}'],
          synchronize: false,
        };

        // Конфигурация для PostgreSQL
        if (databaseType === 'postgres') {
          return {
            type: 'postgres',
            ...commonConfig,
          };
        }

        // Конфигурация для MongoDB
        if (databaseType === 'mongodb') {
          return {
            type: 'mongodb',
            url: configService.get('DATABASE_URL'),
            ...commonConfig,
          };
        }

        throw new Error(`Unsupported database type: ${databaseType}`);
      },
      inject: [ConfigService],
    }),
  ],
  providers: [configProvider],
})
export class DatabaseModule {}

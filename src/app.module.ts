import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { configValidationSchema } from './config.schema';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      // validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    NewsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        name: 'default',
        type: 'mongodb',
        // host: configService.get('DB_HOST'),
        // port: configService.get('DB_PORT'),
        // database: configService.get('DB_DATABASE'),
        // username: configService.get('DB_USERNAME'),
        // password: configService.get('DB_PASSWORD'),
        url: 'mongodb+srv://mongo_dev:Abcd@1234@codification.8qu8s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        synchronize: true,
        logging: true,
        entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

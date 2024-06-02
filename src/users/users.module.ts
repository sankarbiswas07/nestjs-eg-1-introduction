import { MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { ExampleMiddleware } from './middlewares/example/example.middleware';

@Module({
  controllers: [ UsersController],
  providers: [UsersService]
})

export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExampleMiddleware).forRoutes('users')
  }
}

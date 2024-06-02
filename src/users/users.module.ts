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
    /**
     * we can pass the route name liek the eg. shown.
     * we can also set specific routes if we pass forRoutes({path:'users', methode: RequestMethod.GET})
     * we can also pass controller forRoutes(UsersController)
     * more details : https://docs.nestjs.com/middleware
     */
    consumer.apply(ExampleMiddleware).forRoutes('users')
  }
}

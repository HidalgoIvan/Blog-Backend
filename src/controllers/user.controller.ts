import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {
    // do nothing
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

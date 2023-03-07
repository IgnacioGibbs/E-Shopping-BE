import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health-Check')
@Controller()
export class ApiController {
  @Get()
  getHello(): string {
    return 'API Health Check';
  }
}

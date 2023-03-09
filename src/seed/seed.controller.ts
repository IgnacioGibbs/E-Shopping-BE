import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiOkResponse({ description: 'Found', status: 200, type: String })
  @ApiBadRequestResponse({
    type: Error,
    description: 'Bad request',
    status: 400,
  })
  @ApiUnauthorizedResponse({
    type: Error,
    description: 'Unauthorized',
    status: 401,
  })
  @ApiForbiddenResponse({ type: Error, description: 'Forbidden', status: 403 })
  @ApiNotFoundResponse({ type: Error, description: 'Not found', status: 404 })
  @ApiConflictResponse({ type: Error, description: 'Conflict', status: 409 })
  @ApiInternalServerErrorResponse({
    type: Error,
    description: 'Internar Server Error',
    status: 500,
  })
  executeSeed() {
    return this.seedService.runSeed();
  }
}

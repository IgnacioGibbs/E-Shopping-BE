import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProductService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/enum/valid-roles.enum';
import { User } from 'src/auth/entities/user.entity';
import { Product } from './entities';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Auth(ValidRoles.ADMIN)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Product, description: 'Created', status: 201 })
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
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productService.create(createProductDto, user);
  }

  @Get()
  @ApiOkResponse({ type: Product, description: 'Found', status: 200 })
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
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  @Get(':term')
  @ApiOkResponse({ type: Product, description: 'Found', status: 200 })
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
  findOne(@Param('term') term: string) {
    return this.productService.findOnePlain(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.ADMIN)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: Product,
    description: 'Updated',
    status: 200,
  })
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
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ) {
    return this.productService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMIN)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Product, description: 'Deleted', status: 200 })
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
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}

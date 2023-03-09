import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/enum/valid-roles.enum';
import { FilesService } from './files.service';

@ApiTags('Files - Get and Upload Product Images')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get(':imageName')
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
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticProductImage(imageName);

    res.sendFile(path);
  }

  @Post(':id')
  @Auth(ValidRoles.ADMIN)
  @ApiBearerAuth()
  @ApiOkResponse({ type: String, description: 'Created', status: 201 })
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
  @UseInterceptors(FileInterceptor('file'))
  uploadProductImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 25000 }),
          new FileTypeValidator({ fileType: 'image' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.filesService.uploadProductImage(file, id);
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMIN)
  @ApiBearerAuth()
  @ApiOkResponse({ type: String, description: 'Deleted', status: 200 })
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
  deleteProductImage(@Param('id', ParseUUIDPipe) id: string) {
    return this.filesService.deleteProductImage(id);
  }
}

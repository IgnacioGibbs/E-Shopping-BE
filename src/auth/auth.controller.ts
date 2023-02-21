import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser, RoleProtected } from 'src/auth/decorators';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './enum/valid-roles.enum';
import { UserRoleGuard } from './guards/user-role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User, @GetUser('id', ParseUUIDPipe) userData: string) {
    return {
      ok: true,
      user: user,
      userId: userData,
      message: 'test message',
    };
  }

  @Get('test2')
  @RoleProtected(ValidRoles.ADMIN)
  @UseGuards(AuthGuard(), UserRoleGuard)
  test2(@GetUser() user: User) {
    return {
      ok: true,
      user: user,
      message: 'test2 message',
    };
  }

  @Get('test3')
  @Auth(ValidRoles.USER)
  test3(@GetUser() user: User) {
    return {
      ok: true,
      user: user,
      message: 'test3 message',
    };
  }
}

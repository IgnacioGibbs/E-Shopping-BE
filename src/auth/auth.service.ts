import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      return {
        ...user,
        token: this.getJwtToken({
          id: user.id,
          email: user.email,
          roles: user.roles,
        }),
      };
    } catch (error) {
      Logger.error(error);
      this.handleDBError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      const user = await this.userRepository.findOne({
        where: { email },
        select: ['id', 'email', 'password', 'roles'],
      });

      if (!user) throw new UnauthorizedException('Invalid email credentials');

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid)
        throw new UnauthorizedException('Invalid password credentials');

      delete user.password;
      return {
        ...user,
        token: this.getJwtToken({
          id: user.id,
          email: user.email,
          roles: user.roles,
        }),
      };
    } catch (error) {
      Logger.error(error);
      this.handleDBError(error);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return {
      token,
      expiresIn: process.env.JWT_EXPIRES_IN,
    };
  }

  private handleDBError(error: any): never {
    switch (error.code) {
      case '23502':
        throw new BadRequestException('Missing required fields');
      case '23505':
        throw new BadRequestException('Email already exists');
      case '23514':
        throw new BadRequestException('Invalid value');
      default:
        throw new InternalServerErrorException(
          error.detail,
          'Please check server logs',
        );
    }
  }
}

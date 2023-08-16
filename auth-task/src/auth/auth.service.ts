import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './types/login.dto';
import { LoginResponseDto } from './types/login-response.dto';
import { UserResponse } from 'src/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ username, password }: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException('Wrong password');
    }

    return {
      access_token: await this.jwtService.signAsync({
        sub: user.userId,
        username: user.username,
      }),
    };
  }

  async validateUser({ username, password }: LoginDto): Promise<UserResponse> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}

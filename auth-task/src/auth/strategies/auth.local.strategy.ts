import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserResponse } from 'src/types/user.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserResponse> {
    const user = await this.authService.validateUser({ username, password });
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    return user;
  }
}

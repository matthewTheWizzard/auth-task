import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './types/login.dto';
import { UserResponse } from 'src/types/user.type';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginResponseDto } from './types/login-response.dto';
import { UserResponseDto } from 'src/types/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    type: LoginResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto, required: true })
  login(@Body() login: LoginDto) {
    return this.authService.login({
      username: login.username,
      password: login.password,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
  })
  showProfile(@Request() req): UserResponse {
    return req.user;
  }
}

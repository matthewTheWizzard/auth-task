import { ApiProperty } from '@nestjs/swagger';
import { JwtTokens } from './jwt-tokens';

export class LoginResponseDto implements JwtTokens {
  @ApiProperty()
  access_token: string;
}

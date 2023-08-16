import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './user.type';

export class UserResponseDto implements UserResponse {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  username: string;
}

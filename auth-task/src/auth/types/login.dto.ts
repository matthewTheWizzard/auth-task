import { ApiProperty } from '@nestjs/swagger';
/*
   Так же будет дополнительная валидация с кастомными декораторами
*/

export class LoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

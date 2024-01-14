import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export class CreateDomainDto {
  @ApiProperty()
  @IsBoolean()
  active: boolean

  @ApiProperty()
  @IsBoolean()
  subscriber: boolean

  @ApiProperty()
  @IsBoolean()
  suspended: boolean

  @ApiProperty()
  @IsString()
  organization: string

  @ApiProperty()
  @IsString()
  authorization: string
}

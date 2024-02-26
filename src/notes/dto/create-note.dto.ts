import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateNoteDto {
  @ApiProperty()
  @IsString()
  orderCode: string

  @ApiProperty()
  @IsString()
  content: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  member: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  customer: string
}

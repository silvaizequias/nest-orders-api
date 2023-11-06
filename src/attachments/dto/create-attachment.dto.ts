import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, IsUrl } from 'class-validator'

export class CreateAttachmentDto {
  @ApiProperty()
  @IsString()
  orderCode: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  code: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  note: string

  @ApiPropertyOptional()
  @IsString()
  @IsUrl()
  @IsOptional()
  file: string
}

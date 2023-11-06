import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator'

export class CreateItemDto {
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
  @IsNumber()
  @IsOptional()
  amount: number

  @ApiPropertyOptional()
  @IsString()
  @IsUrl()
  @IsOptional()
  file: string
}

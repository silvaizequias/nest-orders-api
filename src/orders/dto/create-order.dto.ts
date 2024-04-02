import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Decimal } from '@prisma/client/runtime/library'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  organization: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  code: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  requirement: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  subject: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsDecimal({ force_decimal: false, decimal_digits: '1,2' })
  price: Decimal

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  observation: string

  @ApiProperty()
  @IsString()
  customer: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  member: string

  @ApiPropertyOptional()
  @IsString()
  @Length(8)
  @IsOptional()
  originZipCode: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  originComplement: string

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  originLatitude: number

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  originLongitude: number

  @ApiPropertyOptional()
  @IsString()
  @Length(8)
  destinationZipCode: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  destinationComplement: string

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  destinationLatitude: number

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  destinationLongitude: number

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  latitude: number

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  longitude: number

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  directions: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deadline: Date

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  started: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate: Date

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  startNote: string

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  completed: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  completionDate: Date

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  completionNote: string

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  canceled: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  cancellationDate: Date

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  cancellationNote: string
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common'
import { DomainsService } from './domains.service'
import { CreateDomainDto } from './dto/create-domain.dto'
import { UpdateDomainDto } from './dto/update-domain.dto'
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('domains')
@Controller('domains')
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @UseGuards(AuthGuard('authorization'))
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createDomainDto: CreateDomainDto) {
    return this.domainsService.create(createDomainDto)
  }

  @UseGuards(AuthGuard('authorization'))
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.domainsService.findAll()
  }

  @UseGuards(AuthGuard('authorization'))
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('organization/:organization')
  findByOrganization(@Param('organization') organization: string) {
    return this.domainsService.findByOrganization(organization)
  }

  @UseGuards(AuthGuard('authorization'))
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domainsService.findOne(id)
  }

  @UseGuards(AuthGuard('authorization'))
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDomainDto: UpdateDomainDto) {
    return this.domainsService.update(id, updateDomainDto)
  }

  @UseGuards(AuthGuard('authorization'))
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domainsService.remove(id)
  }
}

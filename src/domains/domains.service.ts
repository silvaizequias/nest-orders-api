import { Injectable } from '@nestjs/common'
import { CreateDomainDto } from './dto/create-domain.dto'
import { UpdateDomainDto } from './dto/update-domain.dto'
import { createDomainRespository } from './repositories/create-domain.repository'
import { readDomainRepository } from './repositories/read-domain.repository'
import { updateDomainRepository } from './repositories/update-domain.repository'
import { deleteDomainRepository } from './repositories/delete-domain.repository'
import { readDomainByOrganizationRepository } from './repositories/read-domain-by-organization.repository'

@Injectable()
export class DomainsService {
  create(createDomainDto: CreateDomainDto) {
    return createDomainRespository(createDomainDto)
  }

  findAll() {
    return readDomainRepository()
  }

  findByOrganization(organziation: string) {
    return readDomainByOrganizationRepository(organziation)
  }

  findOne(id: string) {
    return readDomainRepository(id)
  }

  update(id: string, updateDomainDto: UpdateDomainDto) {
    return updateDomainRepository(id, updateDomainDto)
  }

  remove(id: string) {
    return deleteDomainRepository(id)
  }
}

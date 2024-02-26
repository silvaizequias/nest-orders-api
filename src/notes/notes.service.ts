import { Injectable } from '@nestjs/common'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { createNoteRepository } from './repositories/create-note.repository'
import { readNoteRepository } from './repositories/read-note.repository'
import { updateNoteRepository } from './repositories/update-note.repository'
import { deleteNoteRepository } from './repositories/delete-note.repository'

@Injectable()
export class NotesService {
  create(createNoteDto: CreateNoteDto) {
    return createNoteRepository(createNoteDto)
  }

  findAll() {
    return readNoteRepository()
  }

  findOne(id: string) {
    return readNoteRepository(id)
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return updateNoteRepository(id, updateNoteDto)
  }

  remove(id: string) {
    return deleteNoteRepository(id)
  }
}

import { Injectable } from '@nestjs/common'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { createNote } from './repositories/POST'
import { findNoteById, findNotes } from './repositories/GET'
import { updateNote } from './repositories/PATCH'
import { removeNote } from './repositories/DELETE'

@Injectable()
export class NotesService {
  create(createNoteDto: CreateNoteDto) {
    return createNote(createNoteDto)
  }

  findAll() {
    return findNotes()
  }

  findOne(id: string) {
    return findNoteById(id)
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return updateNote(id, updateNoteDto)
  }

  remove(id: string) {
    return removeNote(id)
  }
}

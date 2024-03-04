import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AttachmentsModule } from './attachments/attachments.module'
import { ItemsModule } from './items/items.module'
import { OrdersModule } from './orders/orders.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthorizationModule } from './authorization/authorization.module'
import { NotesModule } from './notes/notes.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AttachmentsModule,
    ItemsModule,
    OrdersModule,
    PrismaModule,
    AuthorizationModule,
    NotesModule,
  ],
  providers: [],
})
export class AppModule {}

export type SendEmailType = {
  bbc?: string
  body: string
  from?: string
  subject: string
  to: string
}

export type SendSmsType = {
  content: string
  to: string
}

export type OrderMessageTemplateType = {
  order: string
  requirement?: string
  organization: string
  customer?: string
  member?: string
}

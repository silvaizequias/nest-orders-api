import { OrderMessageTemplateType } from '../types'

export const orderSmsTemplateCreated = ({
  order,
  organization,
  requirement,
}: OrderMessageTemplateType) => {
  return `um pedido de ${requirement.toLowerCase()} foi criado por ${organization.toLowerCase()}. veja mais detalhes em https://pedido.dedicado.digital/${order}`
}

export const orderEmailTemplateCreated = ({
  order,
  organization,
  requirement,
}: OrderMessageTemplateType) => {
  return `<div>
  <p>um pedido de ${requirement.toLowerCase()} foi criado por ${organization.toLowerCase()}</p>
  <p>você poderá acompanhar mais detalhes através do link https://pedido.dedicado.digital/${order}</p>
  </div>`
}

export const orderStatedSmsTemplate = ({
  order,
  organization,
  member,
}: OrderMessageTemplateType) => {
  return `o seu pedido na organização ${organization.toLowerCase()} foi iniciado por ${member.toLowerCase()}. acompanhe através do link https://pedido.dedicado.digital/${order}`
}

export const orderStatedEmailTemplate = ({
  order,
  organization,
  member,
  requirement,
}: OrderMessageTemplateType) => {
  return `<div>
  <p>${member.toLowerCase()} iniciou o pedido de ${requirement.toLowerCase()} na organização ${organization.toLowerCase()}.</p>
  <p>você poderá acompanhar mais detalhes através do link https://pedido.dedicado.digital/${order}</p>
  </div>`
}

export const orderCompletedSmsTemplate = ({
  order,
  organization,
  member,
  requirement,
}: OrderMessageTemplateType) => {
  return `${member.toLowerCase()} concluiu o pedido de ${requirement.toLowerCase()} na organização ${organization.toLowerCase()}. mais detalhes através do link https://pedido.dedicado.digital/${order}`
}

export const orderCompletedEmailTemplate = ({
  order,
  organization,
  member,
  requirement,
}: OrderMessageTemplateType) => {
  return `<div>
  <p>${member.toLowerCase()} concluiu o pedido de ${requirement.toLowerCase()} na organização ${organization.toLowerCase()}.</p>
  <p>você poderá acompanhar mais detalhes através do link https://pedido.dedicado.digital/${order}</p>
  </div>`
}

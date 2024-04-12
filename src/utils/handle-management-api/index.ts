import { OrganizationType, SpendSubscriptionType, UserType } from './types'

const MANAGEMENT_API_URL = process.env.MANAGEMENT_API_URL ?? ''
const AUTHORIZATION_KEY = process.env.PLATFORM_AWS_ACCESS_KEY ?? ''

export const getUserByPhone = async (
  phone: string,
): Promise<UserType | any> => {
  return await fetch(`${MANAGEMENT_API_URL}/users/phone/${phone}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTHORIZATION_KEY,
    },
  })
    .then(async (data) => await data.json())
    .catch((error) => error?.message)
}

export const getUserByDocument = async (
  document: string,
): Promise<UserType | any> => {
  return await fetch(`${MANAGEMENT_API_URL}/users/document/${document}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTHORIZATION_KEY,
    },
  })
    .then(async (data) => await data.json())
    .catch((error) => error?.message)
}

export const getOrganizationByDocument = async (
  document: string,
): Promise<OrganizationType | any> => {
  return await fetch(
    `${MANAGEMENT_API_URL}/organizations/document/${document}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AUTHORIZATION_KEY,
      },
    },
  )
    .then(async (data) => await data.json())
    .catch((error) => error?.message)
}

export const spendSubscription = async (inputs: SpendSubscriptionType) => {
  return await fetch(`${MANAGEMENT_API_URL}/subscriptions/spend`, {
    method: 'POST',
    body: JSON.stringify(inputs),
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTHORIZATION_KEY,
    },
  })
    .then(async (data) => await data.json())
    .catch((error) => error?.message)
}

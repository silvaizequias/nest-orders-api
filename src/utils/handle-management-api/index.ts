import { OrganizationType, UserType } from './types'

const MANAGEMENT_API_URL = process.env.MANAGEMENT_API_URL ?? ''
const AUTHORIZATION_KEY = process.env.PLATFORM_AWS_ACCESS_KEY ?? ''

export const getUserByPhone = async (
  phone: string,
): Promise<UserType | any> => {
  try {
    const data = await fetch(`${MANAGEMENT_API_URL}/users/phone/${phone}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: AUTHORIZATION_KEY,
      },
    })

    return await data.json()
  } catch (error: any) {
    return error?.message || 'ocorreu um erro inesperado'
  }
}

export const getUserByDocument = async (
  document: string,
): Promise<UserType | any> => {
  try {
    const data = await fetch(
      `${MANAGEMENT_API_URL}/users/document/${document}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: AUTHORIZATION_KEY,
        },
      },
    )

    return await data.json()
  } catch (error: any) {
    return error?.message || 'ocorreu um erro inesperado'
  }
}

export const getOrganizationByDocument = async (
  document: string,
): Promise<OrganizationType | any> => {
  try {
    const data = await fetch(
      `${MANAGEMENT_API_URL}/organizations/document/${document}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: AUTHORIZATION_KEY,
        },
      },
    )

    return await data.json()
  } catch (error: any) {
    return error?.message || 'ocorreu um erro inesperado'
  }
}

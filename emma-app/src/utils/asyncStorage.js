import { AsyncStorage } from 'react-native'
import Cookies from 'universal-cookie'

export const storeSession = async (
  headers: HTML$Headers,
  key?: string,
  value?: string
): any => {
  try {
    const sessionCookie: string = headers.map['set-cookie']
    const getCookers = getCook('gosess', sessionCookie)
    await AsyncStorage.setItem('@APP:gosess', getCookers)
  } catch (error) {
    throw error
  }
}

export const retrieveSession = async (): value | Error => {
  try {
    const value = await AsyncStorage.getItem('@APP:gosess')
    if (value !== null) {
      return value
    }
    throw value
  } catch (error) {
    throw error
  }
}

const getCook = (name: string, cookieString: string): string => {
  // Get name followed by anything except a semicolon
  const cookiestring: string = RegExp('' + name + '[^;]+').exec(cookieString)
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(
    cookiestring ? cookiestring.toString().replace(/^[^=]+./, '') : ''
  )
}

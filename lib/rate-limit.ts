import { NextRequest } from 'next/server'
import { troll } from './troll'

/**
 * Represents the rate limit information for each IP, including the request count and timestamp.
 */
interface RateLimitInfo {
  count: number
  timestamp: number
}

const rateLimitStore = new Map<string, RateLimitInfo>()

/**
 * Implements a rate limiter middleware to restrict the number of requests from each IP within a specified window.
 *
 * @param req - The Next.js request object.
 */
export const rateLimit = async (req: NextRequest) => {
  const ip = req.headers.get('x-real-ip') ?? req.headers.get('X-Forwarded-For') ?? 'unknown-ip'

  const currentTime = Date.now()
  const windowMs = 1 * 60 * 1000 // 1 minute
  const maxRequests = 10 // Limit each IP to 10 requests per window

  if (!isLocalhost(ip)) {
    let rateLimitInfo = rateLimitStore.get(ip)

    if (!rateLimitInfo || currentTime - rateLimitInfo.timestamp > windowMs) {
      rateLimitInfo = { count: 1, timestamp: currentTime }
    } else {
      rateLimitInfo.count += 1

      if (rateLimitInfo.count > maxRequests) {
        // TODO: Log IP violations for analytics (IP address, timestamp)
        throw new RateLimitError(troll())
      }
    }

    rateLimitStore.set(ip, rateLimitInfo)
  }
}

/**
 * Custom error class for an invalid IP address error.
 */
class InvalidIpError extends Error {
  /**
   * The HTTP status code associated with the error.
   */
  status: number

  /**
   * Constructs a new InvalidIpError instance.
   *
   * @param message - The error message.
   * @param status - The HTTP status code.
   */
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    this.status = 400
  }
}

/**
 * Determines whether a given IP address is localhost or not.
 *
 * @param ip - The IP address to check.
 * @returns A boolean value indicating if the IP address is localhost (true) or not (false).
 * @throws {InvalidIpError} If the IP address is not in a valid IPv4 or IPv6 format.
 *
 * @example
 * const ip1 = '127.0.0.1'
 * const ip2 = '::1'
 * const ip3 = '192.168.0.1'
 *
 * console.log(isLocalhost(ip1)) // Output: true
 * console.log(isLocalhost(ip2)) // Output: true
 * console.log(isLocalhost(ip3)) // Output: false
 */
export const isLocalhost = (ip: string | string[]): boolean => {
  const mtnNgPublicIpRegex = /^20\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){3}$/
  let ipAddresses: string[] = []
  let external: number = 0
  let totalCount: number = 0

  if (Array.isArray(ip)) {
    ipAddresses = ip
  } else if (typeof ip === 'string') {
    ipAddresses = ip.split(',').map((ipStr) => ipStr.trim())
  } else {
    throw new InvalidIpError('Invalid input format.')
  }

  if (ipAddresses.length > 2) {
    throw new InvalidIpError('Invalid input format.')
  }

  let value = false

  for (const ipAddress of ipAddresses) {
    totalCount++

    if (!isValidateIp(ipAddress)) {
      throw new InvalidIpError('Invalid input format.')
    }

    if (ipAddress !== '127.0.0.1' && ipAddress !== '::1' && !mtnNgPublicIpRegex.test(ipAddress)) {
      external++
    }

    if (totalCount === ipAddresses.length && external === 0) {
      value = true
    }
  }

  return value
}

/**
 * Custom error class for rate limit exceeded error.
 */
class RateLimitError extends Error {
  /**
   * The HTTP status code associated with the error.
   */
  status: number

  /**
   * Constructs a new RateLimitError instance.
   *
   * @param message - The error message.
   * @param status - The HTTP status code.
   */
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    this.status = 429
  }
}

/**
 * Determines whether the format of a given IP address conforms to the IPv4 or IPv6 format.
 *
 * @param ip - The IP address to validate.
 * @returns A boolean indicating whether the IP address is valid.
 *
 * @example
 * isValidateIp('192.168.0.1') // true
 * isValidateIp('2001:0db8:85a3:0000:0000:8a2e:0370:7334') // true
 * isValidateIp('127.0.0.1') // true
 * isValidateIp('::1') // true
 * isValidateIp('256.168.0.1') // false
 * isValidateIp('2001:0db8:85a3::8a2e:0370:7334') // false
 */
const isValidateIp = (ip: string): boolean => {
  const ipv4Regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
  const ipv4MappedIpv6Regex = /^::ffff:([0-9]{1,3}\.){3}[0-9]{1,3}$/
  const loopbackRegex = /^::1$/

  return ipv4Regex.test(ip) || ipv6Regex.test(ip) || loopbackRegex.test(ip) || ipv4MappedIpv6Regex.test(ip)
}
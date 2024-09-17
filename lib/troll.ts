const messages: string[] = [
  `Hey!, you need to try harder 😉`,
]

export const troll = () => {
  const randomBytes = new Uint32Array(1)
  crypto.getRandomValues(randomBytes)

  const randomIndex = randomBytes[0] % messages.length

  return messages[randomIndex]
}
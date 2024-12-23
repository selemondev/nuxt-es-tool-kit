export const firstLetterToUpperCase = (word: string) => {
  if (!word) return

  return word.charAt(0).toLocaleUpperCase() + word.slice(1)
}

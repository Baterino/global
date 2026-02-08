const messages: Record<string, string> = {
  en: 'Hello! This is a localized greeting from the API.',
  id: 'Halo! Ini adalah salam yang dilokalisasi dari API.',
}

export function getGreetingMessage(lang: string): string {
  return messages[lang] ?? messages.en
}

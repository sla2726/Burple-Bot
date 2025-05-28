export function randomPurpleColor(): number {
  const purpleColor = [
    0x8e44ad, // Roxo escuro
    0x9b59b6, // Roxo clássico (recomendado)
    0xbe90d4, // Lavanda
    0x71368a, // Roxo Discord antigo
    0xd7bde2  // Roxo claro
  ]
  const index = Math.floor(Math.random() * purpleColor.length);
  return purpleColor[index]
}
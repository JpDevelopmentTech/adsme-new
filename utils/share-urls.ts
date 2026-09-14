/** Enlace de WhatsApp que abre el chat con el mensaje ya escrito. */
export function whatsappShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

/** Correo con asunto y cuerpo preparados; el destinatario lo elige el usuario. */
export function mailtoShareUrl(jobTitle: string, url: string): string {
  const subject = encodeURIComponent(`Reporte de ${jobTitle}`);
  const body = encodeURIComponent(
    `Te comparto el reporte en vivo de ${jobTitle}:\n\n${url}`,
  );

  return `mailto:?subject=${subject}&body=${body}`;
}

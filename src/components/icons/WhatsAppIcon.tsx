import whatsappIconUrl from '../../assets/whatsapp.svg'

type WhatsAppIconProps = {
  className?: string
  alt?: string
}

export function WhatsAppIcon({ className, alt = 'WhatsApp' }: WhatsAppIconProps = {}) {
  return <img src={whatsappIconUrl} alt={alt} className={className} loading="lazy" />
}


// Replace this if Harvard Cafe uses a different WhatsApp-enabled number.
// If 011-827-4856 is not WhatsApp-enabled, the client must provide the correct WhatsApp number.
export const HARVARD_WHATSAPP_NUMBER = '27118274856'

export const contactDetails = {
  email: 'info@cafeharvard.co.za',
  phoneDisplay: '011-827-4856',
  phoneHref: 'tel:0118274856',
  whatsappHref: `https://wa.me/${HARVARD_WHATSAPP_NUMBER}`,
  mapHref: 'https://www.google.com/maps/search/?api=1&query=Harvard%20Cafe',
}

export function emailHref(subject = 'Harvard Cafe Enquiry', body = '') {
  const query = new URLSearchParams({ subject })
  if (body) query.set('body', body)
  return `mailto:${contactDetails.email}?${query.toString()}`
}

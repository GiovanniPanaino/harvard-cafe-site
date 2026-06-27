import { useEffect, useMemo, useRef, useState } from 'react'
import { HARVARD_WHATSAPP_NUMBER, contactDetails } from '../data/contactDetails'

const initialForm = {
  name: '',
  contactNumber: '',
  subject: '',
  message: '',
}

function buildMessage({ name, contactNumber, message }) {
  return [
    'Hello Harvard Cafe,',
    '',
    `My name is ${name || '[name]'}.`,
    `Contact number: ${contactNumber || '[contact number]'}`,
    '',
    'Message:',
    message || '[message]',
  ].join('\n')
}

function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  )
}

function MessageModal({ isOpen, mode = 'whatsapp', onClose, defaultSubject, defaultIntroMessage }) {
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)
  const [form, setForm] = useState(() => ({
    ...initialForm,
    subject: defaultSubject || 'Harvard Cafe Website Enquiry',
    message: defaultIntroMessage || '',
  }))
  const isEmail = mode === 'email'

  const title = isEmail ? 'Email Harvard Cafe' : 'WhatsApp Harvard Cafe'
  const helperText = isEmail
    ? 'Write your message below and we will prepare an email to Harvard Cafe.'
    : 'Write your message below and we will open WhatsApp with everything ready to send.'
  const submitText = isEmail ? 'Send Email' : 'Send via WhatsApp'
  const subject = form.subject || defaultSubject || 'Harvard Cafe Website Enquiry'
  const messageText = form.message || defaultIntroMessage || ''

  const actionHref = useMemo(() => {
    const body = buildMessage({ ...form, message: messageText })
    if (isEmail) {
      return `mailto:${contactDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }
    return `https://wa.me/${HARVARD_WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`
  }, [form, isEmail, messageText, subject])

  useEffect(() => {
    if (!isOpen) return undefined

    previousFocusRef.current = document.activeElement
    document.body.classList.add('modal-open')

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector('input, textarea, button')?.focus()
    }, 0)

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = getFocusableElements(dialogRef.current)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus?.()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  return (
    <div className="message-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="message-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="message-modal-title"
        ref={dialogRef}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="message-modal-head">
          <div>
            <p className="eyebrow">{isEmail ? 'Email enquiry' : 'WhatsApp message'}</p>
            <h2 id="message-modal-title">{title}</h2>
            <p>{helperText}</p>
          </div>
          <button className="modal-close-button" type="button" onClick={onClose} aria-label="Close message form">
            Close
          </button>
        </div>

        <div className="message-modal-form">
          <label>
            Name
            <input value={form.name} onChange={(event) => updateField('name', event.target.value)} />
          </label>
          <label>
            Contact number
            <input value={form.contactNumber} onChange={(event) => updateField('contactNumber', event.target.value)} />
          </label>
          {isEmail && (
            <label>
              Subject
              <input value={form.subject} onChange={(event) => updateField('subject', event.target.value)} />
            </label>
          )}
          <label>
            Message
            <textarea value={form.message} onChange={(event) => updateField('message', event.target.value)} />
          </label>
        </div>

        <div className="message-modal-actions">
          <button className="btn ghost light" type="button" onClick={onClose}>Cancel</button>
          <a className="btn primary" href={actionHref} target={isEmail ? undefined : '_blank'} rel={isEmail ? undefined : 'noreferrer'}>
            {submitText}
          </a>
        </div>
      </section>
    </div>
  )
}

export default MessageModal

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS setup - permitimos que nuestra propia app llame a esta API
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  // Manejar solicitud OPTIONS (preflight CORS)
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const data = req.body

    // 1. Obtener credenciales de Telegram desde Variables de Entorno (seguridad)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!telegramToken || !chatId) {
      console.error('Faltan credenciales de Telegram en Vercel')
      return res.status(500).json({ error: 'Error de configuración del servidor' })
    }

    // 2. Limpiar y formatear el número de teléfono para WhatsApp
    // Quita todo lo que no sea número y agrega el prefijo +1 si no lo tiene
    let cleanPhone = data.phone.replace(/\D/g, '')
    if (cleanPhone.length === 10) {
      cleanPhone = `1${cleanPhone}` // Agrega 1 si son 10 dígitos (estándar USA)
    }
    const whatsappLink = `https://wa.me/${cleanPhone}`
    
    // 3. Texto pre-escrito para WhatsApp, url-encoded
    const whatsappMessage = encodeURIComponent(
      `Estimado/a ${data.fullName}, gracias por contactar al bufete de Martinez & Asociados. Hemos evaluado preliminarmente su solicitud y nos complace informarle que su perfil califica para una revisión prioritaria. ¿En qué horario le gustaría agendar su llamada gratuita con nuestro especialista legal?`
    )
    const fullWhatsappUrl = `${whatsappLink}?text=${whatsappMessage}`

    // 4. Formatear el mensaje para Telegram (HTML parse mode)
    const message = `
🏛 <b>NUEVA SOLICITUD DE EVALUACIÓN</b>
━━━━━━━━━━━━━━━━━━━━━
👤 <b>Cliente:</b> ${data.fullName}
📱 <b>Teléfono:</b> ${data.phone}
📧 <b>Correo:</b> ${data.email}
📍 <b>Estado:</b> ${data.state}

⚖️ <b>SITUACIÓN MIGRATORIA:</b>
• <b>Entrada:</b> ${data.entryMethod}
• <b>Año:</b> ${data.entryYear}
• <b>A-Number:</b> ${data.hasAlienNumber}
• <b>Trabajo:</b> ${data.currentlyWorking}

🚨 <b>URGENCIA:</b> ${data.urgencyLevel}
💰 <b>RECURSOS:</b> ${data.financialResources}

📝 <b>DETALLES DEL CASO:</b>
<i>"${data.urgencyDescription}"</i>
━━━━━━━━━━━━━━━━━━━━━
    `.trim()

    // 5. Configurar el Inline Keyboard de Telegram (El botón de WhatsApp)
    const replyMarkup = {
      inline_keyboard: [
        [
          {
            text: '📲 Escribir al WhatsApp del Cliente',
            url: fullWhatsappUrl
          }
        ]
      ]
    }

    // 6. Enviar a la API de Telegram
    const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        reply_markup: replyMarkup
      }),
    })

    const telegramResult = await telegramResponse.json()

    if (!telegramResult.ok) {
      console.error('Error enviando a Telegram:', telegramResult)
      throw new Error(`Error de Telegram: ${telegramResult.description}`)
    }

    // 7. Respuesta exitosa al frontend
    return res.status(200).json({ success: true, message: 'Enviado correctamente' })
  } catch (error: any) {
    console.error('Error en el webhook:', error)
    return res.status(500).json({ success: false, error: error.message || 'Error interno del servidor' })
  }
}

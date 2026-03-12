export default async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Preflight CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;

    // Obtener credenciales (Variables de entorno en Vercel)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!telegramToken || !chatId) {
      console.error('Faltan credenciales de Telegram en Vercel');
      return res.status(500).json({ error: 'Faltan credenciales de Telegram en el servidor' });
    }

    // Limpiar número de teléfono (solo números, agregar +1 si son 10 dígitos)
    let cleanPhone = data.phone.replace(/\D/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = `1${cleanPhone}`;
    }
    const whatsappLink = `https://wa.me/${cleanPhone}`;
    
    // Mensaje pre-escrito WhatsApp
    const whatsappMessage = encodeURIComponent(
      `Estimado/a ${data.fullName}, gracias por contactar al bufete de Martinez & Asociados. Hemos evaluado preliminarmente su solicitud y nos complace informarle que su perfil califica para una revisión prioritaria. ¿En qué horario le gustaría agendar su llamada gratuita con nuestro especialista legal?`
    );
    const fullWhatsappUrl = `${whatsappLink}?text=${whatsappMessage}`;

    // Mensaje formateado para Telegram (HTML)
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
    `.trim();

    // Botón Inline Keyboard (WhatsApp)
    const replyMarkup = {
      inline_keyboard: [
        [
          {
            text: '📲 Escribir al WhatsApp del Cliente',
            url: fullWhatsappUrl
          }
        ]
      ]
    };

    // Llamada a la API de Telegram
    const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
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
    });

    const telegramResult = await telegramResponse.json();

    if (!telegramResult.ok) {
      console.error('Error enviando a Telegram:', telegramResult);
      throw new Error(`Error de Telegram: ${telegramResult.description}`);
    }

    // Todo bien
    return res.status(200).json({ success: true, message: 'Enviado correctamente a Telegram' });

  } catch (error) {
    console.error('Error en el webhook de Vercel:', error);
    return res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}

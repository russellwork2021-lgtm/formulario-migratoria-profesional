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
      `Estimado/a ${data.fullName}, le contactamos del Centro Nacional de Defensa Migratoria 🏛️.\n\nRevisamos su evaluación y ¡tenemos buenas noticias! Su perfil fue aprobado para una consulta gratuita con nuestros especialistas. ✅\n\nPara no hacerle perder tiempo y explicarle sus opciones reales, el siguiente paso es una breve llamada confidencial. ¿A qué hora le viene mejor que le marquemos el día de hoy? 📞`
    );
    const fullWhatsappUrl = `${whatsappLink}?text=${whatsappMessage}`;

    // Diccionarios de traducción (Mapeo de values a labels en español)
    const entryMethodsMap = {
      'visa': 'Entré con Visa (Turista, Trabajo, Estudiante)',
      'border': 'Entré por la frontera sin inspección',
      'detained': 'Fui detenido/a y liberado/a con fecha de corte',
      'tps': 'Tengo TPS (Estatus de Protección Temporal)',
      'asylum': 'Solicité asilo al llegar'
    };

    const alienNumberMap = {
      'yes': 'Sí, tengo mi A-Number',
      'no': 'No tengo A-Number',
      'unsure': 'No estoy seguro / Necesito ayuda'
    };

    const workingMap = {
      'yes-permit': 'Sí, con permiso de trabajo',
      'yes-no-permit': 'Sí, sin permiso de trabajo',
      'no': 'No estoy trabajando actualmente'
    };

    const urgencyMap = {
      'emergency': 'URGENTE - Orden de deportación/fecha límite',
      'high': 'Alta prioridad - Necesito resolver pronto',
      'medium': 'Moderada - Quiero planificar mi caso',
      'informative': 'Informativa - Quiero conocer opciones'
    };

    const financialMap = {
      'prepared': 'Tengo recursos disponibles',
      'payment-plan': 'Necesitaría un plan de pagos',
      'limited': 'Recursos limitados - necesito opciones económicas'
    };

    // Traducir los valores recibidos
    const translatedEntryMethod = entryMethodsMap[data.entryMethod] || data.entryMethod;
    const translatedAlienNumber = alienNumberMap[data.hasAlienNumber] || data.hasAlienNumber;
    const translatedWorking = workingMap[data.currentlyWorking] || data.currentlyWorking;
    const translatedUrgency = urgencyMap[data.urgencyLevel] || data.urgencyLevel;
    const translatedFinancial = financialMap[data.financialResources] || data.financialResources;
    const entryYearDisplay = data.entryYear === 'before' ? 'Antes del 2000' : data.entryYear;

    // Mensaje formateado para Telegram (HTML)
    const message = `
🏛 <b>NUEVA SOLICITUD DE EVALUACIÓN</b>
━━━━━━━━━━━━━━━━━━━━━
👤 <b>Cliente:</b> ${data.fullName}
📱 <b>Teléfono:</b> ${data.phone}
📧 <b>Correo:</b> ${data.email}
📍 <b>Estado:</b> ${data.state}

⚖️ <b>SITUACIÓN MIGRATORIA:</b>
• <b>Entrada:</b> ${translatedEntryMethod}
• <b>Año:</b> ${entryYearDisplay}
• <b>A-Number:</b> ${translatedAlienNumber}
• <b>Trabajo:</b> ${translatedWorking}

🚨 <b>URGENCIA:</b> ${translatedUrgency}
💰 <b>RECURSOS:</b> ${translatedFinancial}

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

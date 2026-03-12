export interface FormData {
  fullName: string
  email: string
  phone: string
  state: string
  entryMethod: string
  entryYear: string
  hasAlienNumber: string
  currentlyWorking: string
  urgencyDescription: string
  urgencyLevel: string
  financialResources: string
  dependents?: string
}

export const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

export const entryMethods = [
  { value: 'visa', label: 'Entre con Visa (Turista, Trabajo, Estudiante)' },
  { value: 'border', label: 'Entre por la frontera sin inspeccion' },
  { value: 'detained', label: 'Fui detenido/a y liberado/a con fecha de corte' },
  { value: 'tps', label: 'Tengo TPS (Estatus de Proteccion Temporal)' },
  { value: 'asylum', label: 'Solicite asilo al llegar' }
]

export const alienNumberOptions = [
  { value: 'yes', label: 'Si, tengo mi A-Number' },
  { value: 'no', label: 'No tengo A-Number' },
  { value: 'unsure', label: 'No estoy seguro / Necesito ayuda para verificar' }
]

export const workingOptions = [
  { value: 'yes-permit', label: 'Si, con permiso de trabajo' },
  { value: 'yes-no-permit', label: 'Si, sin permiso de trabajo' },
  { value: 'no', label: 'No estoy trabajando actualmente' }
]

export const urgencyOptions = [
  { value: 'emergency', label: 'URGENTE - Orden de deportacion o fecha limite proxima' },
  { value: 'high', label: 'Alta prioridad - Necesito resolver pronto' },
  { value: 'medium', label: 'Moderada - Quiero planificar mi caso' },
  { value: 'informative', label: 'Informativa - Quiero conocer mis opciones' }
]

export const financialOptions = [
  { value: 'prepared', label: 'Tengo recursos disponibles para servicios legales' },
  { value: 'payment-plan', label: 'Necesitaria un plan de pagos accesible' },
  { value: 'limited', label: 'Recursos limitados - necesito opciones economicas' }
]

export interface Testimonial {
  name: string
  location: string
  text: string
  rating: number
  caseType: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Maria G.',
    location: 'Houston, TX',
    text: 'Despues de 8 anos viviendo con miedo, el equipo de Martinez & Asociados me ayudo a obtener mi residencia permanente. Son profesionales, honestos y realmente se preocupan por sus clientes.',
    rating: 5,
    caseType: 'Residencia Permanente'
  },
  {
    name: 'Carlos R.',
    location: 'Los Angeles, CA',
    text: 'Tenia una orden de deportacion y pense que no habia esperanza. Gracias a su experiencia, lograron detener el proceso y ahora tengo un permiso de trabajo. Les debo todo.',
    rating: 5,
    caseType: 'Defensa de Deportacion'
  },
  {
    name: 'Ana L.',
    location: 'Miami, FL',
    text: 'El proceso de asilo era aterrador, pero me guiaron en cada paso. Siempre disponibles para responder mis preguntas. Mi caso fue aprobado en tiempo record.',
    rating: 5,
    caseType: 'Asilo Politico'
  },
  {
    name: 'Roberto M.',
    location: 'Chicago, IL',
    text: 'Profesionales de primer nivel. Me ayudaron con la visa U despues de ser victima de un crimen. Su conocimiento de la ley es impresionante y su trato muy humano.',
    rating: 5,
    caseType: 'Visa U'
  }
]

export interface FAQ {
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  {
    question: 'Cuanto cuesta la consulta inicial?',
    answer: 'La evaluacion inicial de su caso es completamente GRATUITA y confidencial. No tiene ninguna obligacion. Analizamos su situacion y le explicamos sus opciones legales sin costo.'
  },
  {
    question: 'Es seguro compartir mi informacion migratoria?',
    answer: 'Absolutamente. Toda la informacion que comparte esta protegida por el privilegio abogado-cliente, lo que significa que es legalmente confidencial. No compartimos su informacion con nadie, incluyendo autoridades de inmigracion.'
  },
  {
    question: 'Puedo ser deportado si busco ayuda legal?',
    answer: 'Buscar asesoria legal es su derecho constitucional y NO lo pone en riesgo de deportacion. Al contrario, un abogado puede ayudarle a protegerse y encontrar opciones legales que quizas no conocia.'
  },
  {
    question: 'Ofrecen planes de pago?',
    answer: 'Si. Entendemos que los servicios legales pueden ser costosos. Ofrecemos planes de pago flexibles y personalizados para que pueda acceder a representacion legal de calidad sin importar su situacion financiera.'
  },
  {
    question: 'En cuanto tiempo puedo resolver mi caso?',
    answer: 'Cada caso es unico. Algunos procesos pueden tomar meses y otros anos, dependiendo del tipo de caso y la carga del tribunal. En su consulta gratuita le daremos un estimado realista basado en su situacion especifica.'
  },
  {
    question: 'Atienden casos en todo Estados Unidos?',
    answer: 'Si. Aunque nuestras oficinas estan en las principales ciudades, representamos clientes en los 50 estados. Las consultas iniciales pueden realizarse por telefono o videollamada.'
  }
]
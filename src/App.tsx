import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Shield,
  User,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Lock,
  Star,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Heart,
  Briefcase,
  Users,
  Home,
  ChevronDown,
  Scale,
  AlertTriangle,
  Calendar,
  MessageSquare,
  CheckCheck,
  Zap
} from 'lucide-react'
import {
  FormData,
  states,
  entryMethods,
  alienNumberOptions,
  workingOptions,
  urgencyOptions,
  financialOptions,
  testimonials,
  faqs
} from './types'
import { GovInput, GovSelect, GovButton } from './components'

/* ─── helpers ─────────────────────────────────────────────────── */
const caseId = `CNDM-${new Date().getFullYear()}-${Math.random()
  .toString(36)
  .substring(2, 8)
  .toUpperCase()}`

const yearOptions = Array.from({ length: 26 }, (_, i) => {
  const y = 2025 - i
  return y >= 2000
    ? { value: String(y), label: String(y) }
    : { value: 'before', label: 'Antes del 2000' }
})

/* ─── sub-components ──────────────────────────────────────────── */

/** Banner SSL oficial dorado */
function SSLBanner() {
  return (
    <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-amber-600" />
          <span className="text-amber-800 text-xs font-semibold tracking-wide">
            CONEXIÓN SEGURA — SSL 256-bits · Privilegio Abogado-Cliente
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-amber-700">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" /> HTTPS Encriptado
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Datos Protegidos
          </span>
        </div>
      </div>
    </div>
  )
}

/** Stepper visual con círculos conectados y pulse-glow */
interface StepperProps {
  current: number
  steps: { number: number; title: string; subtitle: string }[]
}
function Stepper({ current, steps }: StepperProps) {
  return (
    <div className="relative flex items-start justify-between">
      {steps.map((step, idx) => {
        const done = current > step.number
        const active = current === step.number
        return (
          <div key={step.number} className="flex-1 flex flex-col items-center relative">
            {/* Línea conectora izquierda */}
            {idx > 0 && (
              <div className="absolute left-0 right-1/2 top-5 h-0.5 -translate-y-0.5">
                <div className="h-full bg-slate-200 w-full" />
                <div
                  className="absolute inset-0 h-full bg-blue-500 transition-all duration-700 ease-out"
                  style={{ width: done || active ? '100%' : '0%' }}
                />
              </div>
            )}
            {/* Línea conectora derecha */}
            {idx < steps.length - 1 && (
              <div className="absolute left-1/2 right-0 top-5 h-0.5 -translate-y-0.5">
                <div className="h-full bg-slate-200 w-full" />
                <div
                  className="absolute inset-0 h-full bg-blue-500 transition-all duration-700 ease-out"
                  style={{ width: done ? '100%' : '0%' }}
                />
              </div>
            )}

            {/* Círculo */}
            <div className="relative z-10 mb-2">
              {active && (
                <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-30" />
              )}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500
                  ${done ? 'bg-emerald-500 text-white shadow-md' : ''}
                  ${active ? 'bg-blue-600 text-white shadow-lg ring-4 ring-blue-100' : ''}
                  ${!done && !active ? 'bg-white text-slate-400 border-2 border-slate-200' : ''}
                `}
              >
                {done ? <CheckCheck className="w-4.5 h-4.5" /> : step.number}
              </div>
            </div>

            {/* Labels */}
            <p className={`text-[11px] font-bold text-center leading-tight ${active ? 'text-blue-700' : done ? 'text-emerald-600' : 'text-slate-400'}`}>
              {step.title}
            </p>
            <p className="text-[10px] text-slate-400 text-center hidden sm:block">{step.subtitle}</p>
          </div>
        )
      })}
    </div>
  )
}

/** Pantalla de Éxito premium */
function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full animate-slide-up">
        {/* Card principal */}
        <div className="bg-white rounded-3xl shadow-premium-xl overflow-hidden">

          {/* Header verde */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 pt-12 pb-8 text-center">
            <div className="relative inline-flex items-center justify-center mb-4">
              <div className="absolute w-24 h-24 bg-white/20 rounded-full animate-ping" />
              <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl animate-check-bounce">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              ¡Evaluación Enviada con Éxito!
            </h2>
            <p className="text-emerald-100 text-sm">
              Su solicitud ha sido recibida y priorizada por nuestro equipo legal.
            </p>
          </div>

          <div className="px-6 sm:px-10 py-8 space-y-6">

            {/* Tarjeta número de caso — tipo ticket oficial */}
            <div className="relative border-2 border-dashed border-blue-200 rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 p-6 text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                Número de Referencia Oficial
              </p>
              <p className="text-2xl font-mono font-bold text-slate-800 tracking-wider mb-2">
                {caseId}
              </p>
              <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-blue-400" />
                Guarde este número para dar seguimiento a su caso
              </p>
              {/* Semicírculos tipo ticket */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 rounded-full border-2 border-dashed border-blue-200" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 rounded-full border-2 border-dashed border-blue-200" />
            </div>

            {/* Timeline de próximos pasos */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                ¿Qué Sucede Ahora?
              </p>
              <div className="relative space-y-0">
                {[
                  {
                    icon: FileText,
                    color: 'bg-blue-100 text-blue-600',
                    title: 'Revisión de su Solicitud',
                    desc: 'Un abogado senior analiza su caso en detalle.',
                    time: 'Hoy'
                  },
                  {
                    icon: Phone,
                    color: 'bg-amber-100 text-amber-600',
                    title: 'Contacto de un Especialista',
                    desc: 'Le llamaremos al número proporcionado.',
                    time: 'En 24 hrs'
                  },
                  {
                    icon: MessageSquare,
                    color: 'bg-emerald-100 text-emerald-600',
                    title: 'Evaluación Gratuita',
                    desc: 'Analizamos sus opciones legales sin costo.',
                    time: 'Esta semana'
                  },
                ].map((s, i, arr) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${s.color}`}>
                        <s.icon className="w-4 h-4" />
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-0.5 h-8 bg-slate-200 my-1" />
                      )}
                    </div>
                    <div className="pb-6">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-semibold text-slate-800">{s.title}</p>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">{s.time}</span>
                      </div>
                      <p className="text-xs text-slate-500">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aviso confidencialidad */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-3">
              <Lock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-amber-800 text-xs leading-relaxed">
                <strong>Confidencialidad garantizada.</strong> Su información está protegida por el
                privilegio abogado-cliente. No compartimos datos con ninguna autoridad.
              </p>
            </div>

            <GovButton
              variant="primary"
              size="lg"
              className="w-full justify-center"
              onClick={onReset}
            >
              Volver al Inicio
            </GovButton>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── main component ──────────────────────────────────────────── */
export default function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>()

  const STEPS = [
    { number: 1, title: 'Personal', subtitle: 'Datos de contacto' },
    { number: 2, title: 'Migratorio', subtitle: 'Su situación actual' },
    { number: 3, title: 'Evaluación', subtitle: 'Últimos detalles' }
  ]

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const nextStep = async () => {
    const fields: Record<number, (keyof FormData)[]> = {
      1: ['fullName', 'email', 'phone', 'state'],
      2: ['entryMethod', 'entryYear', 'hasAlienNumber', 'urgencyLevel'],
      3: ['currentlyWorking', 'financialResources', 'urgencyDescription']
    }
    const valid = await trigger(fields[currentStep] as any)
    if (valid && currentStep < 3) {
      setCurrentStep(p => p + 1)
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    }
  }

  const prevStep = () => currentStep > 1 && setCurrentStep(p => p - 1)

  const onSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 2000))
    setIsSubmitting(false)
    setShowSuccess(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* Scroll position for navbar shadow */
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  if (showSuccess) return (
    <SuccessScreen onReset={() => { setShowSuccess(false); setCurrentStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
  )

  return (
    <div className="min-h-screen font-body text-slate-800 bg-slate-50">

      {/* ── SSL BANNER ── */}
      <SSLBanner />

      {/* ── NAVBAR ── */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-premium-md' : 'border-b border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
              <Scale className="w-5 h-5 text-amber-400" />
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold text-slate-900 text-base leading-none">Martinez &amp; Asociados</p>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase font-medium">Immigration Law Firm</p>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {['#servicios', '#testimonios', '#faq'].map((href, i) => (
              <a key={i} href={href}
                className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">
                {['Servicios', 'Testimonios', 'Preguntas'][i]}
              </a>
            ))}
            <button onClick={scrollToForm} className="btn-gov-primary px-5 py-2.5 text-sm">
              Consulta Gratuita
            </button>
          </div>

          {/* Mobile burger */}
          <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition" onClick={() => setMobileMenuOpen(o => !o)}>
            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 border-t border-slate-100 pt-3 space-y-2 animate-fade-in-down">
            {['#servicios', '#testimonios', '#faq'].map((href, i) => (
              <a key={i} href={href} onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-slate-600 font-medium text-sm">
                {['Servicios', 'Testimonios', 'Preguntas'][i]}
              </a>
            ))}
            <button onClick={() => { scrollToForm(); setMobileMenuOpen(false) }} className="btn-gov-primary w-full justify-center py-2.5 text-sm mt-2">
              Consulta Gratuita
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-navy-900">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        {/* Blue glow blob */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-blue-300 text-[13px] font-medium">Más de 15 años de experiencia en EE.UU.</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
                Defendemos sus{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
                  derechos
                </span>{' '}
                migratorios
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg">
                Bufete especializado en inmigración. Resultados comprobados en defensa contra deportación, asilo, residencia permanente y visas de trabajo.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <button onClick={scrollToForm}
                  className="btn-gov-primary px-8 py-4 text-base shadow-blue-glow">
                  Evaluación Gratuita
                  <ChevronRight className="w-5 h-5" />
                </button>
                <a href="tel:+18005551234"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/15 text-white font-semibold text-base hover:bg-white/10 hover:border-white/30 transition-all duration-200">
                  <Phone className="w-5 h-5" />
                  (800) 555-1234
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                {[['5,000+', 'Casos resueltos'], ['98%', 'Satisfacción'], ['50', 'Estados']].map(([n, l], i) => (
                  <div key={i}>
                    <p className="text-3xl font-bold text-amber-400">{n}</p>
                    <p className="text-slate-400 text-xs mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — trust card */}
            <div className="hidden lg:block animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <div className="bg-white/8 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-premium-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">Privilegio Abogado-Cliente</h3>
                    <p className="text-slate-400 text-sm">Su información, 100% protegida por ley</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: Lock, text: 'Encriptación SSL 256 bits' },
                    { icon: Scale, text: 'Abogados licenciados — Bar Association' },
                    { icon: Award, text: 'Reconocidos por AILA' },
                    { icon: Clock, text: 'Respuesta garantizada en 24 horas' },
                    { icon: AlertTriangle, text: 'Sin riesgo de reportes a ICE/USCIS' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-xl px-4 py-3 transition-colors">
                      <item.icon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span className="text-white/85 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-slate-300 text-sm">5.0 · 500+ reseñas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Áreas de Práctica</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mt-2 mb-3">
              Representación Legal Completa
            </h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              Cubrimos todas las áreas del derecho migratorio estadounidense con abogados especializados.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Shield, title: 'Defensa contra Deportación', desc: 'Representación urgente ante cortes de inmigración. Cancelación de remoción, apelaciones y recursos de emergencia.', color: 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white' },
              { icon: Home, title: 'Residencia Permanente', desc: 'Green Card por familia, empleo o inversión. Gestionamos todo el proceso ante USCIS hasta la aprobación.', color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' },
              { icon: Heart, title: 'Asilo y Refugio', desc: 'Protección para quienes huyen de persecución. Preparación exhaustiva con evidencia sólida.', color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' },
              { icon: Briefcase, title: 'Visas de Trabajo', desc: 'H-1B, L-1, O-1, TN y más. Asesoría completa para empleadores y trabajadores.', color: 'bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white' },
              { icon: Users, title: 'Visas U y VAWA', desc: 'Protección para víctimas de crímenes y violencia doméstica. Trato confidencial y compasivo.', color: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white' },
              { icon: Award, title: 'Ciudadanía', desc: 'El paso final de su viaje migratorio. Preparación completa para entrevistas y exámenes de naturalización.', color: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white' },
            ].map((s, i) => (
              <div key={i} className="group card-premium card-premium-hover p-6 lg:p-7 cursor-default">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${s.color}`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="text-slate-900 font-bold text-base mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { n: '15+', l: 'Años de Experiencia' },
              { n: '5,000+', l: 'Casos Exitosos' },
              { n: '98%', l: 'Tasa de Satisfacción' },
              { n: '24h', l: 'Tiempo de Respuesta' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-4xl font-display font-bold text-amber-400">{s.n}</p>
                <p className="text-slate-400 text-sm mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section id="testimonios" className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Testimonios</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mt-2 mb-3">
              Historias Reales de Éxito
            </h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              Personas que confiaron en nosotros y transformaron su situación migratoria.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="card-premium card-premium-hover p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-slate-900 font-bold text-sm">{t.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-400 text-xs">{t.location}</span>
                  </div>
                  <span className="inline-block mt-2 text-[11px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-semibold border border-blue-100">
                    {t.caseType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULARIO ── */}
      <section id="consultation-form" ref={formRef} className="section-padding bg-gradient-to-b from-slate-100 to-slate-50">
        <div className="max-w-2xl mx-auto">

          {/* Encabezado */}
          <div className="text-center mb-10">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Evaluación Gratuita</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mt-2 mb-3">
              Solicite su Consulta Confidencial
            </h2>
            <p className="text-slate-500 text-base max-w-lg mx-auto">
              Sin costo. Sin compromiso. 100% confidencial. Un abogado revisará su caso personalmente.
            </p>
          </div>

          {/* Badges de confianza */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {[
              { icon: Lock, text: 'SSL 256-bits' },
              { icon: Shield, text: 'Abogado-Cliente' },
              { icon: Clock, text: 'Respuesta 24h' },
              { icon: Zap, text: 'Sin Costo' },
            ].map((b, i) => (
              <div key={i} className="badge-ssl">
                <b.icon className="w-3.5 h-3.5 text-amber-600" />
                <span>{b.text}</span>
              </div>
            ))}
          </div>

          {/* Stepper */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-premium px-6 py-6 mb-6">
            <Stepper current={currentStep} steps={STEPS} />
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* ── PASO 1 ── */}
            {currentStep === 1 && (
              <div className="card-premium overflow-hidden animate-slide-up">
                {/* Header card */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 sm:px-8 py-5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">Información Personal</h3>
                    <p className="text-slate-400 text-xs">Datos básicos para contactarle</p>
                  </div>
                  <div className="ml-auto text-slate-500 text-xs font-mono">Paso 1 / 3</div>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  <GovInput
                    label="Nombre Completo"
                    placeholder="Como aparece en su identificación oficial"
                    icon={<User className="w-4 h-4" />}
                    error={errors.fullName?.message}
                    helperText="Nombre legal según pasaporte o ID"
                    {...register('fullName', { required: 'Ingrese su nombre completo' })}
                  />
                  <GovInput
                    label="Correo Electrónico"
                    type="email"
                    placeholder="su@correo.com"
                    icon={<Mail className="w-4 h-4" />}
                    error={errors.email?.message}
                    helperText="Le enviaremos la confirmación aquí"
                    {...register('email', {
                      required: 'Ingrese su correo electrónico',
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Correo no válido' }
                    })}
                  />
                  <GovInput
                    label="WhatsApp / Teléfono"
                    type="tel"
                    placeholder="(555) 123-4567"
                    icon={<Phone className="w-4 h-4" />}
                    error={errors.phone?.message}
                    helperText="Número donde podamos contactarle de forma segura"
                    {...register('phone', {
                      required: 'Ingrese su teléfono',
                      pattern: { value: /^[\d\s\-\(\)\+]+$/, message: 'Teléfono no válido' }
                    })}
                  />
                  <GovSelect
                    label="Estado de Residencia"
                    placeholder="Seleccione su estado"
                    icon={<MapPin className="w-4 h-4" />}
                    options={states.map(s => ({ value: s, label: s }))}
                    error={errors.state?.message}
                    helperText="Estado donde vive actualmente"
                    {...register('state', { required: 'Seleccione su estado' })}
                  />
                </div>
              </div>
            )}

            {/* ── PASO 2 ── */}
            {currentStep === 2 && (
              <div className="card-premium overflow-hidden animate-slide-up">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 sm:px-8 py-5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">Estado Migratorio</h3>
                    <p className="text-slate-400 text-xs">Información sobre su situación actual</p>
                  </div>
                  <div className="ml-auto text-slate-500 text-xs font-mono">Paso 2 / 3</div>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  <GovSelect
                    label="¿Cómo entró a los Estados Unidos?"
                    placeholder="Seleccione la opción que mejor aplica"
                    options={entryMethods}
                    error={errors.entryMethod?.message}
                    helperText="Seleccione la entrada más reciente"
                    {...register('entryMethod', { required: 'Este campo es requerido' })}
                  />
                  <GovSelect
                    label="¿En qué año entró a EE.UU.?"
                    placeholder="Seleccione el año"
                    icon={<Calendar className="w-4 h-4" />}
                    options={yearOptions}
                    error={errors.entryYear?.message}
                    helperText="Año de su entrada más reciente al país"
                    {...register('entryYear', { required: 'Este campo es requerido' })}
                  />
                  <GovSelect
                    label="¿Tiene número de registro (A-Number)?"
                    placeholder="Seleccione una opción"
                    options={alienNumberOptions}
                    error={errors.hasAlienNumber?.message}
                    helperText="Número asignado por USCIS — ej: A123456789"
                    {...register('hasAlienNumber', { required: 'Este campo es requerido' })}
                  />
                  <GovSelect
                    label="Nivel de urgencia de su caso"
                    placeholder="Seleccione el nivel"
                    icon={<AlertTriangle className="w-4 h-4" />}
                    options={urgencyOptions}
                    error={errors.urgencyLevel?.message}
                    helperText="Esto nos ayuda a priorizar su atención"
                    {...register('urgencyLevel', { required: 'Este campo es requerido' })}
                  />
                </div>
              </div>
            )}

            {/* ── PASO 3 ── */}
            {currentStep === 3 && (
              <div className="card-premium overflow-hidden animate-slide-up">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 sm:px-8 py-5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">Evaluación Final</h3>
                    <p className="text-slate-400 text-xs">Últimos detalles para completar su evaluación</p>
                  </div>
                  <div className="ml-auto text-slate-500 text-xs font-mono">Paso 3 / 3</div>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  <GovSelect
                    label="¿Está trabajando actualmente?"
                    placeholder="Seleccione una opción"
                    icon={<Briefcase className="w-4 h-4" />}
                    options={workingOptions}
                    error={errors.currentlyWorking?.message}
                    helperText="Su situación laboral actual"
                    {...register('currentlyWorking', { required: 'Este campo es requerido' })}
                  />
                  <GovSelect
                    label="Capacidad de inversión en servicios legales"
                    placeholder="Seleccione una opción"
                    options={financialOptions}
                    error={errors.financialResources?.message}
                    helperText="Ofrecemos planes flexibles para todos los presupuestos"
                    {...register('financialResources', { required: 'Este campo es requerido' })}
                  />

                  {/* Textarea */}
                  <div className="space-y-1.5">
                    <label className="label-premium">Describa Brevemente su Situación</label>
                    <textarea
                      rows={4}
                      placeholder="Cuéntenos sobre su situación migratoria actual y qué tipo de ayuda necesita. Toda la información es estrictamente confidencial..."
                      className="input-premium resize-none min-h-[120px]"
                      {...register('urgencyDescription', { required: 'Por favor describa su situación' })}
                    />
                    {errors.urgencyDescription && (
                      <div className="flex items-center gap-1.5 animate-fade-in">
                        <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-red-500 text-[13px] font-medium">{errors.urgencyDescription.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Aviso legal */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3">
                    <Lock className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-700 text-[13px] font-semibold mb-0.5">Aviso de Confidencialidad</p>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        Al enviar este formulario, su información queda protegida por el privilegio abogado-cliente.
                        No compartiremos sus datos con terceros ni con autoridades de inmigración (ICE/USCIS).
                        Esta evaluación no constituye representación legal formal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── NAVEGACIÓN ── */}
            <div className="flex items-center justify-between mt-6 gap-4">
              <GovButton
                variant="outline"
                size="md"
                onClick={prevStep}
                disabled={currentStep === 1}
                type="button"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </GovButton>

              {currentStep < 3 ? (
                <GovButton variant="primary" size="lg" onClick={nextStep} type="button">
                  Siguiente Paso
                  <ArrowRight className="w-4 h-4" />
                </GovButton>
              ) : (
                <GovButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  className="min-w-[200px] justify-center"
                >
                  {!isSubmitting && <CheckCircle className="w-4 h-4" />}
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                </GovButton>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section-padding bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Preguntas Frecuentes</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mt-2">
              Resolvemos sus Dudas
            </h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="card-premium overflow-hidden">
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-slate-50/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-slate-800 font-semibold text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 animate-fade-in">
                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-slate-500 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-navy-900 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            No Espere Más. Su Futuro Comienza Hoy.
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
            Cada día cuenta en un caso migratorio. Permítanos evaluar su situación sin costo ni compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={scrollToForm} className="btn-gov-primary px-10 py-4 text-base shadow-blue-glow">
              Comenzar Evaluación Gratuita
            </button>
            <a href="tel:+18005551234"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/15 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-base">
              <Phone className="w-5 h-5" />
              (800) 555-1234
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center">
                  <Scale className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <p className="font-display font-bold text-lg leading-none">Martinez &amp; Asociados</p>
                  <p className="text-slate-500 text-xs">Immigration Law Firm</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Más de 15 años protegiendo los derechos de la comunidad inmigrante en todos los estados de EE.UU.
              </p>
            </div>

            <div>
              <h4 className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">Servicios</h4>
              <ul className="space-y-2">
                {['Defensa de Deportación', 'Residencia Permanente', 'Asilo y Refugio', 'Visas de Trabajo', 'Ciudadanía'].map((s, i) => (
                  <li key={i}><span className="text-slate-400 text-sm hover:text-white transition-colors cursor-default">{s}</span></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">Contacto</h4>
              <ul className="space-y-3">
                {[
                  { icon: Phone, t: '(800) 555-1234' },
                  { icon: Mail, t: 'consulta@martinezlaw.com' },
                  { icon: Clock, t: 'Lun–Vie: 8am – 6pm ET' },
                ].map((c, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                    <c.icon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    {c.t}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">Legal</h4>
              <ul className="space-y-2">
                {['Política de Privacidad', 'Términos de Servicio', 'Aviso Legal'].map((s, i) => (
                  <li key={i}><span className="text-slate-400 text-sm cursor-default hover:text-white transition-colors">{s}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-xs text-center sm:text-left">
              © {new Date().getFullYear()} Martinez &amp; Asociados, PLLC. Todos los derechos reservados.
              El contenido de este sitio es informativo y no constituye asesoramiento legal.
            </p>
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-500 text-xs">Sitio 100% seguro — SSL encriptado</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

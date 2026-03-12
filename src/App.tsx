import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Shield,
  User,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Lock,
  Phone,
  Mail,
  MapPin,
  Clock,
  Briefcase,
  AlertTriangle,
  Calendar,
  MessageSquare,
  CheckCheck,
  Scale
} from 'lucide-react'
import {
  FormData,
  states,
  entryMethods,
  alienNumberOptions,
  workingOptions,
  urgencyOptions,
  financialOptions
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

/* ─── Stepper ─────────────────────────────────────────────────── */
interface StepperProps {
  current: number
  steps: { number: number; title: string }[]
}
function Stepper({ current, steps }: StepperProps) {
  return (
    <div className="relative flex items-start justify-between">
      {steps.map((step, idx) => {
        const done = current > step.number
        const active = current === step.number
        return (
          <div key={step.number} className="flex-1 flex flex-col items-center relative">
            {idx > 0 && (
              <div className="absolute left-0 right-1/2 top-5 h-0.5 -translate-y-0.5">
                <div className="h-full bg-slate-200 w-full" />
                <div
                  className="absolute inset-0 h-full bg-blue-500 transition-all duration-700 ease-out"
                  style={{ width: done || active ? '100%' : '0%' }}
                />
              </div>
            )}
            {idx < steps.length - 1 && (
              <div className="absolute left-1/2 right-0 top-5 h-0.5 -translate-y-0.5">
                <div className="h-full bg-slate-200 w-full" />
                <div
                  className="absolute inset-0 h-full bg-blue-500 transition-all duration-700 ease-out"
                  style={{ width: done ? '100%' : '0%' }}
                />
              </div>
            )}
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
            <p className={`text-[11px] font-bold text-center leading-tight ${active ? 'text-blue-700' : done ? 'text-emerald-600' : 'text-slate-400'}`}>
              {step.title}
            </p>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Success Screen ──────────────────────────────────────────── */
function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="animate-slide-up">
      <div className="bg-white rounded-2xl shadow-premium-lg overflow-hidden border border-slate-200">
        {/* Header verde */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 sm:px-8 pt-10 pb-7 text-center">
          <div className="relative inline-flex items-center justify-center mb-4">
            <div className="absolute w-20 h-20 bg-white/20 rounded-full animate-ping" />
            <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl animate-check-bounce">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">
            ¡Evaluación Enviada con Éxito!
          </h2>
          <p className="text-emerald-100 text-sm">
            Su solicitud ha sido recibida y priorizada por nuestro equipo legal.
          </p>
        </div>

        <div className="px-6 sm:px-8 py-6 space-y-5">
          {/* Ticket número de caso */}
          <div className="relative border-2 border-dashed border-blue-200 rounded-xl bg-gradient-to-br from-blue-50 to-slate-50 p-5 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500" />
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
              Número de Referencia
            </p>
            <p className="text-xl font-mono font-bold text-slate-800 tracking-wider mb-1">
              {caseId}
            </p>
            <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3 text-blue-400" />
              Guarde este número para dar seguimiento
            </p>
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full border-2 border-dashed border-blue-200" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full border-2 border-dashed border-blue-200" />
          </div>

          {/* Timeline */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              ¿Qué Sucede Ahora?
            </p>
            <div className="relative space-y-0">
              {[
                { icon: FileText, color: 'bg-blue-100 text-blue-600', title: 'Revisión de su Solicitud', desc: 'Un abogado senior analiza su caso.', time: 'Hoy' },
                { icon: Phone, color: 'bg-amber-100 text-amber-600', title: 'Contacto de un Especialista', desc: 'Le llamaremos al número proporcionado.', time: '24 hrs' },
                { icon: MessageSquare, color: 'bg-emerald-100 text-emerald-600', title: 'Evaluación Gratuita', desc: 'Analizamos sus opciones legales sin costo.', time: 'Esta semana' },
              ].map((s, i, arr) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${s.color}`}>
                      <s.icon className="w-4 h-4" />
                    </div>
                    {i < arr.length - 1 && <div className="w-0.5 h-6 bg-slate-200 my-1" />}
                  </div>
                  <div className="pb-4">
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

          {/* Confidencialidad */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-3">
            <Lock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 text-xs leading-relaxed">
              <strong>Confidencialidad garantizada.</strong> Su información está protegida por el
              privilegio abogado-cliente.
            </p>
          </div>

          <GovButton variant="primary" size="md" className="w-full justify-center" onClick={onReset}>
            Enviar Otra Solicitud
          </GovButton>
        </div>
      </div>
    </div>
  )
}

/* ─── MAIN APP ────────────────────────────────────────────────── */
export default function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors }
  } = useForm<FormData>()

  const STEPS = [
    { number: 1, title: 'Personal' },
    { number: 2, title: 'Migratorio' },
    { number: 3, title: 'Evaluación' }
  ]

  const nextStep = async () => {
    const fields: Record<number, (keyof FormData)[]> = {
      1: ['fullName', 'email', 'phone', 'state'],
      2: ['entryMethod', 'entryYear', 'hasAlienNumber', 'urgencyLevel'],
      3: ['currentlyWorking', 'financialResources', 'urgencyDescription']
    }
    const valid = await trigger(fields[currentStep])
    if (valid && currentStep < 3) {
      setCurrentStep(p => p + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(p => p - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      // Llamada al endpoint de Vercel (nuestra API oculta)
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      let result
      try {
        result = await res.json()
      } catch (e) {
        console.error('No se pudo parsear el JSON de Vercel', e)
        throw new Error('El servidor no devolvió una respuesta válida.')
      }

      if (!res.ok) {
        throw new Error(result.error || 'Error de conexión con el servidor')
      }

      // Si es exitoso, mostrar pantalla de éxito
      setShowSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error: any) {
      console.error('Error enviando formulario:', error)
      alert(`Hubo un error al enviar su solicitud: ${error.message}. Por favor, intente nuevamente.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setShowSuccess(false)
    setCurrentStep(1)
    reset()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen font-body bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/30">

      {/* ── Header del Bufete ── */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-md">
              <Scale className="w-5 h-5 text-amber-400" />
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold text-slate-900 text-base leading-none">Martinez &amp; Asociados</p>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase font-medium">Immigration Law Firm</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span className="font-semibold">Conexión Segura SSL</span>
          </div>
        </div>
      </header>

      {/* ── Contenido Principal ── */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {showSuccess ? (
          <SuccessScreen onReset={handleReset} />
        ) : (
          <>
            {/* Título del formulario */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-2">
                Evaluación de Caso Gratuita
              </h1>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Confidencial. Sin costo. Un abogado revisará su caso personalmente.
              </p>
            </div>

            {/* Badges de confianza */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {[
                { icon: Shield, text: 'Privilegio Abogado-Cliente' },
                { icon: Clock, text: 'Respuesta en 24h' },
                { icon: Lock, text: 'Datos Encriptados' },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-amber-700 bg-amber-50 border border-amber-200/60 rounded-full px-3 py-1">
                  <b.icon className="w-3 h-3" />
                  <span className="font-medium">{b.text}</span>
                </div>
              ))}
            </div>

            {/* Stepper */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-5 mb-5">
              <Stepper current={currentStep} steps={STEPS} />
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit(onSubmit)}>

              {/* ── PASO 1 ── */}
              {currentStep === 1 && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-slide-up">
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-5 sm:px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-sm">Información Personal</h2>
                      <p className="text-slate-400 text-xs">Datos básicos para contactarle</p>
                    </div>
                    <div className="ml-auto text-slate-500 text-xs font-mono">1 / 3</div>
                  </div>
                  <div className="p-5 sm:p-6 space-y-4">
                    <GovInput
                      label="Nombre Completo"
                      placeholder="Como aparece en su identificación"
                      icon={<User className="w-4 h-4" />}
                      error={errors.fullName?.message}
                      {...register('fullName', { required: 'Ingrese su nombre completo' })}
                    />
                    <GovInput
                      label="Correo Electrónico"
                      type="email"
                      placeholder="su@correo.com"
                      icon={<Mail className="w-4 h-4" />}
                      error={errors.email?.message}
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
                      {...register('state', { required: 'Seleccione su estado' })}
                    />
                  </div>
                </div>
              )}

              {/* ── PASO 2 ── */}
              {currentStep === 2 && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-slide-up">
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-5 sm:px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-sm">Estado Migratorio</h2>
                      <p className="text-slate-400 text-xs">Su situación actual</p>
                    </div>
                    <div className="ml-auto text-slate-500 text-xs font-mono">2 / 3</div>
                  </div>
                  <div className="p-5 sm:p-6 space-y-4">
                    <GovSelect
                      label="¿Cómo entró a los Estados Unidos?"
                      placeholder="Seleccione la opción que mejor aplica"
                      options={entryMethods}
                      error={errors.entryMethod?.message}
                      {...register('entryMethod', { required: 'Este campo es requerido' })}
                    />
                    <GovSelect
                      label="¿En qué año entró a EE.UU.?"
                      placeholder="Seleccione el año"
                      icon={<Calendar className="w-4 h-4" />}
                      options={yearOptions}
                      error={errors.entryYear?.message}
                      {...register('entryYear', { required: 'Este campo es requerido' })}
                    />
                    <GovSelect
                      label="¿Tiene número de registro (A-Number)?"
                      placeholder="Seleccione una opción"
                      options={alienNumberOptions}
                      error={errors.hasAlienNumber?.message}
                      {...register('hasAlienNumber', { required: 'Este campo es requerido' })}
                    />
                    <GovSelect
                      label="Nivel de urgencia de su caso"
                      placeholder="Seleccione el nivel"
                      icon={<AlertTriangle className="w-4 h-4" />}
                      options={urgencyOptions}
                      error={errors.urgencyLevel?.message}
                      {...register('urgencyLevel', { required: 'Este campo es requerido' })}
                    />
                  </div>
                </div>
              )}

              {/* ── PASO 3 ── */}
              {currentStep === 3 && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-slide-up">
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-5 sm:px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-sm">Evaluación Final</h2>
                      <p className="text-slate-400 text-xs">Últimos detalles para completar</p>
                    </div>
                    <div className="ml-auto text-slate-500 text-xs font-mono">3 / 3</div>
                  </div>
                  <div className="p-5 sm:p-6 space-y-4">
                    <GovSelect
                      label="¿Está trabajando actualmente?"
                      placeholder="Seleccione una opción"
                      icon={<Briefcase className="w-4 h-4" />}
                      options={workingOptions}
                      error={errors.currentlyWorking?.message}
                      {...register('currentlyWorking', { required: 'Este campo es requerido' })}
                    />
                    <GovSelect
                      label="Capacidad de inversión en servicios legales"
                      placeholder="Seleccione una opción"
                      options={financialOptions}
                      error={errors.financialResources?.message}
                      {...register('financialResources', { required: 'Este campo es requerido' })}
                    />
                    <div className="space-y-1.5">
                      <label className="label-premium">Describa Brevemente su Situación</label>
                      <textarea
                        rows={4}
                        placeholder="Cuéntenos sobre su situación migratoria actual y qué tipo de ayuda necesita..."
                        className="input-premium resize-none min-h-[110px]"
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
                      <p className="text-slate-500 text-xs leading-relaxed">
                        Al enviar este formulario, su información queda protegida por el privilegio abogado-cliente.
                        No compartiremos sus datos con terceros ni con autoridades de inmigración.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Navegación ── */}
              <div className="flex items-center justify-between mt-5 gap-4">
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
                    Siguiente
                    <ArrowRight className="w-4 h-4" />
                  </GovButton>
                ) : (
                  <GovButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isSubmitting}
                    className="min-w-[180px] justify-center"
                  >
                    {!isSubmitting && <CheckCircle className="w-4 h-4" />}
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                  </GovButton>
                )}
              </div>
            </form>
          </>
        )}
      </main>

      {/* ── Footer mínimo ── */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-400 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Martinez &amp; Asociados, PLLC. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-amber-500" />
            <span className="text-slate-400 text-xs">SSL Encriptado</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

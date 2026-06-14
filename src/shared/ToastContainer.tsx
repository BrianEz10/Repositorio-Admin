import useToastStore from '@/store/toastStore'

const ICONS: Record<string, string> = {
  success: 'check_circle',
  error: 'error',
  info: 'info',
}

const BG_CLASSES: Record<string, string> = {
  success: 'bg-green-600',
  error: 'bg-error',
  info: 'bg-primary',
}

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts)
  const removeToast = useToastStore((s) => s.removeToast)

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${BG_CLASSES[t.type]} text-on-primary px-4 py-3 shadow-xl flex items-center gap-3 animate-slide-in`}
        >
          <span className="material-symbols-outlined text-[20px]">{ICONS[t.type]}</span>
          <span className="text-label-md flex-1">{t.message}</span>
          <button
            type="button"
            onClick={() => removeToast(t.id)}
            className="text-on-primary/70 hover:text-on-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      ))}
    </div>
  )
}

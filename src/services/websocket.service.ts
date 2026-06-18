type WsEvent = 'PEDIDO_CONFIRMADO' | 'PEDIDO_EN_PREPARACION' | 'PEDIDO_ENTREGADO' | 'PEDIDO_CANCELADO'

export interface WsMessage {
  event: WsEvent
  data: Record<string, unknown>
}

type MessageHandler = (msg: WsMessage) => void

function wsBaseUrl(): string {
  const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1'
  const base = apiUrl.replace(/\/api\/v1\/?$/, '').replace(/^https?:\/\//, '')
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${protocol}//${base}`
}

class WebSocketService {
  private ws: WebSocket | null = null
  private handlers: Set<MessageHandler> = new Set()
  private retries = 0
  private maxRetries = 5
  private shouldReconnect = true
  private _isConnected = false
  private _onOpenCallback: (() => void) | null = null
  private _onCloseCallback: (() => void) | null = null

  get isConnected(): boolean {
    return this._isConnected
  }

  set onOpenCallback(cb: (() => void) | null) {
    this._onOpenCallback = cb
  }

  set onCloseCallback(cb: (() => void) | null) {
    this._onCloseCallback = cb
  }

  connect(): void {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) return

    const raw = localStorage.getItem('auth-storage')
    let token = ''
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        token = parsed?.state?.token ?? parsed?.token ?? ''
      } catch { /* noop */ }
    }
    if (!token) return

    const url = `${wsBaseUrl()}/api/v1/pedidos/ws?token=${token}`
    const ws = new WebSocket(url)
    this.ws = ws

    ws.onopen = () => {
      if (this.ws !== ws) return
      this.retries = 0
      this._isConnected = true
      this._onOpenCallback?.()
    }

    ws.onmessage = (event) => {
      if (this.ws !== ws) return
      try {
        const msg = JSON.parse(event.data) as WsMessage
        this.handlers.forEach((h) => h(msg))
      } catch { /* noop */ }
    }

    ws.onclose = () => {
      if (this.ws !== ws) return
      this.ws = null
      this._isConnected = false
      this._onCloseCallback?.()

      if (this.shouldReconnect && this.retries < this.maxRetries) {
        const delay = Math.min(1000 * 2 ** this.retries, 30000)
        this.retries++
        setTimeout(() => this.connect(), delay)
      }
    }

    ws.onerror = () => {
      ws.close()
    }
  }

  disconnect(): void {
    this.shouldReconnect = false
    this.ws?.close()
    this.ws = null
    this._isConnected = false
  }

  onMessage(handler: MessageHandler): () => void {
    this.handlers.add(handler)
    return () => this.handlers.delete(handler)
  }
}

export const wsService = new WebSocketService()

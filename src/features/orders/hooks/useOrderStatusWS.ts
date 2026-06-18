import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { wsService } from '@/services/websocket.service'
import useWsStore from '@/store/wsStore'

export function useOrderStatusWS() {
  const queryClient = useQueryClient()
  const { setStatus, setLastEvent } = useWsStore()

  useEffect(() => {
    wsService.onOpenCallback = () => setStatus('connected')
    wsService.onCloseCallback = () => setStatus('disconnected')
    wsService.connect()

    const unsubscribe = wsService.onMessage((msg) => {
      setLastEvent(msg.event ?? 'unknown')
      if (msg.event) {
        void queryClient.invalidateQueries({ queryKey: ['orders'] })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])
}

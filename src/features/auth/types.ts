export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: number
    nombre: string
    email: string
  }
  rol: 'admin' | 'empleado' | 'cajero'
}
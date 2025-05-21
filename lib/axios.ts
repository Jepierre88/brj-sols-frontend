import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { CONSTANTS } from '@/config/constants'

interface CustomAxiosConfig extends AxiosRequestConfig {
    customParam?: string
}

class AxiosClient {
    private instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            baseURL: CONSTANTS.API_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        })

        // Interceptor para agregar el parámetro personalizado
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // Aquí puedes agregar tu parámetro personalizado
                const customConfig = config as CustomAxiosConfig
                if (customConfig.customParam) {
                    config.params = {
                        ...config.params,
                        customParam: customConfig.customParam,
                    }
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        // Interceptor para manejar errores
        this.instance.interceptors.response.use(
            (response) => response,
            (error) => {
                // Manejo de errores personalizado
                if (error.response) {
                    // El servidor respondió con un código de estado fuera del rango 2xx
                    console.error('Error de respuesta:', error.response.data)
                } else if (error.request) {
                    // La petición fue hecha pero no se recibió respuesta
                    console.error('Error de petición:', error.request)
                } else {
                    // Algo sucedió al configurar la petición
                    console.error('Error:', error.message)
                }
                return Promise.reject(error)
            }
        )
    }

    // Método para hacer peticiones GET
    async get<T>(url: string, config?: CustomAxiosConfig): Promise<T> {
        const response = await this.instance.get<T>(url, config)
        return response.data
    }

    // Método para hacer peticiones POST
    async post<T>(url: string, data?: any, config?: CustomAxiosConfig): Promise<T> {
        const response = await this.instance.post<T>(url, data, config)
        return response.data
    }

    // Método para hacer peticiones PUT
    async put<T>(url: string, data?: any, config?: CustomAxiosConfig): Promise<T> {
        const response = await this.instance.put<T>(url, data, config)
        return response.data
    }

    // Método para hacer peticiones DELETE
    async delete<T>(url: string, config?: CustomAxiosConfig): Promise<T> {
        const response = await this.instance.delete<T>(url, config)
        return response.data
    }
}

// Exportar una instancia única del cliente
export const axiosClient = new AxiosClient() 
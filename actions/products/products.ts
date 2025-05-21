import { CONSTANTS } from "@/config/constants"
import { createApi } from "@/lib/api"
import { Product } from "@/types/Products"
import { AxiosError } from "axios"





export const getProducts = async ({
    page = 1,
    limit = 10,
    search = "",
}): Promise<{
    meta: {
        total: number
        page: number
        limit: number
    }
    data: Product[]
}> => {
    try {
        const api = await createApi()
        const response = await api.get(`${CONSTANTS.API_URL}/products`, {
            params: {
                page,
                limit,
                search,
            },
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data)
            return {
                meta: {
                    total: 0,
                    page: 1,
                    limit: 10,
                },
                data: []
            }
        }
        return {
            meta: {
                total: 0,
                page: 1,
                limit: 10,
            },
            data: []
        }
    }
    // return {
    //     meta: {
    //         total: 0,
    //         page: 1,
    //         limit: 10,
    //     },
    //     data: [
    //         {
    //             id: "1",
    //             name: "Product 1",
    //             price: 100,
    //             description: "Description 1",
    //             image: "Image 1",
    //         },
    //         {
    //             id: "2",
    //             name: "Product 2",
    //             price: 200,
    //             description: "Description 2",
    //             image: "Image 2",
    //         }
    //     ]
    // }
}
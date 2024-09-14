export type Guitarras = {
    id:          number
    name:        string
    image:       string
    description: string
    price:       number
}

export type GuitarraItem = Guitarras & {
    cantidad: number
}
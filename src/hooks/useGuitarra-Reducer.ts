import { GuitarraItem, Guitarras } from "../types";

export type GuitarraAction = 
  { type: 'agregar-guitarra', payload: { guitarra: Guitarras }} |
  { type: 'incrementar', payload: { id: Guitarras['id'] }} |
  { type: 'decrementar', payload: { id: Guitarras['id'] }} |
  { type: 'remover-item', payload: { id: Guitarras['id'] }} |
  { type: 'remover'} 


export type GuitarraState = {
    guitarra: GuitarraItem[]
}

const inicial = () => {
    const localGuitarra = localStorage.getItem('guitarra');
    return localGuitarra ? JSON.parse(localGuitarra): []
}

export const initialState: GuitarraState = {
    guitarra: inicial()
}

export const useGuitarraReducer = (state: GuitarraState = initialState, action: GuitarraAction) => {

    if (action.type === 'agregar-guitarra') {
        
        const existe = state.guitarra.find(item => item.id === action.payload.guitarra.id);
        let actualizar:GuitarraItem[] = [];

        if (existe) {

            actualizar = state.guitarra.map(item => {
                if (item.id === action.payload.guitarra.id) {
                    if(item.cantidad < 5){
                        return{
                            ...item,
                            cantidad: item.cantidad + 1
                        }
                    }else{
                        return item
                    }
                }else{

                    return item
                }
            })
            
        }else{
            const newValor = {...action.payload.guitarra, cantidad: 1 }
            actualizar = [...state.guitarra, newValor];
        }

        return{
            ...state,
            guitarra: actualizar
        }
    }

    if (action.type === 'incrementar') {
        
        let actualizar:GuitarraItem[] = [];
        actualizar = state.guitarra.map(item => {
            if (item.id === action.payload.id) {
                if (item.cantidad < 5 ) {
                    return {...item, cantidad: item.cantidad + 1}
                }
                return item
            }
            return item
        })

        return{
            ...state,
            guitarra: actualizar
        }
    }

    if (action.type === 'decrementar') {
        
        let actualizar:GuitarraItem[] = [];
        actualizar = state.guitarra.map(item => {
            if (item.id === action.payload.id) {
                if (item.cantidad > 1 ) {
                    return {...item, cantidad: item.cantidad - 1}
                }
                return item
            }
            return item
        })

        return{
            ...state,
            guitarra: actualizar
        }
    }

    if(action.type === 'remover-item'){

        return{
            ...state,
            guitarra: state.guitarra.filter(item => item.id !== action.payload.id)
        }
    }

    if (action.type === 'remover') {
        
        return{
            ...state,
            guitarra: []
        }
    }

    return state

}
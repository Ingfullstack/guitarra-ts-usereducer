import { useEffect, useReducer, useState } from "react"
import Header from "./components/Header"
import ListadoGuitarras from "./components/ListadoGuitarras"
import { db } from "./data/db";
import { Guitarras } from "./types";
import { initialState, useGuitarraReducer } from "./hooks/useGuitarra-Reducer";


function App() {

  const [state, dispatch] = useReducer(useGuitarraReducer, initialState)
  const [data, setData] = useState<Guitarras[]>([]);


  useEffect(()=> {
    setData(db)
  },[])

  useEffect(() => {
    localStorage.setItem('guitarra',JSON.stringify(state.guitarra))
  },[state])

  return (
    <>
      <Header state={ state.guitarra } dispatch={ dispatch }/>

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            { data.map(item => (
              <ListadoGuitarras key={ item.id } item={ item } dispatch={ dispatch }/>
            ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App

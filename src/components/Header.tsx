import { Dispatch, useMemo } from "react";
import { GuitarraItem } from "../types";
import { GuitarraAction } from "../hooks/useGuitarra-Reducer";

type Props = {
  state: GuitarraItem[];
  dispatch: Dispatch<GuitarraAction>
};

export default function Header({ state, dispatch }: Props) {

  const totalPagar = useMemo(() => {
    return state.reduce((total,item) => total + ( item.cantidad * item.price ),0)
  },[state])

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {state.length === 0 ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.map((item) => (
                          <tr key={ item.id }>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${ item.image }.jpg`}
                                alt="imagen guitarra"
                              />
                            </td>
                            <td>{ item.name }</td>
                            <td className="fw-bold">${ item.price }</td>
                            <td className="flex align-items-start gap-4">
                              <button onClick={ () => dispatch({ type: "decrementar", payload: { id: item.id }})} type="button" className="btn btn-dark">
                                -
                              </button>
                              { item.cantidad }
                              <button onClick={ () => dispatch({ type: "incrementar", payload: { id: item.id }})} type="button" className="btn btn-dark">
                                +
                              </button>
                            </td>
                            <td>
                              <button onClick={ () => dispatch({ type: "remover-item", payload: { id: item.id }})} className="btn btn-danger" type="button">
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-end">
                      Total pagar: <span className="fw-bold">${ totalPagar }</span>
                    </p>
                    <button onClick={ () => dispatch({ type: "remover" })} className="btn btn-dark w-100 mt-3 p-2">
                      Vaciar Carrito
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

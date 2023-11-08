import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <div className=" text-white flex flex-col justify-center items-center w-full h-screen">
        <h1 className="font-bold text-4xl mb-4 ">Pagina não encontrada</h1>
        <p><Link className="italic text-1xl bg-blue-500 rounded-md py-1 px-4" to="/">Voltar para a página principal</Link></p>
    </div>
  )
}

import { Link ,useNavigate} from "react-router-dom"
import {Input} from "../../components/input"
import {useState,FormEvent} from "react"
import {auth} from "../../services/firebaseConnection"
import {signInWithEmailAndPassword} from "firebase/auth"

export const Login = () => {
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")
  const navigate=useNavigate()

  const handleSubmit=(e:FormEvent)=>{
    e.preventDefault();
    if (email===""|| password===""){
      alert("Preencha todos os campos")
    }
    signInWithEmailAndPassword(auth,email,password)
    .then(()=>{
      console.log("Logado com sucesso!")
      navigate("/admin",{replace:true})
    }).catch((error)=>{
      if (error.code==="auth/invalid-login-credentials"){
        alert("Usuário não encontrado")
      }
      console.log("error")
      console.log(error.code)
    })
  }

  return (
    <div className=" flex w-full h-screen items-center justify-center flex-col">
        <Link to={"/"}>
          <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev
            <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-1">
          <Input type="email" value={email} placeholder="Digite seu e-mail..." onChange={(e)=>setEmail(e.target.value)}/>
          <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Digite sua senha..."/>
          <button type="submit" className="h-9 bg-blue-600 rounded border-0 text-lg text-white font-medium">Acessar</button>
        </form>
        
    </div>
  )
}

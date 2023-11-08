import {auth} from "../services/firebaseConnection"
import {onAuthStateChanged} from "firebase/auth"
import {ReactNode,useEffect,useState} from 'react'
import { Navigate } from "react-router-dom"



interface PrivateProps{
    children:ReactNode;
}
export const Private = ({children}:PrivateProps):any => {
    const [loading,setLoading]=useState(true)
    const [signed,setSigned]=useState(false)
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            if(user){
                const userData={
                   uid:user?.uid,
                   email: user?.email
                }
                localStorage.setItem("@reactlinks",JSON.stringify(userData))
                setLoading(false)
                setSigned(true)
            }else{
                setLoading(false)
                setSigned(false)
                console.log("Não tem usuario")
            }
        })
        return (()=>{
            unsub()
        })
    },[])

    if (loading){
        return <div>Carregando...</div>
    }
    if (!signed){
        return <Navigate to="/login"/>
    }
    return children
}

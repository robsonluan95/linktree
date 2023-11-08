import {useState , FormEvent,useEffect} from "react"


//Firebase
import { db } from "../../services/firebaseConnection"
import { doc,setDoc,getDoc } from "firebase/firestore"

//Componentes
import {Header} from "../../components/header"
import { Input } from "../../components/input"


export const Networks = () => {

  const [facebook,setFacebook]=useState("")
  const [instagram,setInstagram]=useState("")
  const [youtube,setYoutube]=useState("")
  function handleRegister(e:FormEvent){
    e.preventDefault();
    setDoc(doc(db,"social","link"),{
      facebook : facebook,
      instagram : instagram,
      youtube : youtube
    }).then(()=>{
      console.log("Cadastrado com Sucesso")

    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    function loadLinks(){
      const docRef=doc(db,"social","link")

      getDoc(docRef)
      .then((snapshot)=>{

        if (snapshot.data()!==undefined){
          setFacebook(snapshot.data()?.facebook)
          setInstagram(snapshot.data()?.instagram)
          setYoutube(snapshot.data()?.youtube)
        }
      }).catch((error)=>{
        console.log(error)
      })
    }
    loadLinks();
  },[])

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
        <Header/>
        <h1 className="text-white text-2xl font-medium mt-8 mb-4" >Minhas Redes sociais</h1>
        <form onSubmit={handleRegister} className="flex flex-col max-w-xl w-full ">
          <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
          <Input type="url" placeholder="Digite a url do FaceBook" value={facebook} onChange={(e)=>setFacebook(e.target.value)}/>

          <label className="text-white font-medium mt-2 mb-2">Link do instagram</label>
          <Input type="url" placeholder="Digite a url do Instagram" value={instagram} onChange={(e)=>setInstagram(e.target.value)}/>
          
          <label className="text-white font-medium mt-2 mb-2">Link do Youtube</label>
          <Input type="url" placeholder="Digite a url do Youtube" value={youtube} onChange={(e)=>setYoutube(e.target.value)}/>
          <button type="submit" className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 mt-5 font-medium">
            Salvar links
          </button>
        </form>

        {}
    </div>
  )
}

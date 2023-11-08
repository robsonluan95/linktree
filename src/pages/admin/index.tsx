import {FormEvent, useState,useEffect} from "react"

//Icons
import {FiTrash} from "react-icons/fi"

//Componentes
import { Input } from "../../components/input"
import { Header } from "../../components/header"

//FireBase
import {db} from "../../services/firebaseConnection"
import {addDoc,collection,onSnapshot,query,orderBy,doc,deleteDoc} from "firebase/firestore"


//Interface
interface ListaProps{
  id:string;
  nome:string;
  url:string;
  color:string;
  bg:string;
}


export const Admin = () => {
  const [nameInput,setNameInput]=useState("")
  const [urlInput,setUrlInput]=useState("")
  const [textColorInput,setTextColorInput]=useState("#f1f1f1")
  const [backgroundColorInput,setbackgroundColorInput]=useState("#121212")
  const [listaLinks,setListaLinks]=useState<ListaProps[]>([])

  useEffect(()=>{
    const linksRef= collection(db,"links")
    const queryRef=query(linksRef,orderBy("created","asc"))

    const unsub=onSnapshot(queryRef,(snapshot)=>{
      let lista=[] as ListaProps[];

      snapshot.forEach((doc)=>{
        lista.push({
          id: doc.id,
          nome:doc.data().nome,
          url:doc.data().url,
          color:doc.data().color,
          bg:doc.data().bg

        })
      })
      setListaLinks(lista)
    })
    return ()=>{
      unsub();
    }
  },[])

function handleRegister(e:FormEvent) {
    e.preventDefault();
    if (nameInput===""|| textColorInput===""){
      alert("Preencha todos os componentes!")
      return;
    }
      addDoc(collection(db,"links"),{
        nome:nameInput,
        url:urlInput,
        bg:backgroundColorInput,
        color:textColorInput,
        created:new Date(),
      }).then(()=>{
        alert("Cadastrado com sucesso")
        setNameInput("")
        setUrlInput("")
      }).catch((error)=>{
        console.log('Error adding document: ', error.message);

      })
      
      
  }
  async function handleDeleteLink(id:string){
    const docRef=doc(db,"links",id)
    await deleteDoc(docRef )
  }

  return (
    <div className="flex flex-col  items-center w-full min-h-screen pb-7 px-2 ">
        <Header/>

        <form className="flex flex-col mt-3 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
          <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
          <Input
            placeholder="Digite o Link ..."
            value={nameInput}
            onChange={(e)=>{setNameInput(e.target.value)}}
          />
          <label className="text-white font-medium mt-2 mb-2">Url do Link</label>
          <Input
            type="url"
            placeholder="Digite a Url ..."
            value={urlInput}
            onChange={(e)=>{setUrlInput(e.target.value)}}
          />
          <section className="flex my-4 gap-5 ">
            <div className="flex gap-2">
              <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>
              <Input type="color" value={textColorInput} onChange={(e)=>setTextColorInput(e.target.value)}/>
            </div>
            <div className="flex gap-2">
              <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
              <Input type="color" value={backgroundColorInput} onChange={(e)=>setbackgroundColorInput(e.target.value)}/>
            </div>
          </section>
          {nameInput!=="" && (
            <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
              <label className="text-white font-medium mt-2 mb-2 ">Veja como está ficando:</label>
              <article 
                  className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                  style={{marginBottom:8,marginTop:8,backgroundColor:backgroundColorInput}}
                >
                <p className="font-medium" style={{color:textColorInput}}>{nameInput}</p>
              </article>
            </div>
          )}
          

          <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white gap-4 flex justify-center items-center">
            Cadastrar
          </button>
        </form>

        <h2 className="font-bold text-white mb-4 text-2xl" >Meus Links</h2>
        {listaLinks.map((link)=>(

            <article key={link.id} className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
            style={{backgroundColor:link.bg, color:link.color}}
            >
            <p>{link.nome}</p>
            <div>
              <button className="border border-dashed p-1 rounded" onClick={()=>handleDeleteLink(link.id)}>
                <FiTrash size={18} color="white"/>
              </button>
            </div>
            
          </article>
        ))}
    </div>
  )
}

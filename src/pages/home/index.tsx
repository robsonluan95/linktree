import {useState,useEffect} from "react"


import {Social} from "../../components/social"
import {FaFacebook,FaInstagram,FaUnderline,FaYoutube} from "react-icons/fa"

//FireBase
import {db} from "../../services/firebaseConnection"
import { Firestore,getDocs,collection,orderBy,query,getDoc ,doc} from "firebase/firestore"

//Interface
interface ListaProps{
  id:string;
  nome:string;
  url:string;
  color:string;
  bg:string;
}
interface SocialLinksProps{
  facebook:string;
  youtube:string;
  instagram:string;
}

export const Home = () => {
  const [links,setLinks]=useState<ListaProps[]>([])
  const [socialLinks,setSocialLinks]=useState<SocialLinksProps>()

  useEffect(()=>{
    function loadlinks(){
      const linksRef=collection(db,"links")
      const queryRef=query(linksRef,orderBy("created","asc"))

      getDocs(queryRef)
      .then((snapshot)=>{
        let lista= [] as ListaProps[];
        snapshot.forEach((doc)=>{
          lista.push({
            id:doc.id,
            nome:doc.data().nome,
            url:doc.data().url,
            color:doc.data().color,
            bg:doc.data().bg
          })
        })
        setLinks(lista)
      }).catch((error)=>{
        console.log(error)
      })
    }
    loadlinks()
  },[])

  useEffect(()=>{
    function loadRedesSocias(){
      const docRef=doc(db,"social","link")
      getDoc(docRef)
      .then((snapshot)=>{
        if (snapshot!==undefined){
          setSocialLinks({
            facebook:snapshot.data()?.facebook,
            youtube:snapshot.data()?.youtube,
            instagram:snapshot.data()?.instagram
          })
        }
      }).catch((error)=>{
        console.log(error)
      })
    }
    loadRedesSocias()
  },[])
  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className=" text-3xl md:text-4xl font-bold text-white mt-20" >Robson Luan</h1>
      <span className=" text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link)=>(
          <section key={link.id} className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
            style={{backgroundColor:`${link.bg}`,color:`${link.color}`}}
          >
          <a href={link.url} target="_blank">
            <p className="md:text-lg text-base">{link.nome}</p>
          </a>
        </section>
        ))}
        {socialLinks&& Object.keys(socialLinks).length>0&&(
          
          <footer className="flex flex-col justify-center gap-3 my-4 text-white">
            <div className="flex justify-center gap-3 my-2">
            <Social url={socialLinks.facebook} >
                <FaFacebook size={35}  color="white"/>
            </Social>
            <Social url={socialLinks.youtube} >
                <FaYoutube size={35}  color="white"/>
            </Social>
            <Social url={socialLinks.instagram} >
                <FaInstagram size={35}  color="white"/>
            </Social>
            </div>
            
            
            © {new Date().getFullYear()} Por Robson Luan
          </footer>
        )}
      </main>
    </div>
  )
}

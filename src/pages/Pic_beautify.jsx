import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {UilImagePlus, UilTimes, UilCheck} from '@iconscout/react-unicons'
import './pic.css';
import React, { useState } from "react";
import {CapsuleTabs} from "antd-mobile";
import {useHistory} from "react-router-dom";

const Pic: React.FC = () => {
    const [image, setImage] = useState(null);
    const [id,setId] = useState(0)
    const photo = localStorage.getItem('pic');
    const [save,setSave] = useState(false);
    const history = useHistory()
    const img = [
       "https://st2.depositphotos.com/1813957/6715/i/950/depositphotos_67152987-stock-photo-original-written-on-chalkboard.jpg" ,
       "https://static.bangkokpost.com/media/content/20211028/c1_2205703.jpg" ,
       "https://gw.alicdn.com/imgextra/i1/134348404/O1CN01smnVej2Bx5H58RztG_!!134348404.jpg_Q75.jpg_.webp",
       "https://qnam.smzdm.com/202204/25/6266403af244f1626.jpg_e1080.jpg",
       "https://watermark.lovepik.com/photo/20211210/large/lovepik-summer-wearing-jk-uniform-cute-girl-image-picture_501765122.jpg",
       "https://obs.line-scdn.net/0hISa2_kt-FnxcSz5BXftpK2UdGg1vLwN6MjNeHXlIHBskfU0sZH4JBnwcShhtKFZ_MjEOHX5OHEh1K1Z_aXo",
       "https://n.sinaimg.cn/sinacn10014/492/w1080h1012/20200103/f914-imrkkfx2534160.jpg",
       "https://n.sinaimg.cn/fashion/crawl/476/w550h726/20220601/972a-8e7a2abbb9db728d4e9c47921eb9cca2.jpg",
       "https://p6.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/66f9d9f4a34b4352a5893c95459b210e?from=pc",
       "https://i0.sinaimg.cn/fashion/cr/2014/1031/4189334250.jpg"
    ]
    const filter=[
        "",
        "brightness(120%)",
        "brightness(105%) contrast(110%) saturate(70%) sepia(5%)",
        "brightness(105%) contrast(120%) saturate(120%) blur(.5px)",
        "brightness(105%) contrast(110%) saturate(125%)",
        "brightness(105%) contrast(95%) saturate(105%)",
        "brightness(105%) contrast(110%) saturate(110%) sepia(20%) hue-rotate(10deg) ",
        "brightness(110%) contrast(95%) saturate(90%) sepia(10%)",
        "brightness(110%) contrast(105%) saturate(115%) sepia(15%)",
        "brightness(100%) contrast(120%) saturate(80%) sepia(20%)"
    ]

    const Save=()=>{
        localStorage.setItem('filter',filter[id])
        history.push('/Cost')
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div style={{width: "5rem"}}><UilImagePlus style={{color: "#D2AC19"}}/></div>
                    <IonTitle className="title2">Beautify</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div style={{backgroundColor:"black",height:"100%"}}>
                <div style={{width:"95%"}}>
                    {save==true?
                        <button style={{backgroundColor:"white",borderRadius:"20px",width:"3rem",height:"1.5rem",float:"right",position:"relative",left:"5%",top:".2rem"}} onClick={()=>Save(id)}>save</button>
                        :null}
                    {image && <img src={image} alt="captured" style={{margin:".5rem"}}/>}
                    {photo && <img src={photo} alt="camera result" style={{margin:".5rem",filter:`${filter[id]}`}}/>}
                </div>
                {save===false?
                <div className="modify">
                  <div className="head">
                   <UilTimes color="white" onClick={()=>setSave(!save)} style={{cursor:"pointer"}}/>
                   <UilCheck color="white" onClick={()=>setSave(!save)} style={{cursor:"pointer"}}/>
                  </div>
                </div>:null}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Pic;

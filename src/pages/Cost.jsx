import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Cost.css';
import {UilFacebook, UilImagePlus, UilInstagram, UilMessage, UilWhatsapp} from "@iconscout/react-unicons";
import React, {useState} from "react";


const Cost: React.FC = () => {
    const filter = localStorage.getItem("filter")
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <div style={{width: "5rem"}}><UilImagePlus style={{color: "#D2AC19"}}/></div>
                        <IonTitle className="title2">Save</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                <div style={{height:"40%",width:"100%",backgroundImage:`url(${Image})`}}>
                    <div className="cart1">
                        <div className="cart">
                        <img src={localStorage.getItem("pic")} alt=""
                             style={{width: "10rem", height: "6.5rem", alignSelf: "stretch", marginTop: "1%",filter:`${filter}`,borderRadius:"20px"}}/>
                        <div style={{alignSelf: "stretch", marginLeft: ".5rem",marginTop:"2%"}}>
                            <button style={{width:"10rem",height:"2rem",backgroundColor:"#F16B6B",color:"white",borderRadius:"25px",fontWeight:"bold"}}>Beautify one more</button>
                            <div> <button style={{width:"10rem",height:"2rem",backgroundColor:"#F16B6B",color:"white",borderRadius:"25px",marginTop:"15%",fontWeight:"bold"}}>home</button> </div>
                            <h5 style={{marginBottom: "2px"}}>  </h5>
                        </div>
                        </div>
                        <h6 style={{marginTop: "8px"}}>share to:</h6>
                        <div style={{display:"flex",marginLeft:".5rem",marginTop:"1rem",justifyContent:"space-around"}}>
                            <UilMessage className="icon1"/>
                            <UilWhatsapp className="icon1"/>
                            <UilInstagram className="icon1"/>
                            <UilFacebook className="icon1"/>
                        </div>
                    </div>
                    <div>
                        <img src="https://ton.org/images/snippets/join_the_community.png" style={{width:"100%",height:"100%",margin:"0 auto",marginTop:"1rem",borderRadius:"15px"}}/>
                        <img src="https://img.my-best.tw/contents/2037b12ddb8dc4d8c64c75daec24631d.png?ixlib=rails-4.3.1&q=70&lossless=0&w=1200&h=900&fit=crop&s=8f6f5a7b35dac3c4539d375288371b97" style={{width:"20%",height:"10%",left:"60%",top:"63%",position:"absolute",zIndex:"99",borderRadius:"25px"}}/>
                    </div>
                </div>
                </IonContent>
            </IonPage>
        )
    }

export default Cost;

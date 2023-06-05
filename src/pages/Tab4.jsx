import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab4.css';
import {UilAngleLeftB,UilAngleRightB} from '@iconscout/react-unicons'
import { Divider } from 'antd-mobile'
import image from "../components/img.png";
import {
    UnorderedListOutline,
    PayCircleOutline,
    SetOutline,
} from 'antd-mobile-icons'
import {useHistory} from "react-router-dom";

const Tab4: React.FC = () => {
    const history = useHistory()
    const jump=(key)=>{
        console.log(key)
        if(key==0) {
            history.push('/bill')
        }
        if(key==1){
            history.push('/Cost')
        }
        if(key==2){
            history.push('/Card')
        }
    }
    const length = localStorage.getItem('length')
    const arr = []
    for(let i=0;i<=length;i++){
        arr.push(i)
    }
    console.log(arr)
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar class="bar">
                    <div style={{width:"5rem"}}><UilAngleLeftB style={{color:"#D2AC19",cursor:'pointer'}}/></div>
                    <IonTitle class="title4">User</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <img className="card1" src={image} alt="" style={{width:'10rem',height:'10rem',borderRadius:'50%'}}/>
                <div className="form4">
                    <h6 style={{marginLeft:'.7rem'}}>Name:      xkong</h6>
                    <div style={{marginLeft:'.7rem'}}>
                    <div style={{fontSize:'1rem',marginBottom:'2rem',cursor:'pointer'}} onClick={()=>jump(0)}><span><UnorderedListOutline />bill</span>< UilAngleRightB style={{position:'relative',left:'91%',top:'7%',fontSize:'1rem'}}/></div>
                    <Divider style={{marginTop:'-1.5rem'}}></Divider>
                    <div style={{fontSize:'1rem',marginBottom:'2rem',cursor:'pointer'}} onClick={()=>jump(1)}><span><PayCircleOutline />order</span>< UilAngleRightB style={{position:'relative',left:'84.5%',top:'6px',fontSize:'1rem'}}/></div>
                    <Divider style={{marginTop:'-1.5rem'}}></Divider>
                    <div style={{fontSize:'1rem',marginBottom:'2rem',cursor:'pointer'}} onClick={()=>jump(2)}><span><SetOutline/>card</span>< UilAngleRightB style={{position:'relative',left:'86%',top:'6px',fontSize:'1rem'}}/></div>
                    <Divider style={{marginTop:'-1.5rem'}}></Divider>
                    </div>
                </div>
                <h4 style={{marginLeft:'13%'}}>save:</h4>
                <div style={{marginTop:'2rem',marginLeft:'13%'}}>
                    {   arr.map((id,num)=>(
                        <img src={localStorage.getItem(`save${num}`)} alt="" style={{width:'8rem',height:'7rem',marginRight:'2rem',borderRadius:'25px'}}/>
                    ))
                    }
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Tab4;

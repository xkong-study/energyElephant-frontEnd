import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Bill.css';
import coffee from "../components/coffee.png"
import { Calendar } from 'antd-mobile'
import { UilAngleDown, UilAngleUp, UilReceipt,UilAngleLeft } from '@iconscout/react-unicons'
import {useState} from "react";
import {useHistory} from "react-router-dom";

const Bill: React.FC = () => {
    const day = new Date().getDate()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    const date = year+'-'+month+'-'+day
    const defaultSingle = new Date(date)
    const [icon, setIcon] = useState(true);
    const [value,setValue] = useState(date)
    const history = useHistory()
    const changeState=()=>{
        setIcon(!icon)
    }
    const back=()=>{
        history.go(-1);
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="bar_bill">
                     <UilAngleLeft style={{width:'2rem',height:'2rem',color:'#FDCD38',cursor:'pointer'}} onClick={back}/>
                    <IonTitle class="title5">Bill</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <img src={coffee} alt="" style={{width:'100%',height:'20%',position:"absolute",borderRadius:'0 0 25px 25px'}}/>
                <div className="glass">
                    <p style={{textIndent:'2rem',fontWeight:'bold'}}>This month payment(euro)</p>
                    <h4 style={{textIndent:'2rem'}}>€80</h4>
                </div>
                <h4 style={{textIndent:'2rem',top:'2rem',position:'relative',fontWeight:'bold',marginBottom:'2rem'}}>Bill Detail</h4>
                <h4 style={{marginLeft:'2rem',marginTop:'1.5rem'}} onClick={changeState}>{value}<span>{icon?<UilAngleDown style={{position:'relative',top:'.5rem'}}/>:<UilAngleUp style={{position:'relative',top:'.5rem'}}/>}</span></h4>
                { icon?
                    <div style={{border:'2rem black',width:'20rem',height:'25rem',backgroundColor:'#FFEEF6',margin: '10px auto',borderRadius:'25px'}}>
                    <Calendar
                        selectionMode='single'
                        defaultValue={defaultSingle}
                        onChange={val => {
                            const day = val.getDate()
                            const month = val.getMonth()
                            const year = val.getFullYear()
                            const date = year+'-'+month+'-'+day
                            setValue(date)
                            setIcon(false)
                        }}
                        style={{width: '20rem', height: '15rem',borderRadius:'25px'}}
                    />
                    </div>:null}
                <div style={{display:'flex',marginLeft:'2rem',marginTop:'1rem',justifyContent:'space-between'}}>
                <UilReceipt style={{width:'2rem',height:'2rem'}}/>
                <h4 style={{margin:'0rem',marginLeft:'-10rem'}}>coffee</h4>
                <h4 style={{margin:'0rem',marginRight:'2rem'}}>€{localStorage.getItem('cost')}</h4>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Bill;

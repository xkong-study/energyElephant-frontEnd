import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import {UilAngleLeftB, UilCreditCard, UilUser} from '@iconscout/react-unicons'
import {Button, Input, Result} from "antd-mobile";
import {useState} from "react"
import {SmileOutline} from "antd-mobile-icons";
import {useHistory} from "react-router-dom";

const Card: React.FC = () => {
    const [pay,setPay] = useState(false)
    const history = useHistory()
    const submit=()=>{
        history.push('/tab3')
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar class="bar">
                    <div style={{width:"5rem"}}><UilAngleLeftB style={{color:"#D2AC19"}}/></div>
                    <IonTitle class="title">Add your card</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <img class="card1" src="https://t4.ftcdn.net/jpg/02/88/19/51/360_F_288195176_byYDO2Zo7sJaYgqmPKUjEtIqlfmYHZfj.jpg" alt=""/>
                <div class="form">
                    <h6>Card Holder Name</h6>
                    <h6>
                        {localStorage.getItem('user')}
                    </h6>

                    <h6>Card Number</h6>
                    <h6>
                        {localStorage.getItem('number')}
                    </h6>
                    <Button style={{width:'100%',height:'100%',borderRadius:'25px',marginTop:'3rem',backgroundColor:'#8E7321',color:'white',textAlign:'center'}} onClick={submit}>ChangeCard</Button>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Card;

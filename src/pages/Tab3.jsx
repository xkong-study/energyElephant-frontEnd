import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import {UilAngleLeftB, UilCreditCard, UilUser} from '@iconscout/react-unicons'
import {Button, Input, Result} from "antd-mobile";
import {useState} from "react"
import {SmileOutline} from "antd-mobile-icons";

const Tab3: React.FC = () => {
  const [value, setValue] = useState('')
  const [number, setNumber] = useState('')
  const [pay,setPay] = useState(false)
  const submit=()=>{
      setPay(!pay)
      localStorage.setItem('number',number)
      localStorage.setItem('user',value)
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
              {
                  pay==true?
                      <Result
                          icon={<SmileOutline />}
                          status='success'
                          title='Bind Success'
                      />:null
              }
          <h6>Card Holder Name</h6>
              <div class="box">
              <Input
                  placeholder="Enter your name"
                  value={value}
                  onChange={val => {
                      setValue(val)
                  }}
              />
              <UilUser style={{color: "#9c9c9c",position:"absolute",width:"1.1rem",height:"1.1rem",marginLeft:".5rem",marginTop:".8rem"}} />
              </div>

          <h6>Card Number</h6>
              <div className="box">
                  <Input
                      placeholder="0000 0000 0000 0000"
                      value={number}
                      onChange={val => {
                          setNumber(val)
                      }}
                  />
                  <UilCreditCard style={{
                      color: "#9c9c9c",
                      position: "absolute",
                      width: "1.1rem",
                      height: "1.1rem",
                      marginLeft: ".5rem",
                      marginTop: ".9rem"
                  }}/>
              </div>
              <Button style={{width:'100%',height:'100%',borderRadius:'25px',marginTop:'3rem',backgroundColor:'#8E7321',color:'white',textAlign:'center'}} onClick={submit}>Bind</Button>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;

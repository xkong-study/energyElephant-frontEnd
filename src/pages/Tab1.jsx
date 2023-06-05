import {IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import { FloatingPanel, List } from 'antd-mobile'
import './Tab1.css';
import {CapsuleTabs} from 'antd-mobile'
import Coffee from "../components/coffee"
import {RootState} from "../store";
import {useSelector} from "react-redux";
import { UilUpload,UilCamera } from '@iconscout/react-unicons'
import { useHistory } from "react-router-dom"
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import TimerComponent from "../components/time";
import {useState} from "react";



const imags = [
    {
        word:"April 2023 News Roundup",
        img:"https://blog.energyelephant.com/content/images/size/w2000/2023/04/weekly_energy_news_3.jpg",
    },
    {
        word:"February 2023 News Roundup",
        img:"https://blog.energyelephant.com/content/images/size/w2000/2023/02/weekly_energy_news_2.jpg",
    },
    {
        word:"January 2023 News Roundup",
        img:"https://blog.energyelephant.com/content/images/size/w2000/2023/01/weekly_energy_news_1.jpg",
    },
    {
        word:"The CFO’s Role in ESG Strategy",
        img:"https://blog.energyelephant.com/content/images/size/w2000/2022/08/esg_strategy.jpg"
    }
]
const recommendation=[
    {
        word:"How We Spread Out Fuel Use Over Delivery Dates For More Accurate Reporting",
        img:"https://blog.energyelephant.com/content/images/size/w2000/2022/09/fuel_delivery_dates.jpg"
    },
    {
        word:"How to Share Data Easily with EnergyElephant",
        img:"https://blog.energyelephant.com/content/images/size/w2000/2022/05/sharing_data.jpg"
    },
    {
        word:"Data Audit Page Guide",
        img:"https://blog.energyelephant.com/content/images/size/w2000/2022/05/feature_data_audit.jpg"
    },
    {
        word:"How To Calculate Carbon Emissions From Flights",
        img:"https://blog.energyelephant.com/content/images/size/w2000/2022/04/emissions_from_flights-1.jpg"
    }
]

const Tab1: React.FC = () => {
    const key = useSelector((state:RootState)=>state.user.click)
    const anchors = [window.screen.height*0.3, window.screen.height * 0.3, window.screen.height * 0.5]
    const history = useHistory();
    const [stop,setStop] =  useState(false)
    const selectPhoto = async () => {
        setStop(true)
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri,
                source: CameraSource.Photos
            });

            const response = await fetch(image.webPath);
            const blob = await response.blob();

            // create form data
            let formData = new FormData();
            formData.append('file', blob, 'filename.jpeg');
            formData.append('filename', 'filename.jpeg');

            console.log(formData)

            // send form data to server
            await fetch('http://localhost:4002/api/requests/upload', {
                method: 'POST',
                body: formData
            });

            setStop(false)
        } catch (error) {
            console.error(error);
        }
    };


    const handleNavigation = () => {
        history.push("/Camera");
        window.location.reload();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="title3">Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="card">
                    <div className="header">
                        <TimerComponent stop={stop}/>
                        <div className="father">
                            <div className="son" onClick={selectPhoto}>upload<UilUpload color="black" style={{marginLeft:"5%"}}/></div>
                            <div className="son" onClick={handleNavigation}>Camera<UilCamera color="black" style={{marginLeft:"5%"}}/></div>
                        </div>
                    </div>
                    <FloatingPanel anchors={anchors}>
                        <div style={{ position: "relative" }}>
                            <CapsuleTabs>
                                <CapsuleTabs.Tab title="Energy in Review" key="News">
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            flexWrap: "wrap",
                                            overflowY:"scroll"
                                        }}
                                    >
                                        {imags.map((key, value) => (
                                            <ion-card style={{height:"10rem",width:"48%",margin:".5rem 0 auto"}}>
                                                <img alt="Silhouette of mountains" src={key.img} style={{height:"70%",width:"100%",objectFit: "cover"}}/>
                                                <div style={{margin:'.3rem'}}><p style={{overflow: "hidden",fontWeight:"bold",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{key.word}</p></div>
                                            </ion-card>
                                        ))}
                                    </div>
                                </CapsuleTabs.Tab>
                                <CapsuleTabs.Tab title="Product" key="Product">
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            flexWrap: "wrap",
                                            maxHeight: "300px",
                                        }}
                                    >
                                        {recommendation.map((key, value) => (
                                            <Coffee i={key.img} key={value} filter={key.filter} />
                                        ))}
                                    </div>
                                </CapsuleTabs.Tab>
                            </CapsuleTabs>
                        </div>
                    </FloatingPanel>
                </div>
                    <div className="run" key={key}>
                        <p style={{width: '6rem', height: '1rem',fontSize:"1.2rem",marginBottom:"1rem"}}>+1</p>
                    </div>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;

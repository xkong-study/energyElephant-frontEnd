import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {UilImagePlus, UilImageUpload, UilStar, UilUser} from '@iconscout/react-unicons'
import './Tab2.css';
import React, {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import * as echarts from 'echarts';

const Tab2: React.FC = () => {
    const [image, setImage] = useState(null);
    const [photo,setPhoto] = useState(localStorage.getItem('pic'))
    console.log(photo)

    const chartRef = useRef(null);

    const chartRef1 = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);

        const option = {
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: '0%',
                left: 'center',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2,
                    },
                    label: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 30,
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        { value: 1048, name: 'Carbon' },
                        { value: 735, name: 'Water' },
                        { value: 580, name: 'Electric' },
                        { value: 484, name: 'Waste' },
                    ],
                },
            ],
        };

        chartInstance.setOption(option);
        return () => {
            chartInstance.dispose();
        };
    }, []);


    useEffect(() => {
        let myChart = echarts.init(chartRef1.current);
        let option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }
            ]
        };

        myChart.setOption(option);

        return () => {
            myChart.dispose(); // 销毁echarts实例
        };
    }, []);

    useEffect(()=> {
        fetch('http://localhost:4002/api/requests/download/filename.jpeg', {
            method: 'GET',
        }).then(res => res.blob())
            .then(blob => {
                // Convert Blob to Base64 string
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPhoto(reader.result);
                    console.log(reader.result)
                };
                reader.readAsDataURL(blob);
            })
            .catch(error => {
                console.error('Failed to fetch the image:', error);
            });
    },[]);



    const history = useHistory()
    const Jump=()=>{
        history.push('/pic')
        window.location.reload()
    }

    const handleCapture = async (event) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            const dataURL = canvas.toDataURL();
            setImage(dataURL);
        };
    };
    const filter = localStorage.getItem('filter')
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div style={{width: "5rem"}}><UilImagePlus style={{color: "#D2AC19"}}/></div>
                    <IonTitle className="title2">Energy analysis</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div style={{ width: "100%", height: "40%",marginTop:"-10%", backgroundImage: "url(https://dr6wcybhxxu9c.cloudfront.net/images/brochure/careers/net_zero_elephants.jpg",backgroundPositionX:"center",backgroundSize: "cover"}}>
                <div className="glass">
                    {image && <img src={image} alt="captured" style={{marginLeft:"48%",transform:"translate(-50%,0)"}}/>}
                    {photo && <img src={photo} alt="camera result" style={{marginLeft:"50%",transform:"translate(-50%,0)",width:"80%",height:"30%"}}/>}
                    <h6 style={{marginLeft:"10%",marginTop:"10%"}}>COST</h6>
                    <div ref={chartRef} style={{ width: '20rem', height: '22rem',transform:"scale(0.7)",marginTop:"-10%",marginLeft:"7%"}} />;
                    <h6 style={{marginLeft:"10%",marginTop:"-10%"}}>Time line</h6>
                    <div ref={chartRef1} style={{ width: '20rem', height: '22rem',transform:"scale(0.7)",marginTop:"-10%",marginLeft:"7%"}} />;
                </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;

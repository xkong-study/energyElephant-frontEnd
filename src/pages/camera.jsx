import React, {useEffect, useRef, useState} from 'react';
import {IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {UilImagePlus, UilTimes, UilStar, UilUser, UilCheck} from '@iconscout/react-unicons'
import * as faceapi from 'face-api.js';
import {useHistory} from "react-router-dom";
import {CapsuleTabs} from "antd-mobile";
const CameraCapture = () => {
    const videoRef = useRef(null);
    const [phot,setPhoto] =useState(null)
    const [image, setImage] = useState(null);
    const [id,setId] = useState(0)
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
        localStorage.setItem('pic',phot)
        history.push('/Cost')
    }


    const takePhoto = async () => {
        try {
            const photo = await Camera.getPhoto({
                quality: 90,
                resultType: CameraResultType.DataUrl,
                allowEditing: false,
                source: CameraSource.Camera,
            });
            // fetch image blob
            const response = await fetch(photo.dataUrl);
            const blob = await response.blob();

            // create form data
            let formData = new FormData();
            formData.append('file', blob, 'filename.jpeg');

            console.log(formData)

            // send form data to server
            await fetch('http://localhost:4002/api/requests/upload', {
                method: 'POST',
                body: formData
            });

            setPhoto(photo.dataUrl);
        } catch (error) {
            console.error(error);
        }
    };
    const startVideo = async () => {
        if (!videoRef.current) return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            const video = document.createElement('video');
            video.srcObject = stream;
            video.autoplay = true;
            video.width = 640;
            video.height = 480;

            await new Promise((resolve) => {
                video.onloadedmetadata = () => {
                    resolve(null);
                };
            });
            const minConfidence = 0.8;
            const smileThreshold = 0.7;
            let detectedSmile = false;

            while (!detectedSmile) {
                const detections = await faceapi
                    .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
                    .withFaceExpressions();

                for (const detection of detections) {
                    if (
                        detection.expressions.happy > smileThreshold &&
                        detection.detection.score > minConfidence
                    ) {
                        detectedSmile = true;
                        break;
                    }
                }
                console.log('Detected expressions:', detections.map((d) => d.expressions));
                await new Promise((resolve) => setTimeout(resolve, 100));
            }

            // analyzeExpressions(); // 如果要同时启动面部表情分析，取消注释此行
        } catch (error) {
            console.error('Error starting video stream:', error);
        }
    };


    useEffect(() => {
        const loadModels = async () => {
            console.log("Loading models...");
            await faceapi.nets.ssdMobilenetv1.loadFromUri('./models');
            await faceapi.nets.faceExpressionNet.loadFromUri('./models');
            console.log("Models loaded.");
        };

        loadModels()
            .then(() => {
                console.log("Starting video...");
                startVideo();
            })
            .catch((error) => {
                console.error("Error loading models:", error);
            });
        takePhoto();
    }, []);


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
                        {phot && <img src={phot} alt="camera result" style={{margin:".5rem",filter:`${filter[id]}`}}/>}
                        <video ref={videoRef} autoPlay playsInline muted style={{ width:"10rem",height:"10rem",position: 'relative', top: "10rem", left: "10rem" }}></video>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default CameraCapture;

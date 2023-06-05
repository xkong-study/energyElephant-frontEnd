import { IonContent, IonHeader, IonPage } from '@ionic/react';
import './Login.css';
import {useState} from "react"
import pic from "../components/login.png"
import { CapsuleTabs } from 'antd-mobile'
import { Input } from 'antd-mobile'
import { Button } from 'antd-mobile'
import { useHistory } from "react-router-dom";
import { ImageUploader } from 'antd-mobile'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
import { mockUpload } from '../components/utils'

const Login: React.FC = () => {
    const [value, setValue] = useState('')
    const [password, setPassword] = useState('')
    const [r_value,setR_value] = useState('')
    const [r_password,setR_password] = useState('')
    const [activeTab,setActiveTab] = useState('fruits')
    const history = useHistory()

    const handleTabChange = (tabKey:any) => {
        setActiveTab(tabKey);
    }

// 处理跳转到 key 为 "fruits" 的选项卡的函数
    const jumpToTab = () => {
        if(r_value&&r_password) {
            setActiveTab('fruits');
        }
        else{
            alert('cannot be empty')
        }
    }
    function handleLogin(){
        if(value=='xkong'&&password=='123'){
            localStorage.setItem('name',value)
            window.location.href = "./tab1"
        }
    }

    const [fileList, setFileList] = useState<ImageUploadItem[]>([
        {
            url: '',
        },
    ])
    console.log(fileList)

    // @ts-ignore
    document.querySelector('ion-tab-bar').style.display='none'

    return (
        <IonPage>
            <IonHeader>
            </IonHeader>
            <IonContent fullscreen>
                <img src="https://dr6wcybhxxu9c.cloudfront.net/images/brochure/careers/shackleton_ad.jpg"  alt="" style={{height:"35%",width:"100%"}}/>
                <div style={{height:"65%",width:"100%",borderRadius:"40px 40px 0px 0px",backgroundColor:"white",transform:'translate(0rem,-5rem)'}}>
                    <CapsuleTabs activeKey={activeTab} onChange={handleTabChange}>
                        <CapsuleTabs.Tab title='Password Login' key='fruits' >
                            <div style={{fontSize:'1rem',fontWeight:'10px',marginTop:'1rem',marginBottom:'1rem'}}>username</div>
                            <Input
                                placeholder='please input your name'
                                value={value}
                                onChange={val => {
                                    setValue(val)
                                }}
                            />
                            <div style={{fontSize:'1rem',fontWeight:'10px',marginTop:'1rem',marginBottom:'1rem'}}>password</div>
                            <Input
                                placeholder='please input your password'
                                value={password}
                                onChange={val => {
                                    setPassword(val)
                                }}
                            />
                            <Button style={{width:"10rem",position:'relative',bottom:'-10rem',left:'50%',transform:'translate(-50%,0px)',backgroundColor:'#124775',color:'white',paddingBottom:'2rem',borderRadius:'25px'}} onClick={handleLogin}>Login</Button>
                        </CapsuleTabs.Tab>
                        <CapsuleTabs.Tab title='Account Register' key='vegetables'>
                            <div style={{height:'80px',overflow:'hidden',marginLeft:'50%',transform:'translate(-20%,0px)'}}>
                            <ImageUploader
                                value={fileList}
                                onChange={setFileList}
                                upload={mockUpload}
                                style={{height:'80px',width:'100px',position:'relative',transform:'translate(0px,-90px)'}}
                            />
                            </div>
                            <div style={{fontSize:'1rem',fontWeight:'10px',marginTop:'1rem',marginBottom:'1rem'}}>username</div>
                            <Input
                                placeholder='please input your name'
                                value={r_value}
                                onChange={val => {
                                    setR_value(val)
                                }}
                            />
                            <div style={{fontSize:'1rem',fontWeight:'10px',marginTop:'1rem',marginBottom:'1rem'}}>password</div>
                            <Input
                                placeholder='please input your password'
                                value={r_password}
                                onChange={val => {
                                    setR_password(val)
                                }}
                            />
                            <Button style={{width:"10rem",position:'relative',bottom:'-10rem',left:'50%',transform:'translate(-50%,0px)',backgroundColor:'#124775',color:'white',paddingBottom:'2rem',borderRadius:'25px'}} onClick={jumpToTab}>Register</Button>
                        </CapsuleTabs.Tab>
                    </CapsuleTabs>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;

import React, {useState, useEffect, useRef} from 'react';
import { IonButton } from '@ionic/react';
import './TimerComponent.css';

const TimerComponent = ({stop}) => {
    const [timer, setTimer] = useState(0);
    const [flipState, setFlipState] = useState([false, false, false, false, false, false]);

    useEffect(() => {
        const interval = setInterval(() => {
            if(stop===true) {
                setTimer(prevTimer => prevTimer + 1);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [stop]);

    useEffect(() => {
        const newFlipState = flipState.map((flip, index) => {
            return timer.toString().length-1 >= index;
        });

        setFlipState(newFlipState);
    }, [timer]);

    const [prevTimer, setPrevTimer] = useState(timer-1);

    useEffect(() => {
        setPrevTimer(timer-1);
    }, [timer]);

    const renderGrid = () => {
        const len = timer.toString().length;
        const number = timer.toString()
        return flipState.map((flip, index) => (
            <div key={index} className={`grid-item ${flip ? 'flipped' : ''}`}>
                {len >= index-1 && number[index] !== prevTimer.toString()[index]  && stop===true?
                    <IonButton style={{width:"50px"}}>
                        <div  style={{display: 'flex', flexDirection: 'column', alignItems: 'center',width:"30px"}}>
                            <div className="number_pre" style={{display: 'flex', flexDirection: 'column'}}>{Number(number[index])-1}
                                <div style={{width:"50px", height: '2px', backgroundColor: 'white'}} className="line"/>
                            </div>
                            <div className="number">{isNaN(number[index])===true?0:number[index]}</div>
                        </div>
                    </IonButton>
                    :
                    <IonButton style={{width:"50px"}}>{isNaN(number[index])===true?0:number[index]}</IonButton>
                }
            </div>
        ));
    };

    return (
        <>
            <div className="grid-container">{renderGrid()}</div>
        </>
    );
};

export default TimerComponent;

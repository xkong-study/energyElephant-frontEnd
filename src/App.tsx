import {Route, withRouter, useLocation} from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {personAdd, cart, home, idCard, image} from 'ionicons/icons';
import Bill from './pages/Bill';
import Cost from './pages/Cost'
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Login from './pages/Login';
import Card from './pages/Card';
import Pic from "./pages/Pic_beautify"
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { Provider } from 'react-redux';
import store from "./store";
import {useEffect, useState} from "react";
import CameraCapture from "./pages/camera";

setupIonicReact();
const App: React.FC = () => {
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    if (shouldReload) {
      window.location.reload();
    }
  }, [shouldReload]);
  return(
  <IonApp>
    <Provider store={store}>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route path="/tab4">
            <Tab4 />
          </Route>
          <Route path="/bill">
          <Bill />
          </Route>
          <Route path="/Cost">
            <Cost />
          </Route>
          <Route path="/Camera">
            <CameraCapture />
          </Route>
          <Route path="/Card">
            <Card />
          </Route>
          <Route path="/Pic">
            <Pic />
          </Route>
          <Route exact path="/">
            <Login/>
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2" onClick={() => setShouldReload(true)}>
            <IonIcon aria-hidden="true" icon={image} />
            <IonLabel>energy analysis</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3" onClick={() => setShouldReload(true)}>
            <IonIcon aria-hidden="true" icon={idCard} />
            <IonLabel>Shop</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/tab4" onClick={() => setShouldReload(true)}>
            <IonIcon aria-hidden="true" icon={personAdd} />
            <IonLabel>User</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
    </Provider>
  </IonApp>
);
}

export default App;

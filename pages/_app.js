import "../styles/globals.css";
import "../styles/Header.css";
import "../styles/Sidebar.css";
import "../styles/namePage.css"

import { SidebarEnableProvider } from "../Components/Context/SidebarEnable";
// import { EditorDataProvider } from "../Components/Context/editorData";
import {EditorDataProvider} from '../Components/Context/editorData'

function MyApp({ Component, pageProps }) {
  return (
    
      <SidebarEnableProvider>
        <Component {...pageProps} />
      </SidebarEnableProvider>
     
  );
}

export default MyApp;

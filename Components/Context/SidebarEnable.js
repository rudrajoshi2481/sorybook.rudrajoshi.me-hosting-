import React, { useEffect } from "react";

export const EditorData = React.createContext();
export const SidebarEnable = React.createContext();
export const EditorValue = React.createContext();

export const SidebarEnableProvider = (props) => {
  const [sidebarStatus, setSidebarStatus] = React.useState(true);

  // localStorage.setItem('adminDetails',{isAdmin:false})

  const [userData, setUserData] = React.useState({ isAdmin: false });

  const [editorValue,setEditorValue] = React.useState(null)

  return (
    <EditorData.Provider value={[userData, setUserData]}>
      <SidebarEnable.Provider value={[sidebarStatus, setSidebarStatus]}>
        <EditorValue.Provider value={[editorValue,setEditorValue]}>
          {props.children}
        </EditorValue.Provider>
      </SidebarEnable.Provider>
    </EditorData.Provider>
  );
};

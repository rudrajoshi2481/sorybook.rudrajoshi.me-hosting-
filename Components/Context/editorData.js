import React from 'react'



export const EditorData = React.createContext()


export const EditorDataProvider = (props) => {

    const [EditorData,setEditorData] = React.useState(false)
    
    return(
        <EditorData.Provider value={[EditorData,setEditorData]}>
            {props.children}
        </EditorData.Provider>
    )
}

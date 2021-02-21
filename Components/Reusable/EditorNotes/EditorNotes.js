import React, { Children } from "react";
import { withReact, Slate, Editable } from "slate-react";
import { createEditor } from "slate";
// import {EditorValue} from '../../../Components/Context/SidebarEnable'
import {
  EditorData,
  EditorValue,
} from "../../../Components/Context/SidebarEnable";

function EditorNotes({editorValueData}) {
  
  const [editorValue,setEditorValue] = React.useContext(EditorValue)
  const [userData, setUserData] = React.useContext(EditorData);
  
    const editor = React.useMemo(() => withReact(createEditor()), []);
  // const [value, setValue] = React.useState([
  //   {
  //     type: "paragraph",
  //     children: [{ text: "A line of text in a paragraph." }],
  //   },
  // ]);

  const Element = ({attributes,children,element}) => {
    switch (element.type) {
      case 'bold':
        
        break;
    
      default:
      return <p {...attributes}>{children}</p>
    }
  }
  
  const renderElement = React.useCallback(props => <Element {...props}/>)



  return (
    <div>
      <h1>Something</h1>
      {JSON.stringify(editorValueData)}
      {
        editorValueData ? 
        <Slate value={editorValueData} editor={editor} onChange={(e) => setEditorValue(e)}> 
          <Editable 
            // readOnly={!userData.isAdmin }
            renderElement={renderElement}
          />
        </Slate> : null
      }
    </div>
  );
}

export default EditorNotes;

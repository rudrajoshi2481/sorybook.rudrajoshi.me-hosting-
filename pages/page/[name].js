import React, { useEffect } from "react";
import Header from "../../Components/Reusable/Header/Header";
import { useRouter } from "next/router";
import axios from "axios";
import { route } from "next/dist/next-server/server/router";
import Link from "next/link";
import {
  EditorData,
  EditorValue,
} from "../../Components/Context/SidebarEnable";
import EditorNotes from "../../Components/Reusable/EditorNotes/EditorNotes";
// import { Editable } from "slate-react";
import { withReact, Slate, Editable } from "slate-react";
import { createEditor } from "slate";

export async function getServerSideProps(props) {
  
  // Fetch data from external API

  // const res = await fetch(`https://.../data`)
  // const data = await res.json()

  // Pass data to the page via props
  // return { props: { data } }
  // const FetchData = () => {
  // setRouterLink(router.query.name);
  // console.log(router.query.name);
  // console.log(props);
  // axios
  // .post("http://192.168.0.103:9000/api/storyData/getDataFromUrlTitle", {
  // data: { pageTitle: `${router.query.name}` },

  // })
  // .then((res) => {
  // console.log(res,"data");
  // return {props:{data:res.data}}
  // setPageId(res.data[0]._id);
  // setPageTitle(res.data[0].pageTitle);
  // setEditorValue(res.data[0].pageEditorData)
  // setPageTitle(res.data[0].pageTitle);
  // setViewStatus(res.data[0].viewStatus);
  // setEditorData(res.data[0].pageEditorData);
  // })
  // .catch((err) => {
  //   console.log(err, "IN FETCH BOOK TITLE");
  // });
  // };

  // FetchData()

  // console.log(props.params.name,"PropsNAme");

  let data = 'not Got '
// http://65.1.132.27/api
   await axios.post(
    "http://65.1.132.27/api/storyData/getDataFromUrlTitle",
    {data:{pageTitle:props.params.name}}
  ).then(res => {
    console.log(res);
    // data = res

    
    data = {pageEditorData:res.data[0].pageEditorData,pageTitle:res.data[0].pageTitle,_id:res.data[0]._id,viewStatus:res.data[0].viewStatus,bookId:res.data[0].bookId,}

  });

  

  return {
    props: {data:data},
  };
}

function PageName({ data }) {
  const [routerLink, setRouterLink] = React.useState("");

  const [userData, setUserData] = React.useContext(EditorData);
  const [editorValue, setEditorValue] = React.useContext(EditorValue);

  let router = useRouter();

  // console.log("Data15",data);

  const [editorData, setEditorData] = React.useState(data.pageEditorData);
  const [viewStatus, setViewStatus] = React.useState(data.viewStatus);
  const [pageId, setPageId] = React.useState(data._id);
  const [editData, setEditData] = React.useState(false);
  const [pageTitle, setPageTitle] = React.useState(data.pageTitle);


  const editor = React.useMemo(() => withReact(createEditor()), []);

  
  const pageDeleteButton = () => {
    // localhost:9000/api/storyData/deletePage
    axios
      .post("http://65.1.132.27/api/storyData/deletePage", {
        data: { pageId: pageId, jwtToken: userData.jwtToken },
      })
      .then((rep) => {
        console.log(rep);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveEditedData = (e) => {
    e.preventDefault();
    axios
      .post("http://65.1.132.27/api/storyData/updatePageData", {
        data: {
          jwtToken: userData.jwtToken,
          pageTitle: pageTitle,
          editorData: editorData,
          viewStatus: 1,
          pageId: pageId,
        },
      })
      .then((rep) => {
        console.log(rep);
        FetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* {JSON.stringify(userData)} */}
      {/* <br /> */}
      {/* {JSON.stringify(data)} */}
      {/* <br /> */}
      {/* {JSON.stringify(data.pageTitle)} */}
      <Header />
      {userData.isAdmin ? (
        <div style={{ float: "right" }}>
          <button
            style={{ margin: "5px", padding: "5px" }}
            onClick={(e) => saveEditedData(e)}
          >
            SAVE
          </button>
          <button
            style={{ margin: "5px", padding: "5px" }}
            onClick={(e) => setEditData(!editData)}
          >
            EDIT
          </button>
        </div>
      ) : null}
      <div
        style={{ padding: "0 5px", margin: "0 5px" }}
        className="namepage-main-container"
      >
        <>
          {editData ? (
            <>
              {editData ? (
                <input

                  
                  style={{
                    // width: "",
                    
                    overflow: "visible",
                    background: "none",
                    color: "white",
                    border: "none",
                    fontSize: "32px",
                    fontWeight: "800",
                  }}
                  type="text"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                />
              ) : (
                <h1>{pageTitle}</h1>
              )}
            </>
          ) : (
            <h1 >{pageTitle}</h1>
          )}
        </>
        <div>
          <article>
            {/* {pageTitle ? <EditorNotes  editorValueData={editorValue}/> : null}*/}

            <Slate value={editorData} onChange={e => setEditorData(e)} editor={editor}>
              <Editable readOnly={!editData}/>
            </Slate>

          </article>

          <div>
            {userData.isAdmin ? (
              <>
                <button
                  style={{ padding: "5px", margin: "5px" }}
                  onClick={(e) => pageDeleteButton(e, pageId)}
                >
                  <Link href={"/"}>Delete</Link>
                </button>{" "}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageName;

// const [getDataFromUrl, setGetDataFromUrl] = React.useState("");
// let router = useRouter();

// const fetchInitialData = async() => {
//    setGetDataFromUrl(router.query.name)
//    console.log(router.query.name);

//     axios
//      .post("http://localhost:9000/api/storyData/getDataFromUrlTitle", {
//        data: { pageTitle: `${router.query.name}` },
//      })
//      .then((res) => {
//        console.log(res.data);
//      })
//      .catch((err) => {
//        console.log(err, "IN FETCH BOOK TITLE");
//      });

// }

// useEffect(() => {
//   fetchInitialData()
// }, []);

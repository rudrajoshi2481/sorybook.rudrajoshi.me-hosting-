import React from "react";
import { SidebarEnable } from "../../Context/SidebarEnable";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { EditorData } from "../../Context/SidebarEnable";

function Sidebar() {
  const [bookList, setBookList] = React.useState([]);
  const [getPageList, setGetPageList] = React.useState([]);
  const [reload, setReload] = React.useState(false);
  const [userData, setUserData] = React.useContext(EditorData);
  const [showSidebar, setShowSidebar] = React.useContext(SidebarEnable);

  const sidebardataFetch = () => {
    // http://13.126.203.189:2000/api/getStoriesList/getBookList
    axios
      .get("http://api.storybook.rudrajoshi.me/api/getStoriesList/getBookList", {
        data: { jwtToken: userData.jwtToken },
      })
      .then((res) => {
        setBookList(res.data.getBookList);
        setGetPageList(res.data.getPageList);
      })
      .catch((err) => {
        console.log(err, "SERVER NOT STARTED OR NOT FOUND");
      });
  };
  if (reload) {
    sidebardataFetch();
    setReload(false);
  }

  const createNewBook = () => {
    axios
      .post("http://api.storybook.rudrajoshi.me/api/storyData/createBook", {
        data: {
          jwtToken: userData.jwtToken,
          bookTitle: "Default name",
          authorId: `${userData._id}`,
          bookPages: [],
        },
      })
      .then((e) => sidebardataFetch());
  };

  React.useEffect(() => {
    sidebardataFetch();
  }, []);

  return (
    <div
      className="sidebar-container"
      style={{
        position: "absolute",
        width: "50vw",
        height: "100%",
        overflowY: "scroll",
        paddingLeft: "3vw",
        zIndex:'10',
        // background:"#171B49"
        background: "#262C71",
        // #171B49
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "3vw",
        }}
      >
        <h1 className="stories-title" style={{ fontSize: "36px" }}>Stories</h1>

        <button
          className="sidebar-button-header"
          onClick={(e) => setShowSidebar(!showSidebar)}
        >
          <svg
            width="43"
            height="43"
            viewBox="0 0 43 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.7814 14.8988C28.7814 14.7141 28.6303 14.5629 28.4455 14.5629L25.674 14.5755L21.5 19.5516L17.3302 14.5797L14.5545 14.5671C14.3697 14.5671 14.2186 14.7141 14.2186 14.903C14.2186 14.9828 14.248 15.0584 14.2984 15.1214L19.7615 21.6302L14.2984 28.1348C14.2476 28.1963 14.2195 28.2734 14.2186 28.3531C14.2186 28.5379 14.3697 28.6891 14.5545 28.6891L17.3302 28.6765L21.5 23.7004L25.6698 28.6723L28.4413 28.6849C28.6261 28.6849 28.7772 28.5379 28.7772 28.3489C28.7772 28.2691 28.7478 28.1936 28.6975 28.1306L23.2427 21.626L28.7059 15.1172C28.7562 15.0584 28.7814 14.9786 28.7814 14.8988Z"
              fill="white"
            />
            <path
              d="M21.5 2.72949C11.1111 2.72949 2.6875 11.1531 2.6875 21.542C2.6875 31.9309 11.1111 40.3545 21.5 40.3545C31.8889 40.3545 40.3125 31.9309 40.3125 21.542C40.3125 11.1531 31.8889 2.72949 21.5 2.72949ZM21.5 37.1631C12.8748 37.1631 5.87891 30.1672 5.87891 21.542C5.87891 12.9168 12.8748 5.9209 21.5 5.9209C30.1252 5.9209 37.1211 12.9168 37.1211 21.542C37.1211 30.1672 30.1252 37.1631 21.5 37.1631Z"
              fill="red"
            />
          </svg>
        </button>
      </div>
      {userData.isAdmin ? (
        <button
          onClick={() => {
            createNewBook();
          }}
        >
          New Book
        </button>
      ) : null}

      {bookList.map((bookMap) => {
        // console.log(bookMap);
        return (
          <>
            <Cardstories
              pages={bookMap.bookPages}
              bookTitle={bookMap.bookTitle}
              bookId={bookMap._id}
              getPageList={getPageList}
              reload={setReload}
            />
          </>
        );
      })}
    </div>
  );
}

const Cardstories = ({ bookId, bookTitle, pages, getPageList, reload }) => {
  const [showPages, setShowPages] = React.useState(true);
  const [mouseOverTitle, setMouseOverTitle] = React.useState(false);
  const [showInputBarTitle, setShowInputBarTitle] = React.useState(false);
  const [showDeleteButton, setShowDeleteButton] = React.useState(false);
  const [inputTitleValue, setInputTitleValue] = React.useState(`${bookTitle}`);
  const [saveTitleButton, setSaveTitleButton] = React.useState(false);
  const [userData, setUserData] = React.useContext(EditorData);
  return (
    <div key={bookId} style={{ padding: "5px", margin: "5px" }}>
      <div style={{ display: "flex" }}>
        {showPages ? (
          <button
            className="sidebar-button-header"
            onClick={(e) => setShowPages(false)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{ paddingRight: "15px" }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M48 0H2C0.89375 0 0 0.89375 0 2V48C0 49.1063 0.89375 50 2 50H48C49.1063 50 50 49.1063 50 48V2C50 0.89375 49.1063 0 48 0ZM37 26.5C37 26.775 36.775 27 36.5 27H13.5C13.225 27 13 26.775 13 26.5V23.5C13 23.225 13.225 23 13.5 23H36.5C36.775 23 37 23.225 37 23.5V26.5Z"
                  fill="white"
                />
              </svg>
            </span>
          </button>
        ) : (
          <button
            className="sidebar-button-header"
            onClick={(e) => setShowPages(true)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <span style={{ paddingTop: "3px" }}>
              <svg
                width="36"
                height="36"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32.64 0H1.36C0.60775 0 0 0.60775 0 1.36V32.64C0 33.3923 0.60775 34 1.36 34H32.64C33.3923 34 34 33.3923 34 32.64V1.36C34 0.60775 33.3923 0 32.64 0ZM25.16 18.02C25.16 18.207 25.007 18.36 24.82 18.36H18.36V24.82C18.36 25.007 18.207 25.16 18.02 25.16H15.98C15.793 25.16 15.64 25.007 15.64 24.82V18.36H9.18C8.993 18.36 8.84 18.207 8.84 18.02V15.98C8.84 15.793 8.993 15.64 9.18 15.64H15.64V9.18C15.64 8.993 15.793 8.84 15.98 8.84H18.02C18.207 8.84 18.36 8.993 18.36 9.18V15.64H24.82C25.007 15.64 25.16 15.793 25.16 15.98V18.02Z"
                  fill="white"
                />
              </svg>
            </span>
          </button>
        )}
        <h1
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
            color: mouseOverTitle ? "#12BB7E" : "white",
          }}
          onClick={(e) => setShowPages(!showPages)}
          onMouseOver={(e) => setMouseOverTitle(true)}
          onMouseLeave={(e) => setMouseOverTitle(false)}
        >
          {/* {
  console.log(bookTitle)
} */}
          {showInputBarTitle ? (
            <input
              style={{ background: "none", border: "none", color: "white" }}
              onChange={(e) => {
                setInputTitleValue(e.target.value);
                setSaveTitleButton(true);
              }}
              placeholder="Title of Book"
              value={inputTitleValue}
            ></input>
          ) : (
            bookTitle
          )}
          {saveTitleButton ? (
            <span
              style={{ paddingLeft: "10px", zIndex: "10" }}
              onClick={(e) => {
                setShowDeleteButton(false);
                setShowInputBarTitle(false);
                setSaveTitleButton(false);
                console.log("SAVE CLICKED");
                console.log(bookTitle, inputTitleValue);
                axios
                  .post("http://api.storybook.rudrajoshi.me/api/storyData/updateBookTitle", {
                    data: {
                      bookId: bookId,
                      bookTitle: inputTitleValue,
                      jwtToken: userData.jwtToken,
                    },
                  })
                  .then((res) => {
                    console.log(res);
                  })
                  .then((res) => reload(true))
                  .catch((err) => console.log(err));
              }}
            >
              Save
            </span>
          ) : null}
          {"    "}
        </h1>
        {/* delete Button */}
        {"   "}
        <button
          onClick={(e) => setShowDeleteButton(!showDeleteButton)}
          style={{ position: "absolute", right: "0", zIndex: "10" }}
          className="sidebar-button-header"
        >
          <svg
            width="46"
            height="46"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 7H10V9H11V15H10V17H14V15H13V9H14V7ZM5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3V3Z"
              fill="#12BB7E"
            />
          </svg>
        </button>
        {userData.isAdmin && showDeleteButton ? (
          <div
            style={{
              position: "absolute",
              marginBottom: "20px",
              right: "15px",
              // marginTop: "30px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button
              style={{
                position: "relative",
                marginBottom: "5px",
                right: 0,
                marginTop: "30px",
              }}
              onClick={(e) => {
                console.log("Gone");
                axios
                  .post("http://api.storybook.rudrajoshi.me/api/storyData/deleteBook", {
                    data: { bookId: bookId ,jwtToken:userData.jwtToken},
                  })
                  .then((res) => console.log(res, "DELETE BOOK"))
                  .then((e) => reload(true))

                  .catch((err) => console.log(err));
              }}
            >
              Delete Book
            </button>

            <button
              style={{
                position: "relative",
                marginBottom: "20px",
                right: 0,

                // marginTop: "60px",
                // marginBottom: "30px",
              }}
              onClick={(e) => {
                setShowInputBarTitle((e) => !showInputBarTitle);
              }}
            >
              Change Book title
            </button>
            {/* New Page */}
            <button
              style={{
                position: "relative",
                marginBottom: "5px",
                right: 0,
              }}
              onClick={(e) => {
                console.log("Gone");
                axios
                  .post("http://api.storybook.rudrajoshi.me/api/storyData/createPage", {
                    data: {
                      jwtToken:userData.jwtToken,
                      bookId: bookId,
                      pageTitle: "Default Title",
                      pageEditorData: [
                        {
                          type: "paragraph",
                          children: [{ text: "A line of text in a paragraph." }],
                        },
                      ],
                      viewStatus: 1,
                    },
                  })
                  .then((res) => console.log(res, "Create PAge"))
                  .then((e) => reload(true))

                  .catch((err) => console.log(err));
              }}
            >
              Create Page
            </button>
          </div>
        ) : null}
      </div>
      {showPages ? (
        <ul style={{ paddingLeft: "3vw" }}>
          {pages.map((e) => {
            return <CardList pageId={e} getPageList={getPageList} />;
          })}
        </ul>
      ) : null}
    </div>
  );
};

const CardList = ({ pageId, getPageList }) => {
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  const [showSidebar, setShowSidebar] = React.useContext(SidebarEnable);

  const router = useRouter();

  return (
    <div key={pageId}>
      <li
        style={{
          display: "flex",
          paddingTop: "5px",
          marginTop: "5px",
          width: "80%",
          paddingBottom: "5px",
          marginBottom: "5px",
          borderBottom: isMouseOver ? "2px solid #12BB7E" : null,
        }}
        onMouseOver={(e) => setIsMouseOver(true)}
        onMouseLeave={(e) => setIsMouseOver(false)}
        onClick={(e) => setShowSidebar(false)}
      >
        {isMouseOver ? (
          <span style={{ paddingRight: "5px", marginRight: "5px" }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2L0 14C0 14.5304 0.210714 15.0391 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H14C14.5304 16 15.0391 15.7893 15.4142 15.4142C15.7893 15.0391 16 14.5304 16 14V2C16 1.46957 15.7893 0.960859 15.4142 0.585786C15.0391 0.210714 14.5304 0 14 0L2 0ZM7.646 10.646C7.55211 10.7399 7.49937 10.8672 7.49937 11C7.49937 11.1328 7.55211 11.2601 7.646 11.354C7.73989 11.4479 7.86722 11.5006 8 11.5006C8.13278 11.5006 8.26011 11.4479 8.354 11.354L11.354 8.354C11.4006 8.30755 11.4375 8.25238 11.4627 8.19163C11.4879 8.13089 11.5009 8.06577 11.5009 8C11.5009 7.93423 11.4879 7.86911 11.4627 7.80837C11.4375 7.74762 11.4006 7.69245 11.354 7.646L8.354 4.646C8.30751 4.59951 8.25232 4.56264 8.19158 4.53748C8.13084 4.51232 8.06574 4.49937 8 4.49937C7.93426 4.49937 7.86916 4.51232 7.80842 4.53748C7.74768 4.56264 7.69249 4.59951 7.646 4.646C7.59951 4.69249 7.56264 4.74768 7.53748 4.80842C7.51232 4.86916 7.49937 4.93426 7.49937 5C7.49937 5.06574 7.51232 5.13084 7.53748 5.19158C7.56264 5.25232 7.59951 5.30751 7.646 5.354L9.793 7.5H5C4.86739 7.5 4.74021 7.55268 4.64645 7.64645C4.55268 7.74021 4.5 7.86739 4.5 8C4.5 8.13261 4.55268 8.25979 4.64645 8.35355C4.74021 8.44732 4.86739 8.5 5 8.5H9.793L7.646 10.646V10.646Z"
                fill="#12BB7E"
              />
            </svg>
          </span>
        ) : null}
        {/* {pageTitle} */}
        {getPageList.map((pageMap) => {
          if (pageMap._id === pageId) {
            // const [pagetitle, setPageTitle] = React.useState(pageMap.pageTitle);

            return (
              <>
                <Link
                  href={"/page/" + pageMap.pageTitle}
                  // href={{
                  //   pathname: "/page/[name]",
                  //   query: { name: `${pageMap.pageTitle}` },
                  // }}
                >
                  <span>{pageMap.pageTitle} </span>
                </Link>
              </>
            );
          }
        })}
      </li>
    </div>
  );
};

export default Sidebar;

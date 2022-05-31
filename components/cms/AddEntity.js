import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import { connect } from "react-redux";
import post from "../../http/post";
import get from "../../http/get";
import { useRouter } from "next/router";

const AddEntity = (props) => {
  const [isfirst, setfirst] = useState(true);
  const [show, setShow] = useState(true);
  const [mainimage, setmainimage] = React.useState(null);
  const [logo, setlogo] = React.useState(null);
  const [name, setname] = React.useState("");
  const [number, setnumber] = React.useState("");
  const [caption, setcaption] = React.useState("");
  const [maineditor, setmaineditor] = React.useState("");
  const [shorteditor, setshorteditor] = React.useState("");
  const [document, setdocument] = React.useState(null);
  const [maindata, setmaindata] = React.useState(null);
  const [url, seturl] = useState({
    img1: "http://gulf-empire.com/uploads/icon_image/1566714228_introbanner.jpg",
    img2: "http://gulf-empire.com/uploads/icon_image/1566714228_introbanner.jpg",
  });
  const router = useRouter();
  useEffect(() => {
    const operation = async () => {
      const givendata = props.redux.addentity.metadata;
      console.log(givendata);
      if (givendata.type == "section" && givendata.action == "update") {
        fetchdata(givendata.index).then((result) => {
          setmaindata(result);
        });
        // console.log(typeof data);
        // //  console.log(givendata);
        // //  const data = await fetchdata(parseInt(givendata.index));
        // //   seturl((prev) => ({ ...prev, img1: data[givendata.innerindex].img }));
        // setmaineditor((prev) => data[givendata.innerindex].detaildescription);
        // setshorteditor((prev) => "one1");
      }
    };

    operation();
  }, [props.redux.addentity.metadata]);

  function handleSubmit() {
    const data = {};
    const metadata = {};
    const givendata = props.redux.addentity.metadata;
    const formdata = new FormData();
    if (mainimage != null) {
      formdata.append("file", mainimage);
      data.hasmainimage = true;
    }

    if (logo != null) {
      formdata.append("file", logo);
      data.haslogo = true;
    }

    if (document != null) {
      formdata.append("file", document);
      data.hasdocument = true;
    }

    data.name = name;
    data.innerindex = number;
    data.caption = caption;
    data.shortdescription = shorteditor;
    data.detaildescription = maineditor;
    formdata.append("data", JSON.stringify(data));
    formdata.append("metadata", JSON.stringify(givendata));
    post("/api/putandpostdata", formdata).then(
      (result) => {
        alert("success");
      }
    );
  }

  function onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
  }

  return (
    <Sidebar>
      <div>
        <div style={{ textAlign: "center", fontSize: "28px" }}>
          Enter the following Information
        </div>
        <hr />

        <div style={{ display: "flex" }}>
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              paddingTop: "55px",

              width: "770px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "700px",
              }}
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                style={{
                  width: "400px",
                }}
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  value={name}
                  type="text"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Position</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setnumber(e.target.value);
                  }}
                  value={
                    maindata == null
                      ? number
                      : props.redux.addentity.metadata.innerindex
                  }
                  type="text"
                />
              </Form.Group>
            </div>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              style={{
                width: "400px",
              }}
            >
              {" "}
              <Form.Label>Caption</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setcaption(e.target.value);
                }}
                value={caption}
                type="text"
              />
            </Form.Group>
            <div style={{ marginTop: "25px", width: "700px" }}>
              {" "}
              <label>Enter short description</label>
              <SunEditor
                height="160px"
                onChange={(value) => {
                  setshorteditor(value);
                }}
                value={shorteditor}
                defaultValue={
                  maindata == null
                    ? ""
                    : maindata[props.redux.addentity.metadata.innerindex]
                        .shortdescription
                }
              />
            </div>
            <div style={{ marginTop: "25px", width: "700px" }}>
              {" "}
              <label>Enter detail description</label>
              <SunEditor
                height="160px"
                onChange={(value) => {
                  setmaineditor(value);
                }}
                value={maineditor}
                defaultValue={
                  maindata == null
                    ? ""
                    : maindata[props.redux.addentity.metadata.innerindex]
                        .detaildescription
                }
              />
              <div dangerouslySetInnerHTML={{ __html: maineditor }} />
            </div>
          </div>

          <div
            style={{
              flex: "1",
              height: "100%",
              backgroundColor: "white",
              paddingTop: "55px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              paddingRight: "55px",
            }}
          >
            <Button
              style={{ width: "200px", marginBottom: "25px" }}
              onClick={() => {
                router.push("/Editor");
              }}
            >
              Go Back
            </Button>
            <Button
              style={{ width: "200px", marginBottom: "25px" }}
              onClick={handleSubmit}
            >
              Update
            </Button>
            <img
              src={
                maindata == null
                  ? "http://gulf-empire.com/uploads/icon_image/1566714228_introbanner.jpg"
                  : maindata[props.redux.addentity.metadata.innerindex].img
              }
              style={{ width: "200px", height: "200px" }}
            />

            <Form style={{ width: "200px", marginTop: "40px" }}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label style={{ fontSize: "13px" }}>
                  Upload Feature Image File
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setmainimage(e.target.files[0]);
                  }}
                />
              </Form.Group>
            </Form>
            <Form
              onSubmit={onFormSubmit}
              style={{ width: "200px", marginTop: "10px" }}
            >
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label style={{ fontSize: "13px" }}>
                  Upload Page Documant File
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="file/*"
                  onChange={(e) => {
                    setdocument(e.target.files[0]);
                  }}
                />
              </Form.Group>
            </Form>
            <Form
              onSubmit={onFormSubmit}
              style={{ width: "200px", marginTop: "10px" }}
            >
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label style={{ fontSize: "13px" }}>
                  Upload Logo Image File
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setlogo(e.target.files[0]);
                  }}
                />
              </Form.Group>
            </Form>
            <img
              src="http://gulf-empire.com/uploads/icon_image/1566714228_introbanner.jpg"
              style={{ width: "200px", height: "160px" }}
            />
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const mapStateToProps = (state) => ({ redux: state });

const mapDispatchToProps = (dispatch) => ({});

const ADDENTITY = connect(mapStateToProps, mapDispatchToProps)(AddEntity);

export default ADDENTITY;

const fetchdata = async (index) => {
  const data = await get("/api/gethome");
  console.log(typeof data);

  switch (index) {
    case 1:
      return data.slider;
    case 3:
      return data.services;
    case 4:
      return data.available_jobs;
    case 5:
      return data.countries_we_serve;
    case 6:
      return data.job_categories;
    case 7:
      return data.our_team;
    case 8:
      return data.clients;
    default:
      return data;
      break;
  }
};

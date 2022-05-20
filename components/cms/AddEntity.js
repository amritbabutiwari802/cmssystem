import React, { useRef, useState } from "react";
import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import { connect } from "react-redux";

const AddEntity = (props) => {
  console.log(props.data);
  const [mainimage, setmainimage] = React.useState(null);
  const [logo, setlogo] = React.useState(null);
  const [name, setname] = React.useState("");
  const [number, setnumber] = React.useState("");
  const [caption, setcaption] = React.useState("");
  const [maineditor, setmaineditor] = React.useState("");
  const [shorteditor, setshorteditor] = React.useState("");
  const [document, setdocument] = React.useState(null);

  function handleSubmit() {
    const data = {};
    const metadata = {};
    const givendata = props.data.addentity.metadata;
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
    data.number = number;
    data.caption = caption;
    data.shortdescription = shorteditor;
    data.detaildescription = detaildescription;

    switch (givendata.type) {
    }
  }

  function onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
  }

  function fileUpload(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", inpuref.current.value);
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
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Position</Form.Label>
                <Form.Control type="text" />
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
              <Form.Control type="text" />
            </Form.Group>
            <div style={{ marginTop: "25px", width: "700px" }}>
              {" "}
              <label>Enter short description</label>
              <SunEditor height="160px" />
            </div>
            <div style={{ marginTop: "25px", width: "700px" }}>
              {" "}
              <label>Enter detail description</label>
              <SunEditor
                height="160px"
                onChange={(value) => {
                  settest(value);
                }}
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
                alert(inpuref.current.value);
              }}
            >
              Update
            </Button>
            <img
              src="http://gulf-empire.com/uploads/icon_image/1566714228_introbanner.jpg"
              style={{ width: "200px", height: "200px" }}
            />

            <Form
              onSubmit={onFormSubmit}
              style={{ width: "200px", marginTop: "40px" }}
            >
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label style={{ fontSize: "13px" }}>
                  Upload Feature Image File
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => {}}
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
                  onChange={(e) => {}}
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
                  onChange={(e) => {}}
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

const mapStateToProps = (state) => ({ data: state });

const mapDispatchToProps = (dispatch) => ({});

const ADDENTITY = connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(AddEntity));

export default ADDENTITY;

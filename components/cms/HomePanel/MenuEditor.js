import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import { connect } from "react-redux";
import post from "../../../http/post";
import get from "../../../http/get";
import Sidebar from "../Sidebar";
import { useRouter } from "next/router";

const MenuEditor = (props) => {
  const router = useRouter();
  const [mainimage, setmainimage] = React.useState(null);
  const [logo, setlogo] = React.useState(null);
  const [name, setname] = React.useState("");
  const [number, setnumber] = React.useState("0");

  const [shorteditor, setshorteditor] = React.useState("");
  const [document, setdocument] = React.useState(null);
  const [maindata, setmaindata] = React.useState(null);
  useEffect(() => {
    setname(props.name);
  }, []);
  useEffect(() => {
    setnumber(props.number);
  }, []);
  useEffect(() => {
    setshorteditor(props.text);
  }, []);
  useEffect(() => {
    setmaindata(props.image);
  }, []);

  function handleSubmit() {
    const data = {};

    const formdata = new FormData();
    if (mainimage != null) {
      formdata.append("file", mainimage);
      data.hasimage = true;
    }

    if (document != null) {
      formdata.append("file", document);
      data.hasdocument = true;
    }

    data.name = name;

    data.shortdescription = shorteditor;

    var menu = props.menu;
    var metadata = props.metadata;
    metadata.number = parseInt(number);
    data.type = "link";
    if (metadata.type == "link") {
      if (metadata.action == "create") {
        menu.splice(parseInt(number), 0, data);
      } else {
        menu[parseInt(number)] = data;
      }
    } else {
      if (metadata.action == "addpagetodropdown") {
        menu[metadata.index].items.splice(parseInt(number), 0, data);
      } else {
        menu[metadata.index].items[parseInt(number)] = data;
      }
    }

    formdata.append("data", JSON.stringify(menu));
    formdata.append("metadata", JSON.stringify(metadata));

    post("/api/setmenu", formdata).then((result) => {
      router.reload();
    });
  }

  return (
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Position</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setnumber(e.target.value);
                }}
                value={number}
                defaultValue="0"
                type="text"
              />
            </Form.Group>
          </div>

          <div style={{ marginTop: "25px", width: "700px" }}>
            {" "}
            <label>Enter short description</label>
            <SunEditor
              height="160px"
              onChange={(value) => {
                setshorteditor(value);
              }}
              value={shorteditor}
            />
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
            onClick={handleSubmit}
          >
            Update
          </Button>
          <img style={{ width: "200px", height: "200px" }} />

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
          <Form style={{ width: "200px", marginTop: "10px" }}>
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
        </div>
      </div>
    </div>
  );
};

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default MenuEditor;

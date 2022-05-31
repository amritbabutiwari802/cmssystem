import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Sidebar from "../components/cms/Sidebar";
import post from "../http/post";
import { useRouter } from "next/router";
import get from "../http/get";

const Setglobal = () => {
  const router = useRouter();
  const [data, setdata] = useState({
    name: "jhdkjfkds",
    address: "",
    phone: "",
    email: "",
    lic: "",
    registration: "",
    pagetitle: "",
    pagedescription: "",
    facebook: "",
    twitter: "",
    youtube: "",
    instagram: "",
    linkedin: "",
    img: "",
  });

  useEffect(() => {
    get("/api/getall").then((result) => {
      setdata(result.global);
    });
  }, []);

  const [mainimage, setmainimage] = useState(null);

  function onsubmit() {
    const temp = data;
    const formdata = new FormData();
    if (mainimage != null) {
      temp.hasimage = true;
      formdata.append("file", mainimage);
    }

    formdata.append("data", JSON.stringify(temp));
    post("/api/setglobal", formdata).then(() => {
      router.reload();
    });
  }

  return (
    <Sidebar>
      <div style={{ marginTop: "40px", fontSize: "25px" }}>
        Enter the following Data
      </div>
      <Form style={{ display: "flex", gap: "25px" }}>
        <div Style={{}}>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{
              width: "400px",
            }}
          >
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setdata((prev) => ({ ...prev, name: e.target.value }));
              }}
              value={data.name}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{
              width: "400px",
            }}
          >
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
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setdata((prev) => ({ ...prev, address: e.target.value }));
              }}
              value={data.address}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{
              width: "400px",
            }}
          >
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setdata((prev) => ({ ...prev, phone: e.target.value }));
              }}
              value={data.phone}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{
              width: "400px",
            }}
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setdata((prev) => ({ ...prev, email: e.target.value }));
              }}
              value={data.email}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{
              width: "400px",
            }}
          >
            <Form.Label>License</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setdata((prev) => ({ ...prev, lic: e.target.value }));
              }}
              value={data.lic}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{
              width: "400px",
            }}
          >
            <Form.Label>Registration Number</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setdata((prev) => ({ ...prev, registration: e.target.value }));
              }}
              value={data.registration}
            />
          </Form.Group>
        </div>
        <div style={{}}>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{
              width: "400px",
            }}
          >
            <Form.Label>Page Title</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setdata((prev) => ({ ...prev, pagetitle: e.target.value }));
              }}
              value={data.pagetitle}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{
              width: "400px",
            }}
          >
            <Form.Label>Facebook link</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setdata((prev) => ({ ...prev, facebook: e.target.value }));
              }}
              value={data.facebook}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{
              width: "400px",
            }}
          >
            <Form.Label>Twitter link</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setdata((prev) => ({ ...prev, twitter: e.target.value }));
              }}
              value={data.twitter}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{
              width: "400px",
            }}
          >
            <Form.Label>Youtube Link</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setdata((prev) => ({ ...prev, youtube: e.target.value }));
              }}
              value={data.youtube}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{
              width: "400px",
            }}
          >
            <Form.Label>Instagram link</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setdata((prev) => ({ ...prev, instagram: e.target.value }));
              }}
              value={data.instagram}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            style={{
              width: "400px",
            }}
          >
            <Form.Label>LinkedIn link</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setdata((prev) => ({ ...prev, linkedin: e.target.value }));
              }}
              value={data.linkedin}
            />
          </Form.Group>{" "}
        </div>
        <div style={{ width: "100px", paddingTop: "40px" }}>
          <Button variant="success" onClick={onsubmit}>
            Upload
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default Setglobal;

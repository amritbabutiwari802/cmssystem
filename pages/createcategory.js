import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import post from "../http/post";
import { useRouter } from "next/router";
import Sidebar from "../components/cms/Sidebar";

const Jobs_available = () => {
  const router = useRouter();
  const [category, setcategory] = useState(null);
  const [shorteditor, setshorteditor] = React.useState("");
  const [country, setcountry] = useState("");
  const [image, setimage] = useState(null);
  return (
    <Sidebar>
      {" "}
      <div style={{ marginTop: "55px" }}>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlInput1"
          style={{
            width: "400px",
          }}
        >
          {" "}
          <Form.Label> Category Name</Form.Label>
          <Form.Control
            onChange={(e) => {
              setcountry(e.target.value);
            }}
            value={country}
            type="text"
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label style={{ fontSize: "13px" }}>
            Upload Feature Image File
          </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => {
              setimage(e.target.files[0]);
            }}
          />
        </Form.Group>
        <div style={{ marginTop: "25px", width: "700px" }}>
          <Button
            variant="success"
            onClick={() => {
              const formdata = new FormData();
              formdata.append("file", image);
              formdata.append("name", country);
              post("/api/createcategory", formdata).then((result) => {
                router.reload();
              });
            }}
          >
            Upload
          </Button>
        </div>
      </div>
    </Sidebar>
  );
};

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default Jobs_available;

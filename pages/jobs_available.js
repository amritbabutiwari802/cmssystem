import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import post from "../http/post";
import get from "../http/get";
import { useRouter } from "next/router";
import Sidebar from "../components/cms/Sidebar";

const Jobs_available_ox37d = () => {
  const [category, setcategory] = useState(null);
  const [shorteditor, setshorteditor] = React.useState("");
  const [country, setcountry] = useState("");
  const [name, setname] = useState("");
  const [data, setdata] = useState([]);
  const router = useRouter();
  useEffect(() => {
    get("/api/getall").then((result) => {
      setdata(result.home.job_categories);
    });
  }, []);
  return (
    <Sidebar>
      <div style={{ marginTop: "55px" }}>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select Job Categories
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {data.map((value, index) => (
              <>
                <Dropdown.Item
                  onClick={() => {
                    setcategory((prev) => index);
                  }}
                  eventKey={index}
                >
                  {value.category}
                </Dropdown.Item>
              </>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {category != null && (
          <>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              style={{
                width: "400px",
              }}
            >
              {" "}
              <Form.Label> Job Name</Form.Label>
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
              style={{
                width: "400px",
              }}
            >
              {" "}
              <Form.Label> country Name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setcountry(e.target.value);
                }}
                value={country}
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
              />
              <Button
                variant="success"
                onClick={() => {
                  const formdata = new FormData();
                  formdata.append(
                    "data",
                    JSON.stringify({
                      name: name,
                      country: country,
                      shortdescription: shorteditor,
                    })
                  );
                  formdata.append("index", category);
                  post("/api/savecategory", formdata).then((result) => {
                    router.reload();
                  });
                }}
              >
                Upload
              </Button>
            </div>
          </>
        )}
      </div>
    </Sidebar>
  );
};

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default Jobs_available_ox37d;

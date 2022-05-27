import React, { useEffect, useState } from "react";
import { Button, ButtonToolbar, Form, Table } from "react-bootstrap";
import Sidebar from "../components/cms/Sidebar";
import styles from "../styles/editslider.module.css";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import get from "../http/get";
import MenuContent from "../components/cms/MenuContent";
import MenuEditor from "../components/cms/HomePanel/MenuEditor";
import post from "../http/post";
import DropdownListing from "../components/cms/DropdownListing";

const menubar = (props) => {
  const [_metadata, setmetadata] = useState({});
  const router = useRouter();
  const [mode, setmode] = useState("menu");
  const [data, setdata] = useState([]);
  const [name_given, setname] = useState("");
  const [position_given, setposition] = useState("");

  useEffect(() => {
    get("/api/getmenu").then((result) => {
      setdata((prev) => JSON.parse(JSON.stringify(result.menu)));
    });
  }, []);

  function addpage() {
    var metadata = {};
    metadata.action = "create";
    metadata.type = "link";
    setmetadata(metadata);
    setmode("link");
  }

  function linkedit(index) {
    var metadata = {};
    metadata.action = "update";
    metadata.type = "link";
    metadata.number = index;
    setmode("editlik");
  }

  function createdropdown() {
    var metadata = {};
    setmode("createdropdown");
  }

  function listdropdown(index) {
    var metadata = {};

    metadata.index = index;
    setmetadata(metadata);
    setmode("listdropdown");
  }
  function addpagetodropdown() {
    var metadata = {};
    metadata.action = "addpagetodropdown";
    metadata.type = "dropdown";

    metadata.index = _metadata.index;
    setmetadata(metadata);
    setmode("addpagetodropdown");
  }

  function editpagestodropdown(index) {
    var metadata = {};
    metadata.action = "update";
    metadata.type = "dropdown";
    metadata.number = index;
    metadata.index = index;
    setmode("editpagestodropdown");
  }

  function deleteitem(index) {
    var metadata = {};
  }

  return (
    <Sidebar>
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <div className="">
          {mode == "menu" && (
            <MenuContent
              addpage={addpage}
              adddrop={createdropdown}
              data={data}
              update={linkedit}
              listdropdown={listdropdown}
              delete={deleteitem}
            />
          )}

          {mode == "link" && <MenuEditor menu={data} metadata={_metadata} />}
          {mode == "createdropdown" && (
            <>
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
                  value={name_given}
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
                <Form.Label>Position</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setposition(e.target.value);
                  }}
                  value={position_given}
                  defaultValue="0"
                  type="text"
                />
              </Form.Group>
              <Button
                variant="success"
                onClick={() => {
                  const formdata = new FormData();
                  const temp = data;
                  temp.splice(parseInt(position_given), 0, {
                    name: name_given,
                    type: "dropdown",
                    items: [],
                  });
                  formdata.append("data", JSON.stringify(temp));
                  formdata.append(
                    "metadata",
                    JSON.stringify({
                      type: "dropdown",
                      action: "createdropdown",
                    })
                  );
                  post("/api/setmenu", formdata).then(() => {
                    router.reload();
                  });
                }}
              >
                submit
              </Button>
            </>
          )}

          {mode == "listdropdown" && (
            <DropdownListing
              click={() => {}}
              ondelete={() => {}}
              addpage={() => {
                addpagetodropdown();
              }}
              data={data}
              metadata={_metadata}
            />
          )}

          {mode == "addpagetodropdown" && (
            <MenuEditor menu={data} metadata={_metadata} />
          )}
        </div>
      </ErrorBoundary>
    </Sidebar>
  );
};

const data = [
  { name: "Hme", type: "link" },
  { name: "ome", type: "dropdown" },
  { name: "Hoe", type: "link" },
  { name: "Home", type: "link" },
];

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  saveData: (data) => {
    dispatch({ type: "editMenu", data });
  },
  push_data_for_add_entity: (data) => {
    dispatch({ type: "addentity", data });
  },
});

const Menubar = connect(mapStateToProps, mapDispatchToProps)(menubar);

export default Menubar;

function ErrorHandler({ error }) {
  console.log(error.message);
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

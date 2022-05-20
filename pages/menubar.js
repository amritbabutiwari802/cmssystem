import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import Sidebar from "../components/cms/Sidebar";
import styles from "../styles/editslider.module.css";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";

const menubar = (props) => {
  const router = useRouter();
  return (
    <Sidebar>
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <div className="heading">DashBoard Control Panel</div>
        <div className="homepage">
          <div className="homepage_heading">
            <div> MEDIA LIST</div>
            <div>
              <Button
                onClick={() => {
                  props.push_data_for_add_entity({
                    type: "menubar",
                    innertype: "link",

                    action: "create",
                  });
                  router.push("/Editor_S");
                }}
              >
                Add Page
              </Button>
              <Button style={{ marginLeft: "16px", backgroundColor: "green" }}>
                Add Dropdown
              </Button>
            </div>
          </div>

          <Table bordered hover className="sliderform">
            <thead>
              <tr>
                <th>SN</th>
                <th>Main Text</th>
                <th>Descriptin</th>
                <th>Acton</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, index) => {
                return (
                  <tr style={{ height: "100px" }} key={index}>
                    <td style={{ height: "100px" }}>
                      <div>{index}</div>
                    </td>
                    <td>{value.link}</td>
                    <td> {value.type}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => {
                          if (value.type == "link") {
                            props.push_data_for_add_entity({
                              metadata: {
                                type: "menubar",
                                innertype: "link",
                                index,

                                action: "update",
                              },
                            });
                            router.push("/Editor_S");
                          } else {
                            props.saveData({ index });
                            router.push("/editdropdown");
                          }
                        }}
                      >
                        Edit
                      </Button>
                      <Button style={{ marginLeft: "16px" }} variant="danger">
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
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

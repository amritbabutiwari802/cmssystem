import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import Sidebar from "../components/cms/Sidebar";
import styles from "../styles/editslider.module.css";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const Menubar = (props) => {
  const router = useRouter();
  return (
    <Sidebar>
      <div className="heading">DashBoard Control Panel</div>
      <div className="homepage">
        <div className="homepage_heading">
          <div> MEDIA LIST</div>
          <div>
            <Button
              onClick={() => {
                props.push_data_for_add_entity({
                  metadata: {
                    type: "dropdown",

                    index: props.menubar.index,

                    action: "createitem",
                  },
                });
                router.push("/Editor_S");
              }}
            >
              Add Page
            </Button>
          </div>
        </div>

        <Table bordered hover className="sliderform">
          <thead>
            <tr>
              <th>SN</th>
              <th>Main Text</th>

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
                  <td>
                    <Button
                      variant="info"
                      onClick={() => {
                        props.push_data_for_add_entity({
                          metadata: {
                            type: "dropdown",

                            index: props.menubar.index,
                            innerindex: index,

                            action: "updateitem",
                          },
                        });
                        router.push("/Editor_S");
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
    </Sidebar>
  );
};

const data = [
  { name: "Home", type: "link" },
  { name: "Home", type: "dropdown" },
  { name: "Home", type: "link" },
  { name: "Home", type: "link" },
];

const mapStateToProps = (state) => ({ menubar: state.menubar });

const mapDispatchToProps = (dispatch) => ({
  push_data_for_add_entity: (data) => {
    dispatch({ type: "addentity", data });
  },
});

const MenuBar = connect(mapStateToProps, mapDispatchToProps)(Menubar);

export default MenuBar;

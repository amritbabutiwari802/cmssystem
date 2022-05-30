import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Sidebar from "../components/cms/Sidebar";
import styles from "../styles/editslider.module.css";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import get from "../http/get";
import post from "../http/post";

const Editslider = (props) => {
  const [items, setitems] = useState([]);

  React.useEffect(() => {
    async function set_data() {
      const data = await fetchdata(props.pagedata.index);

      setitems(data);
    }
    set_data();
  }, [props.pagedata.index]);

  const router = useRouter();

  function ondelete(index) {
    get("/api/getall").then((response) => {
      if (response.error) {
      } else {
        const home = response.home;

        const data = items;
        data.splice(index, 1);
        const temp = editdata(props.pagedata.index, home, data);

        const formdata = new FormData();
        formdata.append("data", JSON.stringify(temp));
        formdata.append("metadata", JSON.stringify({ type: "update" }));
        post("/api/putandpostdata", formdata).then((response) => {
          if (response.error) {
            alert("error");
          } else {
            setitems((prev) => [...data]);
          }
        });
      }
    });
  }

  return (
    <Sidebar>
      <div className="heading">DashBoard Control Panel</div>
      <div className="homepage">
        <div className="homepage_heading">
          <div> MEDIA LIST</div>{" "}
          <div>
            <Button
              style={{ marginRight: "16px", backgroundColor: "green" }}
              onClick={() => {
                router.push("/admin");
              }}
            >
              Go Back
            </Button>

            <Button
              onClick={() => {
                props.push_data_for_add_entity({
                  metadata: {
                    type: "section",
                    action: "create",
                    index: props.pagedata.index,
                  },
                });
                router.push("/Editor_S");
              }}
            >
              Add Media
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
            </tr>{" "}
          </thead>
          <tbody>
            {items.map((value, index) => {
              return (
                <tr style={{ height: "100px" }} key={index}>
                  <td style={{ height: "100px" }}>
                    <div>
                      {index}
                      <br />
                      <img
                        src={value.img}
                        style={{ height: "70px", width: "100px" }}
                      />
                    </div>
                  </td>
                  <td>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Short Description</Form.Label>
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Main Description</Form.Label>
                    </Form.Group>
                  </td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => {
                        props.push_data_for_add_entity({
                          metadata: {
                            type: "section",
                            action: "update",
                            index: props.pagedata.index,
                            innerindex: index,
                          },
                        });
                        router.push("/Editor_S");
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        ondelete(index);
                      }}
                    >
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

const fetchdata = async (index) => {
  const daTa = await get("/api/getall");
  const data = await daTa.home;
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
      break;
  }
};

const editdata = (index, data, item) => {
  switch (index) {
    case 1:
      data.slider = item;
      break;
    case 3:
      data.services = item;
      break;
    case 4:
      data.available_jobs = item;
      break;
    case 5:
      data.countries_we_serve = item;
      break;
    case 6:
      data.job_categories = item;
      break;
    case 7:
      data.our_team = item;
      break;
    case 8:
      data.clients = item;
      break;
    default:
      break;
  }
  return data;
};

const mapStateToProps = (state) => {
  return { pagedata: state.panel };
};

const mapDispatchToProps = (dispatch) => ({
  push_data_for_add_entity: (data) => {
    dispatch({ type: "addentity", data });
  },
});

const EditSlider = connect(mapStateToProps, mapDispatchToProps)(Editslider);

export default EditSlider;

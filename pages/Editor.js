import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Sidebar from "../components/cms/Sidebar";
import styles from "../styles/editslider.module.css";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import get from "../http/get";

const editslider = (props) => {
  const [items, setitems] = useState([]);

  React.useEffect(() => {
    async function set_data() {
      const data = await fetchdata(props.pagedata.index);

      setitems(data);
    }
    set_data();
  }, []);

  const router = useRouter();
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
                <tr style={{ height: "100px" }}>
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
                    <Button variant="danger">Delete</Button>
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
  {
    img: "http://gulf-empire.com/uploads/photo_gallery/1567165421_uae.jpg",
    maintext:
      "Gulf Empire Company is a young <br>   & dynamic Recruitment Services provider",
    desc: "Gulf Empire Company clients can depend on our Recruitment Services to help them improve their performance",
  },
  {
    img: "http://gulf-empire.com/uploads/photo_gallery/1567165421_uae.jpg",
    maintext:
      "Gulf Empire Company is a young <br>   & dynamic Recruitment Services provider",
    desc: "Gulf Empire Company clients can depend on our Recruitment Services to help them improve their performance",
  },
  {
    img: "http://gulf-empire.com/uploads/photo_gallery/1567165421_uae.jpg",
    maintext:
      "Gulf Empire Company is a young <br>   & dynamic Recruitment Services provider",
    desc: "Gulf Empire Company clients can depend on our Recruitment Services to help them improve their performance",
  },
];

const fetchdata = async (index) => {
  const data = await get("/api/gethome");
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

const mapStateToProps = (state) => {
  return { pagedata: state.panel };
};

const mapDispatchToProps = (dispatch) => ({
  push_data_for_add_entity: (data) => {
    dispatch({ type: "addentity", data });
  },
});

const EditSlider = connect(mapStateToProps, mapDispatchToProps)(editslider);

export default EditSlider;

import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import Sidebar from "../components/cms/Sidebar";
import styles from "../styles/editslider.module.css";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const editslider = (props) => {
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
            {data.map((value, index) => {
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
                      <Form.Label>Example textarea</Form.Label>
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Example textarea</Form.Label>
                      <Form.Control as="textarea" rows={3} />
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

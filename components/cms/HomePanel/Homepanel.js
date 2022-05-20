import { useRouter } from "next/router";
import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import Sidebar from "../Sidebar";
import { connect } from "react-redux";

const Homepanel = (props) => {
  const router = useRouter();
  return (
    <div>
      <Sidebar>
        <div className="heading">DashBoard Control Panel</div>
        <div className="homepage">
          <div className="homepae_heading">Edit your Home Page</div>
          <Table striped hover className="cms-home-dash-table">
            <thead>
              <tr>
                <th>SN.</th>
                <th>NAME</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Slider</td>
                <td>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="active"
                      defaultChecked={true}
                    />
                  </Form>
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      props.saveData({ index: 1 });
                      router.push("/Editor");
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Introduction</td>
                <td>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="active"
                      defaultChecked={true}
                    />
                  </Form>
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      props.push_data_for_add_entity({
                        metadata: { type: "introduction" },
                      });

                      router.push("/Editor_S");
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
              <tr>
                <td>3</td> <td>Our Services</td>
                <td>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="active"
                      defaultChecked={true}
                    />
                  </Form>
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      props.saveData({ index: 3 });
                      router.push("/Editor");
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Available Jobs</td>
                <td>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="active"
                      defaultChecked={true}
                    />
                  </Form>
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      props.saveData({ index: 4 });
                      router.push("/Editor");
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
              <tr>
                <td>5</td> <td>Countries We Serve</td>
                <td>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="active"
                      defaultChecked={true}
                    />
                  </Form>
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      props.saveData({ index: 5 });
                      router.push("/Editor");
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
              <tr>
                <td>6</td> <td>Jobs Categories</td>
                <td>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="active"
                      defaultChecked={true}
                    />
                  </Form>
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      props.saveData({ index: 6 });
                      router.push("/Editor");
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
              <tr>
                <td>7</td>
                <td>Our Team</td>
                <td>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="actve"
                      defaultChecked={true}
                    />
                  </Form>
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      props.saveData({ index: 7 });
                      router.push("/Editor");
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
              <tr>
                <td>8</td> <td>Our Clients</td>
                <td>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="active"
                      defaultChecked={true}
                    />
                  </Form>
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      props.saveData({ index: 8 });
                      router.push("/Editor");
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Sidebar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  saveData: (data) => {
    dispatch({ type: "add_data", data });
  },
  push_data_for_add_entity: (data) => {
    dispatch({ type: "addentity", data });
  },
});

const HPanel = connect(mapStateToProps, mapDispatchToProps)(Homepanel);

export default HPanel;

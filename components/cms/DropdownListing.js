import { faDisplay } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Button, Table } from "react-bootstrap";

const DropdownListing = (props) => {
  return (
    <div>
      {" "}
      <div
        style={{
          marginTop: "25px",
          marginBottom: "25px",
          display: "flex",
          gap: "25px",
        }}
      >
        <Button
          onClick={() => {
            props.addpage();
          }}
        >
          Add Page
        </Button>
        <Button
          onClick={() => {
            props.go_to_main_page();
          }}
          variant="danger"
        >
          Go Back
        </Button>
      </div>
      <Table bordered hover className="sliderform">
        <thead>
          <tr>
            <th>SN</th>
            <th>Name</th>

            <th>Acton</th>
          </tr>
        </thead>
        <tbody>
          {props.data[props.metadata.index].items.map((value, index) => {
            return (
              <tr style={{ height: "40px" }} key={index}>
                <td style={{ height: "40px" }}>
                  <div>{index}</div>
                </td>
                <td>{value.name}</td>

                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      props.click(index);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{ marginLeft: "16px" }}
                    variant="danger"
                    onClick={() => {
                      props.ondelete(props.metadata.index, index);
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
  );
};

export default DropdownListing;

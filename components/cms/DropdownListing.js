import React from "react";
import { Button, Table } from "react-bootstrap";

const DropdownListing = (props) => {
  return (
    <div>
      {" "}
      <div> MEDIA LIST</div>
      <div>
        <Button
          onClick={() => {
            props.addpage();
          }}
        >
          Add Page
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
              <tr style={{ height: "100px" }} key={index}>
                <td style={{ height: "100px" }}>
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
                      props.ondelete(index);
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

import React from "react";
import { Button, Table } from "react-bootstrap";

const MenuContent = (props) => {
  return (
    <div>
      <div> MEDIA LIST</div>
      <div>
        <Button
          onClick={() => {
            props.addpage();
          }}
        >
          Add Page
        </Button>
        <Button
          style={{ marginLeft: "16px", backgroundColor: "green" }}
          onClick={() => {
            props.adddrop();
          }}
        >
          Add Dropdown
        </Button>
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
          {props.data.map((value, index) => {
            return (
              <tr style={{ height: "100px" }} key={index}>
                <td style={{ height: "100px" }}>
                  <div>{index}</div>
                </td>
                <td>{value.name}</td>
                <td> {value.type}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      if (value.type == "menu") {
                        props.editmenu(index);
                      } else {
                        props.listdropdown(index);
                      }
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{ marginLeft: "16px" }}
                    variant="danger"
                    onClick={() => {
                      props.delete(index);
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

export default MenuContent;

import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import styles from "../styles/images.module.css";

const images = () => {
  return (
    <div
      className={getcss([styles.container])}
      //   style={{
      //     display: "grid",
      //     gridTemplateColumns: "250px 250px 250px 250px",
      //     gridColumnGap: "10px",
      //   }}
    >
      {getImages().map((value, index) => (
        <>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={value.img}
              style={{ width: "100%", maxWidth: "400px", height: "200px" }}
            />
            <Card.Body>
              <Button variant="danger">Delete</Button>
            </Card.Body>
          </Card>
        </>
      ))}

      <Form style={{ width: "200px", marginTop: "40px" }}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label style={{ fontSize: "13px" }}>
            Upload Video File
          </Form.Label>
          <Form.Control
            type="file"
            accept="video/*"
            onChange={(e) => {
              setmainimage(e.target.files[0]);
            }}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default images;

function getcss(classes) {
  var temp = " ";
  classes.forEach((element, index) => {
    temp = temp + ` ${element}`;
  });
  return temp;
}
function getImages() {
  return [
    {
      img: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQaVdCxNyljfriFUv3uHLKFLiz4XHPX5o2szj13PlphRw3kNOGPXL-460UTNZkhd10E",
    },
    {
      img: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQaVdCxNyljfriFUv3uHLKFLiz4XHPX5o2szj13PlphRw3kNOGPXL-460UTNZkhd10E",
    },

    {
      img: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQaVdCxNyljfriFUv3uHLKFLiz4XHPX5o2szj13PlphRw3kNOGPXL-460UTNZkhd10E",
    },
    {
      img: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQaVdCxNyljfriFUv3uHLKFLiz4XHPX5o2szj13PlphRw3kNOGPXL-460UTNZkhd10E",
    },
    {
      img: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQaVdCxNyljfriFUv3uHLKFLiz4XHPX5o2szj13PlphRw3kNOGPXL-460UTNZkhd10E",
    },
    {
      img: "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQaVdCxNyljfriFUv3uHLKFLiz4XHPX5o2szj13PlphRw3kNOGPXL-460UTNZkhd10E",
    },
  ];
}

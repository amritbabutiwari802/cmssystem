import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import Sidebar from "../components/cms/Sidebar";
import get from "../http/get";
import post from "../http/post";
import styles from "../styles/images.module.css";
import { useRouter } from "next/router";

const Images_oxk31 = () => {
  const [data, setdata] = useState({ image: [], video: [] });
  const [image, setimage] = useState(null);
  const router = useRouter();
  useEffect(() => {
    get("/api/getmedia").then((result) => {
      if (result.error) {
      } else {
        setdata(result);
      }
    });
  }, []);
  return (
    <Sidebar>
      <div
        className={getcss([styles.container])}
        //   style={{
        //     display: "grid",
        //     gridTemplateColumns: "250px 250px 250px 250px",
        //     gridColumnGap: "10px",
        //   }}
      >
        {data.image.map((value, index) => (
          <>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={value}
                style={{ width: "100%", maxWidth: "400px", height: "200px" }}
              />
              <Card.Body>
                <Button
                  variant="danger"
                  onClick={() => {
                    const temp = data;
                    temp.image.splice(index, 1);
                    const formdata = new FormData();
                    formdata.append("data", JSON.stringify(temp));
                    formdata.append("metadata", "update");
                    post("/api/savemedia", formdata).then((response) => {
                      if (response.error) {
                        alert(response);
                      } else {
                        router.reload();
                      }
                    });
                  }}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </>
        ))}

        <Form style={{ width: "200px", marginTop: "40px" }}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label style={{ fontSize: "13px" }}>
              Upload Feature Image File
            </Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                setimage(e.target.files[0]);
              }}
            />
          </Form.Group>
          <Button
            variant="success"
            onClick={() => {
              const formdata = new FormData();
              formdata.append("file", image);
              formdata.append("metadata", "upload_image");
              post("/api/savemedia", formdata).then((result) => {
                router.reload();
              });
            }}
          >
            Upload
          </Button>
        </Form>
      </div>
    </Sidebar>
  );
};

export default Images_oxk31;

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

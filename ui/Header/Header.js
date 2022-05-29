import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

const Header = (props) => {
  return (
    <>
      <div className={styles.container}>
        <div>
          {" "}
          <div>LIC NO. {props.lic}</div>
          <div>Registration No. {props.registration}</div>
        </div>
        <div>
          Phone : {props.global.phone}
          <br />
          Email : {props.global.email}
        </div>
      </div>
      <div className={styles.logocontainer}>
        <img src={props.global.img} className={styles.logo} />
        <div className={styles.socialcontainer}>
          <img
            className={styles.socialmedia}
            src="https://www.facebook.com/images/fb_icon_325x325.png"
          />

          <img
            className={styles.socialmedia}
            src="https://image.similarpng.com/very-thumbnail/2020/07/Youtube-logo-design-on-transparent-PNG.png"
          />
          <img
            className={styles.socialmedia}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGcq7xPymFEJuiJ1wnxaeWRQyWq62TWAekA&usqp=CAU"
          />
          <img className={styles.socialmedia} src="/twitter.png" />
        </div>
      </div>
    </>
  );
};

export default Header;

const Appbar = (props) => {
  const router = useRouter();
  return (
    <div className={styles.appbar}>
      <div className={styles.appbarcontainer}>
        <div
          className={styles.menuitem}
          onClick={async () => {
            await props.saveData({});

            router.push("/");
          }}
        >
          Home
        </div>
        {props.menu.map((value, index) => {
          if (value.type == "menu" && !["Gallery"].includes(value.name)) {
            return (
              <div
                className={styles.menuitem}
                onClick={async () => {
                  await props.saveData(value);

                  router.push("/pages");
                }}
              >
                {value.name}
              </div>
            );
          } else if (
            value.type == "menu" &&
            ["Services", "Jobs"].includes(value.name)
          ) {
            return (
              <div
                className={styles.menuitem}
                onClick={async () => {
                  await props.saveData(value);

                  router.push("/" + value.name);
                }}
              >
                {value.name}
              </div>
            );
          } else if (value.type == "menu" && ["Gallery"].includes(value.name)) {
            return (
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className={styles.dropdownitem}
                >
                  {value.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={async () => {
                      router.push("/imagegallery");
                    }}
                  >
                    IMAGES
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={async () => {
                      router.push("/videogallery");
                    }}
                  >
                    VIDEOS
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            );
          } else {
            return (
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className={styles.dropdownitem}
                >
                  {value.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {value.items.map((item, itemindex) => (
                    <>
                      <Dropdown.Item
                        onClick={async () => {
                          await props.saveData(item);
                          router.push("/pages");
                        }}
                      >
                        {item.name}
                      </Dropdown.Item>
                    </>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            );
          }
        })}
      </div>

      <div className={styles.apply}>Apply Now</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => ({
  saveData: (data) => {
    dispatch({ type: "page", data });
  },
});

const AppBar = connect(mapStateToProps, mapDispatchToProps)(Appbar);

export {
  AppBar,
  Slider,
  Introduction,
  Services,
  Jobs_categories,
  Countries_we_serve,
  Jobs_available,
  OurTeam,
  OurClient,
  Footer,
  ImageContainer,
  JobContainer,
  ServicePage,
};

const Slider = (props) => {
  return (
    <div className={styles.slidercontainer}>
      <Carousel
        showThumbs={false}
        axis="horizontal"
        autoPlay={true}
        infiniteLoop={true}
      >
        {props.slider.map((value, index) => (
          <img className={styles.sliderimage} src={value.img} />
        ))}
      </Carousel>
    </div>
  );
};

const Introduction = (props) => {
  return (
    <div className={styles.introduction}>
      <div className={styles.introduction_text_container_box}>
        <div className={styles.introduction_heading}>Company Profile</div>
        <div className={styles.introduction_shortdescription}>
          <div
            dangerouslySetInnerHTML={{
              __html: props.introduction.shortdescription,
            }}
          />
        </div>
        <Button color="white" variant="info">
          Load More
        </Button>
      </div>
      <img className={styles.intro_image} src={props.introduction.image} />
    </div>
  );
};

const Services = (props) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    setdata(mapArray(props.services));
  }, []);

  return (
    <div className={styles.servicescontainer}>
      <div className={styles.serviceheading}> Our Services </div>
      <Carousel
        className={styles.servicecontainer}
        showThumbs={false}
        axis="horizontal"
        autoPlay={true}
        infiniteLoop={true}
      >
        {data.map((value, index) => (
          <div className={styles.servicesmapper}>
            {value.map((lvalue, index) => (
              <Card className={styles.servicescard}>
                <Card.Img variant="top" src={lvalue.img} />
                <Card.Body>
                  <Card.Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: lvalue.shortdescription,
                      }}
                    />
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

function mapArray(array) {
  if (array.length < 3) {
    return [array];
  } else {
    var temp = [];
    var i = 0,
      j = 0;
    while (j < array.length) {
      if (array.length - j == 1) {
        temp[i] = [array[j]];
      } else if (array.length - j == 2) {
        temp[i] = [array[j], array[j + 1]];
      } else {
        temp[i] = [array[j], array[j + 1], array[j + 2]];
      }
      i++;
      j = j + 3;
    }
    console.log(temp);
    return temp;
  }
}

const Jobs_categories = (props) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    setdata(mapArray(props.jobs_categories));
  }, []);
  return (
    <div className={styles.jobs_categories_box}>
      <div className={styles.jobsheading}> Jobs Categories</div>
      <Carousel
        className={styles.servicecontainer}
        showThumbs={false}
        axis="horizontal"
        autoPlay={true}
        infiniteLoop={true}
      >
        {data.map((value, index) => (
          <div className={styles.servicesmapper}>
            {value.map((lvalue, index) => (
              <Card className={styles.servicescard}>
                <Card.Img
                  variant="top"
                  src={lvalue.img}
                  className={styles.jobs_card_available}
                />
                <Card.Body>
                  <Card.Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: lvalue.category,
                      }}
                    />
                  </Card.Text>
                  <Button color="white" variant="info">
                    View Jobs
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const Countries_we_serve = (props) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    setdata(mapArray(props.countries_we_serve));
  }, []);
  return (
    <div className={styles.jobs_categories_box}>
      <div className={styles.jobsheading}> Countries We Serve</div>
      <Carousel
        className={styles.servicecontainer}
        showThumbs={false}
        axis="horizontal"
        autoPlay={true}
        infiniteLoop={true}
      >
        {data.map((value, index) => (
          <div className={styles.servicesmapper}>
            {value.map((lvalue, index) => (
              <Card className={styles.servicescard}>
                <Card.Img
                  variant="top"
                  src={lvalue.img}
                  className={styles.jobs_card_available}
                />
                <Card.Body>
                  <Card.Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: lvalue.shortdescription,
                      }}
                    />
                  </Card.Text>
                  <Button color="white" variant="info">
                    View Jobs
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const Jobs_available = (props) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    setdata(mapArray(spreadarray(props.job_categories)));
  }, []);
  return (
    <div className={styles.jobs_categories_box}>
      <div className={styles.jobsheading}> Jobs_available</div>
      <Carousel
        className={styles.servicecontainer}
        showThumbs={false}
        axis="horizontal"
        autoPlay={true}
        infiniteLoop={true}
      >
        {data.map((value, index) => (
          <div className={styles.servicesmapper}>
            {value.map((lvalue, index) => (
              <Card className={styles.servicescard}>
                <Card.Img
                  variant="top"
                  src={lvalue.img}
                  className={styles.jobs_card_available}
                />
                <Card.Body>
                  <Card.Text>
                    <div>{lvalue.name}</div>
                    <div>{lvalue.country}</div>
                  </Card.Text>
                  <Button color="white" variant="info">
                    View Jobs
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

function spreadarray(array) {
  const temp = [];
  array.forEach((value, index) => {
    value.counrties.forEach((item, itemindex) => {
      temp.splice(0, 0, {
        ...item,
        img: value.img,
        category: value.category,
      });
    });
  });
  return temp;
}

const OurTeam = (props) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    setdata(mapArray(props.our_team));
  }, []);
  return (
    <div className={styles.jobs_categories_box}>
      <div className={styles.jobsheading}> Our Team</div>
      <Carousel
        className={styles.servicecontainer}
        showThumbs={false}
        axis="horizontal"
        autoPlay={true}
        infiniteLoop={true}
      >
        {data.map((value, index) => (
          <div className={styles.servicesmapper}>
            {value.map((lvalue, index) => (
              <Card className={styles.servicescard}>
                <Card.Img
                  variant="top"
                  src={lvalue.img}
                  className={styles.jobs_card_available}
                />
                <Card.Body>
                  <Card.Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: lvalue.shortdescription,
                      }}
                    />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: lvalue.detaildescription,
                      }}
                    />
                  </Card.Text>
                  <Button color="white" variant="info">
                    View Jobs
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const OurClient = (props) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    setdata(mapArray(props.clients));
  }, []);
  return (
    <div className={styles.jobs_categories_box}>
      <div className={styles.jobsheading}> Our Client</div>
      <Carousel
        className={styles.servicecontainer}
        showThumbs={false}
        axis="horizontal"
        autoPlay={true}
        infiniteLoop={true}
      >
        {data.map((value, index) => (
          <div className={styles.servicesmapper}>
            {value.map((lvalue, index) => (
              <Card className={styles.servicescard}>
                <Card.Img
                  variant="top"
                  src={lvalue.img}
                  className={styles.jobs_card_available}
                />
                <Card.Body>
                  <Card.Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: lvalue.shortdescription,
                      }}
                    />
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        ))}
      </Carousel>
      <Button color="white" variant="success" style={{ marginTop: "25px" }}>
        View All
      </Button>
    </div>
  );
};

const Footer = (props) => {
  return (
    <div>
      <div className={styles.footer_container}>
        <div className={styles.global_container}>
          <div className={styles.footor_name}>{props.data.global.name}</div>
          <div className={styles.footor_address}>
            {props.data.global.address}
          </div>
          <div className={styles.footor_email}>{props.data.global.phone}</div>
          <div className={styles.footor_email}>{props.data.global.email}</div>
          <div className={styles.footor_email}>
            License no. :{props.data.global.lic}
          </div>
          <div className={styles.footor_email}>
            Registration no. : {props.data.global.registration}
          </div>
        </div>
        <div className={styles.navigation_container}>
          Navigation
          <div className={styles.footer_nav}>
            {props.data.menu.map((value, inde) => (
              <div className={styles.footer_navitem}>
                {">"}
                {"> "}
                {value.name}
              </div>
            ))}
          </div>
          <div className={styles.footor_name}></div>
        </div>
      </div>
      <div
        className={styles.logocontainer}
        style={{ background: "#267adf", color: "white" }}
      >
        <div className={styles.footertext}>
          {props.data.global.name} | All Rights Reserved © 2019, By: Radiant
          Infotech
        </div>
        <div className={styles.socialcontainer}>
          <img
            className={styles.socialmedia}
            src="https://www.facebook.com/images/fb_icon_325x325.png"
          />

          <img
            className={styles.socialmedia}
            src="https://image.similarpng.com/very-thumbnail/2020/07/Youtube-logo-design-on-transparent-PNG.png"
          />
          <img
            className={styles.socialmedia}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzGcq7xPymFEJuiJ1wnxaeWRQyWq62TWAekA&usqp=CAU"
          />
          <img className={styles.socialmedia} src="/twitter.png" />
        </div>
      </div>
    </div>
  );
};

const ImageContainer = (props) => {
  return (
    <div className={styles.imagecontainer_gellery}>
      {props.images.map((value) => (
        <img className={styles.imageitem_gallery} src={value} key={value} />
      ))}
    </div>
  );
};

const JobContainer = (props) => {
  const [jobs, setjobs] = useState({ counrties: [] });

  return (
    <div className={styles.jobcontainer}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select a Job Category
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {props.jobs.map((value, index) => (
            <>
              <Dropdown.Item
                onClick={() => {
                  setjobs((prev) => value);
                }}
                eventKey={index}
              >
                {value.category}
              </Dropdown.Item>
            </>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {jobs.counrties.map((value, index) => {
        return (
          <div>
            <Card className={styles.servicescard}>
              <Card.Img
                variant="top"
                src={jobs.img}
                className={styles.jobs_card_available}
              />
              <Card.Body>
                <Card.Text>
                  <div>Job Category : {jobs.category}</div>
                  <div>Job Name : {value.name}</div>
                  <div> Country : {value.country}</div>
                </Card.Text>
                <Button color="white" variant="info">
                  See Description
                </Button>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

const ServicePage = (props) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    setdata(props.services);
  }, []);

  return (
    <div className={styles.servicespage}>
      {data.map((value, index) => (
        <Card className={styles.servicescard_page}>
          <Card.Img variant="top" src={value.img} />
          <Card.Body>
            <Card.Text>
              <div
                dangerouslySetInnerHTML={{
                  __html: value.shortdescription,
                }}
              />
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

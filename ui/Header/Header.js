import React, { useEffect, useState } from "react";
import { Button, Card, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

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
        <div className={styles.socialcontainer}>
          <img
            className={styles.socialmedia}
            src="https://www.pngitem.com/pimgs/m/11-117236_transparent-facebook-icon-clipart-black-icon-fb-png.png"
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
    
    </>
  );
};

export default Header;

const Apbar = dynamic(() => APPBAR, {
  ssr: false,
});

function Appbar(props) {
  const [stickyClass, setStickyClass] = useState('relative');

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 500 ? setStickyClass('fixed top-0 left-0 z-50') : setStickyClass('relative');
    }
  };

  return <ApPbar {...props} />;
}


const ApPbar = (props) => {
  const router = useRouter();
  return (
    <div className={styles.appbar}>
      <div className={styles.appbarcontainer}>
      <img src={props.global.img} className={styles.logo} />
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
          if (
            value.type == "menu" &&
            !["Gallery", "Services", "Jobs"].includes(value.name)
          ) {
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
          } else if (value.type == "dropdown") {
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
                  {value.items.length > 0 &&
                    value.items.map((item, itemindex) => (
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
        className={styles.sliderimagecontainer}
        showIndicators={false}
      >
        {props.slider.map((value, index) => (
          
          <img className={styles.sliderimage} src={value.img}key={index} />
         
        ))}
      </Carousel>
    </div>
  );
};

const Introduction = (props) => {
  return (
    <div className={styles.introduction}>
      <div className={styles.introduction_text_container_box}>
        <div className={styles.introduction_heading}>WELCOME TO {props.global.name}</div>
        <div className={styles.introduction_subheading}>WHY CHOOSE US ?</div>
        <div className={styles.introduction_shortdescription}>
          <div
            dangerouslySetInnerHTML={{
              __html: props.introduction.shortdescription,
            }}
          />
        </div>
        <Button  bsClass="custom-btn"color="white"  className={styles.introduction_loadmore}>
          Load More
        </Button>
      </div>
      <img className={styles.intro_image} src="/uploads/mamager_r.png" />
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
        showIndicators={false}
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
    <div className={styles.jobs_categories_bx}>
      <div className={styles.jobsheading}> Jobs Categories</div>
      <Carousel
        className={styles.servicecontainer}
        showThumbs={false}
        axis="horizontal"
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
      >
        {data.map((value, index) => (
          <div className={styles.servicesmapper}>
            {value.map((lvalue, index) => (
              <Card className={styles.servicescard}>
              
                <Card.Body>
                 <img  src={lvalue.img}
                  className={styles.jobs_card_available} />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: lvalue.category,
                      }}
                    />
               
                 
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
        showIndicators={false}
      >
        {data.map((value, index) => (
          <div className={styles.servicesmapper}>
            {value.map((lvalue, index) => (
              <Card className={styles.countriesWe}>
               
                <Card.Body>
                  <Card.Text>
                    <img   src={lvalue.img}
                  className={styles.jobs_cad_available} />
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

const Jobs_available = (props) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    setdata(mapArray(spreadarray(props.job_categories)));
  }, []);
  return (
    <div className={styles.jobs_categories_box}>
      <div className={styles.jobsheading}> Job you Can Apply For</div>
      <Carousel
        className={styles.servicecontainer}
        showThumbs={false}
        axis="horizontal"
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        
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
                  <Button color="white"  className={styles.introduction_loadmore}>
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
    <div className={styles.teamcontainer}>
      <div className={styles.teamheding}> Our Team</div>
     
        {data.map((value, index) => (
          <div className={styles.teammapper}>
            {value.map((lvalue, index) => (
              <div className={styles.teamcard}>
             
                    <img   src={lvalue.img}
                  className={styles.team} />
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
                
              </div>
            ))}
          </div>
        ))}
    
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
        showIndicators={false}
      >
        {data.map((value, index) => (
          <div className={styles.servicesmapper} key={index}>
            {value.map((lvalue, index) => (
           
                <img
                key={index}
                  variant="top"
                  src={lvalue.img}
                  className={styles.client}
                />
               
             
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

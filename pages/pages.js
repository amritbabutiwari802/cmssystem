import React, { useEffect } from "react";
import { connect } from "react-redux";
import get from "../http/get";
import Header, { AppBar, Footer } from "../ui/Header/Header";

const pages = (props) => {
  const [data, setdata] = React.useState({ loaded: false });
  useEffect(() => {
    get("/api/gethome").then((result) => {
      setdata((prev) => ({ ...prev, pagedata: result, pageloaded: true }));
    });
  }, []);
  useEffect(() => {
    get("/api/getmenu").then((result) => {
      setdata((prev) => ({ ...prev, menu: result.menu, menuloaded: true }));
    });
  }, []);
  useEffect(() => {
    get("/api/getglobal").then((result) => {
      setdata((prev) => ({
        ...prev,
        global: result.global,
        globalloaded: true,
      }));
    });
  }, []);

  return (
    <div>
      {data.globalloaded && data.menuloaded && (
        <>
          <Header
            global={data.global}
            lic={data.global.lic}
            registration={data.global.registration}
          />

          <AppBar menu={data.menu} reload={true} />

          <div>
            {props.data.hasimage && (
              <>
                <img
                  src={props.data.img}
                  style={{
                    width: "70%",
                    marginLeft: "15%",
                    marginRight: "15%",
                    marginTop: "40px",
                    marginBottom: "40px",
                  }}
                />
              </>
            )}
            <div
              style={{
                width: "70%",
                marginLeft: "15%",
                marginRight: "15%",

                marginBottom: "40px",
              }}
              dangerouslySetInnerHTML={{
                __html: props.data.shortdescription,
              }}
            />
          </div>
          <Footer data={{ global: data.global, menu: data.menu }} />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { data: state.pagereducer };
};
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(pages);

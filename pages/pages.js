import React, { useEffect } from "react";
import { connect } from "react-redux";
import get from "../http/get";
import Header, { AppBar, Footer } from "../ui/Header/Header";

const Pages_gjw6 = (props) => {
  const [data, setdata] = React.useState({ loaded: false });
  useEffect(() => {
    get("/api/getall").then((result) => {
      setdata((prev) => ({
        ...prev,
        pagedata: result,
        menu: result.menu,
        global: result.global,
        pageloaded: true,
      }));
    });
  }, []);

  return (
    <div>
      {data.pageloaded && (
        <>
          <Header
            global={data.global}
            lic={data.global.lic}
            registration={data.global.registration}
          />

          <AppBar menu={data.menu} reload={true} />

          <div>
            {typeof props.data.img == "string" && (
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
                __html: props.data.text,
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

export default connect(mapStateToProps, mapDispatchToProps)(Pages_gjw6);

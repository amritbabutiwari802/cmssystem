import React, { useEffect } from "react";
import { connect } from "react-redux";
import get from "../http/get";
import Header, { AppBar, Footer, ImageContainer } from "../ui/Header/Header";

const Pages_ox01 = (props) => {
  const [data, setdata] = React.useState({ loaded: false });
  useEffect(() => {
    get("/api/getall").then((result) => {
      setdata((prev) => ({
        ...prev,
        pagedata: result,
        menu: result.menu,
        global: result.global,
        media: result.media,
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
            <ImageContainer images={data.media.image} />
          </div>
          <Footer data={{ global: data.global, menu: data.menu }} />
        </>
      )}
    </div>
  );
};



export default Pages_ox01

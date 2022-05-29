import React, { useEffect } from "react";
import { connect } from "react-redux";
import get from "../http/get";
import Header, {
  AppBar,
  Footer,
  ImageContainer,
  JobContainer,
  ServicePage,
} from "../ui/Header/Header";

const Pages_skdj93 = (props) => {
  const [data, setdata] = React.useState({ loaded: false });
  useEffect(() => {
    get("/api/getall").then((result) => {
      setdata((prev) => ({
        ...prev,
        pagedata: result.home,
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
            <ServicePage services={data.pagedata.services} />
          </div>
          <Footer data={{ global: data.global, menu: data.menu }} />
        </>
      )}
    </div>
  );
};

export default Pages_skdj93;

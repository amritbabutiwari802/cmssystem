import React, { useEffect } from "react";
import { connect } from "react-redux";
import get from "../http/get";
import Header, {
  AppBar,
  Footer,
  ImageContainer,
  JobContainer,
} from "../ui/Header/Header";

const Pages_kdefd3 = (props) => {
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
            <JobContainer jobs={data.pagedata.job_categories} />
          </div>
          <Footer data={{ global: data.global, menu: data.menu }} />
        </>
      )}
    </div>
  );
};

export default Pages_kdefd3;

import React, { useEffect } from "react";
import { connect } from "react-redux";
import get from "../http/get";
import Header, {
  AppBar,
  Countries_we_serve,
  Footer,
  Introduction,
  Jobs_available,
  Jobs_categories,
  OurClient,
  OurTeam,
  Services,
  Slider,
} from "../ui/Header/Header";

export default function Home() {
  const [data, setdata] = React.useState({ loaded: false });
  useEffect(() => {
    get("/api/getall").then((result) => {
      setdata((prev) => ({
        ...prev,
        pagedata: result.home,
        menu: result.menu,
        global: result.global,
        media: global.media,
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

          <AppBar menu={data.menu} global={data.global}/>
          <Slider slider={data.pagedata.slider} />
          <Introduction introduction={data.pagedata.introduction} global={data.global}/>
          <Services services={data.pagedata.services} />
          <Jobs_categories jobs_categories={data.pagedata.job_categories} />
          <Countries_we_serve
            countries_we_serve={data.pagedata.countries_we_serve}
          />
        <Jobs_available job_categories={data.pagedata.job_categories} />
         <OurTeam our_team={data.pagedata.our_team} />
          <OurClient clients={data.pagedata.clients} />
          <Footer data={{ global: data.global, menu: data.menu }} /> 
        </>
      )}
    </div>
  );
}

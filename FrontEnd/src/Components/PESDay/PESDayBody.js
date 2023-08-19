import React,{ useEffect, useState, useRef } from "react";
import axios from 'axios';
import PESstyles from "../../Components_style/PESDay_css/PESDayBody.module.css";
import PESDayEvents from './PesDayEvents';
import PesDayImageCarousel from "./PesDayImageCarousel";

export default function PESDayBody() {

  const [sponsor, setSponsor] = useState();
  const [teaser, setTeaser] = useState();
  const name = useRef("");
  const response = useRef(null);
  useEffect( () => {
    const fetchData = async () => {
      try{
        name.current = "Sponsor IMG"
        response.current  = await axios.get(`/api/images/Images/${name.current}`)
        setSponsor(response.current.data);
        name.current = "Teaser";
        response.current = await axios.get(`/api/images/Images/${name.current}`);
        setTeaser(response.current.data);
      }catch(error){
        console.log(error);
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <div className={PESstyles.outer_container}>
        <div className={PESstyles.section1}>
          {teaser&&
          <div className={PESstyles.trailer} key={teaser._id}>
            <video
              src={teaser.imgLink}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>}
        </div>
        <div className={PESstyles.section2}>
          <PesDayImageCarousel/>
        </div>
        <div className={PESstyles.section3}>
          <PESDayEvents />
        </div>
        <div className={PESstyles.section4}>
          <div className={PESstyles.heading}>SPONSORS</div>
          <div className={PESstyles.sponsor}>
            <div className={PESstyles.ImgContainer}>
            {sponsor && <img src={sponsor.imgLink} alt="SponsorIMG"/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
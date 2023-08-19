import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import axios from "axios";
import VantaComponent from "./Vanta(Execom)";
import ExecomeStyles from "../../Components_style/ExecomPage_css/Execom_Body.module.css";
import AnimatedCube from "../AnimatedCube";

export default function Execom_Body() {
  const [execomData, setExecomData] = useState({});
  const [isExpanded, setIsExpanded] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const [, setIsAllDataDisplayed] = useState(false);
  const currentYear = 2023;

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (let year = 2019; year <= currentYear; year++) {
          const response = await axios.get(`/api/execom/${year}`);
          setExecomData((prevData) => ({
            ...prevData,
            [year]: response.data,
          }));
        }
        setIsAllDataDisplayed(true);
      } catch (error) {
        console.error("Error fetching executive committee data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const currentYearData = execomData[currentYear] || [];
    const isAllDataDisplayed =
      currentYearData.length > 0 &&
      currentYearData.every((doc) => doc.isDisplayed);
    setIsAllDataDisplayed(isAllDataDisplayed);
  }, [execomData, currentYear]);

  const handleClick = (year) => {
    setIsExpanded((prevExpanded) => (prevExpanded === year ? null : year));
  };

  const renderExecomDocuments = (year) => {
    const documents = execomData[year] || [];
    return documents.map((doc) => (
      <div className={ExecomeStyles.wrap} key={doc._id}>
        <div className={ExecomeStyles.image}>
          <img src={doc.imgLink} alt="Executive Committee Member" />
        </div>
        <div className={ExecomeStyles.name}>{doc.name}</div>
        <div className={ExecomeStyles.designation}>{doc.designation}</div>
      </div>
    ));
  };

  const renderExecom = (year) => {
    const hasData = execomData.hasOwnProperty(year);

    return (
      <div className={ExecomeStyles.collapse_item} key={year}>
        {hasData && (
          <Collapsible
            trigger={
              <div
                className={ExecomeStyles.collapse_year}
                onClick={() => handleClick(year)}
              >
                {year} Execom
              </div>
            }
            open={isExpanded === year}
          >
            <div className={ExecomeStyles.inner}>
              {renderExecomDocuments(year)}
            </div>
          </Collapsible>
        )}
      </div>
    );
  };

  const DropdownLoop = () => {
    const years = Array.from(
      { length: currentYear - 2019 },
      (_, index) => currentYear - index - 1
    );
    return years.map((year) => renderExecom(year));
  };

  return (
    <>
      {isLoading && <AnimatedCube />}
      {!isLoading && (
        <>
          <div className={ExecomeStyles.vanta_wrap}>
            <VantaComponent />
            <div className={ExecomeStyles.title}>EXECOM</div>
          </div>
          <div className={ExecomeStyles.outer_container}>
            <div className={ExecomeStyles.current}>
              <div className={ExecomeStyles.heading}>
                The {currentYear} Execom
              </div>
              <div className={ExecomeStyles.content}>
                <div className={ExecomeStyles.inner}>
                  {renderExecomDocuments(currentYear)}
                </div>
              </div>
            </div>
            <div className={ExecomeStyles.dropdown}>
              <div className={ExecomeStyles.collapse_container}>
                <DropdownLoop />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

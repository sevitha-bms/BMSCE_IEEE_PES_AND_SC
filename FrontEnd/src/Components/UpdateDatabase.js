import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import databaseStyles from "../Components_style/Database_css/UpdateDatabase.module.css";
const MenuBar = lazy(() => import("./DatabaseFiles/MenuBar"));
const EventInput = lazy(() => import("./DatabaseFiles/EventInput"));
const PESDayInput = lazy(() => import("./DatabaseFiles/PESDayInput"));
const EventDelete = lazy(() => import("./DatabaseFiles/EventDelete"));
const PESDayDelete = lazy(() => import("./DatabaseFiles/PESDayDelete"));
const ExecomInput = lazy(() => import("./DatabaseFiles/ExecomInput"));
const ExecomDelete = lazy(() => import("./DatabaseFiles/ExecomDelete"));
const ImageInput = lazy(() => import("./DatabaseFiles/ImageInput"));
const ImageDelete = lazy(() => import("./DatabaseFiles/ImageDelete"));
const YearDropdown = lazy(() => import("./DatabaseFiles/YearDropdown"));
const PosterTypeDropdown = lazy(() =>
  import("./DatabaseFiles/PosterTypeDropdown")
);
const Button = lazy(() => import("./DatabaseFiles/Button"));

export default function UpdateDatabase() {
  const [menuIndex, setMenuIndex] = useState(null);
  const [eventButtonIndex, setEventButtonIndex] = useState(null);
  const [pesDay_E_ButtonIndex, setpesDay_E_ButtonIndex] = useState(null);
  const [execomButtonIndex, setExecomButtonIndex] = useState(null);
  const [imageButtonIndex, setImageButtonIndex] = useState(null);
  const [showPreviousComponent,] = useState(false);
  const [document, setDocument] = useState([]);
  const [isInsertEvent, setIsInsertEvent] = useState(false);
  const [year, setYear] = useState(2023);
  const [poster, setPoster] = useState("Timeline");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showContainer2, setShowContainer2] = useState(false);
  const [delayedMenuIndex, setDelayedMenuIndex] = useState(null);

  const handleMenuIndex = (index) => {
    if (index !== menuIndex) {
      setEventButtonIndex(null);
      setpesDay_E_ButtonIndex(null);
      setExecomButtonIndex(null);
      setImageButtonIndex(null);
      setPoster("Timeline");
      setYear(2023);
    }
    setMenuIndex(index);
  };

  const handleEventButtonIndex = (index) => {
    setEventButtonIndex(index);
  };

  const handlepesDay_E_ButtonIndex = (index) => {
    setpesDay_E_ButtonIndex(index);
  };

  const handleExecomButtonIndex = (index) => {
    setExecomButtonIndex(index);
  };

  const handleImageButtonIndex = (index) => {
    setImageButtonIndex(index);
  };

  const handleGoBack = () => {
    setEventButtonIndex(null);
    setExecomButtonIndex(null);
    setImageButtonIndex(null);
    setpesDay_E_ButtonIndex(null);
    setSelectedDocument(null);
  };

  const handleInsertEvent = (value) => {
    setIsInsertEvent(value);
  };

  const handleYearChange = (selectedYear) => {
    setYear(selectedYear);
  };

  const handlePosterChange = (selectedPoster) => {
    setPoster(selectedPoster);
  };

  const handleItemClick = (doc) => {
    setSelectedDocument(doc);
    setEventButtonIndex(0);
  };

  const renderContainer1Component = () => {
    if (menuIndex === 0) {
      if (!showPreviousComponent && eventButtonIndex === 0) {
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <EventInput
              onInsertClick={handleInsertEvent}
              onClickGoBack={handleGoBack}
            />
          </Suspense>
        );
      } else if (!showPreviousComponent && eventButtonIndex === 1) {
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <EventDelete
              onInsertClick={handleInsertEvent}
              onClickGoBack={handleGoBack}
            />
          </Suspense>
        );
      } else {
        return showPreviousComponent ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Button onToggle={handleEventButtonIndex} />
          </Suspense>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <Button onToggle={handleEventButtonIndex} />
          </Suspense>
        );
      }
    } else if (menuIndex === 1) {
      if (!showPreviousComponent && pesDay_E_ButtonIndex === 0) {
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <PESDayInput
              onInsertClick={handleInsertEvent}
              onClickGoBack={handleGoBack}
            />
          </Suspense>
        );
      } else if (!showPreviousComponent && pesDay_E_ButtonIndex === 1) {
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <PESDayDelete
              onInsertClick={handleInsertEvent}
              onClickGoBack={handleGoBack}
            />
          </Suspense>
        );
      } else {
        return showPreviousComponent ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Button onToggle={handlepesDay_E_ButtonIndex} />
          </Suspense>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <Button onToggle={handlepesDay_E_ButtonIndex} />
          </Suspense>
        );
      }
    } else if (menuIndex === 2) {
      if (!showPreviousComponent && execomButtonIndex === 0) {
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <ExecomInput
              onInsertClick={handleInsertEvent}
              onClickGoBack={handleGoBack}
            />
          </Suspense>
        );
      } else if (!showPreviousComponent && execomButtonIndex === 1) {
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <ExecomDelete
              onInsertClick={handleInsertEvent}
              onClickGoBack={handleGoBack}
            />
          </Suspense>
        );
      } else {
        return showPreviousComponent ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Button onToggle={handleExecomButtonIndex} />
          </Suspense>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <Button onToggle={handleExecomButtonIndex} />
          </Suspense>
        );
      }
    } else if (menuIndex === 3) {
      if (!showPreviousComponent && imageButtonIndex === 0) {
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <ImageInput
              onInsertClick={handleInsertEvent}
              onClickGoBack={handleGoBack}
            />
          </Suspense>
        );
      } else if (!showPreviousComponent && imageButtonIndex === 1) {
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <ImageDelete
              onInsertClick={handleInsertEvent}
              onClickGoBack={handleGoBack}
            />
          </Suspense>
        );
      } else {
        return showPreviousComponent ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Button onToggle={handleImageButtonIndex} />
          </Suspense>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <Button onToggle={handleImageButtonIndex} />
          </Suspense>
        );
      }
    } else {
      return <p>No component selected</p>;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (menuIndex === 0) {
          const response = await axios.get("/api/events");
          const documents = response.data;
          setDocument(documents);
        } else if (menuIndex === 1) {
          const response = await axios.get(`/api/PES_DAY`);
          const documents = response.data;
          setDocument(documents);
        } else if (menuIndex === 2) {
          const response = await axios.get(`/api/execom/${year}`);
          const documents = response.data;
          setDocument(documents);
        } else if (menuIndex === 3) {
          const response = await axios.get(`/api/images/${poster}`);
          const documents = response.data;
          setDocument(documents);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setIsInsertEvent(false);
  }, [menuIndex, isInsertEvent, year, poster]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContainer2(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [delayedMenuIndex]);

  useEffect(() => {
    setShowContainer2(false);
    setDelayedMenuIndex(menuIndex);
  }, [menuIndex]);

  return (
    <>
      <div className={databaseStyles.outer}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className={databaseStyles.section1}>
            <MenuBar onToggle={handleMenuIndex} />
          </div>
          <div className={databaseStyles.section2}>
            <div className={databaseStyles.container1}>
              {menuIndex === 0 && selectedDocument !== null ? (
                eventButtonIndex === 0 ? (
                  <EventInput
                    onInsertClick={handleInsertEvent}
                    onClickGoBack={handleGoBack}
                    selectedDocument={selectedDocument}
                  />
                ) : (
                  renderContainer1Component()
                )
              ) : menuIndex === 1 && selectedDocument !== null ? (
                eventButtonIndex === 0 ? (
                  <PESDayInput
                    onInsertClick={handleInsertEvent}
                    onClickGoBack={handleGoBack}
                    selectedDocument={selectedDocument}
                  />
                ) : (
                  renderContainer1Component()
                )
              ) : menuIndex === 2 && selectedDocument !== null ? (
                eventButtonIndex === 0 ? (
                  <ExecomInput
                    onInsertClick={handleInsertEvent}
                    onClickGoBack={handleGoBack}
                    selectedDocument={selectedDocument}
                  />
                ) : (
                  renderContainer1Component()
                )
              ) : menuIndex === 3 && selectedDocument !== null ? (
                eventButtonIndex === 0 ? (
                  <ImageInput
                    onInsertClick={handleInsertEvent}
                    onClickGoBack={handleGoBack}
                    selectedDocument={selectedDocument}
                  />
                ) : (
                  renderContainer1Component()
                )
              ) : (
                renderContainer1Component()
              )}
            </div>
            <div className={databaseStyles.wrapper}>
              <h1>Select the Items to Update</h1>
              <div className={databaseStyles.container2}>
                {menuIndex === 2 && (
                  <YearDropdown year={year} onYearChange={handleYearChange} />
                )}

                {menuIndex === 3 && (
                  <PosterTypeDropdown
                    poster={poster}
                    onPosterChange={handlePosterChange}
                  />
                )}

                {showContainer2 &&
                  document.map((doc) => (
                    <div
                      className={databaseStyles.item}
                      key={doc._id}
                      onClick={() => handleItemClick(doc)}
                    >
                      {menuIndex === 0 && `${doc.title} => ${doc.date} `}

                      {menuIndex === 1 && `${doc.title} => ${doc.date} `}

                      {menuIndex === 2 && `${doc.name} - ${doc.designation}`}

                      {menuIndex === 3 && `${doc.imgName}`}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </>
  );
}

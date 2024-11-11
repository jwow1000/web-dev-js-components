import NavBar from "../Nav/Nav.jsx";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useScrollPosition } from "../../hooks/useUserScreen.jsx";
import Panzoom from "@panzoom/panzoom";
import styles from "./stylesLayout.module.css";

// an idea of what zoom and pan would look like in react

function Layout({children}) {
  const [sections, setSections] = useState([]);
  const [mapState, setMapState] = useState(false);
  const [totalSize, setTotalSize] = useState({
    width: 0,
    height: 0,
  });
  const contentRef = useRef(null)
  const scrollPosition = useScrollPosition();
  

  useEffect(() => {
    // Initialize Panzoom on the element
    const panzoomInstance = Panzoom(contentRef.current, {
      maxScale: 3,    // Maximum zoom level
      minScale: 0.1,  // Minimum zoom level
      step: 0.2,      // Zoom step for each interaction
      // contain: "outside" // Prevents panning outside the boundaries of the container
    });

    // Enable mouse wheel zooming
    contentRef.current.addEventListener("wheel", panzoomInstance.zoomWithWheel);
    const cleanup = contentRef.current;
    // Clean up Panzoom on component unmount
    return () => {
      cleanup.removeEventListener("wheel", panzoomInstance.zoomWithWheel);
      panzoomInstance.destroy();
    };
  }, []);

  useEffect(() => {
    // Wait for the component to mount, then select the child main container
    if(contentRef.current) {
      const maps = contentRef.current.querySelectorAll('.map-it');
      setSections( Array.from( maps ) )

    }
    if (!contentRef.current) return; // Exit if no element is found

    // set the state
    setTotalSize({
      width: contentRef.current.scrollWidth,
      height: contentRef.current.scrollHeight,
    });

  }, [mapState, children]); // Run this effect once, after the component has mounted

  
  return (
    <div 
      id={styles.layout}
    >
      <NavBar 
        sections={ sections } 
        scrollPosition={ scrollPosition } 
        totalSize={ totalSize }
        mapState={mapState}
        setMapState={setMapState}
        id={styles.navbar}
        
      />

      
      <div 
        id={styles.content}
        ref={ contentRef }
        className="mapIt-layout"
        
      >
        { children }
      </div>
      
      

    </div>
  );
}

export default Layout;


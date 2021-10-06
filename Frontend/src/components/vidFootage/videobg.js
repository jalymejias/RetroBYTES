import VideoBg from "reactjs-videobg";
import ogv from "./videos/Vid1.ogv";
import webm from "./videos/Vid1.webm";
import mp4 from "./videos/Vid1.mp4";
import poster from "./img/poster.jpg";
import "./styles.css";

function VideoBkg() {
    return (
      <div className="mediaV">
        <VideoBg poster={poster}>
          <VideoBg.Source src={ogv} type="video/ogv" />
          <VideoBg.Source src={webm} type="video/webm" />
          <VideoBg.Source src={mp4} type="video/mp4" />
        </VideoBg>
      </div>
    );
  }

  export default VideoBkg;
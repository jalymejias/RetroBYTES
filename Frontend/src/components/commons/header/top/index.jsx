import React from "react";
import { UserTokenContext } from "../../../../contexts/UserTokenContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export function MenuTop(props) {
  const [token] = useContext(UserTokenContext);

  return (
    <>
      {token ? (
        <ul>
          {/*Alertas puede usarse para el Chat */}
          <Link to="/newProduct">
            <li className="top_link">
              <span>
                <svg
                  height={39}
                  width={39}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <g color="#000" fontWeight={400} fontFamily="sans-serif">
                    <path
                      style={{
                        lineHeight: "normal",
                        fontVariantLigatures: "normal",
                        fontVariantPosition: "normal",
                        fontVariantCaps: "normal",
                        fontVariantNumeric: "normal",
                        fontVariantAlternates: "normal",
                        fontVariantEastAsian: "normal",
                        fontFeatureSettings: "normal",
                        fontVariationSettings: "normal",
                        textIndent: 0,
                        textAlign: "start",
                        textDecorationLine: "none",
                        textDecorationStyle: "solid",
                        textDecorationColor: "#000",
                        textTransform: "none",
                        textOrientation: "mixed",
                        whiteSpace: "normal",
                        shapePadding: 0,
                        shapeMargin: 0,
                        inlineSize: 0,
                        isolation: "auto",
                        mixBlendMode: "normal",
                        solidColor: "#000",
                        solidOpacity: 1,
                      }}
                      d="M16 2C8.28 2 2 8.28 2 16s6.28 14 14 14 14-6.28 14-14S23.72 2 16 2zm0 2c6.64 0 12 5.36 12 12s-5.36 12-12 12S4 22.64 4 16 9.36 4 16 4z"
                      overflow="visible"
                    />
                    <path
                      style={{
                        lineHeight: "normal",
                        fontVariantLigatures: "normal",
                        fontVariantPosition: "normal",
                        fontVariantCaps: "normal",
                        fontVariantNumeric: "normal",
                        fontVariantAlternates: "normal",
                        fontVariantEastAsian: "normal",
                        fontFeatureSettings: "normal",
                        fontVariationSettings: "normal",
                        textIndent: 0,
                        textAlign: "start",
                        textDecorationLine: "none",
                        textDecorationStyle: "solid",
                        textDecorationColor: "#000",
                        textTransform: "none",
                        textOrientation: "mixed",
                        whiteSpace: "normal",
                        shapePadding: 0,
                        shapeMargin: 0,
                        inlineSize: 0,
                        isolation: "auto",
                        mixBlendMode: "normal",
                        solidColor: "#000",
                        solidOpacity: 1,
                      }}
                      d="M16 8a1 1 0 00-1 1v6H9a1 1 0 00-1 1 1 1 0 001 1h6v6a1 1 0 001 1 1 1 0 001-1v-6h6a1 1 0 001-1 1 1 0 00-1-1h-6V9a1 1 0 00-1-1z"
                      overflow="visible"
                    />
                  </g>
                </svg>
              </span>
              Crear producto
            </li>
          </Link>
          <Link to="/profile">
            <li className="top_link">
              <span>
                <svg
                  width="39"
                  height="39"
                  viewBox="0 0 93 93"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M46.5 85.2502C40.6412 85.2666 34.8565 83.941 29.5895 81.375C27.6619 80.4374 25.815 79.3422 24.0676 78.1006L23.5368 77.7131C18.7311 74.166 14.802 69.5649 12.0513 64.263C9.206 58.7755 7.73029 52.6812 7.74983 46.5C7.74983 25.099 25.099 7.75 46.5 7.75C67.9011 7.75 85.2502 25.099 85.2502 46.5C85.2695 52.6783 83.7952 58.7697 80.9526 64.2552C78.2057 69.554 74.2822 74.1536 69.4826 77.7015C67.6721 79.0267 65.7507 80.1936 63.7399 81.189L63.4299 81.344C58.1596 83.9236 52.3678 85.2599 46.5 85.2502ZM46.5 65.8749C40.6932 65.8636 35.3697 69.1068 32.7166 74.2721C41.402 78.5741 51.598 78.5741 60.2834 74.2721V74.2527C57.627 69.0931 52.3033 65.8572 46.5 65.8749ZM46.5 58.125C54.8937 58.1359 62.6332 62.6592 66.7624 69.967L66.8205 69.9166L66.8748 69.8701L66.8089 69.9282L66.7701 69.9592C76.57 61.4928 80.0741 47.8266 75.5573 35.6892C71.0404 23.5518 59.4545 15.5012 46.5039 15.5012C33.5533 15.5012 21.9674 23.5518 17.4505 35.6892C12.9336 47.8266 16.4378 61.4928 26.2376 69.9592C30.3694 62.655 38.1082 58.1352 46.5 58.125ZM46.5 54.25C37.9396 54.25 31 47.3104 31 38.75C31 30.1896 37.9396 23.25 46.5 23.25C55.0604 23.25 62 30.1896 62 38.75C62 42.8609 60.367 46.8033 57.4602 49.7102C54.5534 52.617 50.6109 54.25 46.5 54.25ZM46.5 31C42.2198 31 38.75 34.4698 38.75 38.75C38.75 43.0302 42.2198 46.5 46.5 46.5C50.7802 46.5 54.25 43.0302 54.25 38.75C54.25 34.4698 50.7802 31 46.5 31Z"
                    fill="#2E3A59"
                  />
                </svg>
              </span>
              Perfil
            </li>
          </Link>
        </ul>
      ) : (
        <></>
      )}
    </>
  );
}

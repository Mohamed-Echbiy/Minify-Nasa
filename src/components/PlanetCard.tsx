import { keyframes } from "@emotion/react";
import React from "react";
import styled from "styled-components";
interface data {
  data: {
    basicDetails: [{ mass: string; volume: string }];
    description: string;
    id: number;
    name: string;
    imgSrc: [{ img: string; imgDescription: string }];
    planetOrder: string;
    source: string;
  };
}
export default function PlanetCard(data: data) {
  console.log(data.data);
  return (
    <>
      <Div className="Planet h-screen w-full">
        <div className="Planet_image_container mr-3">
          <img
            src={data.data.imgSrc[0].img}
            alt={data.data.imgSrc[0].imgDescription}
            className="Planet_image"
          />
        </div>
        <div className="Planet_info_container">
          <h1 className="Planet_title text-white uppercase tracking-wide pb-4 ">
            {[...data.data.name].map((e) => (
              <span> {e} </span>
            ))}
          </h1>
          <p className="Planet_description text-gray-400 leading-relaxed py-5 px-3">
            {data.data.description}
            <div className="Planet_detailes_description w-full flex justify-between flex-wrap">
              <p className="text-gray-600 mt-3">
                <span>Mass: </span>
                {data.data.basicDetails[0].mass}
              </p>
              <p className="text-gray-600 mt-3">
                <span>Volume:</span> {data.data.basicDetails[0].volume}
              </p>
              <p className="w-full text-gray-600 text-xs mt-3">
                sorce: {data.data.source}
              </p>
            </div>
          </p>
        </div>
      </Div>
    </>
  );
}
//  styling
const Div = styled.div`
  &.Planet {
    display: flex;
    align-items: center;
    .Planet_image_container {
      width: 49%;
      min-width: 280px;
      position: relative;
      img.Planet_image {
        width: 100%;
      }
    }
    .Planet_info_container {
      width: 48%;
      min-width: 280px;
      display: flex;
      align-items: center;
      h1.Planet_title {
        display: block;
        font-size: 2.5rem;
        cursor: pointer;
        width: fit-content;
        border-right: 1px solid #ffffff80;
        border-top: 1px solid #ffffff80;
        border-bottom: 1px solid #ffffff80;
        padding: 5px 13px;
        margin-right: 15px;
        display: block;
        span {
          transition: 0.5s ease;
          display: block;
          width: 50px;
          cursor: pointer;
          padding: 0px 10px;
          text-align: center;
          :hover {
            transform: translateX(20px);
          }
        }
        @media (max-width: 830px) {
          border: none;
          padding: 10px 20px;
          width: fit-content;
          text-align: center;
          margin: 20px auto;
          border-bottom: 1px solid #ffffff80;
          border-left: 1px solid #ffffff80;
          border-right: 1px solid #ffffff80;
          & span {
            display: inline-block;
            padding: 5px;
            width: auto;
            margin-right: 0px 10px;
            :hover {
              transform: translateY(-10px);
            }
          }
        }
      }
      p.Planet_description {
        box-shadow: 0px 9px 8px #2323243b;
        @media (max-width: 830px) {
          width: 90%;
          margin: auto;
        }
      }
    }
    @media (max-width: 830px) {
      flex-direction: column;
      justify-content: center;
      .Planet_info_container {
        display: block;
        width: 100%;
      }
    }
  }
`;

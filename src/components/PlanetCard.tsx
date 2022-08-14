import styled from "styled-components";
import { AnimationOnScroll } from "react-animation-on-scroll";
import "animate.css/animate.min.css";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import quizes from "../assets/quize.json";
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
  const [quizedata, setQuizeData] = useState<{
    planet: string;
    Q1: string;
    Q1_S1: string;
    Q1_S2: string;
    Q1_S3: string;
    A1: string;
    Q2: string;
    Q2_S1: string;
    Q2_S2: string;
    Q2_S3: string | null;
    A2: string;
    Q3: string;
    Q3_S1: string;
    Q3_S2: string;
    Q3_S3?: string | null;
    A3: string;
    Q4: string;
    Q4_S3?: undefined | string;
    Q4_S2?: undefined | string;
    Q4_S1?: undefined | string;
    A4?: string;
  }>();
  const [popUpState, setPopUpState] = useState(false);
  useEffect(() => {
    quizes.forEach((quize) => {
      if (quize.planet === data.data.name) {
        setQuizeData(quize);
        return quize;
      } else {
        return null;
      }
    });
  }, []);
  //$ form answer handlers
  const [ansewrsRiveal, setAnswersRiveal] = useState(false);
  const [Q1, setQ1] = useState(null);
  const [Q2, setQ2] = useState(null);
  const [Q3, setQ3] = useState(null);
  const [Q4, setQ4] = useState(null);
  const [disablity, setDisable] = useState(false);

  function HandlechangeQ1(e: ChangeEvent<HTMLInputElement>) {
    setQ1((e.target as HTMLInputElement).value);
  }
  function HandlechangeQ2(e: ChangeEvent<HTMLInputElement>) {
    setQ2((e.target as HTMLInputElement).value);
  }
  function HandlechangeQ3(e: ChangeEvent<HTMLInputElement>) {
    setQ3((e.target as HTMLInputElement).value);
  }
  function HandlechangeQ4(e: ChangeEvent<HTMLInputElement>) {
    setQ4((e.target as HTMLInputElement).value);
  }
  const [score, setScore] = useState(0);

  function Q4Score() {
    if (typeof Q4 === typeof "string") {
      if (Q4 === quizedata.A4) {
        setScore((p) => p + 25);
      }
    } else {
      return window.alert("please select your 4 answer");
    }
  }

  function Q3Score() {
    if (typeof Q3 === typeof "string") {
      if (Q3 === quizedata.A3) {
        setScore((p) => p + 25);
        Q4Score();
      } else {
        Q4Score();
      }
    } else {
      return window.alert("please select your 3 answer");
    }
  }

  function Q2Score() {
    if (typeof Q2 === typeof "string") {
      if (Q2 === quizedata.A2) {
        setScore((p) => p + 25);
        Q3Score();
      } else {
        Q3Score();
      }
    } else {
      return window.alert("please select your 2 answer");
    }
  }

  //! evaluation of the score and the answers logic
  function result(e: { preventDefault: () => void }) {
    e.preventDefault();
    setScore(0);
    if (typeof Q1 === typeof "string") {
      if (Q1 === quizedata.A1) {
        setScore((p) => p + 25);
        Q2Score();
      } else {
        Q2Score();
      }
    } else {
      return window.alert("please select your first answer");
    }
    setAnswersRiveal(true);
    setDisable(true);
  }
  return (
    <>
      <Div className="Planet min-h-screen w-full ">
        <AnimationOnScroll
          animateIn="animate__rollIn"
          offset={390}
          initiallyVisible={data.data.name === "Jupiter" ? true : false}
          className="Planet_image_container mr-3"
        >
          <img
            src={data.data.imgSrc[0].img}
            alt={data.data.imgSrc[0].imgDescription}
            className={`PLanet_image ${popUpState && "blur-xl"}`}
          />
        </AnimationOnScroll>

        <AnimationOnScroll
          animateIn="animate__slideInRight"
          offset={200}
          initiallyVisible={data.data.name === "Jupiter" ? true : false}
          duration={1}
          // animatePreScroll={false}
          // animateOnce={true}
          className={`Planet_info_container ${popUpState && "blur-md"}`}
        >
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
              <button
                onClick={() => setPopUpState(true)}
                className=" p-1 mt-2 rounded-md bg-gray-900"
              >
                Quick Quize
              </button>
              <span className="p-1 mt-2">last score is : {score}%</span>
            </div>
          </p>
        </AnimationOnScroll>

        {/*$  popUp */}

        {popUpState && (
          <div className="popup_box_overlay">
            <div className="box">
              <span
                className="close_btn text-black"
                onClick={() => setPopUpState(false)}
              >
                x
              </span>
              <h2 className=" mb-5 font-semibold">{quizedata.planet}</h2>
              <div className="first_Q">
                <h3 className=" text-lg mb-5">Q1: {quizedata.Q1}</h3>
                <div className="choose_box mb-5">
                  <div className="mb-1">
                    <input
                      type="radio"
                      onChange={HandlechangeQ1}
                      name="Q1"
                      value={quizedata.Q1_S1}
                      id="Q1S1"
                    />
                    <label htmlFor="Q1S1"> {quizedata.Q1_S1} </label>
                  </div>
                  <div className="mb-1">
                    <input
                      type="radio"
                      onChange={HandlechangeQ1}
                      name="Q1"
                      value={quizedata.Q1_S2}
                      id="Q1S2"
                    />
                    <label htmlFor="Q1S2"> {quizedata.Q1_S2} </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      onChange={HandlechangeQ1}
                      name="Q1"
                      value={quizedata.Q1_S3}
                      id="Q1S3"
                    />
                    <label htmlFor="Q1S3"> {quizedata.Q1_S3} </label>
                  </div>
                </div>
                <div
                  className={`answer ${
                    ansewrsRiveal === true ? "visible" : "hidden"
                  }`}
                >
                  <p>Answer is: {quizedata.A1} </p>
                </div>
              </div>
              <div className="seconde_Q">
                <h3 className=" text-lg mb-5">Q2: {quizedata.Q2}</h3>
                <div className="choose_box mb-5">
                  <div className="mb-1">
                    <input
                      type="radio"
                      onChange={HandlechangeQ2}
                      name="Q2"
                      value={quizedata.Q2_S1}
                      id="Q2S1"
                    />
                    <label htmlFor="Q2S1"> {quizedata.Q2_S1} </label>
                  </div>
                  <div className="mb-1">
                    <input
                      type="radio"
                      onChange={HandlechangeQ2}
                      name="Q2"
                      value={quizedata.Q2_S2}
                      id="Q2S2"
                    />
                    <label htmlFor="Q2S2"> {quizedata.Q2_S2} </label>
                  </div>

                  {quizedata.Q2_S3 && (
                    <div>
                      <input
                        type="radio"
                        onChange={HandlechangeQ2}
                        name="Q2"
                        value={quizedata.Q2_S3}
                        id="Q2S3"
                      />
                      <label htmlFor="Q2S3"> {quizedata.Q2_S3} </label>
                    </div>
                  )}
                </div>
                <div
                  className={`answer ${
                    ansewrsRiveal === true ? "visible" : "hidden"
                  }`}
                >
                  <p>Answer is: {quizedata.A2} </p>
                </div>
              </div>
              <div className="third_Q">
                <h3 className=" text-lg mb-5">Q3: {quizedata.Q3}</h3>
                <div className="choose_box mb-5">
                  <div className="mb-1">
                    <input
                      type="radio"
                      onChange={HandlechangeQ3}
                      name="Q3"
                      value={quizedata.Q3_S1}
                      id="Q3S1"
                    />
                    <label htmlFor="Q3S1"> {quizedata.Q3_S1} </label>
                  </div>
                  <div className="mb-1">
                    <input
                      type="radio"
                      onChange={HandlechangeQ3}
                      name="Q3"
                      value={quizedata.Q3_S2}
                      id="Q3S2"
                    />
                    <label htmlFor="Q3S2"> {quizedata.Q3_S2} </label>
                  </div>

                  {quizedata.Q3_S3 && (
                    <div>
                      <input
                        type="radio"
                        onChange={HandlechangeQ3}
                        name="Q3"
                        value={quizedata.Q3_S3}
                        id="Q3S3"
                      />
                      <label htmlFor="Q3S3"> {quizedata.Q3_S3} </label>
                    </div>
                  )}
                </div>
                <div
                  className={`answer ${
                    ansewrsRiveal === true ? "visible" : "hidden"
                  }`}
                >
                  <p>Answer is: {quizedata.A3} </p>
                </div>
              </div>
              <div className="fourth_Q">
                <h3 className=" text-lg mb-5">Q1: {quizedata.Q4}</h3>
                <div className="choose_box mb-5">
                  {quizedata.Q4_S1 ? (
                    <div>
                      <input
                        type="radio"
                        onChange={HandlechangeQ4}
                        name="Q4"
                        value={quizedata.Q4_S1}
                        id="Q4S1"
                      />
                      <label htmlFor="Q4S1"> {quizedata.Q4_S1} </label>
                    </div>
                  ) : (
                    <>
                      <input
                        className="inputAnswer"
                        placeholder="write your answer here"
                        onChange={HandlechangeQ4}
                      />
                    </>
                  )}
                  {quizedata.Q4_S2 && (
                    <div>
                      <input
                        type="radio"
                        onChange={HandlechangeQ4}
                        name="Q4"
                        value={quizedata.Q4_S2}
                        id="Q4S2"
                      />
                      <label htmlFor="Q4S2"> {quizedata.Q4_S2} </label>
                    </div>
                  )}
                  {quizedata.Q4_S3 && (
                    <div>
                      <input
                        type="radio"
                        onChange={HandlechangeQ4}
                        name="Q4"
                        value={quizedata.Q4_S3}
                        id="Q4S3"
                      />
                      <label htmlFor="Q4S3"> {quizedata.Q4_S3} </label>
                    </div>
                  )}
                </div>
                <div
                  className={`answer ${
                    ansewrsRiveal === true ? "visible" : "hidden"
                  }`}
                >
                  <p>Answer is: {quizedata.A4} </p>
                </div>
                <button
                  className={`p-2 mt-2 ml-2 rounded-md bg-gray-900 text-gray-50 ${
                    disablity === true && "pointer-events-none hidden"
                  }`}
                  onClick={result}
                >
                  submit
                </button>
                <button
                  className={`cursor-pointer p-2 mt-2 ml-2 rounded-md bg-gray-900 text-gray-50 ${
                    disablity !== true ? "hidden" : "visible"
                  }`}
                  onClick={() => {
                    setDisable(false);
                    setAnswersRiveal((e) => !e);
                  }}
                >
                  reload
                </button>
              </div>
              <h1 className="text-black p-3 text-lg font-semibold ">
                Your score is :
                {` ${
                  score === 0
                    ? ` ${score}% No comment`
                    : score === 25
                    ? ` ${score}% you have memory of a fly 🪰`
                    : score === 50
                    ? ` ${score}% Not bad 👍`
                    : `${score} The King 👑`
                }`}
              </h1>
            </div>
          </div>
        )}
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
    .popup_box_overlay {
      position: fixed;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100vh;
      z-index: 10;
      background-color: #ffffff0d;
      display: flex;
      justify-content: center;
      align-items: center;
      .box {
        background-color: white;
        padding: 20px;
        height: fit-content;
        min-width: 320px;
        border-radius: 20px;
        position: relative;
        span.close_btn {
          display: block;
          position: absolute;
          font-size: 30px;
          cursor: pointer;
          left: 20px;
          top: 1px;
        }
        h2 {
          font-size: 20px;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-align: center;
          padding: 10px 0px;
          border-bottom: 1px solid black;
        }
        .choose_box {
          .inputAnswer {
            background-color: #0000001a;
            border: 1px solid black;
            outline: none;
            padding: 0px 10px;
            border-radius: 5px;
          }
        }
        .answer {
          padding: 10px;
          text-align: center;
          background-color: #b1a00c90;
          font-weight: bold;
          color: #070707b9;
        }
      }
    }
  }
`;

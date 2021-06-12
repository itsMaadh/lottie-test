import { initializeApollo } from "../lib/apolloClient";
import { GetLottieQuery } from "../graphql/getLottieQuery";
import { LottieResponse } from "../types/ServerSideProps";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import ColorPicker from "../components/ColorPicker";

export default function Lottie({ data }: LottieResponse) {
  const lottiePlayerRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [pause, setPause] = useState(false);
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [speed, setSpeed] = useState(1);
  const [direction, setDirection] = useState(1);

  const copy = async () => {
    await navigator.clipboard.writeText(data.lottie.assetUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const changePlayerSpeed = () => {
    const currentSpeed = lottiePlayerRef.current.state.instance.playSpeed;
    if (currentSpeed !== 2.5) {
      lottiePlayerRef.current.setPlayerSpeed(currentSpeed + 0.5);
      setSpeed((currentSpeed) => currentSpeed + 0.5);
    } else {
      lottiePlayerRef.current.setPlayerSpeed(1);
      setSpeed(1);
    }
  };

  const changeColor = (e) => {
    const color = e.target?.value ? e.target.value : e;
    setBgColor(color);
    lottiePlayerRef.current.state.background = color;
  };

  const changeDirection = (e) => {
    const updatedDirection = e.target.checked ? -1 : 1;
    setDirection(updatedDirection);
    lottiePlayerRef.current.setPlayerDirection(updatedDirection);
  };

  const downloadLottie = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify(lottiePlayerRef.current.state.animationData)
      );
    const element = document.createElement("a");
    element.setAttribute("href", dataStr);
    element.setAttribute("download", `${data.lottie.id}.json`);
    element.click();
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 32) {
        e.preventDefault();
        if (pause) {
          setPause(false);
          lottiePlayerRef.current.play();
        } else {
          setPause(true);
          lottiePlayerRef.current.pause();
        }
      }
    });
  });

  return (
    <>
      {/*SEO Meta fields for easier search*/}
      <Head>
        <title>{data.lottie.title} | LottieFiles</title>
        <meta
          property="og:title"
          content={data.lottie.title + " on Lottiefiles. Free Lottie Animation"}
        />
        <meta
          name="description"
          content={data.lottie.title + " | Free on LottieFiles"}
        />
        <meta
          name="og:description"
          content={data.lottie.title + " | Free on LottieFiles"}
        />
      </Head>
      <section className="pr-1 pl-1 pt-5 mx-auto bg-white container">
        <div className="flex flex-col mx-auto w-full h-full">
          <div className="flex items-center">
            <div className="flex flex-col w-full h-full justify-between">
              <div
                className="flex justify-center items-center w-full "
                style={{ minHeight: "600px" }}
              >
                <Player
                  loop={true}
                  autoplay={true}
                  src={data.lottie.assetUrl}
                  style={{ height: "530px", minWidth: "100%" }}
                  speed={1}
                  ref={lottiePlayerRef}
                >
                  <Controls visible={true} buttons={["play", "repeat"]} />
                </Player>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5">
          <p className="tracking-wide font-semibold text-2xl">
            {data.lottie.title}
          </p>
          <p className="font-light text-gray-500 text-sm pt-2">
            {moment(data.lottie.createdAt).fromNow()}
          </p>
          {/*Lottie Animation URL*/}
          <div className="pt-5 flex justify-between">
            <p className="mb-2 opacity-75 text-sm tracking-wide">
              Lottie Animation URL
            </p>
            {copied && <p className="text-lf-teal">Copied!</p>}
          </div>
          <div className="items-center relative">
            <div className="flex items-center relative">
              <input
                type="text"
                disabled={true}
                value={data.lottie.assetUrl}
                className="outline-none p-2.5 bg-gray-100 rounded pr-10 text-sm w-full text-grey-darker"
              />
              <div
                onClick={copy}
                className="absolute right-0 mr-1 hover:bg-lf-teal focus:bg-lf-teal-dark text-white cursor-pointer p-2 rounded"
              >
                <Image
                  src="https://static.lottiefiles.com/images/svg/copy.svg"
                  alt="Copy icon"
                  width={18}
                  height={18}
                />
              </div>
            </div>
          </div>
          {/*Animation speed controller*/}
          <button
            onClick={changePlayerSpeed}
            className="mt-3 cursor-pointer w-full p-3 flex flex-row items-center  bg-gray-100 rounded hover:bg-grey-light text-sm"
          >
            <Image
              src="https://static.lottiefiles.com/images/components/controls_speed.svg"
              alt="Animation speed icon"
              width={18}
              height={20}
            />
            <div className="flex flex-1 justify-center px-3 pr-0 font-semibold text-grey-darkest text-sm">
              Animation Speed
              <div className="bg-grey-light border bg-gray-300 text-sm -my-1 pt-1 px-2 ml-auto rounded">
                {speed}x
              </div>
            </div>
          </button>
          {/*Background color change controller*/}
          <div className="flex flex-col bg-gray-100 rounded mt-3 p-3">
            <div className="flex flex-row">
              <Image
                src="https://static.lottiefiles.com/images/components/controls_bg.svg"
                alt={"Background color changer icon"}
                width={18}
                height={18}
              />
              <span className="px-3 font-semibold text-grey-darkest text-sm">
                Background Color
              </span>
              {bgColor !== "#FFFFFF" && (
                <button
                  className="w-3 h-3 pin-r ml-auto cursor-pointer"
                  onClick={() => changeColor("#FFFFFF")}
                >
                  <Image
                    src="https://static.lottiefiles.com/images/components/controls_bg_close.svg"
                    alt="Close icon"
                    width={18}
                    height={18}
                  />
                </button>
              )}
            </div>
            <div className="flex pt-2 flex-row items-center">
              <ColorPicker onChange={(hex) => changeColor(hex)} />
              <input
                type="text"
                className="bg-white focus:outline-none focus:bg-silver p-2 w-24 text-sm rounded ml-2"
                onChange={changeColor}
                value={bgColor}
              />
            </div>
          </div>
          {/*Reverse animation direction controller*/}
          <div className="mt-3 cursor-pointer w-full p-3 flex flex-row items-center  bg-gray-100 rounded hover:bg-grey-light text-sm">
            <Image
              src="https://static.lottiefiles.com/images/components/player_loop.svg"
              alt="Animation speed icon"
              width={18}
              height={20}
            />
            <div className="flex flex-1 justify-center px-3 pr-0 font-semibold text-sm">
              Reverse Animation
              <div className="bg-grey-light text-sm -my-1 pt-1 ml-auto rounded">
                <div className="flex flex-col">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-gray-600"
                      checked={direction === -1}
                      onChange={changeDirection}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={downloadLottie}
            className="text-white duration-150 w-full hover:bg-lf-teal-dark rounded mt-3 bg-lf-teal p-3 font-semibold text-sm"
          >
            Download Lottie
          </button>
        </div>
        <div className="hidden md:flex flex-row text-grey-dark text-xs pb-6">
          <div className="pr-6">Shortcuts:</div>
          <div className="pr-6 flex flex-row">
            <div className="pr-2">
              <Image
                src="https://static.lottiefiles.com/images/components/shortcut_play_pause.svg"
                width={10}
                height={10}
              />
            </div>
            <span>Play/Pause</span>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(props) {
  const apolloClient = initializeApollo();
  const data = await apolloClient.query({
    variables: {
      id: props.query.id,
    },
    query: GetLottieQuery,
  });
  return { props: { data: data.data } };
}

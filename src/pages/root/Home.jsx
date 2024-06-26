import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getWeather } from "../../../apis/weather";

const AnimationWrapper = styled.div`
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  max-width: 3200px;
  width: 100%;
  height: 100%;
  /* background: #000; */
`;

const WaveBox = styled.div`
  position: absolute;
  bottom: 0px;
  display: block;
  margin: auto;
  width: 100%;
  height: 350px;
  overflow: hidden;
`;

const WaveBox2 = styled.div`
  position: absolute;
  bottom: 0px;
  display: block;
  margin: auto;
  width: 100%;
  height: 250px;
  overflow: hidden;
  /* background-color: tomato; */
  z-index: 1;
`;

const waveBackAnimation = keyframes`
  0% { transform: translateX(-8000px); }
  100% { transform: translateX(-1600px); }
`;

const WaveBack = styled.svg`
  width: 10000px; /* 4 times the width of the viewBox to allow smooth animation */
  height: 100%;
  position: absolute;
  bottom: 0px;
  animation: ${waveBackAnimation} 10s cubic-bezier(0.36, 0.45, 0.63, 0.53)
    infinite;
`;

const AnimatedWaveBack = styled.path`
  fill: #a1dbf1;
`;

const waveFrontAnimation = keyframes`
  0% { transform: translateX(-10000px); }
  100% { transform: translateX(-1600px); }
`;

const WaveFront = styled.svg`
  width: 12500px; /* 4 times the width of the viewBox to allow smooth animation */
  height: 100%;
  position: absolute;
  bottom: 0px;
  animation: ${waveFrontAnimation} 10s cubic-bezier(0.36, 0.45, 0.63, 0.53)
    infinite;
`;

const AnimatedWaveFront = styled.path`
  fill: #6fcbf4;
`;

const Wrapper = styled.div`
  overflow-y: hidden;
  font-family: "Pretendard-regular";
`;

const Header = styled.svg`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  fill: none;
  width: 400px;
  stroke-width: 1px;
  @media screen and (max-width: 427px) {
    width: 213px;
  }
`;

const headerAnimation = keyframes`
0%{
  fill: none;
}
  50% { stroke-dashoffset: 0;}
  80% {
    fill: var(--color-blue-main);}
  100% {
    fill: var(--color-blue-main);}
`;

const HeaderPath = styled.path`
  stroke: black;
  stroke-dasharray: 426;
  stroke-dashoffset: 426;
  animation: ${headerAnimation} 5s forwards;
`;

const Outer = styled.div`
  height: 100vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Inner = styled(motion.div)`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &.first {
    background-color: var(--color-white);
  }
  &.second {
    background-image: url("/img/index/beach.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    /* background-color: var(--color-blue-main); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
  }
  &.third {
    /* background-color: var(--color-sand-main); */
    background-image: url("/img/index/sand.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    position: relative;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 5px;

  &.first {
    background-color: var(--color-blue-bright);
  }
  &.second {
    background-color: var(--color-sand-main);
  }
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border: 1px solid var(--color-navy);
  border-radius: 50%;
  background-color: ${(props) =>
    props.$currentPage === props.$num ? "var(--color-navy)" : "transparent"};
  transition-duration: 1000;
  transition: background-color 0.5s;
`;

const DotsFixed = styled.div`
  position: fixed;
  top: 50%;
  right: 50px;
  transform: translateY(-50%);
`;

const Dots = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20px;
  height: 100px;
`;

/* Seach */

/* Intro */

const IntroTitle = styled.h3`
  font-size: 48px;
  margin-bottom: 32px;
  font-weight: 700;
`;

const IntroBox = styled(motion.div)`
  display: flex;
  width: 50%;
  justify-content: space-around;
`;

const WeatherContainer = styled.div`
  position: absolute;
  right: 5%;
  bottom: 10%;
  display: flex;
`;

const WeatherBox = styled(motion.div)`
  width: 240px;
  height: 120px;
  background-image: url("/img/index/weather.png");
  background-size: cover;
`;

const WeatherInfo = styled.span`
  display: flex;
  align-items: center;
  p {
    align-self: flex-start;
    font-size: 24px;
    transform: rotateZ(-21deg) translateY(-33px) translateX(-14px);
    font-weight: bold;

    font-family: "UhBeeSeulvely";
    color: #ac893e;
    text-shadow: -1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;
  }
`;

const IntroItem = styled(motion.div)`
  width: 200px;
  height: 250px;
  /* background-color: rgba(250, 250, 244, 1);
  border: 2px solid rgba(175, 211, 131, 1);
  border-radius: 35px; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-xl);
  font-family: "Pretendard-regular";
  &:hover {
    scale: 1.1;
  }
  transition: scale 0.05s ease-in;
`;

/* Beaches */

const BeachIcon = styled(motion.div)`
  position: absolute;
  img {
    width: 200px;
    height: auto;
  }
`;

export default function Home() {
  // useRef를 사용해 Outer의 DOM (current)에 접근
  const outerDivRef = useRef();

  const [currentPage, setCurrentPage] = useState(1);

  // 마운트 시 Outer에 wheel 핸들러를 추가, 언마운트 시 삭제
  useEffect(() => {
    const DIVIDER_HEIGHT = 5;
    const wheelHandler = (e) => {
      e.preventDefault();

      const { deltaY } = e; // 스크롤 이동 방향
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝
      const pageHeight = window.innerHeight; // 화면 세로 길이 (100vh)

      // scroll down
      if (deltaY > 0) {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // 현재 1페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        } else if (scrollTop >= 0 && scrollTop < pageHeight * 2) {
          //현재 2페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(3);
        } else {
          // 현재 3페이지

          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2, // 페이지 세로 맨 끝
            left: 0,
            behavior: "smooth",
          });
        }
      }
      // scroll up
      else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지

          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지

          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(1);
        } else {
          // 현재 3페이지

          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setCurrentPage(2);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  const introBoxVariants = {
    hidden: {},
    visible: {
      transition: {
        type: "tween",
        delayChildren: 0.4,
        staggerChildren: 0.3,
        duration: 3,
      },
    },
  };

  const introVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const beachBoxVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
        duration: 3,
      },
    },
  };

  const beachVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { type: "spring" } },
  };

  /* 날씨 불러오기 */
  const { isLoading: weatherLoading, data: weatherData } = useQuery(
    ["weather", "busan"],
    getWeather
  );

  return (
    <Wrapper>
      <Outer ref={outerDivRef}>
        <DotsFixed>
          <Dots>
            <Dot $num={1} $currentPage={currentPage} />
            <Dot $num={2} $currentPage={currentPage} />
            <Dot $num={3} $currentPage={currentPage} />
          </Dots>
        </DotsFixed>
        <Inner className="first">
          <AnimationWrapper>
            <Header
              viewBox="0 0 213 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <HeaderPath
                id="WAY-BU"
                d="M37.592 29.024H38.04C39.1493 24.2027 40.28 19.4667 41.432 14.816C42.584 10.1227 43.7573 5.32266 44.952 0.415997H52.76L42.008 44H33.688L26.52 15.968L19.608 44H11.224L0.152 0.415997H7.96L15.192 29.024H15.576L17.304 22.048C18.1573 18.4213 19.0107 14.8373 19.864 11.296C20.76 7.712 21.656 4.08533 22.552 0.415997H30.36L37.592 29.024ZM75.5025 37.344H63.7905L62.1905 44H54.4465L65.6465 0.415997H73.9665L84.7185 44H77.0385L75.5025 37.344ZM65.3265 30.88H74.0305L69.9985 13.088H69.5505L65.3265 30.88ZM97.85 24.16L86.842 0.415997H95.098L101.818 14.304H102.202C102.714 13.1947 103.247 12.064 103.802 10.912C104.357 9.76 104.933 8.58666 105.53 7.392L108.858 0.415997H117.05L105.658 24.224V44H97.85V24.16ZM143.668 17.248V24.224H119.732V17.248H143.668ZM178.139 14.624C178.139 16.032 177.862 17.3973 177.307 18.72C176.752 20.0427 176.006 21.1947 175.067 22.176C176.347 23.1147 177.264 24.2667 177.819 25.632C178.374 26.9547 178.651 28.3413 178.651 29.792V32.48C178.651 34.272 178.395 35.8933 177.883 37.344C177.371 38.7947 176.646 40.0107 175.707 40.992C174.811 41.9733 173.723 42.72 172.443 43.232C171.206 43.744 169.819 44 168.283 44H148.443V0.415997H167.707C169.243 0.415997 170.651 0.671997 171.931 1.184C173.211 1.696 174.299 2.42133 175.195 3.36C176.134 4.29866 176.859 5.42933 177.371 6.752C177.883 8.07467 178.139 9.52533 178.139 11.104V14.624ZM155.995 18.528H166.363C166.918 18.528 167.451 18.4 167.963 18.144C168.475 17.888 168.923 17.5467 169.307 17.12C169.734 16.6933 170.054 16.2027 170.267 15.648C170.48 15.0507 170.587 14.432 170.587 13.792V13.152C170.587 12.4693 170.48 11.8507 170.267 11.296C170.054 10.7413 169.734 10.2507 169.307 9.824C168.923 9.35467 168.475 8.992 167.963 8.736C167.451 8.48 166.918 8.352 166.363 8.352H155.995V18.528ZM171.163 30.688C171.163 30.048 171.035 29.4507 170.779 28.896C170.566 28.2987 170.267 27.7867 169.883 27.36C169.499 26.9333 169.03 26.592 168.475 26.336C167.963 26.08 167.43 25.952 166.875 25.952H155.995V35.936H166.875C167.43 35.936 167.963 35.808 168.475 35.552C169.03 35.296 169.499 34.9547 169.883 34.528C170.267 34.1013 170.566 33.6107 170.779 33.056C171.035 32.4587 171.163 31.8187 171.163 31.136V30.688ZM212.074 31.328C212.074 33.0773 211.754 34.72 211.114 36.256C210.474 37.792 209.578 39.136 208.426 40.288C207.274 41.44 205.93 42.3573 204.394 43.04C202.858 43.68 201.215 44 199.466 44H194.538C192.788 44 191.146 43.68 189.61 43.04C188.074 42.3573 186.708 41.44 185.514 40.288C184.362 39.136 183.444 37.792 182.762 36.256C182.122 34.72 181.802 33.0773 181.802 31.328V0.415997H189.674V30.88C189.674 31.648 189.802 32.3733 190.058 33.056C190.356 33.696 190.74 34.272 191.21 34.784C191.722 35.296 192.298 35.7013 192.938 36C193.62 36.2987 194.324 36.448 195.05 36.448H198.89C199.615 36.448 200.298 36.2987 200.938 36C201.62 35.7013 202.196 35.296 202.666 34.784C203.135 34.272 203.519 33.696 203.818 33.056C204.116 32.3733 204.266 31.648 204.266 30.88V0.415997H212.074V31.328Z"
              ></HeaderPath>
            </Header>

            <WaveBox>
              <WaveBack
                viewBox="0 0 10000 350"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <AnimatedWaveBack
                  id="back"
                  d="M8240.38 149.988C8426.69 148.953 8719.37 109.637 8945.83 79.2181L8945.87 79.2121L8945.96 79.2006C8983.54 74.1524 9019.3 69.3495 9052.44 65.0076C9289.06 34.0084 9708.44 0.00935114 9861.84 0.00936568C9891.2 0.00936847 9927.52 0.00937032 9969.3 0.465326C9980.32 0.187571 9990.57 0.0333717 10000 0.00936568V350H0V0.00936568C196.366 -0.490719 484.661 19.0089 815.927 65.0076C828.238 66.7171 840.462 68.4161 852.6 70.1032L852.935 70.1498C1167.27 113.841 1424 149.524 1631.85 150.005C1653.41 150.055 1676.49 149.557 1700.83 148.59C1772.27 144.023 1883.48 133.554 2054.5 111.006C2460.29 57.5078 3015.12 0.50945 3211.49 0.00936568C3222.99 -0.0199333 3234.81 0.0194179 3246.94 0.128726C3252.83 0.0496552 3258.43 0.00936518 3263.71 0.00936568C3296.64 0.00936881 3338.32 0.00937067 3386.64 0.652577V0.00936568C3583.01 -0.490719 3871.3 19.0089 4202.57 65.0076C4214.88 66.7171 4227.1 68.4161 4239.24 70.1032L4239.58 70.1498C4510.36 107.787 4738.4 139.482 4929.26 147.85C5113.09 139.142 5361.4 105.787 5559.19 79.2181L5559.23 79.2121L5559.32 79.2006C5596.9 74.1524 5632.66 69.3495 5665.8 65.0076C5902.42 34.0084 6321.8 0.00935114 6475.2 0.00936568C6502.02 0.00936823 6534.66 0.00936999 6571.96 0.357122C6581.27 0.147383 6590.01 0.0300493 6598.13 0.00936568C6603.09 -0.00326146 6608.1 -0.00313759 6613.18 0.00984203C6613.24 0.00967793 6613.3 0.00951915 6613.36 0.00936568C6621.97 -0.0125616 6630.76 0.00396196 6639.72 0.0594843C6643.39 0.0262076 6646.93 0.00936536 6650.35 0.00936568C6803.74 0.00938023 7146.98 0.00936865 7466.28 65.0076C7499.8 71.8316 7535.27 78.4351 7571.93 84.7892C7836.4 121.223 8057.25 149.089 8240.38 149.988Z"
                ></AnimatedWaveBack>
              </WaveBack>
            </WaveBox>
            <WaveBox2>
              <WaveFront
                viewBox="0 0 12500 250"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <AnimatedWaveFront
                  id="front"
                  d="M7848.15 34.7264C8032.78 -0.598085 8342.04 -23.5135 8614.57 39.9377C8786.58 79.9877 9017.17 85.9695 9191.62 73.4282C9236.04 66.8878 9276.72 58.149 9319.41 48.9794L9320.9 48.66C9324.48 47.8906 9328.08 47.1182 9331.69 46.344C9341.2 44.307 9350.8 42.2513 9360.54 40.1949C9541.05 2.08136 9867.16 -26.3294 10152.9 40.1949C10315.1 77.9629 10529.4 85.4344 10699.6 75.6458C10757.7 68.5409 10808.7 57.6112 10862.5 46.0868L10862.5 46.0828L10862.6 46.0641C10872.1 44.0345 10881.7 41.9865 10891.4 39.9378C11071.9 1.82419 11398 -26.5866 11683.7 39.9377C11969.4 106.462 12416.8 78.9914 12500 28.7658V246.778H10969.2V247.036L9009 247.036V246.778H7900.01V247.036H7848.15V249.743H6317.32V250L4357.15 250V249.743H3248.17V250L0 250V36.64C0 36.64 468.129 -32.8117 897.559 43.1595C1303.82 115.032 1443.92 85.0268 1610.69 49.3084C1620.2 47.2714 1629.8 45.2157 1639.54 43.1594C1820.05 5.04578 2146.16 -23.365 2431.89 43.1593C2594.1 80.9273 2808.4 88.3989 2978.6 78.6103C3036.69 71.5053 3087.72 60.5756 3141.53 49.0512L3141.55 49.0472C3151.05 47.0115 3160.64 44.9572 3170.38 42.9022C3350.89 4.78861 3677 -23.6222 3962.72 42.9021C4134.74 82.9521 4365.33 88.934 4539.78 76.3926C4584.19 69.8523 4624.87 61.1134 4667.56 51.9439L4667.79 51.8948C4671.79 51.036 4675.81 50.1734 4679.84 49.3085C4689.35 47.2714 4698.95 45.2158 4708.69 43.1594C4889.2 5.04578 5215.31 -23.365 5501.04 43.1593C5663.25 80.9273 5877.56 88.3989 6047.75 78.6103C6105.84 71.5055 6156.87 60.5762 6210.68 49.052L6210.68 49.0512L6210.7 49.0472L6210.79 49.0286C6220.26 46.9989 6229.83 44.9509 6239.53 42.9022C6322.58 25.3673 6436.44 9.88609 6563.01 4.75861C6724.03 -5.52729 6911.24 0.0335671 7083.73 40.1949C7234.1 75.2039 7429.22 84.1811 7592.48 77.5097C7612.94 76.2007 7632.71 74.64 7651.61 72.8512C7701.15 65.8385 7746.19 56.1917 7793.37 46.0876L7793.38 46.0868L7793.39 46.0828C7802.9 44.0471 7812.49 41.9928 7822.22 39.9378C7827.68 38.7847 7833.28 37.6405 7839 36.5076C7842.42 34.9403 7845.47 33.3471 7848.15 31.7302V34.7264Z"
                ></AnimatedWaveFront>
              </WaveFront>
            </WaveBox2>
          </AnimationWrapper>
        </Inner>
        <Divider className="first" />
        <Inner className="second">
          <IntroTitle>웨이부만의 기능 알아보기</IntroTitle>
          <IntroBox
            variants={introBoxVariants}
            initial="hidden"
            animate={currentPage === 2 ? "visible" : "hidden"}
          >
            <Link to="sports">
              <IntroItem variants={introVariants}>
                <img src="img/index/bottle_sports.png" alt="" />
              </IntroItem>
            </Link>

            <Link to="matching">
              <IntroItem
                variants={introVariants}
                style={{ translateY: "100px" }}
              >
                <img src="img/index/bottle_matching.png" alt="" />
              </IntroItem>
            </Link>

            <Link to="program">
              <IntroItem
                variants={introVariants}
                style={{ translateX: "20px", translateY: "-30px" }}
              >
                <img src="img/index/bottle_compare.png" alt="" />
              </IntroItem>
            </Link>
          </IntroBox>
          <WeatherContainer>
            <WeatherBox />
            <WeatherInfo>
              {weatherLoading ? (
                "Loading..."
              ) : (
                <>
                  <p>
                    {weatherData.main.temp} {weatherData.weather[0].description}
                  </p>
                  {/* <p>
                      습도: {weatherData.main.humidity} 풍속:{" "}
                      {weatherData.wind.speed}
                    </p>
                    <p>
                      일출시간: {weatherData.sys.sunrise} 일몰시간:{" "}
                      {weatherData.sys.sunset}
                    </p> */}
                </>
              )}
            </WeatherInfo>
          </WeatherContainer>
        </Inner>
        <Divider className="second" />
        <Inner
          className="third"
          variants={beachBoxVariants}
          initial={"hidden"}
          animate={currentPage === 3 ? "visible" : "hidden"}
        >
          <Link to={"program?beach=송정해수욕장"}>
            <BeachIcon
              variants={beachVariants}
              style={{ top: "30%", left: "5%" }}
            >
              <img src="img/beaches/songjung.png" width={"120px"} />
            </BeachIcon>
          </Link>
          <Link to={"program?beach=일광해수욕장"}>
            <BeachIcon
              variants={beachVariants}
              style={{ top: "50%", left: "20%" }}
            >
              <img src="img/beaches/ilgwang.png" width={"120px"} />
            </BeachIcon>
          </Link>
          <Link to={"program?beach=임랑해수욕장"}>
            <BeachIcon
              variants={beachVariants}
              style={{ top: "20%", left: "35%" }}
            >
              <img src="img/beaches/imrang.png" width={"120px"} />
            </BeachIcon>
          </Link>
          <Link to={"program?beach=다대포해수욕장"}>
            <BeachIcon
              variants={beachVariants}
              style={{ top: "70%", left: "45%" }}
            >
              <img src="img/beaches/dadaepo.png" width={"120px"} />
            </BeachIcon>
          </Link>
          <Link to={"program?beach=송도해수욕장"}>
            <BeachIcon
              variants={beachVariants}
              style={{ top: "40%", left: "60%" }}
            >
              <img src="img/beaches/songdo.png" width={"120px"} />
            </BeachIcon>
          </Link>

          <Link to={"program?beach=해운대해수욕장"}>
            <BeachIcon
              variants={beachVariants}
              style={{ top: "30%", left: "85%" }}
            >
              <img src="img/beaches/haeundae.png" width={"120px"} />
            </BeachIcon>
          </Link>
          <Link to={"program?beach=광안리해수욕장"}>
            <BeachIcon
              variants={beachVariants}
              style={{ top: "60%", left: "75%" }}
            >
              <img src="img/beaches/gwanganli.png" width={"120px"} />
            </BeachIcon>
          </Link>
        </Inner>
      </Outer>
    </Wrapper>
  );
}

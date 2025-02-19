import React, { useEffect, useState } from "react";
import Marquee from "react-marquee-slider";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { BsInstagram } from "react-icons/bs";
import { FaImdb } from "react-icons/fa";
import { useResizeDetector } from "react-resize-detector";
import FullWidth from "./FullWidth";
import "./Reviews.css";

const Height = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => (props.height ? props.height + "px" : "auto")};
`;

const Box = styled.div`
  padding: ${(props) => props.scale * 25}px;
`;

const Review = styled.div`
overflow: hidden;
  width: ${(props) => props.scale * 400}px;
  display: flex;
  flex-direction: column; /* Stack content vertically */
  padding: ${(props) => props.scale * 20}px;
  background: #fff;
  border-radius: 12px; /* More rounded corners */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); /* Softer shadow */
  align-items: center; /* Center-align content */
  text-align: center; /* Center-align text */
`;

const Avatar = styled.div`
  border-radius: 50%;
  width: ${(props) => props.scale * 80}px; /* Larger avatar */
  height: ${(props) => props.scale * 80}px;
  overflow: hidden;
  margin-bottom: ${(props) => props.scale * 15}px;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const Content = styled.div`
  h3 {
    margin: 0;
    color: #222;
    font-family: "Helvetica", sans-serif;
    font-size: ${(props) => props.scale * 26}px; /* Larger name font */
    font-weight: bold;
    margin-bottom: ${(props) => props.scale * 8}px; /* Space below name */
  }

  p {
    margin: 0;
    color: #444;
    font-family: "Helvetica", sans-serif;
    font-size: ${(props) => props.scale * 19}px;
    line-height: ${(props) => props.scale * 20}px;
    font-weight: 300; /* Lighter text */
    margin-bottom: ${(props) => props.scale * 15}px; /* Space below review */
  }

  .icons {
    display: flex;
    gap: ${(props) => props.scale * 10}px; /* Space between icons */
    justify-content: center; /* Center icons */
  }

  a {
    text-decoration: none;
    display: inline-block;
  }
`;

const portraits = [
  require("../../../assets/avatars/Julie_Ryan.png"),
  require("../../../assets/avatars/alex_smith.png"),
  require("../../../assets/avatars/Martin_Scorsese.png"),
  require("../../../assets/avatars/Christopher_Nolan.png"),
  require("../../../assets/avatars/Quentin_Tarantino.png"),
];

const reviewerNames = [
  "Julie Ryan",
  "Alex Smith",
  "Martin Scorsese",
  "Christopher Nolan",
  "Quentin Tarantino",
];

const reviewsText = [
  "Kartik Interiors transformed my home with their stunning designs and impeccable craftsmanship. Truly a dream come true!",
  "Their turnkey solutions made my office renovation seamless. High-quality work, timely delivery, and absolute professionalism!",
  "From modular kitchens to exquisite wall finishes, Kartik Interiors exceeded my expectations at every step.",
  "Their expert team handled everything from civil repairs to elegant interior design. My space looks luxurious and well-planned!",
  "Kartik Interiors’ attention to detail and commitment to quality set them apart. Highly recommended for any interior or exterior project!",
];

const reviewerInsta = [
  "https://www.instagram.com/julieryan99",
  "https://www.instagram.com/alexpsmith/",
  "https://www.instagram.com/martinscorsese_/",
  "https://www.instagram.com/christophernolann/",
  "https://www.instagram.com/tarantinoxx/",
];

const reviewerImdb = [
  "https://www.imdb.com/name/nm0752646/",
  "https://www.imdb.com/name/nm0807243/",
  "https://www.imdb.com/name/nm0000217/",
  "https://www.imdb.com/name/nm0634240/",
  "https://www.imdb.com/name/nm0000233/",
];

const Reviews = () => {
  const [key, setKey] = useState(nanoid());

  const { width } = useResizeDetector(); // ✅ Detects width dynamically

  useEffect(() => {
    setKey(nanoid());
  }, [width]);

  let scale = 0.5;

  if (width && width > 800) scale = 0.65;
  if (width && width > 1100) scale = 0.8;
  if (width && width > 1400) scale = 1;

  return (
    <FullWidth>
      <Height height={600}>
        <Marquee key={key} velocity={25} scatterRandomly direction={"ltr"} resetAfterTries={0} onInit={() => {}} onFinish={() => {}}>
          {reviewsText.map((review, index) => (
            <Box key={`marquee-example-review-${index}`} scale={scale}>
              <Review scale={scale}>
                <Avatar scale={scale}>
                  <img src={portraits[index]} alt={reviewerNames[index]} />
                </Avatar>
                <Content scale={scale}>
  <h3 className="review-name">{reviewerNames[index]}</h3>
  <p className="review-text">{review}</p>
  <div className="icons">
    <a href={reviewerInsta[index]} target="_blank" rel="noopener noreferrer">
      <BsInstagram size={20} color="black" />
    </a>
    <a href={reviewerImdb[index]} target="_blank" rel="noopener noreferrer">
      <FaImdb size={20} color="black" />
    </a>
  </div>
</Content>

              </Review>
            </Box>
          ))}
        </Marquee>
      </Height>
    </FullWidth>
  );
};

export default React.memo(Reviews);

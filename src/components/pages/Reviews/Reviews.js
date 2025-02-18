import React from "react";
import Marquee from "react-fast-marquee";
import { BsInstagram } from "react-icons/bs";
import styled from "styled-components";
import JulieRyan from "../../../assets/avatars/Julie_Ryan.png";
import AlexSmith from "../../../assets/avatars/alex_smith.png";
import MartinScorsese from "../../../assets/avatars/Martin_Scorsese.png";
import ChristopherNolan from "../../../assets/avatars/Christopher_Nolan.png";
import QuentinTarantino from "../../../assets/avatars/Quentin_Tarantino.png";
import FullWidth from "./FullWidth";

const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
  min-width: 400px; /* Ensures reviews are wide enough */
  max-width: 450px;
`;

const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 15px;
  border: 3px solid #333; /* Slightly thicker border */
`;

const ReviewText = styled.p`
  font-size: 16px;
  color: #555;
  margin: 5px 0;
`;

const ReviewerName = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #222;
`;

const InstagramLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-top: 5px;
`;

const reviewerData = [
  {
    name: "Julie Ryan",
    avatar: JulieRyan,
    review: "PlotWriter's AI Co-Pilot Editor and analytics have transformed my scriptwriting. Highly recommended!",
    insta: "https://www.instagram.com/julieryan99",
  },
  {
    name: "Alex Smith",
    avatar: AlexSmith,
    review: "The AI tools are exceptional, making my writing process faster and more enjoyable.",
    insta: "https://www.instagram.com/alexpsmith/",
  },
  {
    name: "Martin Scorsese",
    avatar: MartinScorsese,
    review: "PlotWriter's analytics and AI suggestions offer fresh perspectives and help improve my scripts.",
    insta: "https://www.instagram.com/martinscorsese_/",
  },
  {
    name: "Christopher Nolan",
    avatar: ChristopherNolan,
    review: "The AI Co-Pilot Editor helps overcome writer’s block with creative prompts. A must-have for scriptwriters.",
    insta: "https://www.instagram.com/christophernolann/",
  },
  {
    name: "Quentin Tarantino",
    avatar: QuentinTarantino,
    review: "PlotWriter's pitch deck builder is intuitive and the AI suggestions are spot on. A huge timesaver.",
    insta: "https://www.instagram.com/tarantinoxx/",
  },
];

const Reviews = () => {
  return (
    <FullWidth>
      <Marquee speed={50} pauseOnHover gradient={false}>
        {reviewerData.map((reviewer, index) => (
          <ReviewContainer key={index}>
            <Avatar src={reviewer.avatar} alt={reviewer.name} />
            <div>
              <ReviewerName>{reviewer.name}</ReviewerName>
              <ReviewText>{reviewer.review}</ReviewText>
              <InstagramLink href={reviewer.insta} target="_blank" rel="noopener noreferrer">
                <BsInstagram size={20} color="black" style={{ marginRight: "5px" }} />
                Follow
              </InstagramLink>
            </div>
          </ReviewContainer>
        ))}
      </Marquee>
    </FullWidth>
  );
};

export default Reviews;

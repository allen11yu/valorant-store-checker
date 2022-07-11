import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function AboutPage() {
  return (
    <div className="about-page page-padding">
      <h1 className="valorant-heading center">ABOUT</h1>
      <div className="about-text-container">
        <p>
          Hello! My name is Allen. Valorant is one of my favorite games to play
          with friends. Sometimes, gamers have other things to prioritize. So to
          prevent having to launch the game everytime the store refreshes, I
          have created a web application that shows the current store offers. In
          addition, there is also a notification feature that allows players to
          "wish" the skins. Once any of the skins appeared in the store, a text
          message will be send to your phone. If you don't feel like playing
          Valorant or can't play at the moment, but want to check what is in
          your store. This tool is perfect for you.
        </p>
        <p>
          As for safety concerns, the source code for the entire application is
          available on{" "}
          <a
            href="https://github.com/allen11yu/valorant-store-checker"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          . The only intention is to provide Valorant players with their store
          offers and hopefully notify them when their favorite skins dropped.
        </p>
        <p>
          **Note** that this web application is not endorsed by Riot Games in
          any way.
        </p>
      </div>
      <h1 className="valorant-heading center">Special Thanks</h1>
      <div className="about-text-container">
        <p>
          <a
            href="https://github.com/HeyM1ke/ValorantClientAPI"
            target="_blank"
            rel="noreferrer"
          >
            HeyM1ke/ValorantClientAPI
          </a>{" "}
          for providing Valorant API documentations.
        </p>
        <p>
          <a
            href="https://github.com/techchrism/valorant-api-docs/"
            target="_blank"
            rel="noreferrer"
          >
            techchrism/valorant-api-docs
          </a>{" "}
          for providing Valorant API documentations.
        </p>
        <p>
          <a href="https://valorant-api.com/" target="_blank" rel="noreferrer">
            Valorant-API
          </a>{" "}
          for providing all Valorant skin information.
        </p>
        <p>
          <a
            href="https://docs.valtracker.gg/bundles"
            target="_blank"
            rel="noreferrer"
          >
            VALTracker API
          </a>{" "}
          for providing all Valorant bundle information and prices.
        </p>
        <p>
          <a
            href="https://discord.com/invite/a9yzrw3KAm"
            target="_blank"
            rel="noreferrer"
          >
            Valorant App Developer - Discord Server
          </a>{" "}
          for helping me setting up and inspiration.
        </p>
      </div>
      <h1 className="valorant-heading center">Connect</h1>
      <div className="about-text-container">
        <p>
          If you have any concerns, questions, or simply wanted to connect. Feel
          free to connect with me below!
        </p>
        <div className="social-container">
          <a
            className="no-style-a"
            href="https://www.linkedin.com/in/allen11yu/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon className="social" icon={faLinkedin} />
          </a>
          <a
            className="no-style-a"
            href="https://github.com/allen11yu"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon className="social" icon={faGithub} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;

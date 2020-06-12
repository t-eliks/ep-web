import React from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollAnimation from "react-animate-on-scroll";
import Button from "components/buttons/button";
import { RESOURCES } from "localization/resources";
import Footer from "components/footer/footer";

interface Props {
  onRegisterClick: () => any;
  onLoginClick: () => any;
}

export const IndexPage: React.FunctionComponent<Props> = (props: Props) => {
  const { onRegisterClick, onLoginClick } = props;

  return (
    <>
      <div className="container">
        <div className="container__inner">
          <div className="menu">
            <Button
              variant="link"
              onClick={onLoginClick}
              appendClass="menu__link"
            >
              {RESOURCES.INDEX.LOGIN}
            </Button>
            <Button
              variant="link"
              onClick={onRegisterClick}
              appendClass="menu__link"
            >
              {RESOURCES.INDEX.REGISTER}
            </Button>
          </div>
          <div className="promo">
            <div className="promo__inner">
              <div className="promo__header">
                <h1 className="promo__header--first">{RESOURCES.INDEX.EASY}</h1>
                <h1 className="promo__header--second">
                  {RESOURCES.INDEX.PROJECT}
                </h1>
              </div>
              <span>{RESOURCES.INDEX.PROMO_SUBHEADER}</span>
            </div>
            <Button overrideClass="promo-button" onClick={onRegisterClick}>
              <FontAwesomeIcon icon={"rocket"} /> {RESOURCES.INDEX.START}
            </Button>
            <div className="promo__link-wrapper">
              <Button onClick={onLoginClick} variant="link">
                {RESOURCES.INDEX.PROMO_SUBTEXT}
              </Button>
            </div>
          </div>
          <div className="content">
            <div className="section-container">
              <h1 className="section-container__header">
                {RESOURCES.INDEX.BODY_HEADER}
              </h1>
              <ScrollAnimation animateIn="slideInRight" animateOnce>
                <div className="section">
                  <div className="section__header">
                    <FontAwesomeIcon icon="chart-line" />
                    <h1>{RESOURCES.INDEX.TRACK_PROGRESS_HEADER}</h1>
                  </div>
                  <span>{RESOURCES.INDEX.TRACK_PROGRESS_BODY}</span>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animateIn="slideInRight" animateOnce>
                <div className="section">
                  <div className="section__header">
                    <FontAwesomeIcon icon="user-check" />
                    <h1>{RESOURCES.INDEX.DELEGATE_WORK_HEADER}</h1>
                  </div>
                  <span>{RESOURCES.INDEX.DELEGATE_WORK_BODY}</span>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animateIn="slideInRight" animateOnce>
                <div className="section">
                  <div className="section__header">
                    <FontAwesomeIcon icon="calendar-plus" />
                    <h1>{RESOURCES.INDEX.PLAN_AHEAD_HEADER}</h1>
                  </div>
                  <span>{RESOURCES.INDEX.PLAN_AHEAD_BODY}</span>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animateIn="slideInRight" animateOnce>
                <div className="section">
                  <div className="section__header">
                    <FontAwesomeIcon icon="flag-checkered" />
                    <h1>{RESOURCES.INDEX.BEAT_DEADLINES_HEADER}</h1>
                  </div>
                  <span>{RESOURCES.INDEX.BEAT_DEADLINES_BODY}</span>
                </div>
              </ScrollAnimation>
              <div className="section-container__footer">
                <FontAwesomeIcon icon="arrow-circle-up" />
                <h3>{RESOURCES.INDEX.TRY_FOR_FREE}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

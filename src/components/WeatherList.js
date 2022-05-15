import React from "react";
import { Col, Row } from "antd";
import WeatherCard from "./WeatherCard";

const WeatherList = ({ weathers }) => {
  return (
    <Row style={{ margin: "1rem" }}>
      {weathers.map((data) => (
        <Col key={data.dt}>
          <WeatherCard
            temp={data.temp.min}
            temp_max={data.temp.max}
            dt={data.dt * 1000}
            main={data.weather[0].main}
            icon={data.weather[0].icon}
            desc={data.weather[0].description}
          />
        </Col>
      ))}
    </Row>
  );
};

export default WeatherList;

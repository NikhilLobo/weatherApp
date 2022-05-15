import { Card } from "antd";

const WeatherCard = ({ dt, temp, main, icon, temp_max, desc }) => {
  const date = new Date(dt);
  return (
    <Card
      hoverable
      style={{ width: "12rem", margin: "0.4rem", padding: "0px" }}
      cover={
        <img
          alt="example"
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        />
      }
    >
      <h1>{main}</h1>
      <h3>{desc}</h3>
      <p>Date: {date.toLocaleDateString()}</p>
      <p>Time:{date.toLocaleTimeString()}</p>
      <p>Min: {temp}</p>
      {temp_max && <p>Max: {temp_max}</p>}
    </Card>
  );
};

export default WeatherCard;

import { Row, Col, Divider } from "antd";
import WeatherCard from "./WeatherCard";
import CitySelector from "./CitySelector";
import useFetch from "../hooks/useFetch";
import { API_KEY, API_URL } from "../api/config";
import WeatherList from "./WeatherList";
const WeatherApp = () => {
  const { data, error, isLoading, setUrl } = useFetch();
  return (
    <>
      <Row justify="center">
        <Col>
          <CitySelector
            onSearch={(lat, lon) =>
              setUrl(
                `${API_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`
              )
            }
          />
        </Col>
      </Row>
      <Divider />
      {error && <h2>Data fetching Failed...</h2>}
      {!data && isLoading && <h2>Loading...</h2>}
      {data && (
        <>
          <Row justify="center">
            <Col>
              <span style={{ float: "center" }}>
                <WeatherCard
                  dt={data.current.dt * 1000}
                  temp={data.current.temp}
                  main={data.current.weather[0].main}
                  icon={data.current.weather[0].icon}
                  desc={data.current.weather[0].description}
                />
              </span>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col>
              <WeatherList weathers={data.daily} />
            </Col>
          </Row>
        </>
      )}
      <style>
        {`
        .App{
          background-color:#EDEEEF
        }
        `}
      </style>
    </>
  );
};

export default WeatherApp;

import React, { useEffect, useState } from "react";
import { Row, Col, Button, AutoComplete } from "antd";
import { API_KEY, API_URL } from "../api/config";
import { SearchOutlined } from "@ant-design/icons";

const CitySelector = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [options, setOptions] = useState(null);
  const [value, setValue] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    if (city) {
      fetch(`${API_URL}/geo/1.0/direct?q=${city}&limit=7&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((result) => {
          if (result.length) {
            setDisable(true);
          }
          setOptions(
            Array.from(result).map((item) => {
              return {
                label: [`${item.name}, ${item.state}, ${item.country}`],
                key: [`${item.lat}${item.lon}`],
                value: [
                  item.lat,
                  item.lon,
                  `${item.name}, ${item.state}, ${item.country}`,
                ],
              };
            })
          );
        });
    }
  }, [city]);
  const onSelect = (data) => {
    setDisable(false);
    setValue(data[2]);
    setSelectedCity(data);
  };
  const onSearchCity = (city) => {
    setValue(city);
    setCity(city);
  };
  const searchWeather = () => {
    onSearch(selectedCity[0], selectedCity[1]);
  };
  return (
    <>
      <Row justify="center">
        <Col>
          <h1 style={{ font: "Bold 30px/46px Poppins" }}>Check Weather</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <AutoComplete
            value={value}
            options={options}
            style={{ width: 200 }}
            onSearch={onSearchCity}
            placeholder="Search City"
            onSelect={onSelect}
          />
          <Button
            disabled={disable}
            type="primary"
            icon={<SearchOutlined />}
            onClick={searchWeather}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {options && options.length <= 0 && <h3> No city found...</h3>}
        </Col>
      </Row>
    </>
  );
};

export default CitySelector;

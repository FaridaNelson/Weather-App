import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

function Main({ weatherData, onCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const items = Array.isArray(clothingItems)
    ? clothingItems
    : Array.isArray(clothingItems?.data)
    ? clothingItems.data
    : [];

  const todayType = weatherData?.type;
  const tempVal =
    currentTemperatureUnit === "F"
      ? weatherData?.temp?.F
      : weatherData?.temp?.C;

  const shownItems = items.filter((item) => item.weather === todayType);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__description">
          Today is{tempVal}° {currentTemperatureUnit} / You may want to wear:
        </p>

        <ul className="cards__list">
          {items
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../images/day/clear.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "cloudy",
    url: new URL("../images/day/cloudy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "rainy",
    url: new URL("../images/day/rainy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "stormy",
    url: new URL("../images/day/stormy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../images/night/clear.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../images/night/cloudy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "rainy",
    url: new URL("../images/night/rainy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "stormy",
    url: new URL("../images/night/stormy.svg", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../images/day/default.svg", import.meta.url).href,
  },
  night: {
    url: new URL("../images/night/default.svg", import.meta.url).href,
  },
};

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const coordinates = {
  latitude: 39.92,
  longitude: 48.28,
};

export const APIkey = "6f8b2f45fe1c73a740b976c8b8466892";

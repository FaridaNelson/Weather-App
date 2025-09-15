# 🌤️ WTWR — What To Wear

WTWR is a full-stack app that suggests what to wear based on current weather. It includes a React frontend and a Node.js/Express backend with a MongoDB database.

## 🔗 Live & Repos

- **Live app:** https://wtwr.star.is
- **Frontend repo:** https://github.com/FaridaNelson/Weather-App
- **Backend repo:** https://github.com/FaridaNelson/se_project_express

---

## 🚀 Features

- 📍 Detects your location (with permission) and fetches real-time weather
- 🌡️ Shows temperature and conditions with a clean, responsive UI
- 👤 Sign up / Sign in (JWT auth)
- 👗 Manage a personal wardrobe (add, like, delete items)
- 🧠 Suggests clothing based on weather conditions

---

## 🛠️ Tech Stack

**Frontend**

- React (Vite or Webpack dev tooling)
- JavaScript (ES6+), HTML5, CSS3
- Weather API (e.g., OpenWeatherMap)

**Backend**

- Node.js + Express
- MongoDB (Mongoose)
- JWT authentication, Celebrate/validator for input validation
- CORS, request/error logging, centralized error handling

**Infra**

- Ubuntu VM
- **Nginx** (serves SPA + reverse proxy to API)
- **Let’s Encrypt** (HTTPS via Certbot)
- GitHub Actions (tests/CI)

---

## 🧩 Architecture (High Level)

- Browser (React SPA)
- fetch
- Nginx (SSL termination, SPA static files, /api proxy)
- HTTP
- Express API (JWT auth, routes, validation)
- MongoDB driver
- MongoDB (data)

---

## 🖥️ Local Development

### 1 Frontend

# clone

git clone https://github.com/FaridaNelson/Weather-App.git
cd Weather-App

# install

npm install

# env

cp .env.example .env

# then set:

# VITE_WEATHER_API_KEY=your_api_key_here

# VITE_API_BASE_URL=http://localhost:3001

# run

npm run dev

.env (frontend)

VITE_WEATHER_API_KEY=your_api_key_here

# Point to your local or remote API

VITE_API_BASE_URL=http://localhost:3001

### 2 Backend

# clone

git clone https://github.com/FaridaNelson/se_project_express.git
cd se_project_express

# install

npm install

# env

cp .env.example .env

# then set values (see below)

.env (backend) — example:

PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/wtwr_db
JWT_SECRET=super_secret_string_change_me
CORS_ALLOWED_ORIGINS=http://localhost:5173,https://wtwr.star.is

# run (dev)

npm run dev

# or run (prod)

npm start

---

## ☁️ Deployment Overview

- **Domain:** https://wtwr.star.is

- **Static hosting:** Nginx serves the frontend dist/ as a Single Page App

- **API:** Express runs on the VM (e.g., localhost:3001) and is proxied by Nginx (often under /api)

- **TLS:** Let’s Encrypt (Certbot) for HTTPS

## 🖼️ Screenshots (Frontend)

- **Homepage:** ./src/images/screenshots/homePage.png

- **Profile Page:** ./src/images/screenshots/profilePage.png

- **Item Card Modal:** ./src/images/screenshots/ItemModal.png

- **Add New Item Modal:** ./src/images/screenshots/addItemModal.png

- **Delete Confirmation Modal:** ./src/images/screenshots/deleteCardConfirmation.png

## 🤝 Contributing

PRs and issues are welcome! For local dev, run both servers:

Frontend: npm run dev (Vite)

Backend: npm run dev (nodemon)
Set VITE_API_BASE_URL to your local API.

## 👩‍💻 Author

Farida Nelson
[GitHub](https://github.com/FaridaNelson) • [LinkedIn](https://www.linkedin.com/feed/)

## 📄 License

MIT — see LICENSE for details.

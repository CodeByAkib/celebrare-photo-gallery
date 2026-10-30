# 📸 Photo Gallery App

A responsive Photo Gallery Web Application built using React.js, Vite, and Tailwind CSS. The application fetches photos from the Picsum Photos API and allows users to search photos by author name and manage their favourite photos.

## 🚀 Features

* Fetches 30 photos from the Picsum Photos API.
* Responsive photo grid for mobile, tablet, and desktop.
* Real-time search functionality by author name.
* Add and remove photos from favourites.
* Favourite data persists using browser LocalStorage.
* Loading spinner while fetching photos.
* Error handling for failed API requests.

## 🛠️ Tech Stack

* React.js
* Vite
* JavaScript (ES6+)
* Tailwind CSS
* Picsum Photos API
* React Hooks

## ⚛️ React Concepts Used

* useState
* useEffect
* useReducer
* useCallback
* useMemo
* Custom Hook (useFetchPhotos)

## 📂 Project Structure

```text
src/
├── hooks/
│   └── useFetchPhotos.js
├── reducers/
│   └── favouriteReducer.js
├── App.jsx
├── main.jsx
└── index.css
```

## ⚙️ Installation and Setup

Clone the repository:

```bash
git clone https://github.com/CodeByAkib/celebrare-photo-gallery.git
```

Navigate to the project directory:

```bash
cd celebrare-photo-gallery
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 🌐 API Used

Picsum Photos API:

https://picsum.photos/v2/list?limit=30

## 👨‍💻 Author

**Md Akib Khan**

GitHub: https://github.com/CodeByAkib

# 📚 BookShelf Frontend

A modern, responsive book tracking and social reading web application built with React, Redux Toolkit, and Tailwind CSS.

## 🌐 Live Demo

- https://book-shelf-eosin-three.vercel.app/

---

## 🚀 Features

- 🔐 JWT-based Authentication (Signup / Login / Logout)
- 📖 Browse 130+ books across multiple genres
- 🔍 Real-time Search with Autocomplete, Debouncing & Throttling
- 📚 Personal Bookshelves (Read, Currently Reading, Want to Read)
- ➕ Add & ❌ Remove books from shelves
- 🖼️ Book cover images
- 📱 Fully Responsive Design
- 🎨 Smooth animations and transitions

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 |
| State Management | Redux Toolkit |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS + DaisyUI |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Icons | React Icons |
| Build Tool | Vite |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── Assets/
│   └── Images/
├── Components/
│   ├── BookCard/
│   │   └── BookCard.jsx
│   ├── Footer/
│   └── Navbar/
│       └── Navbar.jsx
├── Configs/
│   └── AxiosInstance.js
├── Hooks/
│   └── useSearchDebounce.js
├── Layout/
│   └── Layout.jsx
├── Pages/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── BookDescription.jsx
│   ├── Dashboard.jsx
│   ├── Home.jsx
│   ├── NotFound.jsx
│   └── Shelf.jsx
├── Redux/
│   └── Slices/
│       ├── AuthSlice.js
│       ├── BookSlice.js
│       └── ShelfSlice.js
├── Routes/
│   └── MainRoutes.jsx
├── App.jsx
└── main.jsx
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

**1. Clone the repository:**

```bash
git clone https://github.com/your-username/BookShelf_Frontend.git
cd BookShelf_Frontend
```

**2. Install dependencies:**

```bash
npm install
```

**3. Create `.env` file in the root:**

```env
VITE_BACKEND_URL=http://localhost:3005/api/v1/
```

**4. Start the development server:**

```bash
npm run dev
```

App will be running at `http://localhost:5173`

---

## 🔑 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_BACKEND_URL` | Backend API base URL | `http://localhost:3005/api/v1/` |

---

## 🧩 Key Implementation Details

### Axios Interceptor
Automatically attaches JWT token to every request:
```js
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-access-token'] = token;
    }
    return config;
});
```

### Search with Debouncing & Throttling
Custom `useSearchDebounce` hook:
- **Debounce:** 400ms delay before triggering search
- **Throttle:** Max one API call per 1000ms
- **Autocomplete:** Shows up to 6 suggestions with highlighted matches

### Redux State Shape
```js
{
  auth: {
    isLoggedin: Boolean,
    token: String,
    username: String
  },
  book: {
    bookList: Array,
    searchResults: Array,
    isSearching: Boolean
  },
  shelf: {
    shelfList: Array
  }
}
```

---

## 📦 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🚢 Deployment

### Deploy on Vercel

**1.** Push your code to GitHub

**2.** Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your repo

**3.** Add environment variable:
```
VITE_BACKEND_URL = https://your-render-backend-url.onrender.com/api/v1/
```

**4.** Add `vercel.json` in root for React Router support:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**5.** Click **Deploy**

---

## 🔗 Related Repositories

- **Backend:** [BookShelf Backend](https://github.com/Tanish866/BookShelf_Backend) — Node.js, Express, MongoDB

---

## 📸 Screenshots

| Page | Description |
|---|---|
| Home | Landing page with animations |
| Dashboard | Browse all books with search |
| Book Description | Detailed book view with shelf options |
| Shelves | Personal bookshelves with add/remove |

---

## 🐛 Known Issues

- Book cover images from Open Library may occasionally fail to load — fallback placeholder is shown
- Render free tier may have cold start delay of ~30 seconds on first request

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

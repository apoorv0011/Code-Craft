# CodeCraft - AI-Powered Coding Assistant

A premium web application featuring 7 AI-powered coding tools with modern glassmorphism design and smooth animations.

## 🚀 Features

- **7 AI-Powered Tools**: Code Generator, Explainer, Completion, Bug Detector, Converter, Documentation, Refactor
- **Modern UI**: Glassmorphism design with blue-indigo gradient palette
- **Smooth Animations**: Framer Motion for premium user experience
- **Syntax Highlighting**: Beautiful code display with VS Code Dark Plus theme
- **Responsive Design**: Works perfectly on all devices

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios

**Backend:**
- Node.js + Express
- MongoDB (optional)
- Gemini AI API

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd codetool2
```

2. **Install dependencies**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. **Configure environment variables**

Create `frontend/.env.local`:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/codecraft
```

4. **Get Gemini API Key**
- Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- Create a free API key
- Add it to `frontend/.env.local`

## 🚀 Running the Application

### Start Backend
```bash
cd backend
npm start
```
Server runs on `http://localhost:5000`

### Start Frontend
```bash
cd frontend
npm run dev
```
App runs on `http://localhost:5173`

## 🎨 Design Highlights

- **Glassmorphism UI** with backdrop blur effects
- **Blue-Indigo gradient palette** for sophisticated look
- **Smooth animations** on page load and interactions
- **Custom scrollbars** matching the theme
- **Premium typography** with Inter and Space Grotesk fonts

## 📱 Features Breakdown

1. **Code Generator** - Turn ideas into code
2. **Code Explainer** - Understand complex code
3. **Code Completion** - Smart code suggestions
4. **Bug Detector** - Find and fix bugs
5. **Code Converter** - Translate between languages
6. **Code Documentation** - Generate docs automatically
7. **Code Refactor** - Improve code quality

## 🔒 Authentication

- Supabase authentication (optional)
- Works without auth in demo mode
- All tools provide mock responses if API unavailable

## 📝 Notes

- **Demo Mode**: App automatically uses mock responses if Gemini API key is missing or rate-limited
- **MongoDB**: Backend works without MongoDB connection
- **Rate Limits**: Free Gemini API has usage limits; app handles this gracefully

## 👨‍💻 Author

**Apoorv Pachori**
- [LinkedIn](https://www.linkedin.com/in/apoorv-pachori)
- [GitHub](https://github.com/apoorv0011)

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.

---

Built with ❤️ using React, Tailwind CSS, and Gemini API

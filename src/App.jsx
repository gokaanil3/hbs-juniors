import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import image1 from './assets/image1.jpeg'
import day1_1 from './assets/Day 1-1.jpeg'
import day1_2 from './assets/Day 1-2.jpeg'
import day1_3 from './assets/Day 1-3.jpeg'
import day1_4 from './assets/Day 1-4.jpeg'
import day1_5 from './assets/Day 1-5.jpeg'
import day2_1 from './assets/Day 2-1.jpeg'
import day2_2 from './assets/Day 2-2.jpeg'
import day2_3 from './assets/Day 2-3.jpeg'
import day2_4 from './assets/Day 2-4.jpeg'
import day2_5 from './assets/Day 2-5.jpeg'
import day3_1 from './assets/Day 3-1.jpeg'
import day3_2 from './assets/Day 3-2.jpeg'
import day3_3 from './assets/Day 3-3.jpeg'
import day3_4 from './assets/Day 3-4.jpeg'
import day3_5 from './assets/Day 3-5.jpeg'
import day4_1 from './assets/Day 4-1.jpeg'
import day4_2 from './assets/Day 4-2.jpeg'
import day4_3 from './assets/Day 4-3.jpeg'
import day4_4 from './assets/Day 4-4.jpeg'
import day4_5 from './assets/Day 4-5.jpeg'
import day5_1 from './assets/Day 5-1.jpeg'
import day5_2 from './assets/Day 5-2.jpeg'
import day5_3 from './assets/Day 5-3.jpeg'
import day5_4 from './assets/Day 5-4.jpeg'
import day5_5 from './assets/Day 5-5.jpeg'
import './App.css'

// Replace these URLs with your real custom photos anytime.
const HERO_IMAGE_URL = image1

const CUSTOM_DAY_PHOTOS = [
  [
    day1_1,
    day1_2,
    day1_3,
    day1_4,
    day1_5,
  ],
  [
    day2_1,
    day2_2,
    day2_3,
    day2_4,
    day2_5,
  ],
  [
    day3_1,
    day3_2,
    day3_3,
    day3_4,
    day3_5,
  ],
  [
    day4_1,
    day4_2,
    day4_3,
    day4_4,
    day4_5,
  ],
  [
    day5_1,
    day5_2,
    day5_3,
    day5_4,
    day5_5,
  ],
]

const CUSTOM_VIDEO_URLS = [
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://www.w3schools.com/html/movie.mp4',
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
]

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">JUNIORS</div>
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/days">Days</NavLink>
          </li>
          <li>
            <NavLink to="/presentation">Presentation</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

function HomePage() {
  return (
    <main className="page home-page">
      <section className="hero-section">
        <h1 className="animated-text">WELCOME TO JUNIORS CLASS</h1>
        <div className="fun-icons" aria-hidden="true">
          <span>🎈</span>
          <span>⭐</span>
          <span>🌈</span>
          <span>🎉</span>
        </div>
      </section>

      <section className="theme-card">
        <h2>Righteousness Exalts a Nation</h2>
        <p>Proverbs 14:34</p>
      </section>

      <section className="image-placeholder-section" aria-label="Hero image placeholder">
        <img src={HERO_IMAGE_URL} alt="Juniors class custom hero" />
      </section>
    </main>
  )
}

function DaysPage() {
  const [activeDay, setActiveDay] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)

  const dayPhotos = useMemo(
    () =>
      Array.from({ length: 5 }, (_, day) => ({
        name: `Day ${day + 1}`,
        photos: CUSTOM_DAY_PHOTOS[day],
      })),
    [],
  )

  const activePhotos = activeDay !== null ? dayPhotos[activeDay].photos : []

  const changeDay = (dayIndex) => {
    setActiveDay(dayIndex)
    setCurrentIndex(0)
  }

  const goNext = () => {
    if (activePhotos.length === 0) {
      return
    }
    setCurrentIndex((prev) => (prev + 1) % activePhotos.length)
  }

  const goPrev = () => {
    if (activePhotos.length === 0) {
      return
    }
    setCurrentIndex((prev) => (prev - 1 + activePhotos.length) % activePhotos.length)
  }

  const onTouchStart = (event) => {
    setTouchStartX(event.changedTouches[0].clientX)
  }

  const onTouchEnd = (event) => {
    if (touchStartX === null) {
      return
    }

    const touchEndX = event.changedTouches[0].clientX
    const delta = touchStartX - touchEndX
    const swipeThreshold = 45

    if (delta > swipeThreshold) {
      goNext()
    } else if (delta < -swipeThreshold) {
      goPrev()
    }

    setTouchStartX(null)
  }

  return (
    <main className="page days-page">
      <h1>DAYS</h1>
      <h2>We want you to See all our activities</h2>

      <section className={`day-gallery-shell ${activeDay === null ? 'locked' : ''}`}>
        <div className="day-gallery-header">
          <h3>{activeDay === null ? 'Main Photo Box (Gift Wrapped)' : `${dayPhotos[activeDay].name} Photos`}</h3>
          {activeDay !== null && (
            <span>
              {currentIndex + 1} / {activePhotos.length}
            </span>
          )}
        </div>

        <div className="day-gallery-box" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <img
            src={activeDay === null ? dayPhotos[0].photos[0] : activePhotos[currentIndex]}
            alt={activeDay === null ? 'Gift wrapped main gallery' : `${dayPhotos[activeDay].name} activity ${currentIndex + 1}`}
          />
          {activeDay === null && (
            <div className="main-gift-wrap">
              <span>Gift Wrapped Gallery</span>
              <small>Press Day 1 / Day 2 / Day 3 / Day 4 / Day 5 to open</small>
            </div>
          )}
        </div>

        {activeDay !== null && (
          <div className="day-gallery-controls">
            <button onClick={goPrev}>Previous</button>
            <button onClick={goNext}>Next</button>
          </div>
        )}
      </section>

      <section className="day-grid">
        {dayPhotos.map((day, index) => (
          <button
            key={day.name}
            className={`day-card ${activeDay === index ? 'active' : ''}`}
            onClick={() => changeDay(index)}
          >
            <span>{day.name}</span>
          </button>
        ))}
      </section>
    </main>
  )
}

function PresentationPage() {
  const [activeVideo, setActiveVideo] = useState(0)

  return (
    <main className="page presentation-page">
      <h1>We want you to See a Presentation</h1>

      <section className="video-list">
        {CUSTOM_VIDEO_URLS.map((src, index) => (
          <div key={src} className="video-card">
            <button
              className={`video-tab ${activeVideo === index ? 'active' : ''}`}
              onClick={() => setActiveVideo(index)}
            >
              Video {index + 1}
            </button>
            {activeVideo === index && (
              <video controls className="video-player">
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </section>

      <p className="thank-you">Thank You for Watching!</p>
    </main>
  )
}

function WelcomePopup({ onClose }) {
  return (
    <div className="welcome-overlay" role="dialog" aria-modal="true" aria-label="Welcome message">
      <div className="welcome-popup">
        <div className="welcome-fireworks" aria-hidden="true">
          <span className="spark spark-1" />
          <span className="spark spark-2" />
          <span className="spark spark-3" />
          <span className="spark spark-4" />
        </div>

        <div className="welcome-balloons" aria-hidden="true">
          <span className="welcome-balloon balloon-a" />
          <span className="welcome-balloon balloon-b" />
          <span className="welcome-balloon balloon-c" />
          <span className="welcome-balloon balloon-d" />
        </div>

        <h2>Hey Judges We are Excited to meet you!</h2>
        <p>Welcome to HBS Juniors.</p>
        <button onClick={onClose}>Open Website</button>
      </div>
    </div>
  )
}

function App() {
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hbs-juniors-welcome-seen')
    if (!hasSeenPopup) {
      setShowWelcome(true)
      sessionStorage.setItem('hbs-juniors-welcome-seen', 'true')
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="app-shell">
        {showWelcome && <WelcomePopup onClose={() => setShowWelcome(false)} />}
        <div className="playful-bg" aria-hidden="true">
          <span className="bubble bubble-1" />
          <span className="bubble bubble-2" />
          <span className="bubble bubble-3" />
          <span className="bubble bubble-4" />
          <span className="bubble bubble-5" />
          <span className="bubble bubble-6" />
        </div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/days" element={<DaysPage />} />
          <Route path="/presentation" element={<PresentationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

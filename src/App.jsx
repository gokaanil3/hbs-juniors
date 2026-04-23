import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { useMemo, useState } from 'react'
import image1 from './assets/image1.jpg'
import './App.css'

// Replace these URLs with your real custom photos anytime.
const HERO_IMAGE_URL = image1

const CUSTOM_DAY_PHOTOS = [
  [
    'https://picsum.photos/seed/day1-photo1/900/550',
    'https://picsum.photos/seed/day1-photo2/900/550',
    'https://picsum.photos/seed/day1-photo3/900/550',
    'https://picsum.photos/seed/day1-photo4/900/550',
    'https://picsum.photos/seed/day1-photo5/900/550',
  ],
  [
    'https://picsum.photos/seed/day2-photo1/900/550',
    'https://picsum.photos/seed/day2-photo2/900/550',
    'https://picsum.photos/seed/day2-photo3/900/550',
    'https://picsum.photos/seed/day2-photo4/900/550',
    'https://picsum.photos/seed/day2-photo5/900/550',
  ],
  [
    'https://picsum.photos/seed/day3-photo1/900/550',
    'https://picsum.photos/seed/day3-photo2/900/550',
    'https://picsum.photos/seed/day3-photo3/900/550',
    'https://picsum.photos/seed/day3-photo4/900/550',
    'https://picsum.photos/seed/day3-photo5/900/550',
  ],
  [
    'https://picsum.photos/seed/day4-photo1/900/550',
    'https://picsum.photos/seed/day4-photo2/900/550',
    'https://picsum.photos/seed/day4-photo3/900/550',
    'https://picsum.photos/seed/day4-photo4/900/550',
    'https://picsum.photos/seed/day4-photo5/900/550',
  ],
  [
    'https://picsum.photos/seed/day5-photo1/900/550',
    'https://picsum.photos/seed/day5-photo2/900/550',
    'https://picsum.photos/seed/day5-photo3/900/550',
    'https://picsum.photos/seed/day5-photo4/900/550',
    'https://picsum.photos/seed/day5-photo5/900/550',
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
  const [activeDay, setActiveDay] = useState(0)
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

  const activePhotos = dayPhotos[activeDay].photos

  const changeDay = (dayIndex) => {
    setActiveDay(dayIndex)
    setCurrentIndex(0)
  }

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activePhotos.length)
  }

  const goPrev = () => {
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

      <section className="day-preview-grid">
        {dayPhotos.map((day, index) => (
          <article
            key={`${day.name}-preview`}
            className={`day-preview-card ${activeDay === index ? 'active' : 'locked'}`}
          >
            <img src={day.photos[0]} alt={`${day.name} preview`} />
            {activeDay !== index && (
              <div className="gift-wrap-overlay">
                <span>Gift Wrapped</span>
                <small>Click {day.name} below to open</small>
              </div>
            )}
            <p>{day.name}</p>
          </article>
        ))}
      </section>

      <section className="day-gallery-shell">
        <div className="day-gallery-header">
          <h3>{dayPhotos[activeDay].name} Photos</h3>
          <span>
            {currentIndex + 1} / {activePhotos.length}
          </span>
        </div>

        <div className="day-gallery-box" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <img src={activePhotos[currentIndex]} alt={`${dayPhotos[activeDay].name} activity ${currentIndex + 1}`} />
        </div>

        <div className="day-gallery-controls">
          <button onClick={goPrev}>Previous</button>
          <button onClick={goNext}>Next</button>
        </div>
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

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
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

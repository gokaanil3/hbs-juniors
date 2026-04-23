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

function GalleryModal({ photos, currentIndex, onNext, onPrev, onClose }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose} aria-label="Close gallery">
          Close
        </button>
        <img src={photos[currentIndex]} alt={`Day activity ${currentIndex + 1}`} className="modal-image" />
        <div className="modal-controls">
          <button onClick={onPrev}>Previous</button>
          <span>
            {currentIndex + 1} / {photos.length}
          </span>
          <button onClick={onNext}>Next</button>
        </div>
      </div>
    </div>
  )
}

function DaysPage() {
  const [activeDay, setActiveDay] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const dayPhotos = useMemo(
    () =>
      Array.from({ length: 5 }, (_, day) => ({
        name: `Day ${day + 1}`,
        emoji: ['🧩', '🎨', '🎵', '⚽', '📖'][day],
        photos: CUSTOM_DAY_PHOTOS[day],
      })),
    [],
  )

  const activePhotos = activeDay !== null ? dayPhotos[activeDay].photos : []

  const openGallery = (dayIndex) => {
    setActiveDay(dayIndex)
    setCurrentIndex(0)
  }

  const closeGallery = () => {
    setActiveDay(null)
    setCurrentIndex(0)
  }

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activePhotos.length)
  }

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activePhotos.length) % activePhotos.length)
  }

  return (
    <main className="page days-page">
      <h1>DAYS</h1>
      <h2>We want you to See all our activities</h2>

      <section className="day-grid">
        {dayPhotos.map((day, index) => (
          <button key={day.name} className="day-card" onClick={() => openGallery(index)}>
            <span className="day-emoji">{day.emoji}</span>
            <span>{day.name}</span>
          </button>
        ))}
      </section>

      {activeDay !== null && (
        <GalleryModal
          photos={activePhotos}
          currentIndex={currentIndex}
          onNext={goNext}
          onPrev={goPrev}
          onClose={closeGallery}
        />
      )}
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

import { useState, useEffect, useCallback } from 'react'
import AudioPlayer from './AudioPlayer'
import styles from './Slideshow.module.css'

const TEXTS = [
  { badge: ' Bienvenue',    title: 'Soa_Riva',              sub: 'Un espace doux et élégant pour vos plus beaux souvenirs.' },
  { badge: '🌸 Mémoire',     title: 'Des instants\nprécieux', sub: 'Chaque photo raconte une histoire unique et inoubliable.' },
  { badge: '🌍 Exploration', title: 'Votre galerie,\nvotre monde', sub: 'Organisez, explorez et partagez vos moments préférés.' },
  { badge: '💫 Éternité',    title: 'Souvenirs\npour toujours', sub: 'Capturez l\'essentiel et gardez-le près de vous.' },
  { badge: '☀️ Quotidien',   title: 'La beauté\ndu quotidien', sub: 'Chaque jour mérite d\'être immortalisé avec amour.' },
  { badge: '❤️ Ensemble',    title: 'Dans chaque image',      sub: 'Les photos réunissent les cœurs au-delà du temps.' },
  { badge: '🎨 Émotion',     title: 'Lumière &\némotions',    sub: 'Laissez vos images parler là où les mots s\'arrêtent.' },
  { badge: '👁️ Vision',      title: 'Un regard\nsur l\'essentiel', sub: 'L\'art de voir ce qui compte vraiment.' },
  { badge: '⏸️ Temps',       title: 'Moments\nsuspendus',     sub: 'Le temps s\'arrête, la magie reste.' },
  { badge: '📖 Histoire',    title: 'Votre histoire\nen images', sub: 'Écrivez-la slide après slide.' },
  { badge: '💎 Élégance',    title: 'Douceur &\nélégance',    sub: 'Une palette rose pour vos plus doux souvenirs.' },
  { badge: '🙏 Gratitude',   title: 'Merci d\'être là ✦',    sub: 'Profitez de chaque instant, il ne passe qu\'une fois.' },
]

export default function Slideshow({ images, audioTracks, onGoPhoto }) {
  const [idx, setIdx]      = useState(0)
  const [progress, setProg]= useState(0)
  const INTERVAL = 5000

  const goTo = useCallback(n => {
    setIdx(i => (n + images.length) % images.length)
    setProg(0)
  }, [images.length])

  useEffect(() => {
    if (!images.length) return
    setProg(0)
    const start  = Date.now()
    const frame  = requestAnimationFrame(function tick() {
      const elapsed = Date.now() - start
      setProg(Math.min(elapsed / INTERVAL * 100, 100))
      if (elapsed < INTERVAL) requestAnimationFrame(tick)
    })
    const timer  = setTimeout(() => goTo(idx + 1), INTERVAL)
    return () => { cancelAnimationFrame(frame); clearTimeout(timer) }
  }, [idx, images.length])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft')  goTo(idx - 1)
      if (e.key === 'ArrowRight') goTo(idx + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx, goTo])

  if (!images.length) return null
  const txt = TEXTS[idx % TEXTS.length]

  return (
    <div className={styles.wrap}>
      {images.map((src, i) => (
        <div key={src} className={`${styles.slide} ${i === idx ? styles.active : ''}`}>
          <img src={src} alt={`slide ${i+1}`} loading={i < 2 ? 'eager' : 'lazy'} />
          <div className={styles.overlay} />
          <div className={styles.text}>
            <div className={styles.badge}>{txt.badge}</div>
            <h2>{txt.title.split('\n').map((l,j) => <span key={j}>{l}<br/></span>)}</h2>
            <p>{txt.sub}</p>
            <button className={styles.cta} onClick={onGoPhoto}>
              Voir les photos <span>→</span>
            </button>
          </div>
        </div>
      ))}

      <div className={styles.counter}>
        PHOTO <span>{String(idx+1).padStart(2,'0')}</span> / {String(images.length).padStart(2,'0')}
      </div>

      <div className={styles.progress}>
        <div className={styles.progressBar} style={{ width: progress + '%' }} />
      </div>

      <div className={styles.dots}>
        {images.map((_,i) => (
          <button key={i} className={`${styles.dot} ${i===idx ? styles.dotActive : ''}`} onClick={() => goTo(i)} />
        ))}
      </div>

      <button className={`${styles.arrow} ${styles.prev}`} onClick={() => goTo(idx - 1)}>←</button>
      <button className={`${styles.arrow} ${styles.next}`} onClick={() => goTo(idx + 1)}>→</button>

      <AudioPlayer tracks={audioTracks} />
    </div>
  )
}

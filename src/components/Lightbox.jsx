import { useEffect } from 'react'
import styles from './Lightbox.module.css'

export default function Lightbox({ photos, index, onClose, onNav }) {
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onNav(-1)
      if (e.key === 'ArrowRight') onNav(+1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNav])

  if (index === null) return null
  const photo = photos[index]

  return (
    <div className={styles.overlay} onClick={onClose}>
      <button className={styles.close} onClick={onClose}>✕</button>
      <img src={photo.src} alt={photo.name} onClick={e => e.stopPropagation()} />
      <div className={styles.caption}>{photo.name} &nbsp;({index+1} / {photos.length})</div>
      <div className={styles.controls} onClick={e => e.stopPropagation()}>
        <button onClick={() => onNav(-1)}>←</button>
        <button onClick={onClose}>✕</button>
        <button onClick={() => onNav(+1)}>→</button>
      </div>
    </div>
  )
}

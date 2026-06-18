import { useState, useRef } from 'react'
import styles from './Video.module.css'

export default function Video({ videos, onUpload }) {
  const [modalSrc, setModalSrc] = useState(null)
  const videoRef = useRef(null)

  const openModal = src => {
    setModalSrc(src)
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.volume = 1
        videoRef.current.muted  = false
        videoRef.current.play().catch(() => {})
      }
    }, 100)
  }

  const closeModal = () => {
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.src = '' }
    setModalSrc(null)
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Galerie Vidéo</h2>
      <p className={styles.sub}>Cliquez sur ▶ pour lancer la lecture</p>

      <label className={styles.upload}>
        <div>🎥</div>
        <p>Glissez vos vidéos ici ou cliquez pour importer</p>
        <small>MP4 · WEBM · OGG (max 200 Mo)</small>
        <input type="file" accept="video/*" multiple hidden onChange={e => onUpload(Array.from(e.target.files))} />
      </label>

      {videos.length === 0
        ? <p className={styles.empty}>Aucune vidéo — placez vos fichiers dans le dossier <strong>videos/</strong> 🎬</p>
        : (
          <div className={styles.grid}>
            {videos.map(v => (
              <div key={v.id} className={styles.card}>
                <div className={styles.thumb} onClick={() => openModal(v.src)}>
                  {v.src
                    ? <video src={v.src} preload="metadata" muted />
                    : <div className={styles.noThumb}>Aperçu indisponible</div>
                  }
                  <div className={styles.playOverlay}><div className={styles.playBtn}>▶</div></div>
                </div>
                <div className={styles.info}>
                  <h4>{v.name}</h4>
                  <p>{v.desc}</p>
                  <span className={styles.tag}>{v.tag}</span>
                </div>
              </div>
            ))}
          </div>
        )
      }

      {modalSrc && (
        <div className={styles.modal} onClick={closeModal}>
          <button className={styles.modalClose} onClick={closeModal}>✕</button>
          <video ref={videoRef} src={modalSrc} controls onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  )
}

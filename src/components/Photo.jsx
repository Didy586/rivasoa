import { useState, useMemo, useEffect } from 'react'
import { pigSVG } from '../utils/pig'
import Lightbox from './Lightbox'
import styles from './Photo.module.css'

const CATS = ['all','nature','portrait','voyage','perso']

export default function Photo({ photos, onUpload }) {
  const [cat, setCat]      = useState('all')
  const [search, setSearch]= useState('')
  const [lbIdx, setLbIdx]  = useState(null)

  const filtered = useMemo(() =>
    photos.filter(p =>
      (cat === 'all' || p.cat === cat) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    ), [photos, cat, search])

  const nav = delta => setLbIdx(i => (i + delta + filtered.length) % filtered.length)

  return (
    <div className={styles.section}>
      {/* Pig hero */}
      <div className={styles.pigHero} dangerouslySetInnerHTML={{ __html: pigSVG(500) }} />

      {/* Floating pigs */}
      {[
        {left:'5%',delay:'0s',dur:'12s',size:70},{left:'18%',delay:'3s',dur:'16s',size:55},
        {left:'35%',delay:'7s',dur:'11s',size:80},{left:'52%',delay:'1.5s',dur:'14s',size:60},
        {left:'68%',delay:'5s',dur:'13s',size:90},{left:'80%',delay:'9s',dur:'10s',size:50},
        {left:'92%',delay:'2s',dur:'17s',size:65},
      ].map((p,i) => (
        <div key={i} className={styles.pigFloat} style={{ left:p.left, animationDuration:p.dur, animationDelay:p.delay }}
          dangerouslySetInnerHTML={{ __html: pigSVG(p.size) }} />
      ))}

      <div className={styles.content}>
        {/* Upload */}
        <label className={styles.upload}>
          <div className={styles.uploadIcon}>📸</div>
          <p>Glissez vos photos ici ou cliquez pour importer</p>
          <small>JPG · PNG · GIF · WEBP (max 20 Mo)</small>
          <input type="file" accept="image/*" multiple hidden onChange={e => onUpload(Array.from(e.target.files))} />
        </label>

        {/* Filters */}
        <div className={styles.filterBar}>
          {CATS.map(c => (
            <button key={c} className={`${styles.filterBtn} ${cat===c ? styles.active : ''}`} onClick={() => setCat(c)}>
              {c === 'all' ? 'Toutes' : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input placeholder="Rechercher une photo…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.length === 0
            ? <p className={styles.empty}>Aucune photo trouvée 🌸</p>
            : filtered.map((p, i) => (
              <div key={p.id} className={styles.card} onClick={() => setLbIdx(i)}>
                <img src={p.src} alt={p.name} loading="lazy" />
                <div className={styles.cardOverlay}><span>{p.name}</span></div>
              </div>
            ))
          }
        </div>
      </div>

      {lbIdx !== null && (
        <Lightbox photos={filtered} index={lbIdx} onClose={() => setLbIdx(null)} onNav={nav} />
      )}
    </div>
  )
}

import { useEffect, useRef } from 'react'
import { pigSVG } from '../utils/pig'
import Slideshow from './Slideshow'
import styles from './About.module.css'

const PIG_CONFIGS = [
  {left:'4%',delay:'0s',dur:'7s',size:55,opacity:.22},{left:'13%',delay:'1.8s',dur:'9s',size:75,opacity:.18},
  {left:'24%',delay:'3.5s',dur:'6s',size:45,opacity:.25},{left:'35%',delay:'0.7s',dur:'10s',size:90,opacity:.15},
  {left:'46%',delay:'5s',dur:'8s',size:60,opacity:.20},{left:'57%',delay:'2.3s',dur:'7.5s',size:50,opacity:.22},
  {left:'67%',delay:'4.1s',dur:'9.5s',size:80,opacity:.17},{left:'77%',delay:'1.1s',dur:'6.5s',size:40,opacity:.28},
  {left:'86%',delay:'6s',dur:'8.5s',size:65,opacity:.19},{left:'94%',delay:'2.9s',dur:'7s',size:55,opacity:.21},
]

export default function About({ images, audioTracks, photos, videos, onGoPhoto }) {
  return (
    <div className={styles.section}>
      {/* Cochons tombants */}
      {PIG_CONFIGS.map((c, i) => (
        <div key={i} className={styles.pigFall}
          style={{ left:c.left, animationDuration:c.dur, animationDelay:c.delay, opacity:c.opacity }}
          dangerouslySetInnerHTML={{ __html: pigSVG(c.size) }}
        />
      ))}

      <Slideshow images={images} audioTracks={audioTracks} onGoPhoto={onGoPhoto} />

      {/* Stats */}
      <div className={styles.stats}>
        {[
          { num: photos.length,  label: 'Photos'  },
          { num: videos.length,  label: 'Vidéos'  },
          { num: '11',         label: 'Souu' },
          { num: '03',              label: 'Rivaaa' },
        ].map(s => (
          <div key={s.label} className={styles.stat}>
            <div className={styles.statNum}>{s.num}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

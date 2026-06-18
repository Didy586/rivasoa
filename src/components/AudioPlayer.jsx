import { useEffect, useRef, useState } from 'react'
import styles from './AudioPlayer.module.css'

export default function AudioPlayer({ tracks }) {
  const audioRef  = useRef(null)
  const [idx, setIdx]       = useState(0)
  const [playing, setPlay]  = useState(false)
  const [muted, setMuted]   = useState(false)
  const [progress, setProg] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const [title, setTitle]   = useState('🔇 Cliquez ▶ pour activer le son')

  useEffect(() => {
    if (!tracks.length) return
    const audio = audioRef.current
    audio.src    = tracks[idx].file
    audio.muted  = true
    audio.volume = 1
    audio.play().then(() => {
      setPlay(true)
      if (unlocked) { audio.muted = false; setTitle(tracks[idx].name) }
      else setTitle('🔇 Cliquez ▶ pour activer le son')
    }).catch(() => setPlay(false))
  }, [idx, tracks])

  useEffect(() => {
    const unlock = () => {
      if (!unlocked && audioRef.current) {
        audioRef.current.muted  = false
        audioRef.current.volume = 1
        setUnlocked(true)
        setMuted(false)
        if (tracks[idx]) setTitle(tracks[idx].name)
      }
    }
    document.addEventListener('click', unlock)
    return () => document.removeEventListener('click', unlock)
  }, [unlocked, idx, tracks])

  useEffect(() => {
    const audio = audioRef.current
    const onTime = () => {
      if (audio.duration) setProg(audio.currentTime / audio.duration * 100)
    }
    const onEnd = () => setIdx(i => (i + 1) % tracks.length)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)
    return () => { audio.removeEventListener('timeupdate', onTime); audio.removeEventListener('ended', onEnd) }
  }, [tracks])

  const toggle = () => {
    const audio = audioRef.current
    audio.muted  = false; audio.volume = 1
    setUnlocked(true)
    if (tracks[idx]) setTitle(tracks[idx].name)
    if (audio.paused) { audio.play(); setPlay(true) }
    else { audio.pause(); setPlay(false) }
  }

  const next = () => setIdx(i => (i + 1) % tracks.length)

  const toggleMute = () => {
    const audio = audioRef.current
    const m = !muted
    audio.muted = m; audio.volume = m ? 0 : 1
    setMuted(m)
  }

  const seek = e => {
    const audio = audioRef.current
    if (!audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration
  }

  if (!tracks.length) return null

  return (
    <div className={styles.bar}>
      <audio ref={audioRef} preload="auto" />
      <button className={styles.playBtn} onClick={toggle}>{playing ? '⏸' : '▶'}</button>
      <div className={styles.info}>
        <div className={styles.trackTitle}>{title}</div>
        <div className={styles.trackBar} onClick={seek}>
          <div className={styles.trackFill} style={{ width: progress + '%' }} />
        </div>
      </div>
      <div className={`${styles.eq} ${!playing ? styles.eqPaused : ''}`}>
        <span/><span/><span/>
      </div>
      <button className={styles.nextBtn} onClick={next}>⏭</button>
      <button className={styles.volBtn} onClick={toggleMute}>{muted ? '🔇' : '🔊'}</button>
    </div>
  )
}

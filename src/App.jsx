import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import About  from './components/About'
import Photo  from './components/Photo'
import Video  from './components/Video'

export default function App() {
  const [section, setSection] = useState('about')
  const [photos,  setPhotos]  = useState([])
  const [videos,  setVideos]  = useState([])
  const [images,  setImages]  = useState([])
  const [audio,   setAudio]   = useState([])

  useEffect(() => {
    const load = async () => {
      const [imgs, vids, auds] = await Promise.all([
        fetch('/api/images').then(r => r.json()).catch(() => []),
        fetch('/api/videos').then(r => r.json()).catch(() => []),
        fetch('/api/audio').then(r => r.json()).catch(() => []),
      ])
      setImages(imgs.map(i => i.file))
      setPhotos(imgs.map((i, idx) => ({ id: 1000 + idx, src: i.file, name: i.name, cat: 'perso' })))
      setVideos(vids.map((v, idx) => ({ id: 1000 + idx, src: v.file, name: v.name, desc: 'Votre vidéo', tag: 'Personnel' })))
      setAudio(auds)
    }
    load()
  }, [])

  const addPhotos = files => {
    files.forEach(f => {
      if (!f.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = e => setPhotos(p => [...p, { id: Date.now() + Math.random(), src: e.target.result, name: f.name.replace(/\.[^.]+$/, ''), cat: 'perso' }])
      reader.readAsDataURL(f)
    })
  }

  const addVideos = files => {
    files.forEach(f => {
      if (!f.type.startsWith('video/')) return
      setVideos(v => [...v, { id: Date.now(), src: URL.createObjectURL(f), name: f.name.replace(/\.[^.]+$/, ''), desc: 'Importé', tag: 'Personnel' }])
    })
  }

  return (
    <>
      <Navbar active={section} setActive={setSection} />
      {section === 'about' && <About images={images} audioTracks={audio} photos={photos} videos={videos} onGoPhoto={() => setSection('photo')} />}
      {section === 'photo' && <Photo photos={photos} onUpload={addPhotos} />}
      {section === 'video' && <Video videos={videos} onUpload={addVideos} />}
      <footer style={{ textAlign:'center', padding:'2rem', color:'#c2185b', fontSize:'.85rem', borderTop:'1px solid rgba(244,143,177,.3)', marginTop:'2rem', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        ✦ SoaRiva &nbsp;·&nbsp; Créé avec passion &nbsp;·&nbsp; © 2026
      </footer>
    </>
  )
}

import { useState } from 'react'
import { images as imageList, videos as videoList, audio as audioList } from 'virtual:media'
import Navbar from './components/Navbar'
import About  from './components/About'
import Photo  from './components/Photo'
import Video  from './components/Video'

const initPhotos = imageList.map((i, idx) => ({ id: 1000 + idx, src: i.file, name: i.name, cat: 'perso' }))
const initVideos = videoList.map((v, idx) => ({ id: 1000 + idx, src: v.file, name: v.name, desc: 'Votre vidéo', tag: 'Personnel' }))
const initImages = imageList.map(i => i.file)

export default function App() {
  const [section, setSection] = useState('about')
  const [photos,  setPhotos]  = useState(initPhotos)
  const [videos,  setVideos]  = useState(initVideos)

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
      {section === 'about' && <About images={initImages} audioTracks={audioList} photos={photos} videos={videos} onGoPhoto={() => setSection('photo')} />}
      {section === 'photo' && <Photo photos={photos} onUpload={addPhotos} />}
      {section === 'video' && <Video videos={videos} onUpload={addVideos} />}
      <footer style={{ textAlign:'center', padding:'2rem', color:'#c2185b', fontSize:'.85rem', borderTop:'1px solid rgba(244,143,177,.3)', marginTop:'2rem', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        ✦ SoaRiva &nbsp;·&nbsp; Créé avec passion &nbsp;·&nbsp; © 2026
      </footer>
    </>
  )
}

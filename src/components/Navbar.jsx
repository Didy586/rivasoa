import styles from './Navbar.module.css'

export default function Navbar({ active, setActive }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => setActive('about')}>SOA_RIVA</div>
      <ul className={styles.links}>
        {['about','photo','video'].map(s => (
          <li key={s}>
            <a
              href="#"
              className={active === s ? styles.active : ''}
              onClick={e => { e.preventDefault(); setActive(s) }}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

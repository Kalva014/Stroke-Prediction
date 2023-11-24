import Link from 'next/link';
import './styles/home_screen.css'

export default function Home() {
  return (
    <main className="home">
      <div className="content">
        <div className='title'>
           <h1>See How Susceptible You Are To Stroke</h1>
        </div>
        <div className='action'>
          <Link href="/prediction/" className="btn" > Check Your Risk </Link>
        </div>

      </div>
    </main>
  )
}
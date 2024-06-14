// import Footer from '../Footer/index'
import { ReactNode } from 'react'
import Header from '../Header'
import Link from 'next/link'
// import { Outlet } from 'react-router-dom'

interface ProjectLayoutProps {
  children?: ReactNode
}

export default function ProjectLayout({
  children
}: ProjectLayoutProps) {
  return (
    <div className='w-full flex min-h-screen'>
      <div className='w-80 h-full border-r shrink-0'>
        <ul className="menu menu-lg border-base-200 w-56 rounded-box min-h-screen">
          <li>
            <Link href={'/project/profile'} className=''>Profile</Link>
          </li>
          <li>
            <Link href={'/project/task'}  className=''>Task</Link>
          </li>
          <li>
            <Link href={'/project/space'}  className=''>Space</Link>
          </li>
          {/* <li>
            <Link href={'/project/setting'} className=''>Setting</Link>
          </li> */}
        </ul>
      </div>
      <div className=' flex-grow p-6'>
        {children}
      </div>
    </div>
  )
}
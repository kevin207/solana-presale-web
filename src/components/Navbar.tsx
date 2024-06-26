import Link from 'next/link'
import React from 'react'
import Image from "next/image";

const Navbar = () => {
  const navigations = [
    { name: 'About', path: '/about' },
    { name: 'Overview', path: '/faq' },
    { name: 'How it Works', path: '/contact' },
    { name: 'ICO Token', path: '/ico'},
    { name: 'Roadmap', path: '/roadmap'},
    { name: 'Team', path: '/team'},
    { name: 'FAQ', path: '/faq'},
  ]
  return (
    <nav className='flex flex-row w-full justify-between items-center'>
      <Link href="/" className='flex items-center gap-1'>
        <Image
          src="/assets/icon.svg"
          width={300}
          height={60}
          alt='logo'
        />
      </Link>

      <ul className='hidden lg:flex flex-row gap-8'>
        {navigations.map((nav, index) => (
          <li key={index}>
            <Link href={nav.path}>
              <span className='text-accent text-lg whitespace-nowrap'>{nav.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <button className='bg-main text-accent px-4 py-3 rounded-lg font-semibold'>
        Connect Wallet
      </button>
    </nav>
  )
}

export default Navbar
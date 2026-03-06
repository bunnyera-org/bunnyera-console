
'use client' 
import Link from 'next/link' 

const nav = [ 
  { name: 'Dashboard', path: '/' }, 
  { name: 'Monitor', path: '/monitor' }, 
  { name: 'Agents', path: '/agents' }, 
  { name: 'Tasks', path: '/tasks' }, 
  { name: 'Logs', path: '/logs' }, 
  { name: 'Settings', path: '/settings' }, 
] 

export default function Sidebar() { 
  return ( 
    <aside className='w-64 h-screen bg-bunny-card border-r border-gray-800 p-6'> 
      <div className='text-bunny-accent text-2xl font-bold mb-8'> 
        BunnyEra Console 
      </div> 
      <nav className='space-y-4'> 
        {nav.map((item) => ( 
          <Link 
            key={item.path} 
            href={item.path} 
            className='block text-gray-300 hover:text-bunny-accent transition' 
          > 
            {item.name} 
          </Link> 
        ))} 
      </nav> 
    </aside> 
  ) 
} 

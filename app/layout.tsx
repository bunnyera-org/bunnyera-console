
import './globals.css' 
import Sidebar from '@/components/layout/Sidebar' 
import Topbar from '@/components/layout/Topbar' 

export const metadata = {
  title: 'BunnyEra Console',
  description: 'BunnyEra Cloud Control Center',
}

export default function RootLayout({ children }: { children: React.ReactNode }) { 
  return ( 
    <html lang='en'> 
      <body className='bg-bunny-bg text-bunny-text flex'> 
        <Sidebar /> 
        <div className='flex-1 flex flex-col'> 
          <Topbar /> 
          <main className='p-6'>{children}</main> 
        </div> 
      </body> 
    </html> 
  ) 
} 


export default function Card({ title, children }: any) {
  return (
    <div className='bg-bunny-card p-5 rounded-lg border border-gray-800 shadow-lg'>
      {title && (
        <div className='text-gray-400 text-sm mb-2'>{title}</div>
      )}
      {children}
    </div>
  )
}

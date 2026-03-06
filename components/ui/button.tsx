
export default function Button({ children, onClick, variant = 'default', className = '', ...props }: any) {
  const base = 'px-4 py-2 rounded transition font-medium disabled:opacity-50 disabled:cursor-not-allowed'

  const styles =
    variant === 'primary'
      ? 'bg-bunny-accent text-black hover:opacity-80'
      : variant === 'danger'
      ? 'bg-red-500 text-white hover:bg-red-400'
      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'

  return (
    <button onClick={onClick} className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  )
}

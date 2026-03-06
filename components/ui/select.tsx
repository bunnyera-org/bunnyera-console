
export default function Select({ value, onChange, children, className = '' }: any) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full p-2 rounded bg-gray-900 border border-gray-700 text-gray-200 focus:border-bunny-accent outline-none transition-colors ${className}`}
    >
      {children}
    </select>
  )
}

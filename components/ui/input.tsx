
export default function Input({ value, onChange, placeholder, type = 'text', className = '' }: any) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-2 rounded bg-gray-900 border border-gray-700 text-gray-200 focus:border-bunny-accent outline-none transition-colors ${className}`}
    />
  )
}

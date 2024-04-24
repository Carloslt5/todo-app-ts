import { useThemeContext } from '@/hooks/themeContext-Hook'

const HomePage = () => {
  const { darkMode } = useThemeContext()

  return (
    <div className='container px-2 mx-auto max-w-7xl'>
      <h1 className='text-3xl font-bold dark:text-white'>
        Holis {darkMode ?'🏄 ': '🛌'}
      </h1>
    </div>
  )
}
export default HomePage
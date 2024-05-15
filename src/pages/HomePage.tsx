import { useThemeContext } from '@/hooks/themeContext-Hook'

const HomePage = () => {
  const { darkMode } = useThemeContext()

  return (
    <div className='container px-2 mx-auto max-w-7xl dark:text-white'>
      <h1 className='text-3xl font-bold'>
        Welcome {darkMode ?'🏄 ': '🛌'}
      </h1>
      <h2 className='mt-4'>Manage all your tasks simply, streamlining your workflow, and increasing productivity</h2>
    </div>
  )
}
export default HomePage
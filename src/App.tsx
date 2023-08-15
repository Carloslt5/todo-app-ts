import Navigation from './components/Navigation/Navigation'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className='flex h-screen'>
      <div id='navbar'>
        <Navigation />
      </div>
      <div className='content w-full flex-1'>
        <AppRoutes />
        <Footer />
      </div>
    </div>
  )
}

export default App
import './App.css'
import Header from './components/Header'
import BodyContent from './components/BodyContent'

function App() {
  return (
    <div className='w-full h-[100dvh] flex flex-col'>
      {/* Header Section */}
      <div className="flex-shrink-0">
        <Header />
      </div>
      <BodyContent />
    </div>
  )
}

export default App;






import './App.css'
import Header from './components/Header'
import DisplayContacts from './components/DisplayContacts'
import CalendarUI from './components/Calendar/CalendarUI'

function App() {
  return (
    <div className='w-full h-[100dvh] flex flex-col'>

      {/* Header Section */}
      <div className="flex-shrink-0">
        <Header />
      </div>

      {/* Main Content that takes remaining space */}
      <div className="flex-grow grid grid-cols-[40%_57%] mt-3 gap-5 overflow-hidden">

        {/* DisplayContacts Section */}
        <div className='overflow-auto'>
          <DisplayContacts />
        </div>

        {/* Calendar Section */}
        <div className='grid grid-rows-[20%_80%] h-full overflow-auto'>
          <div className='row-span-1 text-gray-600 border mb-5 rounded'>01</div>
          <div className='row-span-2 pb-10'>
            <CalendarUI />
          </div>
        </div>

      </div>
    </div>
  )
}

export default App;


// function App() {
//   return (
//     <div className='w-full h-[100dvh] flex flex-col'>

//         <Header />


//       <div class="grid grid-cols-[40%_60%] mt-3 gap-5 h-[100dvh]">
//         <div className='overflow-auto'>
//           <DisplayContacts />
//         </div>


//         <div className='grid grid-rows-[10%_80%]'>
//           <div className='row-span-1 text-blue-600 border'>01</div>
//           <div className='row-span-2 pb-100'>
//             <CalendarUI />
//           </div>
//         </div>

//         {/* <div>02</div> */}
//       </div>
//     </div>
//   )
// }



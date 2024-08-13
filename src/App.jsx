import { useState } from 'react'
import './App.css'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Home from './Components/Home'
import Details from './Components/Details'
import Create from './Components/Create'
import Edit from './Components/Edit'

function App() {
  const [count, setCount] = useState(0)

  const {search , pathname} = useLocation()

  return (
    <>
      
      <div className='h-screen w-screen flex '>
        
        {(pathname != "/" || search.length > 0) && (
           <Link to='/' className=' absolute left-[25%] top-[3%] pb-10 mb-5 text-red-300 '>Home</Link>
        )}
       <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/details/:id' element={<Details />} />
         <Route path='/create'  element={<Create />} />
         <Route path='/edit/:id' element={<Edit />} />
       </Routes>
      </div>

    </>
  )
}

export default App

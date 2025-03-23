import { useState } from 'react';
import './App.css'
import Aside from './components/custom/aside'
import { ReloadCTX } from './contexts/reload';
import ProductsList from './components/custom/productsList';
function App() {
  const [reload, setReload] = useState(true);

  return (
    <div className='flex gap-[10px]'>
      <ReloadCTX.Provider value={[reload, setReload]}>
        <ProductsList />
        <Aside />
      </ReloadCTX.Provider>
    </div>
  )
}

export default App

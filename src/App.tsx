import { useState } from 'react';
import './App.css'
import { ReloadCTX } from './contexts/reload';
import ProductsList from './components/custom/productsList';
function App() {
  const [reload, setReload] = useState(true);

  return (
    <div className='flex gap-[10px]'>
      <ReloadCTX.Provider value={[reload, setReload]}>
        <ProductsList />
      </ReloadCTX.Provider>
    </div>
  )
}

export default App

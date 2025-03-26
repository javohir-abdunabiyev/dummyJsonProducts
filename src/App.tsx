import { useState } from 'react';
import './App.css'
import { ReloadCTX } from './contexts/reload';
import UserManagement from './components/custom/userManagement';
function App() {
  const [reload, setReload] = useState(true);

  return (
    <div className=''>
      <ReloadCTX.Provider value={[reload, setReload]}>
        <UserManagement />
      </ReloadCTX.Provider>
    </div>
  )
}

export default App

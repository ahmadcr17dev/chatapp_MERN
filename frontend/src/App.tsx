import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';

const App = () => {
  return (
    <>
    {/* <Register /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
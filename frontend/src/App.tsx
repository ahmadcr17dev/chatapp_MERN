import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import ChatPage from './components/ChatPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/chatpage' element={<ChatPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Toaster position='bottom-right' />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </UserProvider>
  );
}
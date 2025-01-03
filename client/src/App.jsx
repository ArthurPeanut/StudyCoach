import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import CreateTask from './pages/CreateTask';
import UpdateTask from './pages/UpdateTask';
import Tasks from './pages/Tasks';
import SingleTask from './pages/SingleTask';
import SummaryPage from './pages/SummaryPage';

import { UserProvider } from './context/UserContext';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';

// Any component inside UserProvider can access the context.
// #TODO: compare it with redux
export default function App() {
  return (
    <UserProvider>
      <ChakraProvider>
        <BrowserRouter>
          <NavBar />
          <Toaster position='bottom-right' />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />

            <Route element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/create-task' element={<CreateTask />} />
              <Route path='/update-task/:taskId' element={<UpdateTask />} />
              <Route path='/tasks' element={<Tasks />} />
              <Route path='/tasks/:taskId' element={<SingleTask />} />
              <Route path='/summaries' element={<SummaryPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </UserProvider>
  );
}
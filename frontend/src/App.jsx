import {Routes,Route,Navigate} from 'react-router-dom'
import Login from './components/Login'
import Home from './container/Home'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseconfig'
import { useEffect,useState } from 'react'
function App() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return null;
  }
  return (
    <Routes>
      {!user ? (
        <Route path="/*" element={<Navigate to="/login" replace />} />
      ) : (
        <Route path="/*" element={<Home />} />
      )}

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App

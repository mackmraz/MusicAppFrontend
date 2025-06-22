import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
        <BrowserRouter>
          <NavigationBar />
          <main className="container mx-auto p-4">
            <AppRoutes />
          </main>
        </BrowserRouter>
  );
}

export default App;
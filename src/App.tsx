import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import NavigationBar from './components/NavigationBar';
import Footer from './components/footer';

function App() {
  return (
        <BrowserRouter>
          <NavigationBar />
          <main className="container mx-auto p-4">
            <AppRoutes />
          </main>
          <Footer />
        </BrowserRouter>
  );
}

export default App;
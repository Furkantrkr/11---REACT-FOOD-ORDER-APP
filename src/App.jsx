import Header from './components/Header.jsx/Header';
import Meals from './components/Meals/Meals';
import { CartContextProvider } from './store/CartContext';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;

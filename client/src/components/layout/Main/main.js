import { Footer } from '../Footer/footer';
import { Header } from '../Header/header';

export const Main = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='pt-3' style={{ minHeight: '85vh' }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

import { Footer } from '../Footer/footer';
import { Header } from '../Header/header';

export const Main = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

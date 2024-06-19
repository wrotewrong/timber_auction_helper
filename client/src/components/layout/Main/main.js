import { Footer } from '../Footer/footer';
import { Header } from '../Header/header';

export const Main = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

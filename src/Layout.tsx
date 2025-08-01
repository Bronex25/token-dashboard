import { Footer } from './components/Footer';
import { Header } from './components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header></Header>
      <main className="flex flex-col items-center p-4 mx-auto w-full max-w-7xl">
        {children}
      </main>
      <Footer></Footer>
    </div>
  );
}

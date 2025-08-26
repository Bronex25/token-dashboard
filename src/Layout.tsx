import { Footer } from './components/Footer';
import { Header } from './components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-between dark:bg-black dark:text-white">
      <Header></Header>
      <main className="flex flex-col items-center p-4 mx-auto w-full max-w-7xl mb-2 gap-15 min-h-[80vh]">
        {children}
      </main>
      <Footer></Footer>
    </div>
  );
}

import Footer from "Components/Footer/Footer";
import Navbar from "Components/Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />

      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      <Footer />
    </div>
  );
}
import Footer from "Components/Footer/Footer";
import Navbar from "Components/Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#181b24]">
      <Navbar />

        <main className="flex justify-center flex-1">
          {children}
        </main>

      <Footer />
    </div>
  );
}
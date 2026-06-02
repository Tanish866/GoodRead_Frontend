import Footer from "Components/Footer/Footer";
import Navbar from "Components/Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#181b24]">
      <Navbar />

      <div className="mx-auto w-9/12 flex-1">
        {children}
      </div>

      <Footer />
    </div>
  );
}
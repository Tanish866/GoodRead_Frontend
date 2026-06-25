import logo from "Assets/Images/logo.webp";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#20212b] text-white overflow-x-hidden">

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-700/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-yellow-400/5 blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="animate-[fadeInDown_0.8s_ease_forwards]">
            <img
              src={logo}
              alt="BookShelf logo"
              className="h-36 w-36 rounded-full object-cover shadow-2xl ring-4 ring-purple-700/40 hover:ring-purple-500/60 transition-all duration-500 hover:scale-105"
            />
          </div>

          <div className="mt-10 animate-[fadeInUp_0.8s_ease_0.2s_forwards] opacity-0">
            <h1 className="text-6xl font-bold tracking-widest text-white md:text-7xl">
              BookShelf
            </h1>
            <p className="mt-6 text-2xl font-semibold leading-relaxed tracking-wide text-yellow-400 md:text-3xl max-w-2xl mx-auto">
              Your personal library and social network for bookworms
            </p>
          </div>

          <div className="mt-12 flex gap-5 animate-[fadeInUp_0.8s_ease_0.4s_forwards] opacity-0">
            <Link
              to="/Signup"
              className="rounded-md bg-purple-700 px-8 py-3 text-lg font-bold uppercase text-white transition-all duration-300 hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-700/30 hover:-translate-y-0.5"
            >
              Register
            </Link>
            <Link
              to="/Login"
              className="rounded-md bg-yellow-400 px-8 py-3 text-lg font-bold uppercase text-black transition-all duration-300 hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/30 hover:-translate-y-0.5"
            >
              Login
            </Link>
          </div>

          <div className="mt-20 animate-bounce">
            <a href="#features" className="text-white/30 hover:text-white/60 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-24 bg-[#1a1b23]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-white mb-16 tracking-wide">
            Everything a bookworm needs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "📚",
                title: "Track Your Books",
                desc: "Organize books into shelves — reading, read, and want to read."
              },
              {
                icon: "⭐",
                title: "Rate & Review",
                desc: "Rate books and share your thoughts with the community."
              },
              {
                icon: "🔍",
                title: "Discover Books",
                desc: "Search and explore thousands of books across all genres."
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="rounded-xl bg-[#20212b] p-8 border border-white/5 hover:border-purple-700/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/20"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 bg-[#20212b]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to start reading?</h2>
          <p className="text-white/50 text-lg mb-10">
            Join BookShelf today and take control of your reading journey.
          </p>
          <Link
            to="/Signup"
            className="inline-block rounded-md bg-purple-700 px-10 py-4 text-lg font-bold uppercase text-white transition-all duration-300 hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-700/30 hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
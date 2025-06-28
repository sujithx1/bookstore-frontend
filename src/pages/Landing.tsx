import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-[#2322] text-[#f5f5dc] font-serif">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-[#3e2f26] shadow-md">
        <h1 className="text-3xl tracking-wider text-[#854d0e] font-bold">Shakespeare</h1>
        <nav className="flex gap-6 text-sm uppercase text-[#bfae9c]">
          <Link to="/books" className="hover:text-[#a16207]">Books</Link>
          <Link to="/login" className="hover:text-[#a16207]">Login</Link>
          <Link to="/register" className="hover:text-[#a16207]">Sign Up </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col md:flex-row justify-between items-center px-8 md:px-16 py-20">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-[#854d0e] mb-6">
            Welcome to Shakespeare,<br />
            where <span className="text-[#fb923c]">words</span> find their place in time.
          </h2>
          <p className="text-[#cdb89e] mb-6 leading-relaxed">
            A curated collection of classic and modern books, for those who seek stories soaked in soul and silence.
          </p>
          <div className="flex gap-4">
            <Link
              to="/books"
              className="bg-[#5d4037] hover:bg-[#422006] text-white px-6 py-3 rounded shadow-md transition"
            >
              Browse Collection
            </Link>
            <Link
              to="/register"
              className="border border-[#8d6e63] text-[#e0c9a6] px-6 py-3 rounded hover:bg-[#3e2f26] transition"
            >
              Join Us
            </Link>
          </div>
        </div>

        {/* Image */}
       <div className="w-full md:w-[45%] mt-10 md:mt-0">
  <img
    src="https://res.cloudinary.com/ded1lrbaz/image/upload/v1750688273/download_29_eo5imc.jpg"
    alt="vintage bookstore"
    className="w-full max-h-[400px] object-cover rounded-xl shadow-xl opacity-90"
  />
</div>

      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-[#9e7d63] border-t border-[#3e2f26]">
        © {new Date().getFullYear()} Shakespeare. For those who read between the rain.
      </footer>
    </main>
  );
};

export default LandingPage;

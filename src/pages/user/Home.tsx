import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Home = () => {
  const navigate=useNavigate()
  return (
    <>
        <Header/>
    <section className="min-h-screen bg-[#f8f5f0] text-[#3e2f26] px-4 py-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h1 className="text-5xl font-serif font-bold leading-tight mb-6 text-[#5e4636]">
            Welcome to Shakespeare
          </h1>
          <p className="text-[#6b5846] text-lg mb-8 leading-relaxed">
            A curated collection of timeless literature and modern masterpieces. Explore rare finds,
            new arrivals, and stories that stay with you forever.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-[#a67c52] text-white rounded shadow hover:bg-[#956a45] transition" onClick={()=>navigate('/books')}>
              Browse Collection
            </button>
            <button className="px-6 py-2 border border-[#a67c52] text-[#a67c52] rounded hover:bg-[#f1e8de] transition">
              Learn More
            </button>
          </div>
        </div>
        </div>

       
    </section>
    <Footer/>
    </>
  );
};

export default Home;

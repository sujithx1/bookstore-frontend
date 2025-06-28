const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10 py-4 text-center text-sm text-gray-600">
      © {new Date().getFullYear()} <span className="font-semibold text-amber-800">Shakespeare Bookstore</span>. Crafted with ❤️ by{' '}
      <a
        href="mailto:sujith.c.dev@gmail.com"
        className="text-blue-600 hover:underline"
      >
        sujith.c.dev@gmail.com
      </a>{' '}
      &{' '}
      <a
        href="https://linkedin.com/in/sujithc-dev"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        linkedin.com/in/sujithc-dev
      </a>.
    </footer>
  );
};

export default Footer;

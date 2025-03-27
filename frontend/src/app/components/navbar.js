export default function Navbar() {
    return (
      <nav className="bg-blue-600 p-4">
        <ul className="flex justify-between items-center text-white">
          <li className="font-bold text-lg">Employee Management</li>
          <div className="flex gap-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/employees" className="hover:underline">Employees</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
          </div>
        </ul>
      </nav>
    );
  }
  
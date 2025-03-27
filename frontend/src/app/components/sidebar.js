export default function Sidebar() {
    return (
      <aside className="bg-gray-200 w-64 min-h-screen p-4">
        <ul>
          <li className="mb-4"><a href="/" className="text-lg">Dashboard</a></li>
          <li className="mb-4"><a href="/employees" className="text-lg">Employees</a></li>
          <li className="mb-4"><a href="/settings" className="text-lg">Settings</a></li>
        </ul>
      </aside>
    );
  }
  
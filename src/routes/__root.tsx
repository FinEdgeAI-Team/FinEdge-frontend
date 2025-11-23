import { Outlet, createRootRoute } from "@tanstack/react-router";
import Sidebar from "../data/component/sidebar";
import Navbar from "../data/component/Nav";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex h-screen ">
      {/* Sidebar - Fixed Width */}
      <aside className="h-screen shadow-sm">
        <Sidebar />
      </aside>

      {/* Main Content Container */}
      <div className=" flex flex-col w-screen h-screen">
        {/* Navbar - Fixed */}
        <nav className="h-16  border-b border-gray-200 shadow-sm">
          <Navbar />
        </nav>

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}


import {ROUTES} from "../../constants/Routes.js"
import { NavLink, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export default function AdminLayout() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex">
            <aside className="w-64 shrink-0 bg-[#C0D6DF] backdrop-blur">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Admin</h2>
                </div>
                <nav className="p-2 space-y-1">
                    {/* Nav links here */}
                    <NavItem to={ROUTES.ADMIN_USERS} label="Users" />
                    <NavItem to={ROUTES.ADMIN_POSTS} label="Posts" />
                    <NavItem to={ROUTES.ADMIN_COMMENTS} label="Comments" />
                </nav>
            </aside>

            <main className="flex-1 p-6 bg-[#C0D6DF]">
                <Outlet />
            </main>
        </div>
    );
}

function NavItem({ to, label }) {
    return (
      <NavLink to={to} className={({isActive}) => `block rounded px-3 py-2 text-sm 
      ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-50"}`
      }
       end
       >
          {label}
      </NavLink>
    );
}

NavItem.propTypes = {
    to: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
}
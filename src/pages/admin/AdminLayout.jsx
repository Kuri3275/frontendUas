import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="admin-layout">
            <Sidebar />
            <main>
                <Outlet /> {/* Child routes muncul di sini */}
            </main>
        </div>
    );
}

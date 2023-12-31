import SideNav from "app/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="bg-white w-full flex-none md:w-64 md:relative">
        <SideNav />
      </div>
      <div className="flex-grow md:overflow-y-auto bg-stone">{children}</div>
    </div>
  );
}

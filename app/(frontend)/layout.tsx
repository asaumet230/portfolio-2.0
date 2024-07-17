import { 
    Footer, 
    Navbar, 
    SearchModal, 
    Sidebar, 
    SocialShareSidebar 
} from "@/components";


export default function FrontendLayout({ children }: { children: React.ReactNode; }) {

    return (
        <div className="dark:bg-gradient-to-tr to-[#262f3a] from-[#0d1117] dark:text-slate-300">
            <SearchModal />
            <Sidebar />
            <Navbar />
            <SocialShareSidebar />
            {children}
            <Footer />
        </div>
    );
}
import { Footer, Navbar, SocialShareSidebar } from "@/components";

export default function FrontendLayout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            {/* <SearchModal /> */}
            {/* <Sidebar /> */}
            <Navbar />
            <SocialShareSidebar />
            { children }
            <Footer />
        </>
    );
}
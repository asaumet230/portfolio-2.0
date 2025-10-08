'use client'

import {
    Footer,
    Navbar,
    SearchModal,
    Sidebar,
    SocialShareSidebar
} from "@/components";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';


export default function FrontendLayout({ children }: { children: React.ReactNode; }) {

    const recaptchaKey: string | undefined = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? 'NOT RECAPTCHA KEY';

    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
            <div className="dark:bg-gradient-to-tr to-[#262f3a] from-[#0d1117] dark:text-slate-300">
                <SearchModal />
                <Sidebar />
                <Navbar />
                <SocialShareSidebar />
                    {children}
                <Footer />
            </div>
        </GoogleReCaptchaProvider>
    );
}
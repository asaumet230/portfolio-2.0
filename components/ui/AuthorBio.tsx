import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiGlobe } from 'react-icons/fi';

const API_BASE = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';

interface Author {
  firstName: string;
  lastName: string;
  bio: string;
  image: string;
  socialMediaNetworks: {
    linkedin?: { link: string };
    github?: { link: string };
    twitter?: { link: string };
    portfolio?: { link: string };
  };
}

async function getAuthor(): Promise<Author | null> {
  try {
    const res = await fetch(`${API_BASE}/users/author`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.author || null;
  } catch {
    return null;
  }
}

const isDefaultImage = (url: string) =>
  !url || url.includes('No-Image');

const isValidLink = (link?: string) =>
  link && link.trim() !== '' && !link.includes('no user name') && link !== 'https://www.twitter.com/' && link !== 'https://www.github.com/' && link !== 'https://www.linkedin.com/' && link !== 'https://www.andressaumet.com/';

export const AuthorBio = async () => {
  const author = await getAuthor();

  const name = author
    ? `${author.firstName.charAt(0).toUpperCase() + author.firstName.slice(1)} ${author.lastName.charAt(0).toUpperCase() + author.lastName.slice(1)}`
    : 'Andres Felipe Saumet';

  const bio = author?.bio || '';
  const image = author && !isDefaultImage(author.image) ? author.image : null;
  const initials = name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();

  const socials = [
    author?.socialMediaNetworks?.portfolio?.link && isValidLink(author.socialMediaNetworks.portfolio.link)
      ? { label: 'Sitio web', href: author.socialMediaNetworks.portfolio.link, icon: <FiGlobe size={15} />, className: 'bg-[#7b7db0] hover:bg-[#5a5c8a] text-white' }
      : null,
    author?.socialMediaNetworks?.linkedin?.link && isValidLink(author.socialMediaNetworks.linkedin.link)
      ? { label: 'LinkedIn', href: author.socialMediaNetworks.linkedin.link, icon: <FaLinkedinIn size={15} />, className: 'bg-[#0077B5] hover:bg-[#005f8e] text-white' }
      : null,
    author?.socialMediaNetworks?.github?.link && isValidLink(author.socialMediaNetworks.github.link)
      ? { label: 'GitHub', href: author.socialMediaNetworks.github.link, icon: <FaGithub size={15} />, className: 'bg-gray-800 hover:bg-gray-700 text-white dark:bg-gray-700 dark:hover:bg-gray-600' }
      : null,
    author?.socialMediaNetworks?.twitter?.link && isValidLink(author.socialMediaNetworks.twitter.link)
      ? { label: 'X (Twitter)', href: author.socialMediaNetworks.twitter.link, icon: <FaXTwitter size={15} />, className: 'bg-black hover:bg-gray-800 text-white' }
      : null,
  ].filter(Boolean) as { label: string; href: string; icon: React.ReactNode; className: string }[];

  return (
    <div className="mt-10 rounded-2xl border border-slate-100 dark:border-gray-700 bg-gradient-to-br from-[#7b7db0]/5 via-white to-indigo-50/30 dark:from-[#7b7db0]/10 dark:via-gray-800 dark:to-gray-800 overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-5 p-6 sm:p-8">

        {/* Avatar */}
        <div className="shrink-0 flex sm:block justify-center">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-4 ring-[#7b7db0]/20">
            {image ? (
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#7b7db0] flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{initials}</span>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7b7db0] mb-1">
            Sobre el autor
          </p>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {name}
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
            Desarrollador Web & Móvil Full Stack · Colombia
          </p>

          {bio && (
            <div
              className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed [&_p]:mb-2 [&_strong]:font-semibold [&_strong]:text-gray-800 dark:[&_strong]:text-gray-200 [&_em]:italic [&_p:empty]:hidden"
              dangerouslySetInnerHTML={{ __html: bio }}
            />
          )}

          {/* Social links */}
          {(socials.length > 0) && (
            <div className="flex items-center gap-2 mt-4 flex-wrap justify-center sm:justify-start">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${s.className}`}
                >
                  {s.icon}
                </Link>
              ))}
              <Link
                href="/blog-de-tecnologia"
                className="ml-1 text-xs font-semibold text-[#7b7db0] hover:text-[#5a5c8a] transition-colors"
              >
                Ver todos los artículos →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;

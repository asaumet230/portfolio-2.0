import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProjectBySlug } from "@/api/projects";
import { Separator } from "@/components";
import { DeleteAccountForm } from "@/components/forms";

interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { slug } = params;

  try {
    const { project } = await getProjectBySlug(slug);

    return {
      title: `Delete Account - ${project.name} | Andrés Felipe Saumet`,
      description: `Request account deletion for ${project.name}. Learn how to delete your account and what data will be removed.`,
      keywords: `delete account, ${project.name}, account deletion, data removal, privacy`,
      robots: "index, follow",
      openGraph: {
        title: `Delete Account - ${project.name}`,
        description: `Request account deletion for ${project.name}`,
        url: `https://www.andressaumet.com/proyectos/${slug}/delete-account`,
        type: "website",
      },
      twitter: {
        card: "summary",
        title: `Delete Account - ${project.name}`,
        description: `Request account deletion for ${project.name}`,
      },
    };
  } catch (error) {
    return {
      title: 'Delete Account - Not Found',
      description: 'The page you are looking for does not exist',
    };
  }
}

export default async function DeleteAccountPage({ params }: Props) {

  const { slug } = params;

  let project;

  try {
    const response = await getProjectBySlug(slug);
    project = response.project;
  } catch (error) {
    notFound();
  }

  return (
    <>
      <header className="section">
        <div className="mt-14 mb-14">
          <h1 className="text-center">Account Deletion Request</h1>
          <div className="flex justify-center">
            <Separator />
          </div>
          <p className="text-center text-2xl font-semibold mt-4 capitalize">
            {project.name}
          </p>
        </div>
      </header>

      <main className="section pb-16">
        <div className="max-w-4xl mx-auto">

          {/* Instructions Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-blue-100 dark:border-gray-700 mb-10">
            <h2 className="text-2xl font-bold mb-6">How to Delete Your Account</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-secondary-color dark:text-indigo-400">Option 1: Delete from the App (Recommended)</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Open the {project.name} app on your device</li>
                  <li>Go to <strong>Settings</strong></li>
                  <li>Scroll down and tap on <strong>Delete Account</strong></li>
                  <li>Confirm your decision</li>
                  <li>Your account will be permanently deleted</li>
                </ol>
              </div>

              <div className="border-t border-gray-300 dark:border-gray-600 pt-6">
                <h3 className="text-xl font-semibold mb-3 text-secondary-color dark:text-indigo-400">Option 2: Request Deletion via Form</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you cannot access the app or prefer to request deletion through this form, please fill out the form below.
                  We will process your request within 48 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Data Deletion Information */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-red-100 dark:border-gray-700 mb-10">
            <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">⚠️ Important Information</h2>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-semibold text-lg mb-2">Data That Will Be Deleted:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Your account profile and personal information</li>
                  <li>All user-generated content and settings</li>
                  <li>Activity history and preferences</li>
                  <li>All associated data with your account</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Deletion Timeline:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Immediate: Your account will be deactivated instantly</li>
                  <li>Within 30 days: All personal data will be permanently deleted from our systems</li>
                  <li>Backup retention: Anonymous backup data may be retained for up to 90 days for security purposes</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-semibold text-red-600 dark:text-red-400">
                  ⚠️ This action is permanent and cannot be undone. You will not be able to recover your account or data after deletion.
                </p>
              </div>
            </div>
          </div>

          {/* Deletion Request Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Account Deletion Request Form</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Please provide your account information to request deletion. We will verify your identity and process your request.
            </p>

            <DeleteAccountForm projectName={project.name} />
          </div>

          {/* Navigation Links */}
          <div className="my-12 pt-8 border-t border-gray-300 dark:border-gray-700 flex flex-col sm:flex-row gap-4 sm:justify-between">
            <Link
              href={`/proyectos/${slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary-color dark:bg-indigo-600 text-white rounded-lg hover:bg-opacity-90 hover:shadow-lg transition-all duration-300 font-semibold justify-center sm:justify-start"
            >
              <span>←</span>
              <span>Back to Project</span>
            </Link>
            <Link
              href="/proyectos-desarrollo-web-y-aplicaciones-moviles"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-secondary-color dark:border-indigo-600 text-secondary-color dark:text-indigo-600 rounded-lg hover:bg-secondary-color hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 font-semibold justify-center sm:justify-start"
            >
              <span>View All Projects</span>
              <span>→</span>
            </Link>
          </div>

          {/* Contact Support */}
          <div className="text-center mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <p className="text-gray-600 dark:text-gray-400">
              Need help? Contact us at{' '}
              <a
                href="mailto:andressaumetdev@gmail.com"
                className="text-secondary-color dark:text-indigo-400 hover:underline font-semibold"
              >
                andressaumetdev@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

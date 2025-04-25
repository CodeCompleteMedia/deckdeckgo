import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {session.user?.name || 'User'}!</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s an overview of your presentations and recent activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for presentation cards */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Create your first presentation</h3>
            <p className="mt-2 text-sm text-gray-500">
              Get started by creating a new presentation or importing an existing one.
            </p>
            <div className="mt-4">
              <Link
                href="/templates"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Presentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
import ProjectsAdmin from '@/components/admin/projects-admin';

export const metadata = {
  title: 'Projects Admin',
  description: 'Admin UI to manage projects',
};

export default function Page() {
  return (
    <main className="min-h-screen py-12">
      <ProjectsAdmin />
    </main>
  );
}

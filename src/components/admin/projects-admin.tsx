"use client";

import React, { useEffect, useState } from 'react';

type Project = {
  id: string;
  title: string;
  description?: string;
  url?: string;
  tech?: string[];
  createdAt: string;
  updatedAt?: string;
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adminKey, setAdminKey] = useState<string>(() => {
    try {
      return typeof window !== 'undefined' ? (localStorage.getItem('adminKey') || '') : '';
    } catch {
      return '';
    }
  });

  // Form state for creating/updating
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [tech, setTech] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/projects', {
        headers: adminKey ? { 'x-admin-key': adminKey } : undefined,
      });
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      setProjects(data || []);
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Keep admin key in localStorage
  useEffect(() => {
    try {
      if (adminKey) localStorage.setItem('adminKey', adminKey);
      else localStorage.removeItem('adminKey');
    } catch {}
  }, [adminKey]);

  function resetForm() {
    setTitle('');
    setDescription('');
    setUrl('');
    setTech('');
    setEditingId(null);
  }

  async function handleCreateOrUpdate(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setError(null);
    const payload = {
      title: title.trim(),
      description: description.trim(),
      url: url.trim(),
      tech: tech.split(',').map(t => t.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/projects/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', ...(adminKey ? { 'x-admin-key': adminKey } : {}) },
          body: JSON.stringify(payload),
        });
        if (res.status === 401) {
          setError('Unauthorized - invalid admin key');
          setAdminKey('');
          throw new Error('Unauthorized');
        }
        if (!res.ok) throw new Error('Update failed');
        const updated = await res.json();
        setProjects(prev => prev.map(p => (p.id === updated.id ? updated : p)));
      } else {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...(adminKey ? { 'x-admin-key': adminKey } : {}) },
          body: JSON.stringify(payload),
        });
        if (res.status === 401) {
          setError('Unauthorized - invalid admin key');
          setAdminKey('');
          throw new Error('Unauthorized');
        }
        if (!res.ok) throw new Error('Create failed');
        const created = await res.json();
        setProjects(prev => [created, ...prev]);
      }
      resetForm();
    } catch (err: any) {
      setError(err?.message ?? String(err));
    }
  }

  function startEdit(p: Project) {
    setEditingId(p.id);
    setTitle(p.title || '');
    setDescription(p.description || '');
    setUrl(p.url || '');
    setTech((p.tech || []).join(', '));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE', headers: adminKey ? { 'x-admin-key': adminKey } : undefined });
      if (res.status === 401) {
        setError('Unauthorized - invalid admin key');
        setAdminKey('');
        throw new Error('Unauthorized');
      }
      if (!res.ok) throw new Error('Delete failed');
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      setError(err?.message ?? String(err));
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Projects Admin</h1>

      <div className="mb-4 p-3 border rounded bg-gray-50">
        <label className="block text-sm font-medium">Admin Key (required for create/update/delete)</label>
        <div className="flex gap-2 mt-2">
          <input value={adminKey} onChange={e => setAdminKey(e.target.value)} placeholder="Enter admin key" className="flex-1 rounded border px-3 py-2" />
          <button onClick={() => { try { localStorage.setItem('adminKey', adminKey); } catch {} }} className="px-3 py-2 bg-primary text-white rounded">Save</button>
          <button onClick={() => { setAdminKey(''); try { localStorage.removeItem('adminKey'); } catch {} }} className="px-3 py-2 border rounded">Clear</button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Set the same key as <code>ADMIN_API_KEY</code> on the server (env) to authorize write operations.</p>
      </div>

      <form onSubmit={handleCreateOrUpdate} className="space-y-3 mb-6">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" rows={3} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">URL</label>
            <input value={url} onChange={e => setUrl(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Tech (comma separated)</label>
            <input value={tech} onChange={e => setTech(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
          </div>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
            {editingId ? 'Update Project' : 'Create Project'}
          </button>
          <button type="button" onClick={resetForm} className="px-4 py-2 border rounded">Reset</button>
        </div>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>

      <div className="mb-4">
        <button onClick={load} className="px-3 py-2 border rounded">Refresh</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4">
          {projects.length === 0 && <div>No projects</div>}
          {projects.map(p => (
            <div key={p.id} className="p-4 border rounded flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                {p.description && <p className="text-sm text-muted-foreground">{p.description}</p>}
                <div className="text-xs text-muted-foreground mt-2">
                  {p.tech?.join(', ')} · <span className="italic">{new Date(p.createdAt).toLocaleString()}</span>
                </div>
                {p.url && <div className="mt-2"><a href={p.url} target="_blank" rel="noreferrer" className="text-primary underline">Open</a></div>}
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button onClick={() => startEdit(p)} className="px-3 py-1 border rounded">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

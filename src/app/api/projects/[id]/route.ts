import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

type Project = {
  id: string;
  title: string;
  description?: string;
  url?: string;
  tech?: string[];
  createdAt: string;
  updatedAt?: string;
};

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json');

async function readData(): Promise<Project[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as Project[];
  } catch (err) {
    return [];
  }
}

async function writeData(data: Project[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const projects = await readData();
  const project = projects.find(p => p.id === params.id);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  // Require admin key for updates
  const ADMIN_KEY = process.env.ADMIN_API_KEY || '';
  const provided = request.headers.get('x-admin-key') || '';
  if (!ADMIN_KEY || provided !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const projects = await readData();
    const idx = projects.findIndex(p => p.id === params.id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const existing = projects[idx];
    const updated: Project = {
      ...existing,
      title: body.title ? String(body.title) : existing.title,
      description: body.description ? String(body.description) : existing.description,
      url: body.url ? String(body.url) : existing.url,
      tech: Array.isArray(body.tech) ? body.tech.map(String) : existing.tech,
      updatedAt: new Date().toISOString(),
    };

    projects[idx] = updated;
    await writeData(projects);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  // Require admin key for deletes
  const ADMIN_KEY = process.env.ADMIN_API_KEY || '';
  const provided = _request.headers.get('x-admin-key') || '';
  if (!ADMIN_KEY || provided !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projects = await readData();
  const idx = projects.findIndex(p => p.id === params.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const removed = projects.splice(idx, 1)[0];
  await writeData(projects);
  return NextResponse.json({ deleted: removed.id });
}

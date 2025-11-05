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
    // If file missing or malformed, return empty array
    return [];
  }
}

async function writeData(data: Project[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const projects = await readData();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  // Simple API key protection for write operations
  const ADMIN_KEY = process.env.ADMIN_API_KEY || '';
  const provided = request.headers.get('x-admin-key') || '';
  if (!ADMIN_KEY || provided !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!body?.title) {
      return NextResponse.json({ error: 'Missing title' }, { status: 400 });
    }

    const projects = await readData();
    const id = Date.now().toString();
    const now = new Date().toISOString();
    const newProject: Project = {
      id,
      title: String(body.title),
      description: body.description ? String(body.description) : undefined,
      url: body.url ? String(body.url) : undefined,
      tech: Array.isArray(body.tech) ? body.tech.map(String) : undefined,
      createdAt: now,
      updatedAt: now,
    };

    projects.unshift(newProject);
    await writeData(projects);

    return NextResponse.json(newProject, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

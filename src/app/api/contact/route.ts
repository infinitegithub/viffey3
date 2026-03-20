import { NextRequest, NextResponse } from 'next/server';

// ─── Types ───────────────────────────────────────────────────────────────────
interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

// ─── Validation ──────────────────────────────────────────────────────────────
function validate(data: ContactPayload): string | null {
  if (!data.name?.trim()) return 'Name is required.';
  if (!data.email?.trim()) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'Invalid email address.';
  if (!data.message?.trim()) return 'Message is required.';
  if (data.message.trim().length < 10) return 'Message must be at least 10 characters.';
  return null;
}

// ─── Handler ─────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const data = (await req.json()) as ContactPayload;

  // Validate
  const error = validate(data);
  if (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }

  // Log submission (replace with database storage when ready)
  console.log('[Contact] New submission:', {
    name: data.name,
    email: data.email,
    company: data.company,
    service: data.service,
    budget: data.budget,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true, message: "Message received — we'll be in touch within 24 hours." });
}

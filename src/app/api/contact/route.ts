import { NextRequest, NextResponse } from 'next/server';

// ─── Types ───────────────────────────────────────────────────────────────────
interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
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

  // Splitting name (many CRMs expect lastName or separate fields)
  const nameParts = data.name.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '[No Last Name provided]';

  try {
    const payload: Record<string, string> = {
      firstName,
      lastName,
      emailAddress: data.email,
      description: data.message,
    };

    if (data.phone && data.phone.trim().length > 0) {
      payload.phoneNumber = data.phone.trim();
    }

    const espoRes = await fetch('https://crm.viffey.com/api/v1/LeadCapture/2f46a77586d4da67ee9c6247a55270e2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!espoRes.ok) {
      const errorText = await espoRes.text();
      console.error('[Contact] EspoCRM LeadCapture Error:', espoRes.status, errorText);

      // Try to parse specific validation errors from EspoCRM to show the user
      try {
        const errObj = JSON.parse(errorText);
        let errorReason = 'CRM rejected the submission.';
        if (errObj?.messageTranslation?.label === 'validationFailure') {
            errorReason = `CRM Validation Failed (Field: ${errObj.messageTranslation.data?.field || 'unknown'})`;
        } else if (errorText.includes('duplicate')) {
            errorReason = 'CRM detected a duplicate entry.';
        }
        return NextResponse.json({ success: false, error: errorReason }, { status: 400 });
      } catch (e) {
        // Fallback to sending a sanitized portion of the raw error for debugging
        return NextResponse.json({ success: false, error: `CRM Error: ${espoRes.status} - ${errorText.substring(0, 100)}` }, { status: 500 });
      }
    }

    // Success
    console.log(`[Contact] Lead submitted successfully for ${data.email}`);
    return NextResponse.json({ success: true, message: "Message received — we'll be in touch within 24 hours." });

  } catch (error) {
    console.error('[Contact] Network/Fetch Error:', error);
    return NextResponse.json({ success: false, error: 'Network error while contacting CRM.' }, { status: 500 });
  }
}
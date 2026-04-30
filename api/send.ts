import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Mail server configuration missing (RESEND_API_KEY)' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, type, identity, otherIdentity, budget, otherBudget, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'VibeBuilds Discovery <onboarding@resend.dev>',
      to: [process.env.NOTIFICATION_EMAIL || 'vibebuilds.business@gmail.com'],
      subject: `New Project Discovery: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #fd9a00;">New Discovery Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Type:</strong> ${type}</p>
          <p><strong>Identity:</strong> ${identity === 'Other / Specify' ? otherIdentity : identity}</p>
          <p><strong>Budget:</strong> ${budget === 'Custom / Specify' ? otherBudget : budget}</p>
          <hr />
          <p><strong>Vision / Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error('Server error:', err);
    return res.status(500).json({ error: err.message });
  }
}

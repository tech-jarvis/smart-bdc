/* ============================================
   SMART BDC — Express Server + Resend Email
   ============================================ */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const path = require('path');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (with .html extension fallback)
app.use(express.static(path.join(__dirname), { extensions: ['html'] }));

// ── API: Contact / Demo Request ──────────────────────────
app.post('/api/contact', async (req, res) => {
  try {
    const {
      dealership,
      contactName,
      email,
      phone,
      leadVolume,
      crm,
      message
    } = req.body;

    // Basic validation
    if (!dealership || !contactName || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields.'
      });
    }

    // Build the HTML email
    const htmlContent = `
      <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:linear-gradient(135deg,#1a1a2e,#2d2d44);padding:32px;text-align:center;border-radius:12px 12px 0 0;">
          <h1 style="color:#ffffff;margin:0;font-size:24px;">🚗 New Demo Request</h1>
          <p style="color:rgba(255,255,255,.7);margin:8px 0 0;font-size:14px;">Smart Dealers BDC — Lead Notification</p>
        </div>
        <div style="padding:32px;border:1px solid #e8e8ec;border-top:none;border-radius:0 0 12px 12px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#1a1a2e;width:160px;">Dealership</td>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#52525e;">${dealership}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#1a1a2e;">Contact Name</td>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#52525e;">${contactName}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#1a1a2e;">Email</td>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#52525e;"><a href="mailto:${email}" style="color:#cc3333;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#1a1a2e;">Phone</td>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#52525e;"><a href="tel:${phone}" style="color:#cc3333;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#1a1a2e;">Monthly Leads</td>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#52525e;">${leadVolume || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:600;color:#1a1a2e;">CRM Platform</td>
              <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#52525e;">${crm || 'Not specified'}</td>
            </tr>
            ${message ? `
            <tr>
              <td colspan="2" style="padding:16px 0 0;">
                <div style="font-weight:600;color:#1a1a2e;margin-bottom:8px;">Message</div>
                <div style="background:#f7f7f8;padding:16px;border-radius:8px;color:#52525e;line-height:1.6;">${message}</div>
              </td>
            </tr>
            ` : ''}
          </table>
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #f0f0f0;text-align:center;">
            <a href="mailto:${email}" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#cc3333,#e04040);color:#ffffff;text-decoration:none;border-radius:999px;font-weight:600;font-size:14px;">Reply to ${contactName}</a>
          </div>
        </div>
        <p style="text-align:center;color:#8a8a96;font-size:12px;margin-top:16px;">This email was sent from the Smart BDC website contact form.</p>
      </div>
    `;

    // Send via Resend
    const { data, error } = await resend.emails.send({
      from: `Smart BDC <${process.env.NOTIFICATION_EMAIL}>`,
      to: [process.env.NOTIFICATION_EMAIL],
      subject: `🚗 New Demo Request — ${dealership}`,
      html: htmlContent,
      replyTo: email
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to send notification. Please try again.'
      });
    }

    console.log(`✅ Demo request email sent for "${dealership}" (ID: ${data.id})`);
    return res.json({ success: true, id: data.id });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    });
  }
});

// ── Start Server ─────────────────────────────────────────
const PORT = process.env.PORT || 3456;
app.listen(PORT, () => {
  console.log(`\n  🚀 Smart BDC server running at http://localhost:${PORT}\n`);
});

require('dotenv').config();
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

async function parseBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) return {};
  return JSON.parse(raw);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { success: false, error: 'Method not allowed.' });
  }

  try {
    const body = await parseBody(req);
    const {
      dealership,
      contactName,
      email,
      phone,
      leadVolume,
      crm,
      message
    } = body || {};

    if (!dealership || !contactName || !email || !phone) {
      return sendJson(res, 400, {
        success: false,
        error: 'Please fill in all required fields.'
      });
    }

    const htmlContent = `
      <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:linear-gradient(135deg,#1a1a2e,#2d2d44);padding:32px;text-align:center;border-radius:12px 12px 0 0;">
          <h1 style="color:#ffffff;margin:0;font-size:24px;">New Demo Request</h1>
          <p style="color:rgba(255,255,255,.7);margin:8px 0 0;font-size:14px;">Smart Dealers BDC - Lead Notification</p>
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
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: `Smart BDC <${process.env.NOTIFICATION_EMAIL}>`,
      to: [process.env.NOTIFICATION_EMAIL],
      subject: `New Demo Request - ${dealership}`,
      html: htmlContent,
      replyTo: email
    });

    if (error) {
      console.error('Resend error:', error);
      return sendJson(res, 500, {
        success: false,
        error: 'Failed to send notification. Please try again.'
      });
    }

    return sendJson(res, 200, { success: true, id: data.id });
  } catch (err) {
    console.error('Server error:', err);
    return sendJson(res, 500, {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    });
  }
};

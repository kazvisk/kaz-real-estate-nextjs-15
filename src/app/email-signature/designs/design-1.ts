import { contact } from './shared'
import type { SignatureDesign } from './types'

export const designOne: SignatureDesign = {
  id: 'design-1',
  name: 'Editorial Bar',
  direction: 'Reference-inspired strip with a huge left mark, punchy intro type, compact contact grid, and portrait seal.',
  width: 736,
  html: `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="736" style="width:736px;border-collapse:collapse;font-family:Manrope,Arial,sans-serif;color:#0b0b0b;background:#ffffff;">
  <tr>
    <td style="padding:0 0 8px 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="736" style="width:736px;border-collapse:collapse;">
        <tr>
          <td valign="middle" width="172" style="width:172px;padding:8px 24px 8px 0;">
            <img src="${contact.logoSrc}" width="148" height="115" alt="KV" style="display:block;width:148px;height:115px;border:0;outline:none;text-decoration:none;">
          </td>
          <td valign="middle" width="190" style="width:190px;padding:8px 28px 8px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="190" style="width:190px;border-collapse:collapse;">
              <tr>
                <td style="padding:0 0 5px 0;font-family:Manrope,Arial,sans-serif;font-size:30px;line-height:28px;font-weight:800;letter-spacing:0;color:#0b0b0b;">hello,<br>i&apos;m kaz</td>
              </tr>
              <tr>
                <td style="padding:0 0 10px 0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:16px;font-weight:800;color:#0b0b0b;">${contact.name}</td>
              </tr>
              <tr>
                <td>
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                    <tr>
                      <td width="18" height="18" align="center" valign="middle" style="width:18px;height:18px;border-radius:50%;background:#dedede;font-family:Manrope,Arial,sans-serif;font-size:10px;line-height:18px;font-weight:800;color:#777777;">•</td>
                      <td style="padding-left:8px;">
                        <span style="display:inline-block;background:#d7d7d7;border-radius:999px;padding:4px 16px;font-family:Manrope,Arial,sans-serif;font-size:10px;line-height:12px;font-weight:800;color:#555555;text-transform:uppercase;">${contact.title}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
          <td valign="middle" width="250" style="width:250px;padding:8px 24px 8px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="250" style="width:250px;border-collapse:collapse;">
              <tr>
                <td width="24" style="width:24px;padding:0 7px 7px 0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:15px;font-weight:800;color:#0b0b0b;">P:</td>
                <td style="padding:0 0 7px 0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:15px;font-weight:700;color:#222222;"><a href="${contact.phoneHref}" style="color:#222222;text-decoration:none;">${contact.phone}</a></td>
              </tr>
              <tr>
                <td width="24" style="width:24px;padding:0 7px 7px 0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:15px;font-weight:800;color:#0b0b0b;">E:</td>
                <td style="padding:0 0 7px 0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:15px;font-weight:700;color:#222222;"><a href="${contact.emailHref}" style="color:#222222;text-decoration:none;">${contact.email}</a></td>
              </tr>
              <tr>
                <td width="24" style="width:24px;padding:0 7px 7px 0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:15px;font-weight:800;color:#0b0b0b;">W:</td>
                <td style="padding:0 0 7px 0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:15px;font-weight:700;color:#222222;"><a href="${contact.websiteHref}" style="color:#222222;text-decoration:none;">${contact.website}</a></td>
              </tr>
              <tr>
                <td width="24" style="width:24px;padding:0 7px 7px 0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:15px;font-weight:800;color:#0b0b0b;">D:</td>
                <td style="padding:0 0 7px 0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:15px;font-weight:700;color:#222222;">${contact.dre}</td>
              </tr>
              <tr>
                <td width="24" style="width:24px;padding:0 7px 0 0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:15px;font-weight:800;color:#0b0b0b;">B:</td>
                <td style="padding:0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:15px;font-weight:700;color:#222222;">${contact.brokerage}</td>
              </tr>
            </table>
          </td>
          <td valign="middle" width="92" align="right" style="width:92px;padding:8px 0;">
            <img src="${contact.headshotSrc}" width="74" height="74" alt="${contact.name}" style="display:block;width:74px;height:74px;border:2px solid #0b0b0b;border-radius:50%;outline:none;text-decoration:none;">
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="height:3px;line-height:3px;font-size:3px;background:#0b0b0b;">&nbsp;</td>
  </tr>
</table>`,
}

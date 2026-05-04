import { contact } from './shared'
import type { SignatureDesign } from './types'

export const designFour: SignatureDesign = {
  id: 'design-4',
  name: 'Broker Card Minimal',
  direction: 'Reference-block energy translated into a sharp broker strip with a narrow portrait crop.',
  width: 620,
  html: `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="620" style="width:620px;border-collapse:collapse;background:#ffffff;font-family:Manrope,Arial,sans-serif;color:#111111;">
  <tr>
    <td width="132" valign="middle" style="width:132px;padding:12px 22px 12px 0;border-right:1px solid #d8d8d8;">
      <img src="${contact.logoSrc}" width="112" height="87" alt="KV" style="display:block;width:112px;height:87px;border:0;outline:none;text-decoration:none;">
    </td>
    <td width="72" valign="middle" style="width:72px;padding:12px 20px;">
      <img src="${contact.headshotSrc}" width="64" height="92" alt="${contact.name}" style="display:block;width:64px;height:92px;border:1px solid #111111;outline:none;text-decoration:none;">
    </td>
    <td valign="middle" style="padding:12px 0 12px 2px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="372" style="width:372px;border-collapse:collapse;">
        <tr>
          <td style="padding:0 0 2px 0;font-family:Manrope,Arial,sans-serif;font-size:24px;line-height:27px;font-weight:800;color:#111111;letter-spacing:0;">${contact.name}</td>
        </tr>
        <tr>
          <td style="padding:0 0 13px 0;font-family:Manrope,Arial,sans-serif;font-size:11px;line-height:15px;font-weight:800;color:#666666;text-transform:uppercase;">${contact.title}</td>
        </tr>
        <tr>
          <td>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="372" style="width:372px;border-collapse:collapse;">
              <tr>
                <td width="150" style="width:150px;padding:0 18px 0 0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:18px;font-weight:600;color:#222222;">
                  <a href="${contact.phoneHref}" style="color:#222222;text-decoration:none;">${contact.phone}</a><br>
                  <a href="${contact.emailHref}" style="color:#222222;text-decoration:none;">${contact.email}</a>
                </td>
                <td width="204" style="width:204px;padding:0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:18px;font-weight:600;color:#222222;">
                  <a href="${contact.websiteHref}" style="color:#222222;text-decoration:none;">${contact.website}</a><br>
                  <span style="color:#777777;">${contact.dre}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0 0 0;font-family:Manrope,Arial,sans-serif;font-size:10px;line-height:13px;font-weight:800;color:#888888;text-transform:uppercase;letter-spacing:0;">${contact.brokerage}</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td colspan="3" style="height:1px;line-height:1px;font-size:1px;background:#111111;">&nbsp;</td>
  </tr>
</table>
`,
}

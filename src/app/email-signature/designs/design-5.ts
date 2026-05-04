import { contact } from './shared'
import type { SignatureDesign } from './types'

export const designFive: SignatureDesign = {
  id: 'design-5',
  name: 'Signature Strip',
  direction: 'A long reference-style strip with a massive mark, hero name, one-line details, and headshot seal.',
  width: 780,
  html: `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="780" style="width:780px;border-collapse:collapse;font-family:Manrope,Arial,sans-serif;color:#111111;background:#ffffff;">
  <tr>
    <td width="150" valign="middle" style="width:150px;padding:10px 24px 10px 0;">
      <a href="${contact.websiteHref}" target="_blank" style="display:block;text-decoration:none;border:0;">
        <img src="${contact.logoSrc}" width="126" height="98" alt="${contact.name}" style="display:block;width:126px;height:98px;border:0;outline:none;text-decoration:none;">
      </a>
    </td>
    <td valign="middle" style="padding:10px 20px 10px 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="526" style="width:526px;border-collapse:collapse;">
        <tr>
          <td style="padding:0 0 4px 0;font-family:Manrope,Arial,sans-serif;font-size:31px;line-height:32px;font-weight:800;letter-spacing:0;color:#111111;white-space:nowrap;">${contact.name}</td>
        </tr>
        <tr>
          <td style="padding:0 0 10px 0;font-family:Manrope,Arial,sans-serif;font-size:11px;line-height:15px;font-weight:800;letter-spacing:0;color:#616161;text-transform:uppercase;white-space:nowrap;">${contact.title}</td>
        </tr>
        <tr>
          <td style="padding:0;font-family:Manrope,Arial,sans-serif;font-size:11px;line-height:16px;font-weight:600;letter-spacing:0;color:#333333;white-space:nowrap;">
            <a href="${contact.phoneHref}" style="color:#333333;text-decoration:none;">${contact.phone}</a> &nbsp;•&nbsp;
            <a href="${contact.emailHref}" style="color:#333333;text-decoration:none;">${contact.email}</a> &nbsp;•&nbsp;
            <a href="${contact.websiteHref}" target="_blank" style="color:#333333;text-decoration:none;">${contact.website}</a> &nbsp;•&nbsp;
            ${contact.dre} &nbsp;•&nbsp; ${contact.brokerage}
          </td>
        </tr>
      </table>
    </td>
    <td width="82" valign="middle" align="right" style="width:82px;padding:10px 0;">
      <img src="${contact.headshotSrc}" width="60" height="60" alt="${contact.name}" style="display:block;width:60px;height:60px;border:2px solid #111111;border-radius:50%;outline:none;text-decoration:none;">
    </td>
  </tr>
  <tr>
    <td colspan="3" style="height:3px;line-height:3px;font-size:3px;background:#111111;">&nbsp;</td>
  </tr>
</table>
`,
}

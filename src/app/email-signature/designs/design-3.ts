import { contact } from './shared'
import type { SignatureDesign } from './types'

export const designThree: SignatureDesign = {
  id: 'design-3',
  name: 'Quiet Luxury',
  direction: 'Soft gallery-white spacing with an oversized true-ratio mark and a tucked square headshot.',
  width: 590,
  html: `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="590" style="width:590px;border-collapse:collapse;background:#ffffff;font-family:Manrope,Arial,sans-serif;color:#111111;">
  <tr>
    <td width="112" valign="top" style="width:112px;padding:2px 28px 0 0;vertical-align:top;">
      <img src="${contact.logoSrc}" alt="KV" width="92" height="71" style="display:block;width:92px;height:71px;border:0;outline:none;text-decoration:none;">
    </td>
    <td width="336" valign="top" style="width:336px;padding:0 22px 0 0;vertical-align:top;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="336" style="width:336px;border-collapse:collapse;">
        <tr>
          <td style="padding:0 0 12px 0;border-bottom:1px solid #d6d6d6;">
            <div style="margin:0;font-family:Manrope,Arial,sans-serif;font-size:26px;line-height:28px;font-weight:800;letter-spacing:0;color:#111111;">${contact.name}</div>
            <div style="margin:4px 0 0 0;font-family:Manrope,Arial,sans-serif;font-size:11px;line-height:15px;font-weight:800;letter-spacing:0;color:#6a6a6a;text-transform:uppercase;">${contact.title}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:13px 0 0 0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:19px;font-weight:600;color:#252525;">
            <a href="${contact.phoneHref}" style="color:#111111;text-decoration:none;">${contact.phone}</a> &nbsp;/&nbsp;
            <a href="${contact.emailHref}" style="color:#111111;text-decoration:none;">${contact.email}</a><br>
            <a href="${contact.websiteHref}" style="color:#111111;text-decoration:none;">${contact.website}</a>
            <span style="color:#9a9a9a;"> &nbsp;|&nbsp; </span>${contact.dre}<br>
            <span style="color:#777777;">${contact.brokerage}</span>
          </td>
        </tr>
      </table>
    </td>
    <td width="120" valign="bottom" align="right" style="width:120px;padding:0;vertical-align:bottom;text-align:right;">
      <img src="${contact.headshotSrc}" alt="${contact.name}" width="92" height="92" style="display:block;width:92px;height:92px;border:1px solid #cfcfcf;outline:none;text-decoration:none;">
    </td>
  </tr>
</table>
`,
}

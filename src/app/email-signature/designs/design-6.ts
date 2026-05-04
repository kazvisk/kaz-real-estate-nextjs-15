import { contact } from './shared'
import type { SignatureDesign } from './types'

export const designSix: SignatureDesign = {
  id: 'design-6',
  name: 'Modern Split',
  direction: 'A spacious split signature with true-ratio logo, hard divider, editorial name block, and outlined portrait.',
  width: 660,
  html: `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="660" style="width:660px;border-collapse:collapse;background:#ffffff;font-family:Manrope,Arial,sans-serif;color:#111111;">
  <tr>
    <td width="126" valign="middle" style="width:126px;padding:18px 26px 18px 0;vertical-align:middle;">
      <img src="${contact.logoSrc}" alt="KV" width="96" height="74" style="display:block;width:96px;height:74px;border:0;outline:none;text-decoration:none;">
    </td>
    <td width="2" style="width:2px;padding:0;background:#111111;font-size:0;line-height:0;">&nbsp;</td>
    <td width="32" style="width:32px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
    <td width="374" valign="middle" style="width:374px;padding:18px 26px 18px 0;vertical-align:middle;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="374" style="width:374px;border-collapse:collapse;">
        <tr>
          <td style="padding:0 0 3px 0;font-family:Manrope,Arial,sans-serif;font-size:27px;line-height:30px;font-weight:800;letter-spacing:0;color:#111111;">${contact.name}</td>
        </tr>
        <tr>
          <td style="padding:0 0 14px 0;font-family:Manrope,Arial,sans-serif;font-size:11px;line-height:15px;font-weight:800;letter-spacing:0;color:#666666;text-transform:uppercase;">${contact.title}</td>
        </tr>
        <tr>
          <td style="padding:0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:19px;font-weight:600;color:#222222;">
            <a href="${contact.phoneHref}" style="color:#111111;text-decoration:none;">${contact.phone}</a> &nbsp; / &nbsp;
            <a href="${contact.emailHref}" style="color:#111111;text-decoration:none;">${contact.email}</a><br>
            <a href="${contact.websiteHref}" style="color:#111111;text-decoration:none;">${contact.website}</a> &nbsp; / &nbsp;
            <span style="color:#777777;">${contact.dre}</span><br>
            <span style="color:#777777;">${contact.brokerage}</span>
          </td>
        </tr>
      </table>
    </td>
    <td width="126" valign="middle" align="right" style="width:126px;padding:18px 0;vertical-align:middle;text-align:right;">
      <img src="${contact.headshotSrc}" alt="${contact.name}" width="104" height="104" style="display:block;width:104px;height:104px;border:2px solid #111111;border-radius:50%;outline:none;text-decoration:none;">
    </td>
  </tr>
</table>
`,
}

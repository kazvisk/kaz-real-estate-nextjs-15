import { contact } from './shared'
import type { SignatureDesign } from './types'

export const designTwo: SignatureDesign = {
  id: 'design-2',
  name: 'Monogram Column',
  direction: 'A tall gallery-column mark with a compact luxury text stack and tiny portrait stamp.',
  width: 560,
  html: `
<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="560" style="width:560px;border-collapse:collapse;font-family:Manrope,Arial,sans-serif;color:#101010;background:#ffffff;">
  <tr>
    <td width="118" valign="middle" align="center" style="width:118px;height:160px;background:#f2f2ef;border-right:1px solid #cacac6;">
      <img src="${contact.logoSrc}" width="82" height="64" alt="KV" style="display:block;width:82px;height:64px;border:0;outline:none;text-decoration:none;">
    </td>
    <td width="316" valign="middle" style="width:316px;padding:0 22px;">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="316" style="width:316px;border-collapse:collapse;">
        <tr>
          <td style="padding:0 0 3px 0;font-family:Manrope,Arial,sans-serif;font-size:28px;line-height:27px;font-weight:800;color:#101010;letter-spacing:0;">move<br>with kaz.</td>
        </tr>
        <tr>
          <td style="padding:0 0 11px 0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:16px;font-weight:800;color:#101010;">${contact.name}</td>
        </tr>
        <tr>
          <td style="padding:0 0 12px 0;font-family:Manrope,Arial,sans-serif;font-size:10px;line-height:12px;font-weight:800;color:#6a6a6a;text-transform:uppercase;">
            <span style="display:inline-block;background:#dedede;border-radius:999px;padding:4px 14px;">${contact.title}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:0;font-family:Manrope,Arial,sans-serif;font-size:12px;line-height:18px;font-weight:600;color:#242424;">
            <a href="${contact.phoneHref}" style="color:#242424;text-decoration:none;">${contact.phone}</a><br>
            <a href="${contact.emailHref}" style="color:#242424;text-decoration:none;">${contact.email}</a><br>
            <a href="${contact.websiteHref}" style="color:#242424;text-decoration:none;">${contact.website}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:9px 0 0 0;font-family:Manrope,Arial,sans-serif;font-size:10px;line-height:14px;font-weight:600;color:#777777;">${contact.dre} &nbsp;|&nbsp; ${contact.brokerage}</td>
        </tr>
      </table>
    </td>
    <td width="82" valign="middle" align="center" style="width:82px;padding:0 22px 0 0;">
      <img src="${contact.headshotSrc}" width="42" height="42" alt="${contact.name}" style="display:block;width:42px;height:42px;border:2px solid #111111;border-radius:50%;outline:none;text-decoration:none;">
    </td>
  </tr>
  <tr>
    <td colspan="3" style="height:2px;line-height:2px;font-size:2px;background:#101010;">&nbsp;</td>
  </tr>
</table>
`,
}

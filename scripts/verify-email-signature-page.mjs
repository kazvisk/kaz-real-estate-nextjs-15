import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const requiredFiles = [
  'src/app/email-signature/page.tsx',
  'src/app/email-signature/designs/index.ts',
  'public/email-signature/headshot.jpg',
  'public/email-signature/kv-logo-black.png',
  'public/email-signature/example.jpg',
]

const requiredContactFields = [
  ['name', 'Kaz Viskanta'],
  ['title', 'San Francisco REALTOR'],
  ['phone', '(415) 513-3387'],
  ['email', 'kaz@kazviskrealty.com'],
  ['website', 'kazviskrealty.com'],
  ['dre', 'CA DRE #02318574'],
  ['brokerage', 'Vanguard Properties'],
]

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    throw new Error(`Missing required file: ${file}`)
  }
}

const pageSource = readFileSync(join(root, 'src/app/email-signature/page.tsx'), 'utf8')
const sharedSource = readFileSync(join(root, 'src/app/email-signature/designs/shared.ts'), 'utf8')
for (const snippet of ['ClipboardItem', 'text/html', 'dangerouslySetInnerHTML', 'Copy signature']) {
  if (!pageSource.includes(snippet)) {
    throw new Error(`Page source is missing copy/render behavior: ${snippet}`)
  }
}

for (const [, text] of requiredContactFields) {
  if (!sharedSource.includes(text)) {
    throw new Error(`Shared contact source is missing required text: ${text}`)
  }
}

for (let index = 1; index <= 6; index += 1) {
  const designFile = `src/app/email-signature/designs/design-${index}.ts`
  if (!existsSync(join(root, designFile))) {
    throw new Error(`Missing signature design file: ${designFile}`)
  }

  const designSource = readFileSync(join(root, designFile), 'utf8')
  for (const snippet of ['<table', 'style=']) {
    if (!designSource.includes(snippet)) {
      throw new Error(`${designFile} is missing email-safe markup snippet: ${snippet}`)
    }
  }

  if (!designSource.includes('/email-signature/headshot.jpg') && !designSource.includes('contact.headshotSrc')) {
    throw new Error(`${designFile} is missing the local headshot source`)
  }

  if (!designSource.includes('/email-signature/kv-logo-black.png') && !designSource.includes('contact.logoSrc')) {
    throw new Error(`${designFile} is missing the local logo source`)
  }

  for (const [field, text] of requiredContactFields) {
    if (!designSource.includes(text) && !designSource.includes(`contact.${field}`)) {
      throw new Error(`${designFile} is missing required contact field: ${field}`)
    }
  }
}

console.log('Email signature page contract verified.')

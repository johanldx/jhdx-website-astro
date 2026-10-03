import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Load profile data
const profileContent = fs.readFileSync(path.join(rootDir, 'src/data/profile.ts'), 'utf8');
const nameMatch = profileContent.match(/name:\s*['"]([^'"]+)['"]/);
const titleMatch = profileContent.match(/title:\s*{[^}]*en:\s*['"]([^'"]+)['"]/);
const heroMatch = profileContent.match(/hero:\s*{[^}]*en:\s*['"]([^'"]+)['"]/);

const name = nameMatch ? nameMatch[1] : 'Johan Ledoux';
const title = titleMatch ? titleMatch[1] : 'Fullstack Product Engineer';
const hero = heroMatch ? heroMatch[1] : 'Building software products, developer tools and infrastructure.';

// Load avatar
const avatarPath = path.join(rootDir, 'public/johanledoux.png');
const avatarBase64 = fs.readFileSync(avatarPath).toString('base64');

// Escape XML
const escapeXml = (str) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const escapedName = escapeXml(name);
const escapedTitle = escapeXml(title);
const escapedHero = escapeXml(hero);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- Background Radial Gradients -->
    <radialGradient id="glow" cx="85%" cy="15%" r="65%">
      <stop offset="0%" stop-color="#b968ff" stop-opacity="0.18" />
      <stop offset="60%" stop-color="#7c00fe" stop-opacity="0.04" />
      <stop offset="100%" stop-color="#111113" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="subtle-left" cx="15%" cy="85%" r="50%">
      <stop offset="0%" stop-color="#7c00fe" stop-opacity="0.10" />
      <stop offset="100%" stop-color="#111113" stop-opacity="0" />
    </radialGradient>
    
    <!-- Avatar Clip & Border -->
    <clipPath id="avatar-clip">
      <rect x="96" y="150" width="144" height="144" rx="28" />
    </clipPath>

    <!-- Linear Gradients for Badges & Rules -->
    <linearGradient id="rule-grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#b968ff" />
      <stop offset="40%" stop-color="#7c00fe" />
      <stop offset="100%" stop-color="#2a2730" stop-opacity="0.2" />
    </linearGradient>

    <linearGradient id="badge-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#211b28" />
      <stop offset="100%" stop-color="#17161b" />
    </linearGradient>
  </defs>

  <style>
    .font-sans { font-family: 'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
  </style>

  <!-- Deep Dark Background -->
  <rect width="1200" height="630" fill="#111113" />
  <rect width="1200" height="630" fill="url(#glow)" />
  <rect width="1200" height="630" fill="url(#subtle-left)" />

  <!-- Outer Card Frame -->
  <rect x="40" y="40" width="1120" height="550" rx="24" fill="none" stroke="#25242a" stroke-width="1.5" />
  <rect x="40" y="40" width="1120" height="550" rx="24" fill="none" stroke="#b968ff" stroke-width="1.5" stroke-opacity="0.12" />

  <!-- Top Metadata Bar -->
  <g transform="translate(96, 88)">
    <circle cx="6" cy="6" r="4" fill="#b968ff" />
    <text x="22" y="10" fill="#d2a5ff" class="font-mono" font-size="14" font-weight="600" letter-spacing="1.5">JHDX.DEV — PORTFOLIO &amp; NOTES</text>
  </g>

  <!-- Avatar Section with Glow & Frame -->
  <rect x="92" y="146" width="152" height="152" rx="32" fill="#211b28" stroke="#38353e" stroke-width="1.5" />
  <image href="data:image/png;base64,${avatarBase64}" x="96" y="150" width="144" height="144" clip-path="url(#avatar-clip)" preserveAspectRatio="xMidYMid slice" />
  <rect x="96" y="150" width="144" height="144" rx="28" fill="none" stroke="#b968ff" stroke-width="1.5" stroke-opacity="0.25" />

  <!-- Heading: Name & Role Badge -->
  <g transform="translate(272, 185)">
    <!-- Role Badge -->
    <rect x="0" y="0" width="230" height="30" rx="6" fill="url(#badge-bg)" stroke="#38353e" stroke-width="1" />
    <text x="12" y="19" fill="#b968ff" class="font-mono" font-size="13" font-weight="600" letter-spacing="0.5">${escapedTitle}</text>
    
    <!-- Full Name -->
    <text x="0" y="80" fill="#f2f0f4" class="font-sans" font-size="54" font-weight="700" letter-spacing="-1.5">${escapedName}</text>
  </g>

  <!-- Accent Divider Line -->
  <rect x="96" y="336" width="1008" height="1" fill="#25242a" />
  <rect x="96" y="335" width="140" height="2.5" fill="url(#rule-grad)" />

  <!-- Hero / Description Tagline -->
  <text x="96" y="398" fill="#aaa6b0" class="font-sans" font-size="25" font-weight="400" letter-spacing="-0.3">
    ${escapedHero}
  </text>

  <!-- Bottom Pills / Tags -->
  <g transform="translate(96, 474)">
    <!-- Pill 1 -->
    <rect x="0" y="0" width="154" height="38" rx="8" fill="#1a191d" stroke="#2e2b34" stroke-width="1" />
    <text x="18" y="24" fill="#d2a5ff" class="font-mono" font-size="13" font-weight="600">Fullstack Web</text>

    <!-- Pill 2 -->
    <rect x="168" y="0" width="168" height="38" rx="8" fill="#1a191d" stroke="#2e2b34" stroke-width="1" />
    <text x="186" y="24" fill="#d2a5ff" class="font-mono" font-size="13" font-weight="600">TypeScript / Go</text>

    <!-- Pill 3 -->
    <rect x="350" y="0" width="160" height="38" rx="8" fill="#1a191d" stroke="#2e2b34" stroke-width="1" />
    <text x="368" y="24" fill="#d2a5ff" class="font-mono" font-size="13" font-weight="600">unschema-graph</text>

    <!-- Pill 4 -->
    <rect x="524" y="0" width="140" height="38" rx="8" fill="#1a191d" stroke="#2e2b34" stroke-width="1" />
    <text x="542" y="24" fill="#d2a5ff" class="font-mono" font-size="13" font-weight="600">Open Source</text>
  </g>

  <!-- Bottom Right Domain Label -->
  <text x="1104" y="500" text-anchor="end" fill="#716d7a" class="font-mono" font-size="14" font-weight="500">jhdx.dev</text>
</svg>`;

const svgPath = path.join(rootDir, 'public/og.svg');
const pngPath = path.join(rootDir, 'public/og.png');

fs.writeFileSync(svgPath, svg, 'utf8');
console.log(`✓ Wrote ${svgPath}`);

try {
  execSync(`magick "${svgPath}" "${pngPath}"`);
  console.log(`✓ Generated ${pngPath} (${fs.statSync(pngPath).size} bytes)`);
} catch (err) {
  console.error('Failed to convert SVG to PNG with magick:', err.message);
}

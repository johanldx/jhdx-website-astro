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
const hero = heroMatch ? heroMatch[1] : 'I design and build software products, developer tools and the infrastructure behind them.';

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

// Tech tags to display (clean, no Go)
const tags = [
  { label: 'TypeScript', width: 114 },
  { label: 'Astro', width: 80 },
  { label: 'Web Architecture', width: 168 },
  { label: 'unschema-graph', width: 154 },
  { label: 'Open Source', width: 124 },
];

let currentTagX = 104;
const tagsSvg = tags
  .map((tag) => {
    const x = currentTagX;
    const midX = x + tag.width / 2;
    currentTagX += tag.width + 12;
    return `    <g>
      <rect x="${x}" y="474" width="${tag.width}" height="36" rx="8" fill="#18171d" stroke="#2b2834" stroke-width="1" />
      <text x="${midX}" y="492" text-anchor="middle" dominant-baseline="central" fill="#cf9aff" class="font-mono" font-size="12" font-weight="600">${escapeXml(tag.label)}</text>
    </g>`;
  })
  .join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- Background Radial Glows -->
    <radialGradient id="top-glow" cx="80%" cy="16%" r="60%">
      <stop offset="0%" stop-color="#9d4edd" stop-opacity="0.22" />
      <stop offset="50%" stop-color="#7c00fe" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#0e0d12" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="bottom-left-glow" cx="15%" cy="85%" r="55%">
      <stop offset="0%" stop-color="#7c00fe" stop-opacity="0.10" />
      <stop offset="100%" stop-color="#0e0d12" stop-opacity="0" />
    </radialGradient>
    
    <!-- Avatar Clip -->
    <clipPath id="avatar-clip">
      <rect x="104" y="156" width="136" height="136" rx="26" />
    </clipPath>

    <!-- Linear Gradients -->
    <linearGradient id="rule-grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#b968ff" />
      <stop offset="60%" stop-color="#7c00fe" />
      <stop offset="100%" stop-color="#222027" />
    </linearGradient>

    <linearGradient id="badge-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#251a32" />
      <stop offset="100%" stop-color="#181420" />
    </linearGradient>
  </defs>

  <style>
    .font-sans { font-family: 'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
    .font-mono { font-family: 'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; }
  </style>

  <!-- Base Canvas Background -->
  <rect width="1200" height="630" fill="#0d0c10" />
  <rect width="1200" height="630" fill="url(#top-glow)" />
  <rect width="1200" height="630" fill="url(#bottom-left-glow)" />

  <!-- Outer Card Frame -->
  <rect x="44" y="44" width="1112" height="542" rx="20" fill="none" stroke="#222027" stroke-width="1.5" />
  <rect x="44" y="44" width="1112" height="542" rx="20" fill="none" stroke="#b968ff" stroke-width="1.5" stroke-opacity="0.15" />

  <!-- Top Metadata Header -->
  <g>
    <circle cx="108" cy="98" r="4.5" fill="#b968ff" />
    <text x="124" y="98" dominant-baseline="central" fill="#b968ff" class="font-mono" font-size="12" font-weight="600" letter-spacing="1.5">JHDX.DEV</text>
  </g>

  <!-- Avatar with Crisp Border & Ambient Glow (Center Y = 224) -->
  <rect x="100" y="152" width="144" height="144" rx="30" fill="#1b1723" stroke="#2f2b38" stroke-width="1.5" />
  <image href="data:image/png;base64,${avatarBase64}" x="104" y="156" width="136" height="136" clip-path="url(#avatar-clip)" preserveAspectRatio="xMidYMid slice" />
  <rect x="104" y="156" width="136" height="136" rx="26" fill="none" stroke="#b968ff" stroke-width="1.5" stroke-opacity="0.3" />

  <!-- Name & Role Identity (Vertically Centered with Avatar) -->
  <g transform="translate(272, 178)">
    <!-- Role Badge -->
    <rect x="0" y="0" width="220" height="28" rx="6" fill="url(#badge-grad)" stroke="#422c5b" stroke-width="1" />
    <text x="110" y="14" text-anchor="middle" dominant-baseline="central" fill="#c78fff" class="font-mono" font-size="11.5" font-weight="600" letter-spacing="0.4">${escapedTitle}</text>
    
    <!-- Full Name -->
    <text x="0" y="80" fill="#f8f7fa" class="font-sans" font-size="52" font-weight="700" letter-spacing="-1.2">${escapedName}</text>
  </g>

  <!-- Accent Divider -->
  <rect x="104" y="326" width="992" height="1" fill="#201e25" />
  <rect x="104" y="325.5" width="140" height="2" fill="url(#rule-grad)" />

  <!-- Tagline / Hero Description (Vertically Centered in the middle zone) -->
  <text x="104" y="400" dominant-baseline="central" fill="#aba6b5" class="font-sans" font-size="23.5" font-weight="400" letter-spacing="-0.3">
    ${escapedHero}
  </text>

  <!-- Bottom Pills -->
${tagsSvg}

  <!-- Bottom Right Domain Label -->
  <text x="1096" y="492" text-anchor="end" dominant-baseline="central" fill="#75707e" class="font-mono" font-size="14" font-weight="500">jhdx.dev</text>
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

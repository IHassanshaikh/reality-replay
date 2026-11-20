const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_FILE = path.join(__dirname, "..", "showcase", "thumbnail.png");
const PUBLIC_FILE = path.join(__dirname, "..", "public", "thumbnail.png");
const ARTIFACT_FILE = "C:\\Users\\hassa\\.gemini\\antigravity\\brain\\9c24c8e6-73a1-45c5-b705-503733402840\\showcase\\thumbnail.png";

// Devpost recommended aspect ratio 3:2 -> 1200 x 800
const WIDTH = 1200;
const HEIGHT = 800;

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  body {
    width: 1200px;
    height: 800px;
    background: radial-gradient(circle at 10% 20%, #173868 0%, #0D2140 45%, #071324 100%);
    color: #FFFFFF;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px 70px;
  }

  /* Grid overlay effect */
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  /* Glowing ambient spheres */
  .glow-cyan {
    position: absolute;
    top: -100px;
    left: -100px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%);
    pointer-events: none;
    filter: blur(60px);
  }
  .glow-teal {
    position: absolute;
    bottom: -120px;
    right: 150px;
    width: 550px;
    height: 550px;
    background: radial-gradient(circle, rgba(45, 212, 191, 0.22) 0%, transparent 70%);
    pointer-events: none;
    filter: blur(70px);
  }
  .glow-purple {
    position: absolute;
    top: 250px;
    right: -80px;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%);
    pointer-events: none;
    filter: blur(60px);
  }

  /* Header Section */
  .header {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .logo-box {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #1B3B6F 0%, #255899 100%);
    border: 1.5px solid rgba(125, 211, 252, 0.4);
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3);
  }
  .brand-name {
    font-size: 38px;
    font-weight: 800;
    letter-spacing: -1px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .brand-badge {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    padding: 4px 12px;
    border-radius: 9999px;
    background: rgba(56, 189, 248, 0.15);
    border: 1px solid rgba(56, 189, 248, 0.35);
    color: #7DD3FC;
  }

  .gemini-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 600;
    color: #E2E8F0;
  }
  .sparkle-icon {
    color: #38BDF8;
  }

  /* Main Hero Content */
  .hero {
    position: relative;
    z-index: 10;
    display: flex;
    gap: 40px;
    align-items: center;
    margin-top: 10px;
  }
  .hero-left {
    flex: 1.1;
  }
  .tagline-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-family: monospace;
    font-weight: 600;
    color: #2DD4BF;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 14px;
  }
  .hero-title {
    font-size: 46px;
    font-weight: 900;
    line-height: 1.12;
    letter-spacing: -1.5px;
    color: #FFFFFF;
    margin-bottom: 16px;
  }
  .hero-title span {
    background: linear-gradient(135deg, #38BDF8 0%, #2DD4BF 60%, #C084FC 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hero-sub {
    font-size: 17px;
    line-height: 1.55;
    color: #CBD5E1;
    margin-bottom: 24px;
    max-width: 520px;
  }

  /* Features Pill Row */
  .features-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .feat-tag {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    color: #E2E8F0;
  }
  .feat-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  /* Floating UI Visual Card (Perspective preview) */
  .hero-right {
    flex: 1.05;
    position: relative;
  }
  .canvas-card {
    background: rgba(15, 29, 52, 0.85);
    border: 1.5px solid rgba(125, 211, 252, 0.35);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 24px;
    box-shadow: 
      0 25px 60px rgba(0, 0, 0, 0.6),
      0 0 40px rgba(56, 189, 248, 0.15);
    transform: perspective(1000px) rotateY(-6deg) rotateX(4deg);
    transition: transform 0.3s;
  }
  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .card-title {
    font-size: 15px;
    font-weight: 700;
    color: #F8FAFC;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .live-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10B981;
    box-shadow: 0 0 8px #10B981;
  }
  .card-branch-tag {
    font-size: 11px;
    font-family: monospace;
    font-weight: 600;
    padding: 3px 10px;
    background: rgba(168, 85, 247, 0.2);
    border: 1px solid rgba(168, 85, 247, 0.4);
    border-radius: 6px;
    color: #D8B4FE;
  }

  /* Miniature Timeline Diagram inside card */
  .timeline-mini {
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
  }
  .node-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
  }
  .node-row.active {
    background: rgba(56, 189, 248, 0.12);
    border-color: rgba(56, 189, 248, 0.4);
    box-shadow: 0 0 20px rgba(56, 189, 248, 0.15);
  }
  .node-badge {
    font-size: 10px;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 6px;
    text-transform: uppercase;
  }
  .node-text {
    flex: 1;
  }
  .node-name {
    font-size: 13px;
    font-weight: 700;
    color: #F8FAFC;
  }
  .node-sub {
    font-size: 11px;
    color: #94A3B8;
  }
  .node-stat {
    font-size: 11px;
    font-family: monospace;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 6px;
    background: rgba(16, 185, 129, 0.15);
    color: #34D399;
  }

  /* Bottom Bar */
  .footer {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 13px;
    color: #94A3B8;
  }
  .creator-tag {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: #CBD5E1;
  }
  .creator-tag span {
    color: #38BDF8;
  }
  .stats-row {
    display: flex;
    gap: 24px;
    font-size: 13px;
    font-weight: 600;
  }
  .stats-item span {
    color: #FFFFFF;
    font-weight: 700;
  }
</style>
</head>
<body>
  <div class="grid-pattern"></div>
  <div class="glow-cyan"></div>
  <div class="glow-teal"></div>
  <div class="glow-purple"></div>

  <!-- Header -->
  <div class="header">
    <div class="brand">
      <div class="logo-box">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
          <circle cx="20" cy="50" r="10" fill="#38BDF8" />
          <path d="M28 50 C 45 50, 52 24, 75 24" stroke="#38BDF8" stroke-width="6" stroke-linecap="round" fill="none" />
          <path d="M28 50 C 45 50, 52 76, 75 76" stroke="#2DD4BF" stroke-width="6" stroke-linecap="round" fill="none" />
          <path d="M28 50 L 78 50" stroke="#C084FC" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 6" fill="none" />
          <circle cx="82" cy="24" r="8" fill="#38BDF8" />
          <circle cx="82" cy="76" r="8" fill="#2DD4BF" />
          <circle cx="84" cy="50" r="6" fill="#C084FC" />
        </svg>
      </div>
      <div>
        <div class="brand-name">
          Reality Replay
          <span class="brand-badge">AI Platform</span>
        </div>
      </div>
    </div>

    <div class="gemini-pill">
      <span class="sparkle-icon">✨</span>
      Powered by Google Gemini 2.5 Flash
    </div>
  </div>

  <!-- Hero Content -->
  <div class="hero">
    <div class="hero-left">
      <div class="tagline-pill">
        <span>⚡ Interactive Possibility Simulation</span>
      </div>
      <h1 class="hero-title">
        Don't just ask what will happen. <br />
        <span>Explore what could happen.</span>
      </h1>
      <p class="hero-sub">
        Transform one major life decision into multiple navigable futures across Month 3, Year 1, and Year 3 milestones. Stress-test assumptions and branch decisions in real time.
      </p>

      <div class="features-row">
        <div class="feat-tag">
          <span class="feat-dot" style="background:#38BDF8;"></span>
          Multi-Horizon Timelines
        </div>
        <div class="feat-tag">
          <span class="feat-dot" style="background:#2DD4BF;"></span>
          Assumption Explorer (Feature 6)
        </div>
        <div class="feat-tag">
          <span class="feat-dot" style="background:#C084FC;"></span>
          Recursive Decision Trees
        </div>
        <div class="feat-tag">
          <span class="feat-dot" style="background:#F59E0B;"></span>
          Qualitative Trade-Offs Matrix
        </div>
      </div>
    </div>

    <!-- Right Perspective Card -->
    <div class="hero-right">
      <div class="canvas-card">
        <div class="card-top">
          <div class="card-title">
            <span class="live-dot"></span>
            Career Crossroads Simulation
          </div>
          <span class="card-branch-tag">+2 Recursive Branches</span>
        </div>

        <div class="timeline-mini">
          <div class="node-row active">
            <span class="node-badge" style="background: rgba(56, 189, 248, 0.2); color: #7DD3FC;">PATH A</span>
            <div class="node-text">
              <div class="node-name">Corporate Staff Architect</div>
              <div class="node-sub">Year 1 · $340k Total Comp · 70% Design Meetings</div>
            </div>
            <span class="node-stat">Low Risk</span>
          </div>

          <div class="node-row">
            <span class="node-badge" style="background: rgba(45, 212, 191, 0.2); color: #5EEAD4;">PATH B</span>
            <div class="node-text">
              <div class="node-name">B2B AI Startup Founder</div>
              <div class="node-sub">Month 3 · 60 Prospect Calls · 1st Pilot Signed</div>
            </div>
            <span class="node-stat" style="background: rgba(244, 63, 94, 0.15); color: #FB7185;">Higher Volatility</span>
          </div>

          <div class="node-row">
            <span class="node-badge" style="background: rgba(192, 132, 252, 0.2); color: #E9D5FF;">BRANCH B.1</span>
            <div class="node-text">
              <div class="node-name">Pivot: Direct Enterprise Advisory</div>
              <div class="node-sub">Spawned from Year 1 Turning Point</div>
            </div>
            <span class="node-stat" style="background: rgba(245, 158, 11, 0.15); color: #FCD34D;">Branch Depth 2</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="creator-tag">
      Created by <span>Hassan Shaikh</span> · @hassan.techlife
    </div>

    <div class="stats-row">
      <div class="stats-item">
        <span>3</span> Parallel Milestones
      </div>
      <div class="stats-item">
        <span>0</span> Fake Percentages
      </div>
      <div class="stats-item">
        <span>100%</span> Navigable Graph
      </div>
    </div>
  </div>
</body>
</html>`;

async function generate() {
  console.log("Rendering 3:2 Thumbnail (1200x800)...");
  const tempHtmlPath = path.join(__dirname, "temp-thumb.html");
  fs.writeFileSync(tempHtmlPath, htmlContent, "utf8");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    defaultViewport: {
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 1, // Standard DPI for crisp 1200x800 file size < 1MB
    },
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"],
  });

  const page = await browser.newPage();
  await page.goto("file:///" + tempHtmlPath.replace(/\\/g, "/"), {
    waitUntil: "networkidle0",
  });

  await page.screenshot({
    path: OUTPUT_FILE,
    type: "png",
  });

  // Copy to public/ and artifact directory
  fs.copyFileSync(OUTPUT_FILE, PUBLIC_FILE);
  fs.mkdirSync(path.dirname(ARTIFACT_FILE), { recursive: true });
  fs.copyFileSync(OUTPUT_FILE, ARTIFACT_FILE);

  // Clean temp file
  try {
    fs.unlinkSync(tempHtmlPath);
  } catch (e) {}

  await browser.close();

  const stats = fs.statSync(OUTPUT_FILE);
  console.log(`✓ Thumbnail successfully generated!`);
  console.log(`  Path: ${OUTPUT_FILE}`);
  console.log(`  Dimensions: ${WIDTH}x${HEIGHT} (3:2 Ratio)`);
  console.log(`  Size: ${(stats.size / 1024).toFixed(1)} KB (Well below 5 MB limit)`);
}

generate().catch(console.error);

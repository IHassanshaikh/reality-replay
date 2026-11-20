const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_DIR = path.join(__dirname, "..", "showcase");
const ARTIFACT_DIR = "C:\\Users\\hassa\\.gemini\\antigravity\\brain\\9c24c8e6-73a1-45c5-b705-503733402840\\showcase";

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function capture() {
  console.log("Launching headless Chrome for showcase captures...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2, // High DPI / Retina clarity
    },
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--hide-scrollbars"],
  });

  const page = await browser.newPage();

  async function snap(filename, options = {}) {
    const localPath = path.join(OUTPUT_DIR, filename);
    const artifactPath = path.join(ARTIFACT_DIR, filename);
    await page.screenshot({ path: localPath, ...options });
    fs.copyFileSync(localPath, artifactPath);
    console.log(`✓ Saved: ${filename}`);
  }

  try {
    // 1. Landing Page Hero
    console.log("Capturing 1. Landing Hero...");
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
    await sleep(1500);
    await snap("01_landing_hero.png");

    // 2. Landing Page Comparison Matrix
    console.log("Capturing 2. Landing Matrix...");
    await page.evaluate(() => {
      window.scrollBy(0, 1150);
    });
    await sleep(800);
    await snap("02_landing_matrix.png");

    // 3. Landing Page 3-Layer Architecture
    console.log("Capturing 3. Landing Architecture...");
    await page.evaluate(() => {
      window.scrollBy(0, 950);
    });
    await sleep(800);
    await snap("03_landing_architecture.png");

    // 4. Decision Builder Wizard - Step 1
    console.log("Capturing 4. Decision Wizard Step 1...");
    await page.goto("http://localhost:3000/replay/new", { waitUntil: "networkidle0" });
    await sleep(1000);
    await snap("04_wizard_step1_bio.png");

    // Click Next to Step 2
    await page.click("button[type='button'].bg-primary");
    await sleep(800);
    console.log("Capturing 5. Decision Wizard Step 2...");
    await snap("05_wizard_step2_choices.png");

    // 5. Timeline Canvas Overview
    console.log("Capturing 6. Timeline Canvas...");
    await page.goto("http://localhost:3000/replay/replay_showcase_career_choice", {
      waitUntil: "networkidle0",
    });
    await sleep(2500); // Allow React Flow layout to calculate & settle
    await snap("06_canvas_overview.png");

    // 6. Milestone Node Inspection Drawer
    console.log("Capturing 7. Scenario Drawer...");
    const node = await page.$(".react-flow__node-timelineMilestone");
    if (node) {
      await node.click();
      await sleep(1000); // Wait for drawer slide-in animation
      await snap("07_canvas_drawer.png");
    }

    // 7. Assumption Explorer Modal
    console.log("Capturing 8. Assumption Explorer Modal...");
    // Find button containing Assumption Explorer in header
    const explorerBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      return btns.find((b) => b.textContent.includes("Assumption Explorer"));
    });
    if (explorerBtn && explorerBtn.click) {
      await explorerBtn.click();
      await sleep(1000);
      await snap("08_assumption_explorer.png");

      // Close modal
      const closeBtn = await page.$("button.p-1\\.5.text-text-muted");
      if (closeBtn) await closeBtn.click();
      await sleep(600);
    }

    // 8. Branch Creation Modal
    console.log("Capturing 9. Branch Creation Modal...");
    if (node) {
      await node.click();
      await sleep(800);
      const branchBtn = await page.evaluateHandle(() => {
        const btns = Array.from(document.querySelectorAll("button"));
        return btns.find((b) => b.textContent.includes("Explore This Moment"));
      });
      if (branchBtn && branchBtn.click) {
        await branchBtn.click();
        await sleep(1000);
        await snap("09_branch_modal.png");
      }
    }

    // 9. Compare Futures
    console.log("Capturing 10. Compare Futures Cards...");
    await page.goto("http://localhost:3000/replay/replay_showcase_career_choice/compare", {
      waitUntil: "networkidle0",
    });
    await sleep(1500);
    await snap("10_compare_futures.png");

    // Scroll to matrix
    await page.evaluate(() => {
      window.scrollBy(0, 750);
    });
    await sleep(600);
    await snap("11_compare_matrix.png");

    // 10. Possibilities Library Dashboard
    console.log("Capturing 12. Dashboard...");
    await page.goto("http://localhost:3000/dashboard", { waitUntil: "networkidle0" });
    await sleep(1200);
    await snap("12_dashboard.png");

    // 11. About Us Page
    console.log("Capturing 13. About Page...");
    await page.goto("http://localhost:3000/about", { waitUntil: "networkidle0" });
    await sleep(1200);
    await snap("13_about_manifesto.png");

    // 12. Contact Page
    console.log("Capturing 14. Contact Page...");
    await page.goto("http://localhost:3000/contact", { waitUntil: "networkidle0" });
    await sleep(1200);
    await snap("14_contact_page.png");

    console.log("\n All 14 showcase screenshots captured successfully in Retina 2x resolution!");
  } catch (err) {
    console.error("Capture error:", err);
  } finally {
    await browser.close();
  }
}

capture();

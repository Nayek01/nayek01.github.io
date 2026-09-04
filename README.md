# Personal Website & Portfolio (GitHub Pages)

A modern, fast, responsive personal portfolio website hosted on **GitHub Pages**, featuring:
- **Home Portfolio**: Sleek hero section, core technologies, and navigation hub.
- **Curriculum Vitae (CV)**: Web view + PDF preview and direct download (`assets/cv.pdf`).
- **Projects**: Clean placeholder page ("Projects loading...") ready for future expansion.
- **Markdown Blog Engine**: Reads `.md` files directly from the `posts/` folder with full image and syntax highlighting support.

---

## 📁 Project Structure

```
personalSite/
├── index.html                  # Portfolio Homepage
├── cv.html                     # Interactive CV viewer & PDF download
├── projects.html               # "Projects loading..." placeholder
├── posts.html                  # Blog catalog with search & tag filtering
├── post.html                   # Single post reader (renders Markdown)
├── build-posts.js              # Helper script to scan posts/ and update posts.json
├── .nojekyll                   # Ensures GitHub Pages serves all assets directly
├── css/
│   └── style.css               # Responsive design system (dark & light modes)
├── js/
│   ├── main.js                 # Theme toggle & navigation controls
│   ├── posts.js                # Post catalog search & filter logic
│   └── post-viewer.js          # Client-side Markdown parser (Marked.js + Highlight.js)
├── assets/
│   ├── images/
│   │   ├── cover.jpg           # Hero profile showcase cover banner
│   │   ├── profile.jpg         # Circular profile avatar
│   │   └── avatar.svg          # Fallback avatar
│   └── cv.pdf                  # Your CV PDF for download/preview
├── skillsAndTechnologiesLogos/ # Standalone SVG icons for Skills & Technologies
│   ├── nodejs.svg
│   ├── express.svg
│   ├── typescript.svg
│   ├── javascript.svg
│   ├── docker.svg
│   ├── kubernetes.svg
│   ├── aws.svg
│   ├── gcp.svg
│   ├── azure.svg
│   ├── linux.svg
│   ├── mongodb.svg
│   ├── redis.svg
│   ├── azure-blob.svg
│   ├── azure-tables.svg
│   ├── react.svg
│   ├── tailwind.svg
│   ├── html-css.svg
│   ├── git.svg
│   └── vscode.svg
└── posts/
    ├── posts.json              # Post index manifest
    ├── images/                 # Images embedded inside blog posts
    ├── welcome-to-my-site.md
    └── markdown-and-images-guide.md
```

---

## 🚀 Local Development / Testing

To preview the website locally on your computer, run a local web server (required for Markdown fetching via `fetch()`):

### Option 1: Python (Recommended, no installation required)
```bash
python3 -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 2: Node.js / npx
```bash
npx serve .
```

---

## ✍️ How to Add or Edit Blog Posts

1. Create a new `.md` file in the `posts/` directory (e.g. `posts/my-new-article.md`).
2. Add optional frontmatter metadata at the top:
   ```markdown
   ---
   title: My New Article Title
   date: 2026-09-04
   excerpt: A short summary of the article for the post preview card.
   author: Ritwik
   tags: [Web, JavaScript, Tutorial]
   coverImage: posts/images/my-banner.svg
   ---

   # Article Content Starts Here
   Write your content naturally...
   ```
3. **Embed Images**: Place your images in `posts/images/` and reference them:
   ```markdown
   ![Diagram Description](posts/images/my-diagram.png)
   ```
4. **Update the Post List**:
   Simply run:
   ```bash
   node build-posts.js
   ```
   This automatically extracts the title, date, reading time, and tags from all `.md` files and updates `posts/posts.json`.

---

## 📄 How to Update Your CV

- **PDF Download**: Replace `assets/cv.pdf` with your own resume PDF file.
- **Web CV Details**: Open `cv.html` in an editor to adjust work experience, education, or skill tags.

---

## 👤 How to Personalize Your Information

- **Name & Bio**: Open `index.html` and update the `hero-title`, `hero-subtitle`, `hero-bio`, and footer text.
- **Social Links**: Update the GitHub, LinkedIn, and Email URLs in the `<div class="hero-socials">` section of `index.html`.
- **Cover Banner**: Replace `assets/images/cover.jpg` with your own wallpaper or tech graphic (recommended ratio: 16:9 or 2:1, e.g., 1200×600px or 800×400px).
- **Profile Picture**: Replace `assets/images/profile.jpg` with your own photo (recommended ratio: 1:1 square, e.g., 400×400px). It automatically displays as a circular avatar overlapping 50% across the cover banner.

---

## 🎨 How to Customize Skills & Technologies Logos

All technology icons in the **Skills & Technologies** section are located in the `skillsAndTechnologiesLogos/` directory.

### Current Logo Files
| Technology | File Path |
|---|---|
| Node.js | `skillsAndTechnologiesLogos/nodejs.svg` |
| Express | `skillsAndTechnologiesLogos/express.svg` |
| TypeScript | `skillsAndTechnologiesLogos/typescript.svg` |
| JavaScript | `skillsAndTechnologiesLogos/javascript.svg` |
| Docker | `skillsAndTechnologiesLogos/docker.svg` |
| Kubernetes | `skillsAndTechnologiesLogos/kubernetes.svg` |
| AWS | `skillsAndTechnologiesLogos/aws.svg` |
| Google Cloud | `skillsAndTechnologiesLogos/gcp.svg` |
| Microsoft Azure | `skillsAndTechnologiesLogos/azure.svg` |
| Linux | `skillsAndTechnologiesLogos/linux.svg` |
| MongoDB | `skillsAndTechnologiesLogos/mongodb.svg` |
| Redis | `skillsAndTechnologiesLogos/redis.svg` |
| Azure Blob Storage | `skillsAndTechnologiesLogos/azure-blob.svg` |
| Azure Table Storage | `skillsAndTechnologiesLogos/azure-tables.svg` |
| MERN Stack | `skillsAndTechnologiesLogos/react.svg` |
| Tailwind CSS | `skillsAndTechnologiesLogos/tailwind.svg` |
| HTML & CSS | `skillsAndTechnologiesLogos/html-css.svg` |
| Git & GitHub | `skillsAndTechnologiesLogos/git.svg` |
| VS Code | `skillsAndTechnologiesLogos/vscode.svg` |

### How to Replace or Update Any Logo
1. **Prepare your image**:
   - **Recommended format**: `.svg` (vector format for sharp scaling at any display density) or `.png` with transparent background.
   - **Aspect ratio**: Square 1:1 (e.g., 48×48px up to 256×256px).
2. **Drop your file into `skillsAndTechnologiesLogos/`**:
   - Either overwrite the existing file with the same name (e.g. replace `skillsAndTechnologiesLogos/docker.svg`), OR
   - Save it with a new name and update the corresponding `<img>` tag in `index.html`:
     ```html
     <div class="skill-card">
       <div class="skill-card-icon">
         <img src="skillsAndTechnologiesLogos/my-new-icon.svg" alt="Docker" class="skill-card-img" width="44" height="44" loading="lazy">
       </div>
       <span class="skill-card-name">Docker</span>
       <span class="skill-card-sub">Containers</span>
     </div>
     ```

---

## 🌐 How to Deploy to GitHub Pages

1. **Commit and Push to GitHub**:
   ```bash
   git add .
   git commit -m "Launch personal portfolio and markdown blog"
   git push origin main
   ```
2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** (top tab) → **Pages** (in the left sidebar).
   - Under **Build and deployment** → **Source**, select **Deploy from a branch**.
   - Under **Branch**, select **`main`** (or `master`) and folder **`/ (root)`**.
   - Click **Save**.
3. **Visit Your Site**:
   GitHub will deploy your website to:
   ```
   https://<your-username>.github.io/<repository-name>/
   ```
   (Or `https://<your-username>.github.io/` if this is your user site).

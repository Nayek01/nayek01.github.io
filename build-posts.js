/**
 * build-posts.js
 * Run `node build-posts.js` to scan the posts/ directory,
 * extract frontmatter metadata, and generate posts/posts.json automatically.
 * No external dependencies required!
 */

const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'posts');
const outputFile = path.join(postsDir, 'posts.json');

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  const data = {};
  let body = content;

  if (match) {
    const yamlBlock = match[1];
    body = match[2];
    const lines = yamlBlock.split('\n');

    lines.forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        let val = line.slice(colonIndex + 1).trim();

        // Parse array syntax [a, b, c]
        if (val.startsWith('[') && val.endsWith(']')) {
          val = val
            .slice(1, -1)
            .split(',')
            .map(s => s.trim().replace(/^["']|["']$/g, ''))
            .filter(Boolean);
        } else {
          val = val.replace(/^["']|["']$/g, '');
        }
        data[key] = val;
      }
    });
  }

  // Fallback title from first H1 if not in frontmatter
  if (!data.title) {
    const titleMatch = body.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      data.title = titleMatch[1].trim();
    }
  }

  // Calculate reading time
  const wordCount = body.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  data.readingTime = `${minutes} min read`;

  // Fallback excerpt from first paragraph
  if (!data.excerpt) {
    const paragraphs = body.split(/\n\s*\n/).filter(p => !p.trim().startsWith('#'));
    if (paragraphs.length > 0) {
      data.excerpt = paragraphs[0].replace(/[#*_`]/g, '').trim().slice(0, 160) + '...';
    }
  }

  return data;
}

function build() {
  if (!fs.existsSync(postsDir)) {
    console.error('posts directory not found!');
    return;
  }

  const files = fs.readdirSync(postsDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  const posts = [];

  mdFiles.forEach(file => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const metadata = parseFrontmatter(content);
    const slug = path.basename(file, '.md');

    posts.push({
      id: metadata.id || slug,
      filename: file,
      title: metadata.title || slug.replace(/-/g, ' '),
      date: metadata.date || new Date().toISOString().split('T')[0],
      excerpt: metadata.excerpt || '',
      author: metadata.author || 'Author',
      tags: Array.isArray(metadata.tags) ? metadata.tags : (metadata.tags ? [metadata.tags] : []),
      coverImage: metadata.coverImage || '',
      readingTime: metadata.readingTime || '2 min read'
    });
  });

  // Sort by date descending (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2), 'utf-8');
  console.log(`Successfully generated ${outputFile} with ${posts.length} posts!`);
}

build();

/**
 * post-viewer.js - Dynamic Markdown post renderer
 * Fetches the requested .md file from the posts/ directory,
 * parses frontmatter metadata, and renders the content using Marked.js and Highlight.js.
 */

(function () {
  'use strict';

  const titleEl = document.getElementById('post-title');
  const metaEl = document.getElementById('post-meta');
  const coverEl = document.getElementById('post-cover');
  const contentEl = document.getElementById('post-content');
  const pageTitle = document.querySelector('title');

  function getPostFilename() {
    const params = new URLSearchParams(window.location.search);
    let post = params.get('post') || params.get('id');
    if (!post) return null;

    // Ensure it ends with .md
    if (!post.endsWith('.md')) {
      post += '.md';
    }
    // Prevent directory traversal attacks
    post = post.replace(/^(\.\.[\/\\])+/, '');
    return post;
  }

  function parseFrontmatter(rawText) {
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = rawText.match(frontmatterRegex);

    const data = {};
    let body = rawText;

    if (match) {
      const yamlBlock = match[1];
      body = match[2];
      const lines = yamlBlock.split('\n');

      lines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
          const key = line.slice(0, colonIndex).trim();
          let val = line.slice(colonIndex + 1).trim();

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
        // Remove that H1 from body so it doesn't render twice
        body = body.replace(/^#\s+(.+)$/m, '');
      } else {
        data.title = 'Untitled Post';
      }
    } else {
      // If title is in frontmatter, strip any initial matching H1 from body to prevent duplicate title
      body = body.replace(new RegExp(`^#\\s+${escapeRegex(data.title)}\\s*$`, 'm'), '');
    }

    // Reading time calculation
    const wordCount = body.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    data.readingTime = `${minutes} min read`;

    return { metadata: data, body: body.trim() };
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  }

  function renderError(message, details = '') {
    if (titleEl) titleEl.textContent = 'Post Not Found';
    if (contentEl) {
      contentEl.innerHTML = `
        <div class="empty-state">
          <h3>${message}</h3>
          ${details ? `<p>${details}</p>` : ''}
          <div style="margin-top: 1.5rem;">
            <a href="posts.html" class="btn btn-primary">← Browse All Posts</a>
          </div>
        </div>
      `;
    }
  }

  async function loadAndRenderPost() {
    const filename = getPostFilename();

    if (!filename) {
      renderError('No post specified', 'Please select an article from the posts catalog.');
      return;
    }

    try {
      const response = await fetch(`posts/${filename}`);
      if (!response.ok) {
        throw new Error(`File not found (${response.status})`);
      }

      const rawMarkdown = await response.text();
      const { metadata, body } = parseFrontmatter(rawMarkdown);

      // Set Page Title
      if (metadata.title) {
        document.title = `${metadata.title} - Personal Website`;
        if (titleEl) titleEl.textContent = metadata.title;
      }

      // Render Meta
      if (metaEl) {
        const metaItems = [];
        if (metadata.date) {
          metaItems.push(`<span>Published on ${formatDate(metadata.date)}</span>`);
        }
        if (metadata.readingTime) {
          metaItems.push(`<span>•</span><span>${metadata.readingTime}</span>`);
        }
        if (metadata.author) {
          metaItems.push(`<span>•</span><span>By ${metadata.author}</span>`);
        }
        metaEl.innerHTML = metaItems.join(' ');
      }

      // Render Cover Image if available
      if (coverEl && metadata.coverImage) {
        coverEl.src = metadata.coverImage;
        coverEl.alt = metadata.title || 'Post cover';
        coverEl.style.display = 'block';
      }

      // Configure Marked
      if (window.marked) {
        marked.setOptions({
          gfm: true,
          breaks: true,
          highlight: function (code, lang) {
            if (window.hljs) {
              const language = hljs.getLanguage(lang) ? lang : 'plaintext';
              return hljs.highlight(code, { language }).value;
            }
            return code;
          }
        });

        const parsedHtml = marked.parse(body);

        // Sanitize with DOMPurify if available, otherwise raw HTML
        const safeHtml = window.DOMPurify ? DOMPurify.sanitize(parsedHtml) : parsedHtml;

        if (contentEl) {
          contentEl.innerHTML = safeHtml;
          
          // Re-trigger highlight for code blocks
          if (window.hljs) {
            contentEl.querySelectorAll('pre code').forEach((block) => {
              hljs.highlightElement(block);
            });
          }
        }
      } else {
        if (contentEl) {
          contentEl.textContent = body;
        }
      }
    } catch (err) {
      console.error('Error loading post:', err);
      renderError(
        'Could not load this post',
        `The file <code>posts/${filename}</code> could not be loaded. Please ensure the file exists and is committed to GitHub.`
      );
    }
  }

  document.addEventListener('DOMContentLoaded', loadAndRenderPost);
})();

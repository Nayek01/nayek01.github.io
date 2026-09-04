---
title: How to Write Posts and Embed Images in Markdown
date: 2026-09-02
excerpt: A comprehensive guide on writing new blog posts, organizing them into the posts folder, and embedding images cleanly.
author: Ritwik
tags: [Guide, Markdown, Tutorial]
coverImage: posts/images/markdown-demo.svg
---

Writing content for this website is designed to be as frictionless as possible. You don't have to touch HTML templates every time you want to share something new.

Just drop a new `.md` file into the `posts/` folder and you're good to go!

---

## Frontmatter Configuration

At the very top of each `.md` file, you can specify metadata wrapped between triple dashes `---`:

```yaml
---
title: Title of Your Post
date: 2026-09-02
excerpt: Short summary displayed on the posts catalog card.
author: Your Name
tags: [Tag1, Tag2, Tag3]
coverImage: posts/images/your-banner.svg
---
```

If you don't include frontmatter, the engine will still automatically extract the first `# Heading` as the title and estimate your reading time.

---

## Embedding Images

Embedding images in your posts is standard Markdown syntax:

```markdown
![Image Description](posts/images/markdown-demo.svg)
```

Here is a live example of an image rendered in this post:

![Markdown and Editor Demo](posts/images/markdown-demo.svg)

> **Pro-Tip**: Store all images for your articles in `posts/images/` to keep your project well-organized. You can use PNG, JPG, WebP, GIF, or SVG formats.

---

## Code Blocks and Syntax Highlighting

This site is equipped with **Highlight.js**, providing automatic syntax highlighting for virtually any programming language:

### Python Example
```python
def calculate_reading_time(word_count: int, wpm: int = 200) -> int:
    """Estimates reading time in minutes."""
    return max(1, round(word_count / wpm))

print(f"Reading time: {calculate_reading_time(850)} minutes")
```

### TypeScript Example
```typescript
interface PostMetadata {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  filename: string;
  coverImage?: string;
}

const fetchPost = async (filename: string): Promise<string> => {
  const res = await fetch(`posts/${filename}`);
  return res.text();
};
```

---

## Tables & Typography

Markdown tables format into sleek responsive tables automatically:

| Feature | Support | Location |
| :--- | :--- | :--- |
| **Markdown Parsing** | Marked.js | `posts/*.md` |
| **Syntax Highlighting** | Highlight.js | All code blocks |
| **Image Embedding** | Native Markdown | `posts/images/` |
| **Tags & Search** | Client-side filter | `posts.html` |

Enjoy writing!

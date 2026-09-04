/**
 * posts.js - Logic for the Posts listing page
 * Fetches posts/posts.json, renders post cards, and handles search & tag filtering.
 */

(function () {
  'use strict';

  let allPosts = [];
  let selectedTag = 'all';

  const postsContainer = document.getElementById('posts-container');
  const searchInput = document.getElementById('posts-search');
  const tagsContainer = document.getElementById('tags-filter');

  async function loadPosts() {
    try {
      const response = await fetch('posts/posts.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      allPosts = await response.json();
      renderTagFilters();
      renderPosts();
    } catch (err) {
      console.error('Failed to load posts:', err);
      if (postsContainer) {
        postsContainer.innerHTML = `
          <div class="empty-state">
            <h3>Unable to load posts</h3>
            <p>Could not fetch post list. Please make sure <code>posts/posts.json</code> exists.</p>
          </div>
        `;
      }
    }
  }

  function renderTagFilters() {
    if (!tagsContainer) return;

    // Collect all unique tags
    const tagSet = new Set();
    allPosts.forEach(post => {
      if (Array.isArray(post.tags)) {
        post.tags.forEach(tag => tagSet.add(tag));
      }
    });

    const tags = ['all', ...Array.from(tagSet)];

    tagsContainer.innerHTML = tags
      .map(
        tag => `
        <button class="filter-tag ${tag === selectedTag ? 'active' : ''}" data-tag="${tag}">
          ${tag === 'all' ? 'All Topics' : '#' + tag}
        </button>
      `
      )
      .join('');

    tagsContainer.querySelectorAll('.filter-tag').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedTag = btn.getAttribute('data-tag');
        tagsContainer.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderPosts();
      });
    });
  }

  function renderPosts() {
    if (!postsContainer) return;

    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = allPosts.filter(post => {
      const matchesTag = selectedTag === 'all' || (Array.isArray(post.tags) && post.tags.includes(selectedTag));
      const matchesSearch =
        !query ||
        (post.title && post.title.toLowerCase().includes(query)) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(query)) ||
        (Array.isArray(post.tags) && post.tags.some(t => t.toLowerCase().includes(query)));

      return matchesTag && matchesSearch;
    });

    if (filtered.length === 0) {
      postsContainer.innerHTML = `
        <div class="empty-state">
          <h3>No posts found</h3>
          <p>Try adjusting your search query or tag filter.</p>
        </div>
      `;
      return;
    }

    postsContainer.innerHTML = filtered
      .map(post => {
        const postLink = `post.html?post=${encodeURIComponent(post.filename || post.id + '.md')}`;
        const tagsHtml = Array.isArray(post.tags)
          ? post.tags.map(t => `<span class="post-tag">#${escapeHtml(t)}</span>`).join('')
          : '';

        return `
          <a href="${postLink}" class="post-card">
            <div class="post-card-meta">
              <time datetime="${escapeHtml(post.date)}">${formatDate(post.date)}</time>
              <span>•</span>
              <span>${escapeHtml(post.readingTime || '2 min read')}</span>
            </div>
            <h2 class="post-card-title">${escapeHtml(post.title)}</h2>
            <p class="post-card-excerpt">${escapeHtml(post.excerpt || '')}</p>
            ${tagsHtml ? `<div class="post-card-tags">${tagsHtml}</div>` : ''}
          </a>
        `;
      })
      .join('');
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadPosts();

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        renderPosts();
      });
    }
  });
})();

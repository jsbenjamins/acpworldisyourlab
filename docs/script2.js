const GITHUB_API_BASE = 'https://api.github.com/repos/jsbenjamins/acpworldisyourlab/contents';
// const GITHUB_API_BASE = 'https://api.github.com/repos/yourusername/your-repo/contents';

async function fetchDirectoryContents(path) {
  const res = await fetch(`${GITHUB_API_BASE}/${path}`);
  if (!res.ok) return [];
  return await res.json();
}

async function getFileTree(path) {
  const items = await fetchDirectoryContents(path);
  if (!Array.isArray(items)) return [];

  const fileTree = [];

  for (const item of items) {
    if (item.type === 'file') {
      fileTree.push({
        name: item.name,
        url: item.download_url,
        isFolder: false
      });
    } else if (item.type === 'dir') {
      const children = await getFileTree(`${path}/${item.name}`);
      fileTree.push({
        name: item.name,
        isFolder: true,
        children
      });
    }
  }
  console.log(fileTree);
  return fileTree;
}

function renderFileTree(container, tree) {
  for (const item of tree) {
    const li = document.createElement('li');
    if (item.isFolder) {
      li.innerHTML = `<strong>${item.name}</strong>`;
      const subUl = document.createElement('ul');
      renderFileTree(subUl, item.children);
      li.appendChild(subUl);
    } else {
      li.innerHTML = `<a href="${item.url}" target="_blank">${item.name}</a>`;
    }
    container.appendChild(li);
  }
}

async function loadSection(rootFolder, listId) {
  const tree = await getFileTree(rootFolder);
  const ul = document.getElementById(listId);
  ul.innerHTML = '';
  renderFileTree(ul, tree);
}

// Load both sections
loadSection('current', 'current-list');
loadSection('past', 'past-list');

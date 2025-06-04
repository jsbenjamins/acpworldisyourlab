const GITHUB_API_BASE = 'https://api.github.com/repos/jsbenjamins/acpworldisyourlab/contents';

async function fetchDirectory(path) {
  const res = await fetch(`${GITHUB_API_BASE}/${path}`);
  const data = await res.json();
  if (!Array.isArray(data)) return [];

  return data;
}

async function getFileListWithSubfolders(basePath) {
  const items = await fetchDirectory(basePath);
  const files = [];
  const folders = [];

  for (const item of items) {
    if (item.type === 'file') {
      files.push({
        name: item.name,
        url: item.download_url
      });
    } else if (item.type === 'dir') {
      folders.push(item);
    }
  }

  // Recursively fetch subfolder contents
  for (const folder of folders) {
    const subItems = await getFileListWithSubfolders(`${basePath}/${folder.name}`);
    files.push({
      name: folder.name,
      isFolder: true,
      children: subItems
    });
  }

  return files;
}

function renderList(list, files) {
  for (const item of files) {
    const li = document.createElement('li');

    if (item.isFolder) {
      li.innerHTML = `<strong>${item.name}</strong>`;
      const subUl = document.createElement('ul');
      renderList(subUl, item.children);
      li.appendChild(subUl);
    } else {
      li.innerHTML = `<a href="${item.url}" target="_blank">${item.name}</a>`;
    }

    list.appendChild(li);
  }
}

async function loadAndDisplay(folderName, listId) {
  const files = await getFileListWithSubfolders(folderName);
  const list = document.getElementById(listId);
  list.innerHTML = '';
  renderList(list, files);
}

loadAndDisplay('current', 'current-list');
loadAndDisplay('past', 'past-list');

const GITHUB_API_BASE = 'https://api.github.com/repos/jsbenjamins/acpworldisyourlab/contents';

async function fetchFileList(folder) {
  const res = await fetch(`${GITHUB_API_BASE}/${folder}`);
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  
  return data
    .filter(item => item.type === 'file')
    .map(item => ({
      name: item.name,
      url: item.download_url,
      date: new Date(item.git_url?.split('/commits/')[1] || Date.now())
    }));
}

function populateList(listId, files) {
  const list = document.getElementById(listId);
  list.innerHTML = '';
  files.forEach(file => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${file.url}" target="_blank">${file.name}</a>`;
    list.appendChild(li);
  });
}

async function loadAll() {
  const [current, past] = await Promise.all([
    fetchFileList('current'),
    fetchFileList('past')
  ]);

  populateList('current-list', current);
  populateList('past-list', past);
}

loadAll();

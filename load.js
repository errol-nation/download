async function LoadDevs(orgName) {
  try {
    const response = await fetch(`https://api.github.com/orgs/${orgName}/members`);
    const members = await response.json();
    
    const devContainer = document.getElementById('developers');
    devContainer.innerHTML = '';
    
    const title = document.createElement('div');
    title.id = 'developers-title';
    title.textContent = `Developers of ${orgName}`;
    devContainer.appendChild(title);
    
    const avatarContainer = document.createElement('div');
    avatarContainer.id = 'developer-avatars';
    
    members.forEach(member => {
      const img = document.createElement('img');
      img.src = member.avatar_url;
      img.alt = member.login;
      img.title = member.login;
      img.className = 'developer-avatar';
      img.onclick = () => window.open(member.html_url, '_blank');
      
      avatarContainer.appendChild(img);
    });
    
    if (members.length === 0) {
      const empty = document.createElement('div');
      empty.style.cssText = 'color: rgba(8, 65, 105, 0.7); font-family: "Courier New", monospace; font-size: 13px; text-align: center;';
      empty.textContent = 'No public developers found for this organization.';
      devContainer.appendChild(empty);
    } else {
      devContainer.appendChild(avatarContainer);
    }
  } catch (error) {
    console.error('Error fetching developers:', error);
  }
}
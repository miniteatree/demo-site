document.addEventListener("DOMContentLoaded", () => {
    // Check which page we are on
    const memberList = document.getElementById("member-list");
    const detailView = document.getElementById("detail-view");

    if (memberList) {
        // Render List
        renderMemberList();
    }

    if (detailView) {
        // Render Detail
        const params = new URLSearchParams(window.location.search);
        const memberId = parseInt(params.get("id"));
        renderMemberDetail(memberId);
    }
});

function renderMemberList() {
    const list = document.getElementById("member-list");
    list.innerHTML = ""; // Clear

    familyData.forEach(member => {
        const card = document.createElement("div");
        card.className = "member-card";
        card.onclick = () => window.location.href = `member.html?id=${member.id}`;
        
        card.innerHTML = `
            <img src="${member.avatar}" class="avatar">
            <div class="info">
                <h3>${member.name}</h3>
                <p>第 ${member.generation} 世</p>
                <p>${member.spouse ? `配偶: ${member.spouse}` : ''}</p>
            </div>
            <div class="generation-tag">${member.status === 'alive' ? '在世' : '已故'}</div>
        `;
        
        list.appendChild(card);
    });
}

function renderMemberDetail(id) {
    const member = getMember(id);
    const detail = document.getElementById("detail-view");
    
    if (!member) {
        detail.innerHTML = "<h3>未找到成员</h3>";
        return;
    }

    const father = member.fatherId ? getMember(member.fatherId) : null;
    const children = getChildren(id);

    detail.innerHTML = `
        <div class="detail-header">
            <img src="${member.avatar}" class="detail-avatar">
            <h2>${member.name}</h2>
            <p>第 ${member.generation} 世传人</p>
            <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px;">
                ${member.status === 'alive' ? '✅ 状态: 在世' : '⚫ 状态: 已故'}
            </span>
        </div>

        <div class="detail-section">
            <h4>📋 个人资料</h4>
            <p><strong>出生年份:</strong> ${member.birthYear}</p>
            <p><strong>配偶:</strong> ${member.spouse || '未婚/无记录'}</p>
        </div>

        <div class="detail-section">
            <h4>👴 父亲 (上代)</h4>
            ${father ? `<a href="member.html?id=${father.id}">${father.name} (第${father.generation}世)</a>` : '<p>无记录 (始祖?)</p>'}
        </div>

        <div class="detail-section">
            <h4>👶 子女 (下代)</h4>
            ${children.length > 0 ? 
                `<ul>${children.map(c => `<li><a href="member.html?id=${c.id}">${c.name}</a></li>`).join('')}</ul>` : 
                '<p>暂无记录</p>'
            }
        </div>
        
        <button class="btn" onclick="alert('编辑功能 - 仅管理员可用')">✏️ 编辑资料</button>
    `;
}
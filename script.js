document.addEventListener("DOMContentLoaded", () => {
    // Determine which page we're on by checking elements
    const memberList = document.getElementById("member-list");
    const detailView = document.getElementById("detail-view");

    if (detailView) {
        const params = new URLSearchParams(window.location.search);
        const memberId = params.get("id");
        if (memberId) {
            renderDetail(parseInt(memberId));
        } else {
            detailView.innerHTML = "<p>请选择一个成员</p>";
        }
    } else if (memberList) {
        renderList();
    }
});

function renderList() {
    const list = document.getElementById("member-list");
    if (!list) return;

    list.innerHTML = "";
    
    familyData.forEach(member => {
        const card = document.createElement("div");
        card.className = "member-card";
        card.onclick = () => window.location.href = `member.html?id=${member.id}`;
        
        card.innerHTML = `
            <img src="${member.avatar}" class="avatar">
            <div class="info">
                <h3>${member.name}</h3>
                <p>第 ${member.generation} 世</p>
                <p style="font-size: 0.8em; color: #888;">${member.spouse ? '配偶: ' + member.spouse : '未婚'}</p>
            </div>
            <div class="generation-tag" style="margin-left:auto;">
                ${member.status === 'alive' ? '在世' : '已故'}
            </div>
        `;
        list.appendChild(card);
    });
}

function renderDetail(id) {
    const detail = document.getElementById("detail-view");
    if (!detail) return;

    const member = familyData.find(m => m.id === id);
    if (!member) {
        detail.innerHTML = "<h3>未找到成员</h3>";
        return;
    }

    const father = member.fatherId ? familyData.find(m => m.id === member.fatherId) : null;
    const children = familyData.filter(m => m.fatherId === id);

    let html = `
        <div class="detail-header">
            <img src="${member.avatar}" class="detail-avatar">
            <h2>${member.name}</h2>
            <p>第 ${member.generation} 世传人</p>
        </div>

        <div class="detail-section">
            <h4>📋 个人资料</h4>
            <p><strong>出生年份:</strong> ${member.birthYear}</p>
            <p><strong>配偶:</strong> ${member.spouse || '无记录'}</p>
            <p><strong>状态:</strong> ${member.status === 'alive' ? '✅ 在世' : '⚫ 已故'}</p>
        </div>

        <div class="detail-section">
            <h4>👴 父亲 (上代)</h4>
            ${father ? 
                `<a href="member.html?id=${father.id}" style="text-decoration: none; color: #333; display: block; padding: 5px 0;">
                    👉 ${father.name} (第${father.generation}世)
                </a>` : 
                '<span style="color: #999;">无记录</span>'
            }
        </div>

        <div class="detail-section">
            <h4>👶 子女 (下代)</h4>
            ${children.length > 0 ? 
                children.map(c => 
                    `<a href="member.html?id=${c.id}" style="text-decoration: none; color: #333; display: block; padding: 5px 0; border-bottom: 1px dashed #eee;">
                        👉 ${c.name} (第${c.generation}世)
                    </a>`
                ).join('') : 
                '<span style="color: #999;">暂无记录</span>'
            }
        </div>
    `;

    detail.innerHTML = html;
}
const familyData = [
    {
        id: 1,
        name: "陈大爷 (Chen Da Ye)",
        generation: 1,
        birthYear: 1940,
        status: "deceased",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChenDaYe",
        fatherId: null,
        spouse: "李氏",
        children: [2, 3]
    },
    {
        id: 2,
        name: "陈二叔 (Chen Er Shu)",
        generation: 2,
        birthYear: 1965,
        status: "alive",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChenErShu",
        fatherId: 1,
        spouse: "王氏",
        children: [4, 5]
    },
    {
        id: 3,
        name: "陈三姑 (Chen San Gu)",
        generation: 2,
        birthYear: 1968,
        status: "alive",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChenSanGu",
        fatherId: 1,
        spouse: "张先生",
        children: []
    },
    {
        id: 4,
        name: "陈小明 (Chen Xiao Ming)",
        generation: 3,
        birthYear: 1990,
        status: "alive",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChenXiaoMing",
        fatherId: 2,
        spouse: "林小姐",
        children: []
    },
    {
        id: 5,
        name: "陈小华 (Chen Xiao Hua)",
        generation: 3,
        birthYear: 1995,
        status: "alive",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChenXiaoHua",
        fatherId: 2,
        spouse: null,
        children: []
    }
];

function getMember(id) {
    return familyData.find(m => m.id === id);
}

function getChildren(id) {
    return familyData.filter(m => m.fatherId === id);
}

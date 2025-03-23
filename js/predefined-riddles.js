
const predefinedRiddles = [
    {
        id: 1,
        title: "ربي يسهلك",
        riddleText: " 0xd9 0x8a 0xd9 0x82 0xd9 0x88 0xd9 0x84 0x20 0xd9 0x87 0xd9 0x8a 0x20 0xd8 0xa7 0xd9 0x88 0xd9 0x84 0x20 0xd8 0xac 0xd8 0xb2 0xd9 0x8a 0xd8 0xb1 0xd8 0xa9 0x20 0xd9 0x88 0xd9 0x87 0xd9 0x8a 0x20 0xd8 0xaa 0xd8 0xa7 0xd9 0x86 0xd9 0x8a 0xd8 0xa9 0x20 0xd9 0x85 0xd9 0x86 0x20 0xd8 0xa7 0xd9 0x84 0xd8 0xa8 0xd9 0x88 0xd8 0xa7 0xd8 0xa8 0xd8 0xa9 0x20 0xd8 0xa7 0xd9 0x84 0xd8 0xb1 0xd8 0xa6 0xd9 0x8a 0xd8 0xb3 0xd9 0x8a 0xd8 0xa9 ",//
        answer: "المعالج", 
        hint: "ساهلة عاد مش من اولها.", 
        hasQrCode: false, 
    },
    {
        id: 2,
        title: "تقدرها",
        riddleText: "0x642 0x627 0x639 0x627 0x62a 0x20 0x645 0x624 0x633 0x633 0x20 0x639 0x644 0x645 0x20 0x627 0x644 0x62c 0x628 0x631 ",
        answer: "بايثون",
        hint: "المكان جديد في الكلية",
    },
    {
        id: 3,
        title: "الجماعة سابقينك",
        riddleText: "0x645 0x631 0x643 0x632 0x20 0x627 0x644 0x644 0x64a 0x20 0x628 0x62d 0x62f 0x20 0x645 0x643 0x62a 0x628 0x629 0x20 0x627 0x644 0x62f 0x631 0x627 0x633 0x627 0x62a 0x20 0x645 0x646 0x20 0x62c 0x64a 0x647 0x629 0x20 0x627 0x644 0x64a 0x633 0x627 0x631",
        answer: "ssd",
        hint: "مركز الاستشارات والتدريب",
    },
    {
        id: 4,
        title: "هلبا",
        riddleText: "0x645 0x643 0x627 0x646 0x20 0x641 0x64a 0x647 0x20 0x646 0x647 0x627 0x64a 0x629 0x20 0x637 0x631 0x64a 0x642 0x20 0x645 0x646 0x20 0x62c 0x64a 0x647 0x629 0x20 0x628 0x631 0x643 0x64a 0x62f 0x62c 0x648 0x20 0x627 0x644 0x642 0x627 0x646 0x648 0x646 0x20 0x647 0x648 0x20 0x641 0x64a 0x20 0x627 0x644 0x643 0x644 0x64a 0x629 0x20 0x648 0x641 0x64a 0x647 0x20 0x64a 0x646 0x642 0x644 0x20 0x627 0x644 0x635 0x648 0x62a",
        answer: "النظام الثنائي",
        hint: "وراء الحمامات اللي برا",
    },
    {
        id: 5,
        title: "نص المشوار تم!",
        riddleText: "0x62a 0x631 0x643 0x64a 0x646 0x629 0x20 0x627 0x644 0x642 0x631 0x627 0x64a 0x629",
        answer: "http",
        hint: "فك خوي بلا جو",        mapLocation: ""
    },
    {
        id: 6,
        title: "سيدها",
        riddleText: "0x645 0x631 0x643 0x632 0x20 0x627 0x644 0x644 0x64a 0x20 0x628 0x62d 0x62f 0x20 0x645 0x643 0x62a 0x628 0x629 0x20 0x627 0x644 0x62f 0x631 0x627 0x633 0x627 0x62a 0x20 0x645 0x646 0x20 0x62c 0x64a 0x647 0x629 0x20 0x627 0x644 0x64a 0x645 0x64a 0x646",
        answer: "محمد الفاتح",
        hint: "انزل من دروج",        mapLocation: ""
    },
    {
        id: 7,
        title: "ارررربت!",
        riddleText: "0x645 0x643 0x627 0x646 0x20 0x627 0x644 0x639 0x643 0x633 0x629 0x20 0x628 0x64a 0x646 0x20 0x627 0x644 0x645 0x62d 0x627 0x636 0x631 0x627 0x62a 0x60c 0x20 0x648 0x641 0x64a 0x647 0x20 0x645 0x643 0x64a 0x641 0x20 0x644 0x643 0x646 0x20 0x643 0x627 0x646 0x20 0x645 0x636 0x648 0x639 0x648 0x643 0x20 0x642 0x631 0x627 0x64a 0x629 0x20 0x62f 0x648 0x634 0x629 0x20 0x647 0x644 0x628 0x627 0x20 0x641 0x648 0x62a 0x647 0x20 0x627 0x644 0x645 0x648 0x636 0x648 0x639",
        answer: "ميسي",
        hint: "مكان القرمة",        mapLocation: ""
    },
    {
        id: 8,
        title: "معش مزال هلبا",
        riddleText: "0x643 0x627 0x646 0x20 0x62a 0x628 0x64a 0x20 0x634 0x64a 0x62a 0x627 0x62a 0x20 0x62a 0x645 0x634 0x64a 0x20 0x63a 0x627 0x62f 0x64a",
        answer: "1930",
        hint: "نموذج 2",
    },
    {
        id: 9,
        title: "خف روحك خوي!",
        riddleText: "0x627 0x644 0x645 0x642 0x628 0x631 0x629",
        answer: "البحر المتوسط",
        hint: "مزال 5 دقايق يا طالب",
    },-
    {
        id: 10,
        title: "احصل عليه قبل ما يهرب!",
        riddleText: "0x627 0x644 0x644 0x64a 0x20 0x62f 0x648 0x631 0x20 0x641 0x64a 0x647 0x20 0x639 0x646 0x62f 0x20 0x631 0x626 0x64a 0x633 0x20 0x627 0x644 0x634 0x624 0x648 0x646 0x20 0x627 0x644 0x637 0x644 0x628 0x629 0x20 0x627 0x644 0x633 0x627 0x628 0x642 0x20 0x637 0x631 0x628 0x642 0x20 0x639 0x644 0x64a 0x647",
        answer: "قباء",
        hint: "دور ادهم يا خوي!",      
    }
];


function initializeGame() {
    // حفظ الألغاز في localStorage
    localStorage.setItem('riddles', JSON.stringify(predefinedRiddles));
}

// تهيئة اللعبة عند تحميل البرنامج النصي
document.addEventListener('DOMContentLoaded', initializeGame);

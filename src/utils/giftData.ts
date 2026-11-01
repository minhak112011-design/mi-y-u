export const SECRET_PASSCODE = '1111';
export const MAX_PASSCODE_LENGTH = 4;

export interface PasscodeHint {
  id: number;
  title: string;
  clue: string;
  codeDisplay: string;
}

export interface SongTrack {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  cover: string;
  coverPosition?: string;
  lyrics: string[];
  dedication: string;
}

export interface MiPhoto {
  id: string;
  src: string;
  caption: string;
  dateTag: string;
  note: string;
  objectPosition: string;
  scale?: number;
}

export const PASSCODE_HINTS: PasscodeHint[] = [
  {
    id: 1,
    title: 'Gợi ý đặc biệt số 1',
    clue: 'Giữa cả trăm người ngoài kia, trong tim anh chỉ có duy nhất 1 mình Mi là số 1 thôi! Nhập 4 chữ số 1 nha công chúa:',
    codeDisplay: '1 1 1 1',
  },
  {
    id: 2,
    title: 'Gợi ý dễ thương số 2',
    clue: '1 nụ cười của Mi + 1 ánh mắt của Mi + 1 trái tim chân thành + 1 tình yêu siêu to khổng lồ dành cho Mi:',
    codeDisplay: '1 1 1 1',
  },
  {
    id: 3,
    title: 'Gợi ý từ bài hát của tụi mình',
    clue: '“Okay em là nhất (số 1) ở nơi đông người... Vì em là nhất rồi, I will never lose you!”',
    codeDisplay: '1 1 1 1',
  },
];

export const SONGS: SongTrack[] = [
  {
    id: 'em-la-nhat',
    title: 'Em Là Nhất (Okay Em Là Nhất)',
    subtitle: 'Dành tặng Mi — Cô gái số 1 trong lòng anh',
    src: '/assets/aistudio/Download_-_2026-11-01T163406.719_eaca220f.mp4',
    cover: '/assets/aistudio/image_e0b51972.png',
    coverPosition: '25% 25%',
    dedication: 'Vì trong mắt anh lúc nào Mi cũng là nhất, chẳng ai sánh bằng!',
    lyrics: [
      'Okay em là nhất ở nơi đông người',
      'Ôi đôi mắt đẹp như mây trời, môi em thật chất tại sao không cười?',
      'Tại vì thiếu anh đúng không? Xin em đừng nhắc điều gì về chuyện cũ',
      'Vì em là nhất rồi, I will never lose you',
      'Đoạn đường em bước một mình chông chênh',
      'Để anh rước kiệu hồng hoan nghênh',
      'Mặc váy cưới rượu nồng rồi mình chung lối chịu không?',
    ],
  },
  {
    id: 'babyboo-sunshine',
    title: 'Babyboo You Are My Sunshine',
    subtitle: 'Fall In Love Một Mình Mi Giữa Cả Trăm Người',
    src: '/assets/aistudio/Download_-_2026-11-01T162039.113_b51127a8.mp4',
    cover: '/assets/aistudio/image_d91bb2a1.png',
    coverPosition: '25% 25%',
    dedication: 'Chỉ cần Mi gọi điện thoại là anh yêu có mặt ngay lập tức!',
    lyrics: [
      'Không hiểu sao lại fall in love một mình em giữa cả trăm người',
      'Nên là baby cần ai đưa đi đâu đó đây',
      'Chỉ cần gọi điện thoại là anh yêu có ngay',
      'Trăng và sao đang lên cao đi khỏi chốn đây',
      'Và hai ta cùng nhau rời khỏi chốn này',
      'Babyboo, you are my sunshine',
      'Calling you, baby I’m by your side',
      'Em đừng lo, anh đây đâu có ai',
      'Em hãy vui lên đi và đừng như thế hoài!',
    ],
  },
  {
    id: 'u-thi-anh-da-yeu',
    title: 'Ừ Thì Anh Đã Yêu (Cô Đáng Yêu)',
    subtitle: 'Phải Lòng Cô Nàng Mi Siêu Cấp Cute',
    src: '/assets/aistudio/Download_-_2026-11-01T162144.565_877654fe.mp4',
    cover: '/assets/aistudio/image_e8b272cf.png',
    coverPosition: '50% 35%',
    dedication: 'Dù Mi có nhõng nhẽo hay kiêu một xíu thì điều đó cũng siêu cấp đáng yêu!',
    lyrics: [
      'Gửi thêm bao diệu kì, tình anh chẳng khác đi',
      'Ừ thì anh đã yêu, phải lòng một cô đáng yêu',
      'Rằng cô ta rất kiêu, điều đó cũng đáng yêu 💕',
    ],
  },
  {
    id: 'thich-thich',
    title: 'Thích Thích (Đã Thích Mi Rồi)',
    subtitle: 'Giai Điệu Ngọt Ngào Cho Cục Cưng Mi',
    src: '/assets/aistudio/snaptik.vn_7655285061192813845_c2dafaf1.mp4',
    cover: '/assets/aistudio/image_e0b51972.png',
    coverPosition: '75% 25%',
    dedication: 'Ngẩn ngơ ngắm ảnh Mi cả ngày không biết chán luôn đó!',
    lyrics: [
      'Ánh nắng sáng lấp lánh chiếu sáng ngày mai',
      'Bờ môi ánh mắt muốn chạm ngay, vì anh đã thích Mi rồi',
      'Thích thích, anh đã thích thích Mi thật lòng mà!',
    ],
  },
];

export const MI_PHOTOS: MiPhoto[] = [
  {
    id: 'mi-1',
    src: '/assets/aistudio/image_e0b51972.png',
    caption: 'Công chúa Mi áo hồng xinh xắn 💕',
    dateTag: 'Khoảnh khắc số 1',
    note: 'Đôi mắt tròn xoe dễ thương nhìn một phát là u mê không lối thoát luôn!',
    objectPosition: '50% 50%',
    scale: 1,
  },
  {
    id: 'mi-2',
    src: '/assets/aistudio/image_e8b272cf.png',
    caption: 'Bé Mi đeo kính khóc nhè cute xỉu 🥺',
    dateTag: 'Cục cưng nhõng nhẽo',
    note: 'Làm mặt xấu với filter râu ria khóc nhè mà sao vẫn đáng yêu tới mức muốn cưng nựng thế này hả Mi ơi!',
    objectPosition: '50% 35%',
    scale: 1,
  },
  {
    id: 'mi-3',
    src: '/assets/aistudio/image_d91bb2a1.png',
    caption: 'Ngầu lòi mà vẫn siêu cấp đáng yêu ✨',
    dateTag: 'Trùm cuối cute',
    note: 'Đeo mặt nạ ngầu đét vậy thôi chứ bên trong là em bé ngọt ngào nhất quả đất của anh!',
    objectPosition: '50% 50%',
    scale: 1,
  },
  {
    id: 'mi-4',
    src: '/assets/aistudio/image_e0b51972.png',
    caption: 'Nụ cười ngọt hơn cả kẹo bông gòn 🍬',
    dateTag: 'Góc nghiêng thần thánh',
    note: '“Ôi đôi mắt đẹp như mây trời, môi em thật chất...” — đúng chuẩn bài hát viết riêng cho Mi luôn!',
    objectPosition: '15% 15%',
    scale: 1.85,
  },
  {
    id: 'mi-5',
    src: '/assets/aistudio/image_d91bb2a1.png',
    caption: 'Ánh mắt lấp lánh làm tim anh tan chảy 💓',
    dateTag: 'Babyboo của anh',
    note: 'Giữa cả trăm người ngoài kia, anh chỉ fall in love đúng một mình Mi thôi đó!',
    objectPosition: '85% 15%',
    scale: 1.85,
  },
  {
    id: 'mi-6',
    src: '/assets/aistudio/image_e8b272cf.png',
    caption: 'Đừng buồn hay khóc nhè nha có anh đây rồi 🫶',
    dateTag: 'Thương Mi nhất',
    note: '“Em đừng lo anh đây đâu có ai, em hãy vui lên đi và đừng như thế hoài!”',
    objectPosition: '50% 22%',
    scale: 1.25,
  },
  {
    id: 'mi-7',
    src: '/assets/aistudio/image_e0b51972.png',
    caption: 'Cô nàng kiêu kỳ nhưng đáng yêu vô đối 🌸',
    dateTag: 'Mãi bên Mi',
    note: '“Ừ thì anh đã yêu phải lòng một cô đáng yêu, rằng cô ta rất kiêu điều đó cũng đáng yêu!”',
    objectPosition: '85% 85%',
    scale: 1.85,
  },
  {
    id: 'mi-8',
    src: '/assets/aistudio/image_d91bb2a1.png',
    caption: 'Mỗi ngày ngắm Mi là một ngày hạnh phúc 🌷',
    dateTag: 'My Sunshine',
    note: 'Chỉ cần Mi gọi một tiếng thôi là anh yêu có mặt bên cạnh Mi ngay lập tức!',
    objectPosition: '15% 85%',
    scale: 1.85,
  },
  {
    id: 'mi-9',
    src: '/assets/aistudio/image_e0b51972.png',
    caption: 'Mi luôn là số 1111 trong trái tim anh 👑',
    dateTag: 'Forever & Always',
    note: 'Cảm ơn Mi vì đã xuất hiện và làm thế giới của anh ngập tràn màu hồng dễ thương!',
    objectPosition: '15% 85%',
    scale: 1.85,
  },
];

export const LOVE_LETTER_TITLE = 'Gửi Mi — Cô gái nhỏ siêu cấp đáng yêu của anh 💕';

export const LOVE_LETTER_PARAGRAPHS: string[] = [
  'Heluuu cục cưng Mi yêu dấu của anh! Hôm nay anh tự tay chuẩn bị trang web nhỏ xinh này để dành tặng riêng cho một mình Mi thôi đó.',
  'Không hiểu sao giữa cả trăm người ngoài kia, anh lại “fall in love” sâu đậm với một mình Mi như vậy. Từ ánh mắt tròn xoe như mây trời, đôi môi xinh xắn, cho tới cả lúc Mi chụp ảnh dìm hàng đeo kính khóc nhè hay trùm mặt nạ ngầu lòi... khoảnh khắc nào của Mi cũng làm tim anh rung rinh tan chảy hết trơn!',
  'Đúng như lời bài hát anh để trong web này vậy: “Okay em là nhất ở nơi đông người... Vì em là nhất rồi, I will never lose you!”. Trong mắt anh, Mi lúc nào cũng là số 1 (nên mật khẩu mới là 1111 đó nha!).',
  'Mi đừng bao giờ lo lắng hay buồn vu vơ nhé, vì anh đây đâu có ai ngoài Mi đâu! Chỉ cần Mi gọi một tiếng là anh có mặt bên cạnh thương yêu, chiều chuộng và bảo vệ Mi ngay.',
  'Chúc công chúa Mi của anh lúc nào cũng nở nụ cười thật tươi, luôn hạnh phúc và mãi là em bé đáng yêu nhất trong lòng anh nhé! Yêu Mi nhiều thật nhiềuuuu! 💗✨',
];

export const LOVE_LETTER_SIGNATURE = 'Mãi yêu một mình Mi ❤️';

export const FLOATING_LOVE_NOTES: string[] = [
  'Yêu Mi nhất trên đời 💕',
  'Okay Mi là nhất! 👑',
  'Babyboo My Sunshine ☀️',
  'I will never lose you 💗',
  'Cục cưng Mi siêu cuteee 🐰',
  'Chỉ cần Mi gọi là anh có ngay 📞',
  'Phải lòng cô nàng Mi đáng yêu 🌸',
  'Mãi bên nhau Mi nhé 💍',
  'Thương Mi số 1111 ✨',
  'Đừng buồn nha có anh đây rồi 🫶',
];

export function appendDigit(current: string, digit: string): string {
  if (!/^\d$/.test(digit)) return current;
  if (current.length >= MAX_PASSCODE_LENGTH) return current;
  return current + digit;
}

export function removeDigit(current: string): string {
  if (current.length === 0) return '';
  return current.slice(0, -1);
}

export function validatePasscode(input: string): boolean {
  return input === SECRET_PASSCODE;
}

export function getNextHintIndex(currentIndex: number, total = PASSCODE_HINTS.length): number {
  if (total <= 0) return 0;
  return (currentIndex + 1) % total;
}

export function getNextTrackIndex(currentIndex: number, total = SONGS.length): number {
  if (total <= 0) return 0;
  return (currentIndex + 1) % total;
}

export function getPrevTrackIndex(currentIndex: number, total = SONGS.length): number {
  if (total <= 0) return 0;
  return (currentIndex - 1 + total) % total;
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// الحصول على جميع الخلايا
const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const winningMessage = document.createElement('div');
let isXTurn = true; // لتحديد الدور الحالي

// مزيج الفوز
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // الصفوف
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // الأعمدة
  [0, 4, 8], [2, 4, 6]             // الأقطار
];

// دالة لتبدأ اللعبة
function startGame() {
  cells.forEach(cell => {
    cell.textContent = ''; // مسح المحتوى السابق
    cell.classList.remove('x', 'o'); // إزالة أي علامات قديمة
    cell.addEventListener('click', handleClick, { once: true }); // السماح بنقرة واحدة فقط
  });
  isXTurn = true; // إعادة الدور إلى X
  if (winningMessage.parentNode) {
    winningMessage.parentNode.removeChild(winningMessage); // إزالة رسالة الفوز إذا كانت موجودة
  }
}

// معالجة النقر على الخلية
function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o'; // التحقق من الدور الحالي
  cell.textContent = isXTurn ? 'X' : 'O'; // وضع النص المناسب
  cell.classList.add(currentClass); // إضافة الكلاس لتسهيل التحقق من الفوز
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isXTurn = !isXTurn; // تبديل الأدوار
  }
}

// التحقق من الفوز
function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

// التحقق من التعادل
function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

// إنهاء اللعبة
function endGame(draw) {
  winningMessage.textContent = draw ? "It's a Draw!" : `${isXTurn ? 'X' : 'O'} Wins!`;
  winningMessage.className = 'winning-message';
  document.body.appendChild(winningMessage); // عرض رسالة النتيجة
  cells.forEach(cell => cell.removeEventListener('click', handleClick)); // منع المزيد من النقرات
}

// بدء اللعبة عند التحميل
startGame();


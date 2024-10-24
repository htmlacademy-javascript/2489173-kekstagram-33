const checkStringLength = (string,maxLength) => {
  if(string.length <= maxLength) {
    return true;
  }
  return false;
};

checkStringLength(20,18);

function checkStringpalindron(string) {
  string = string.toUpperCase().replaceAll(' ', '');
  const reversed = string.split('').reverse('').join('');
  if(string === reversed) {
    return (true);
  } return (false);
}
// Строка является палиндромом
checkStringpalindron('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkStringpalindron('ДовОд'); // true
// Это не палиндром
checkStringpalindron('Кекс'); // false
checkStringpalindron('Лёша на полке клопа нашёл '); // true

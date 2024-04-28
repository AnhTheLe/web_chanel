export function formatPrice(money: number | undefined) {
  const value = money?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return value?.substring(0, value.length - 2) ?? '0';
}

export function formatPriceWithVNDCurrency(money: number | undefined) {
  const value = money?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return value?.substring(0, value.length - 2) + '₫';
}
export function roundCurrency(amount: number | undefined, currency: string) {
  if (amount !== undefined) {
    if (currency === 'VND') {
      return Math.round(amount);
    } else {
      return Math.round(amount * 100) / 100;
    }
  }
}

export function formatToWord(money: number) {
  const numWords = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

  function readTens(num: number, full: boolean) {
    let str = '';
    const ten = Math.floor(num / 10);
    const unit = num % 10;
    if (ten > 1) {
      str = ' ' + numWords[ten] + ' mươi';
      if (unit === 1) {
        str += ' mốt';
      }
    } else if (ten === 1) {
      str = ' mười';
      if (unit === 1) {
        str += ' một';
      }
    } else if (full && unit > 0) {
      str = ' lẻ';
    }
    if (unit === 5 && ten > 1) {
      str += ' lăm';
    } else if (unit > 1 || (unit === 1 && ten === 0)) {
      str += ' ' + numWords[unit];
    }
    return str;
  }

  function readBlock(num: number, full: boolean) {
    let str = '';
    const hundred = Math.floor(num / 100);
    num = num % 100;
    if (full || hundred > 0) {
      str = ' ' + numWords[hundred] + ' trăm';
      str += readTens(num, true);
    } else {
      str = readTens(num, false);
    }
    return str;
  }

  function readMillion(num: number, full: boolean) {
    let str = '';
    const million = Math.floor(num / 1000000);
    num = num % 1000000;
    if (million > 0) {
      str = readBlock(million, full) + ' triệu';
      full = true;
    }
    const thousand = Math.floor(num / 1000);
    num = num % 1000;
    if (thousand > 0) {
      str += readBlock(thousand, full) + ' nghìn';
      full = true;
    }
    if (num > 0) {
      str += readBlock(num, full);
    }
    return str;
  }

  function readNumber(num: number) {
    if (num === 0) return numWords[0];
    let str = '';
    let suffix = '';
    do {
      const billion = num % 1000000000;
      num = Math.floor(num / 1000000000);
      if (num > 0) {
        str = readMillion(billion, true) + suffix + str;
      } else {
        str = readMillion(billion, false) + suffix + str;
      }
      suffix = ' tỷ';
    } while (num > 0);
    str = str.trim();
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
  }

  return readNumber(money);
}

/* eslint-disable */
// @ts-nocheck

export const scopeMarks = {
  mdBlock: ['**', '* ', '*', '```', '`'],
  mdInline: {
    genericList: /\*\s.*?\n/gi,
    numberedList: /\d+\.\s.*?\n/gi,
  },
};

class MarkInfo {
  constructor(markChar, frmIndx, toIndx) {
    this.myChar = markChar;
    this.txtIndxs = [frmIndx, toIndx];
    this.openPos = false;
    this.closePos = false;
    this.unknownPos = true;
    this.relateChar = null;
  }

  isClosed() {
    return this.closePos;
  }

  isContain(chars) {
    return chars.indexOf(this.myChar) > -1;
  }

  isOpened() {
    return this.openPos;
  }

  isSame(char) {
    return this.myChar === char;
  }

  isUnknown() {
    return this.unknownPos;
  }

  setClose(befChar) {
    this.closePos = true;
    this.unknownPos = false;
    this.setRelate(befChar);
  }

  setOpen(newChar) {
    this.openPos = true;
    this.unknownPos = false;
    if (newChar) {
      this.setRelate(newChar);
    }
  }

  setRelate(mark) {
    this.relateChar = mark;
  }
}

const isScopMod = ({ char = '', chars = [] }, typeLang) => {
  if (typeLang === 'md') {
    if (char) {
      switch (char) {
        case '`':
        case '*':
        case '**':
          return true;
      }
    } else {
      return chars === scopeMarks.mdBlock;
    }
  }
  return false;
};
const findMark = (tokenSrch, typeLang) => {
  let indx = -1,
    defMarks;
  tokenSrch.chked = true;
  if (typeLang) {
    defMarks = scopeMarks[typeLang];
    while (true) {
      const defMark = tokenSrch.getDefMark(defMarks);
      if (!defMark) {
        tokenSrch.setUnSuccess();
        break;
      }

      const nextChar = tokenSrch.tokenMan.getChar();
      if (!nextChar) {
        tokenSrch.setUnSuccess();
        break;
      }

      tokenSrch.charMark += nextChar;
      indx = defMark.indexOf(tokenSrch.charMark);
      if (indx === 0) {
        tokenSrch.isMaybeValid = true;
        if (tokenSrch.charMark.length === defMark.length) {
          tokenSrch.setSuccess();
          break;
        }
      } else {
        tokenSrch.setUnSuccess();
      }
    }
  }
};

class TokenSrch {
  constructor(tokenMan) {
    this.tokenMan = tokenMan;
    this.charMark = '';
    this.frsCursor = -1;
    this.isMaybeValid = false;
    this.chked = false;
  }

  getDefMark(defMarks) {
    if (!this.isMaybeValid) {
      this.tokenMan.indxSrched++;
    }
    const res = defMarks[this.tokenMan.indxSrched];
    if (!res) {
      this.tokenMan.indxSrched = 0;
    }

    return res;
  }

  getFrmCursor() {
    return this.frsCursor;
  }

  getMark() {
    return this.charMark;
  }

  getToCursor() {
    return this.frsCursor + this.charMark.length;
  }

  setSuccess() {
    this.frsCursor = this.tokenMan.frmCursor;
    this.tokenMan.frmCursor = this.getToCursor();
  }

  setUnSuccess() {
    this.isMaybeValid = false;
    this.tokenMan.addiChars = this.charMark.split('').concat(this.tokenMan.addiChars);
    this.charMark = '';
  }
}

class TokensMan {
  constructor(blockParser) {
    this.blockParser = blockParser;
    this.tokensMark = [];
    this.addiChars = [];
    this.indxSrched = -1;
    this.frmCursor = -1;
  }

  getAddiChars() {
    return this.addiChars;
  }

  getChar() {
    let res = this.addiChars.shift();
    if (!res) {
      res = this.blockParser.getNextChar();
      if (this.frmCursor < 0) {
        this.frmCursor = this.blockParser.getCurCursor();
      }
    }

    return res;
  }

  getTokenSrch() {
    const res = this.tokensMark.shift();

    return res;
  }

  isAddiChar() {
    return this.addiChars.length;
  }

  lookingForMark(typeLang) {
    let tokenSrch = new TokenSrch(this);
    this.tokensMark.push(tokenSrch);
    while (true) {
      if (this.isAddiChar() && tokenSrch.isMaybeValid) {
        tokenSrch = new TokenSrch(this);
        this.tokensMark.push(tokenSrch);
      }
      if (tokenSrch.chked) {
        break;
      }
      findMark(tokenSrch, typeLang);
    }
  }
}

export class BlockParser {
  constructor(text, { mdLang = true }) {
    this.text = text;
    this.typeLang = mdLang ? 'mdBlock' : '';
    this.curCursor = -1;
    this.repoChars = [];
  }

  static isContainMdBlock(text) {
    const md = scopeMarks.mdBlock;
    for (let i = 0; i < md.length; i++) {
      if (text.indexOf(md[i]) > -1) {
        return true;
      }
    }

    return false;
  }

  __isFounded(eMark, calbFounded, txtIndxs, indxEMark, { char = '', chars = [] }) {
    if (char) {
      if (eMark.isSame(char)) {
        calbFounded(eMark.myChar, txtIndxs, indxEMark);

        return true;
      }
    } else if (chars.length) {
      if (eMark.isContain(chars)) {
        calbFounded(eMark.myChar, txtIndxs, indxEMark);

        return true;
      }
    }

    return false;
  }

  determinize(indxMarkInfo = -1, frmIndx = -1) {
    this.readyCursor(indxMarkInfo, frmIndx);
    let tokensMan;
    while (this.isNextChar()) {
      tokensMan = new TokensMan(this);
      /*if(this.text.indexOf('spctst2')>-1){

      }*/
      tokensMan.lookingForMark(this.typeLang);

      let token, charMark;
      while ((token = tokensMan.getTokenSrch())) {
        charMark = token.getMark();
        if (charMark) {
          if (charMark === '* ' || charMark === '```') {
            continue;
          }
          const newChar = new MarkInfo(charMark, token.getFrmCursor(), token.getToCursor());
          const befMark = this.getBefMark({ char: charMark });
          if (befMark && befMark.isOpened()) {
            newChar.setClose(befMark);
            befMark.setRelate(newChar);
          } else {
            newChar.setOpen(befMark);
          }
          this.repoChars.push(newChar);
        }
      }
    }
  }

  find(
    { char = '', chars = [] },
    { posClose = false, posOpen = false, startIndxMark = -1 },
    calbFounded
  ) {
    this.walker(startIndxMark, (eMark, indxEMark) => {
      const txtIndxs = eMark.txtIndxs;
      if (isScopMod({ char: char, chars: chars }, this.typeLang)) {
        if (posOpen) {
          if (eMark.isOpened()) {
            if (
              this.__isFounded(eMark, calbFounded, txtIndxs, indxEMark, {
                char: char,
                chars: chars,
              })
            ) {
              return true;
            }
          }
        } else if (posClose) {
          if (eMark.isClosed()) {
            if (
              this.__isFounded(eMark, calbFounded, txtIndxs, indxEMark, {
                char: char,
                chars: chars,
              })
            ) {
              return true;
            }
          }
        } else {
          throw 'You must define position stat for find char';
        }
      } else {
        if (
          this.__isFounded(eMark, calbFounded, txtIndxs, indxEMark, { char: char, chars: chars })
        ) {
          return true;
        }
      }
    });
  }

  getBefMark({ char = '', isPosClose = false, isPosOpen = false }) {
    if (this.repoChars.length) {
      let i = 0,
        latestChar;
      while ((latestChar = this.repoChars[this.repoChars.length - ++i])) {
        if (latestChar instanceof MarkInfo) {
          if (isPosOpen) {
            if (char && !latestChar.isSame(char)) {
              continue;
            }
            if (latestChar.isOpened()) {
              break;
            } else if (latestChar.isClosed()) {
              return;
            }
          } else if (isPosClose) {
            if (char && !latestChar.isSame(char)) {
              continue;
            }
            if (latestChar.isClosed()) {
              break;
            } else if (latestChar.isOpened()) {
              return;
            }
          } else if (char) {
            if (latestChar.isSame(char)) {
              break;
            }
          } else {
            break;
          }
        }
      }

      return latestChar;
    }
  }

  getCurCursor() {
    return this.curCursor;
  }

  getNextChar() {
    const res = this.text[this.curCursor + 1];
    if (res) {
      this.curCursor++;
    }

    return res;
  }

  isNextChar() {
    return this.text[this.curCursor + 1];
  }

  readyCursor(indx, frmIndx) {
    if (frmIndx > -1) {
      this.repoChars.splice(indx);
      this.curCursor = frmIndx - 1;
    } else {
      this.repoChars = []; //felan code ro ta hadi zadam ke baraye static text hast va faghat parseri hast ke baraye eslahe khorooji be kar mire pas hamishe az aval shoroo mikone
    }
  }

  walker(startIndxMark, calb) {
    let i = startIndxMark + 1;
    while (this.repoChars[i]) {
      if (this.repoChars[i] instanceof MarkInfo) {
        if (calb(this.repoChars[i], i) === true) {
          break;
        }
      }
      i++;
    }
  }
}

export class InlineParser {
  constructor(text) {
    this.text = text;
    this.numberedList = [];
    this.genericList = [];
    this.lines = [];
  }

  static isContains(text) {
    const mds = scopeMarks.mdInline;
    for (const [name, md] of Object.entries(mds)) {
      if (md instanceof RegExp) {
        if (md.test(text)) {
          return true;
        }
      } else if (text.indexOf(md) > -1) {
        return true;
      }
    }

    return false;
  }

  getScop(mdName) {
    const scopIndx = [];
    this.lines.forEach(eNLst => {
      if (mdName === eNLst.mdName) {
        scopIndx.push({
          cont: eNLst[0],
          frmIndx: eNLst.index,
          toIndx: eNLst[0].length + eNLst.index,
        });
      }
    });

    return scopIndx;
  }

  getScops(mdNames) {
    const scopList = {};
    mdNames.forEach(eName => {
      scopList[eName] = this.getScop(eName);
    });

    return scopList;
  }

  parserMd() {
    const contLns = this.readySplit();
    const mds = scopeMarks.mdInline;
    let regx;
    let founded = '';
    let newList = true;
    contLns.forEach((eCont, lineNum) => {
      for (const [name, md] of Object.entries(mds)) {
        founded = '';
        switch (name) {
          case 'numberedList':
            if (/^\d+\.\s/i.test(eCont)) {
              founded = name;
            }
            break;
          case 'genericList':
            if (/^\*\s/i.test(eCont)) {
              founded = name;
            }
            break;
          default:
            if (md instanceof RegExp) {
              regx = md;
            } else {
              regx = new RegExp(md, 'g');
            }
            if (regx.test(eCont)) {
              founded = name;
            }
        }
        if (founded) {
          break;
        }
      }
      if (founded) {
        this.lines.push({ cont: eCont, mdName: founded, newList: newList ? 1 : 0 });

        newList = false;
      } else {
        this.lines.push({ cont: eCont });
        newList = true;
      }
    });
  }

  parserSimple() {
    const contLns = this.readySplit();
    contLns.forEach((eCont, lineNum) => {
      this.lines.push({ cont: eCont });
    });
  }

  readySplit() {
    this.lines = [];
    const spliter = '\n';

    return this.text.split(spliter);
  }
}

export {};

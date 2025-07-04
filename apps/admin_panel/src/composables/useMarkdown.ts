/* eslint-disable */
// @ts-nocheck
import md from 'markdown-it';
import { BlockParser, InlineParser, scopeMarks } from '../composables/useCharParser';

// رابط‌های مورد نیاز
interface ReplyMsg {
  fixedCont?: boolean;
  flag?: string;
  content: string;
}

interface CustomContentOptions {
  [key: string]: any;
}

export default function useMarkdownProcessor() {
  const mdRender = md();

  /**
   * تابع برای پردازش پیام‌های پاسخ
   * @param replyMsg پیام پاسخ
   * @returns محتوای پردازش‌شده
   */
  const befMarked = (replyMsg: ReplyMsg): string => {
    if (replyMsg.fixedCont || replyMsg.flag === 'NOTE') {
      return replyMsg.content;
    }
    replyMsg.content = replyMsg.content.replaceAll('**', '<b>');
    replyMsg.content = replyMsg.content.replaceAll('* ', '<li>');
    replyMsg.content = replyMsg.content.replaceAll(
      '*',
      '<i style="font-weight:normal !important;">'
    );
    replyMsg.content = replyMsg.content.replaceAll('\n', '<br>');
    if (BlockParser.isContainMdBlock(replyMsg.content)) {
      const dblParser = new BlockParser(replyMsg.content, { mdLang: true });
      dblParser.determinize();
      const charFixed = '\n';
      const conf = { startIndxMark: -1 };
      let befIndxMark;
      while (befIndxMark !== conf.startIndxMark) {
        befIndxMark = conf.startIndxMark;
        dblParser.find(
          { chars: scopeMarks.mdBlock },
          { posClose: true, startIndxMark: conf.startIndxMark },
          (char, txtIndxs, indxMarkInf) => {
            conf.startIndxMark = indxMarkInf;
            const cont = replyMsg.content;
            let frsIndx = txtIndxs[0];
            let untilIndx = txtIndxs[1];
            const frstTxt = cont.slice(0, frsIndx - charFixed.length - 1);
            let myTxt = cont.slice(frsIndx - charFixed.length - 1, untilIndx);
            let bugIndx = myTxt.indexOf(charFixed + char);
            if (bugIndx > -1) {
              myTxt = myTxt.replace(charFixed + char, char);
              let endTxt = cont.slice(untilIndx);
              replyMsg.content = frstTxt + myTxt + endTxt;
              dblParser.determinize(indxMarkInf, frsIndx);
            }
          }
        );
      }
    }

    const mdObj = new InlineParser(replyMsg.content);

    if (InlineParser.isContains(replyMsg.content)) {
      mdObj.parserMd();
    } else {
      mdObj.parserSimple();
    }

    let resTxt = '';
    mdObj.lines.forEach((eFound, i) => {
      const nextFound = mdObj.lines[i + 1];
      if (nextFound && eFound.mdName && (!nextFound.mdName || nextFound.newList)) {
        resTxt += eFound.cont + '\n';
        if (nextFound.cont.trim()) {
          resTxt += '\n#FeatLine';
        }
      } else if (!eFound.cont.trim()) {
        resTxt += '\n#EmptyLine\n\n';
      } else {
        resTxt += eFound.cont + '\n';
      }
    });
    replyMsg.content = resTxt;

    replyMsg.fixedCont = true;

    return replyMsg.content;
  };

  /**
   * بررسی و تغییر محتوای سفارشی
   * @param cont محتوای ورودی
   * @returns محتوای پردازش‌شده
   */
  const checkCustomContent = (cont: string): string => {
    // جایگزینی‌های ساده
    const replacements: [string, string][] = [
      ['<p>#FeatLine', '<p class="featLine">'],
      ['<p>#EmptyLine', '<p class="emptyLine">'],
      ['<a', '<a target="_blank" '],
      ['<em', '<em style="font-style: inherit" '],
      ['\\&amp;quot;', ''],
      ['&amp;quot;سلام&amp;quot;', ''],
      ['. از قسمت', '1.'], // تبدیل کد یونیکد به متن
      ['\\\\&amp;amp;quot;', ''],
      [
        'zarinpal.com/landing/payout',
        `<a class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600" target="_blank" href="https://www.zarinpal.com/landing/payout/">https://www.zarinpal.com/landing/payout/</a> `,
      ],
      [
        'https://www.zarinpal.com/lab',
        `<a class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600" target="_blank" href="https://www.zarinpal.com/lab">https://www.zarinpal.com/lab</a> `,
      ],
      [
        '<a class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600" target="_blank" href="https://www.zarinpal.com/lab">https://www.zarinpal.com/lab</a> /?p=29',
        `<a class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600" target="_blank" href="https://www.zarinpal.com/lab/?p=29">https://www.zarinpal.com/lab/?p=29</a> `,
      ],
      [
        'next.zarinpal.com/paymentGateway/guide/#',
        `<a class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600" target="_blank" href="https://next.zarinpal.com/paymentGateway/guide/">https://next.zarinpal.com/paymentGateway/guide/</a> `,
      ],
    ];

    replacements.forEach(([search, replace]) => {
      cont = cont?.replaceAll(search, replace);
    });
    // پردازش embed لینک‌ها
    function reformatLinks(input) {
      const regex = /\[(.*?)\]\((.*?)\)/g;
      const output = input.replace(
        regex,
        '<a href="$2" target="_blank" class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600">$1</a>'
      );

      return output;
    }
    if (cont.indexOf('(') > -1) {
      const divContainer = document.createElement('div');
      divContainer.innerHTML = reformatLinks(cont);
      const embedLinks = divContainer.querySelectorAll('.embed-link');

      embedLinks.forEach(embedElement => {
        let jsonText = embedElement.textContent || '';

        // پاکسازی رشته JSON
        jsonText = jsonText
          .replaceAll('quot;', '"')
          .replaceAll('&amp;', '')
          .replaceAll('amp;', '')
          .replaceAll('\\&', '')
          .replaceAll('\\', '')
          .replaceAll('&', '');

        try {
          const jsonData = JSON.parse(jsonText);
          if (jsonData?.site === 'aparat') {
            embedElement.innerHTML = `
              <style>
                .h_iframe-aparat_embed_frame .ratio { display: block; width: 100%; height: auto; }
                .h_iframe-aparat_embed_frame iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
              </style>
              <div class="h_iframe-aparat_embed_frame">
                <span style="display: block; padding-top: 57%"></span>
                <iframe class="py-sm" src="https://www.aparat.com/video/video/embed/videohash/${jsonData.link}/vt/frame" allowFullScreen webkitallowfullscreen mozallowfullscreen></iframe>
              </div>
            `;
          }
        } catch (error) {
          console.error('Error parsing JSON for embed:', error);
        }
      });

      cont = divContainer.innerHTML;
    }

    return cont;
  };

  /**
   * بررسی وجود بلوک‌های Markdown در متن
   * @param text متن ورودی
   * @returns وجود یا عدم وجود بلوک‌های Markdown
   */
  const isContainMdBlock = (text: string): boolean => {
    return scopeMarks.mdBlock.some(mark => text?.includes(mark));
  };

  return { checkCustomContent, mdRender, befMarked };
}

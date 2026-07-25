import {
  Document,
  Paragraph,
  Packer
} from "docx";

import { saveAs } from "file-saver";

export default function saveDocx(dom) {
  const paras = [];

  for (const child of dom.children) {
    for (const subchild of child.children) {
      console.log(subchild);
      if (subchild.tagName == 'P') {
        paras.push(new Paragraph({
          text: subchild.innerText
        }));
      }
    }
  }
  const doc = new Document({
    sections: [
      {
        children: paras,
      }
    ]
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "Order.docx");
  });
}

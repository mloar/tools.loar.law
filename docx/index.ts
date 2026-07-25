import {
  Document,
  Paragraph,
  Packer,
  Table,
  TableBorders,
  TableCell,
  TableRow,
  TextRun,
} from "docx";

import { saveAs } from "file-saver";

import * as React from 'react';

const FUDGE_FACTOR = 1.2;
const TWIPS_PER_PIXEL = 15;

function roundUpTwip(val) {
  return val + (val % 72);
}

function makeTextRun(text, style) {
  return new TextRun({
    text,
    allCaps: style.textTransform == 'uppercase',
    bold: style.fontWeight > 400,
    underline: style.textDecoration == 'underline' ? { type: 'single' } : { type: 'none' },
    font: style.fontFamily.replaceAll('"', ''),
    size: Number.parseInt(style.fontSize) * 1.5,
  });
}

function descendChild(children, child) {
  if (child.tagName == 'P') {
    const runs = [];
    const style = window.getComputedStyle(child);
    for (const run of child.childNodes) {
      if (run instanceof Text) {
        runs.push(makeTextRun(run.data, style));
      } else if (run.tagName == 'SPAN') {
        const style = window.getComputedStyle(run);
        runs.push(makeTextRun(run.innerText, style));
      }
    }
    children.push(new Paragraph({
      children: runs,
      alignment: style.textAlign,
      spacing: {
        before: Number.parseInt(style.marginTop) * TWIPS_PER_PIXEL,
        after: Number.parseInt(style.marginBottom) * TWIPS_PER_PIXEL,
      },
    }));
  } else {
    if (child.tagName == 'DIV' && child.className.indexOf('grid') > -1) {
      const row = [];
      for (const subchild of child.children) {
        const cell = [];
        const style = window.getComputedStyle(subchild);
        descendChild(cell, subchild);
        row.push(new TableCell({
          children: cell,
          width: { size: Number.parseFloat(style.width) * TWIPS_PER_PIXEL, type: "dxa" },
          margins: { type: "dxa",
            left: Number.parseFloat(style.marginLeft) * TWIPS_PER_PIXEL,
            right: Number.parseFloat(style.marginRight) * TWIPS_PER_PIXEL,
            top: Number.parseFloat(style.marginTop) * TWIPS_PER_PIXEL,
            bottom: Number.parseFloat(style.marginBottom) * TWIPS_PER_PIXEL,
          },
          verticalAlign: child.className.indexOf('items-center') > -1 ? "center" : "top",
        }));
      }
      const style = window.getComputedStyle(child);
      children.push(new Table({
        rows: [
          new TableRow({
            children: row,
            height: { value: Number.parseFloat(style.height) * TWIPS_PER_PIXEL * FUDGE_FACTOR, rule: "exact" },
          })],
        borders: TableBorders.NONE,
        layout: "fixed",
        ...(child.className.indexOf("break-inside-avoid-page") > -1 ? {float: {
          verticalAnchor: "margin",
          relativeVerticalPosition: "outside",
        }} : {}),
      }));
    } else {
      for (const subchild of child.children) {
        descendChild(children, subchild);
      }
    }
  }
}

export default function saveDocx(dom) {
  const children = [];

  for (const child of dom.children) {
    for (const subchild of child.children) {
      descendChild(children, subchild);
    }
  }
  const doc = new Document({
    sections: [
      {
        children,
      }
    ]
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "Order.docx");
  });
}

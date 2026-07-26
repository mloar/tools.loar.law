'use client';

import { useEffect, useState } from 'react';
import saveDocx from './docx';
import codes from "./codes.json";
import judges from "./judges.json";
import departments from "./departments.json";

function GetDepartmentAndDivision(caseNumber : string) {
  if (caseNumber[4] === 'L')
    return ['County', 'Law'];

  if (caseNumber[4] === 'C' && caseNumber[5] === 'H')
    return ['County', 'Chancery'];

  if (caseNumber[4] === 'P' || caseNumber[4] === 'W')
    return ['County', 'Probate'];

  if (caseNumber[4] === '1')
    return ['Municipal', 'First'];

  if (caseNumber[4] === '2')
    return ['Municipal', 'Second'];

  if (caseNumber[4] === '3')
    return ['Municipal', 'Third'];

  if (caseNumber[4] === '4')
    return ['Municipal', 'Fourth'];

  if (caseNumber[4] === '5')
    return ['Municipal', 'Fifth'];

  if (caseNumber[4] === '6')
    return ['Municipal', 'Sixth'];

  return ['', ''];
}

function initializeElement(elem : HTMLElement | null, key : string, defaultValue : string) {
  if (elem) {
    elem.innerText = localStorage.getItem(key) ?? defaultValue;
    elem.addEventListener('input', e => {
      if (e.target != null) localStorage.setItem(key, (e.target as HTMLElement).innerText);
      e.preventDefault();
    });
  }
}

export default function Home() {
  const [caseNumber, setCaseNumber] = useState('');
  const [calendar, setCalendar] = useState('');

  const [department, division_or_district] = GetDepartmentAndDivision(caseNumber);

  useEffect(() => {
    initializeElement(document.getElementById('party-1'), 'Party1', 'PLAINTIFF');
    initializeElement(document.getElementById('party-type-1'), 'PartyType1', 'Plaintiff.');
    initializeElement(document.getElementById('party-2'), 'Party2', 'DEFENDANT');
    initializeElement(document.getElementById('party-type-2'), 'PartyType2', 'Defendant.');
    initializeElement(document.getElementById('hearing-type'), 'HearingType', 'for status');

    const judge = document.getElementById('judge');
    if (judge) {
      judge.innerText = ((e) => `${e.first_name}${e.middle_name ? ' ' + e.middle_name : ''} ${e.last_name}`)(
        judges.find(e => e.calendar == calendar) ?? {first_name: "Jerry", middle_name: "D.", last_name: "Judge"}
      );
    }

    const block = document.getElementById('drafter-block');
    if (block) {
      const defaultBlock = [
        "Attorney Name (ARDC No. XXXXXXX)",
        "Firm Name (Cook County Atty No. XXXXX)",
        "321 N Clark Street",
        "Chicago, IL 60654",
        "(312) 988-5000",
        "service@americanbar.org",
      ];
      for (let i = 0; i < block.children.length; i++) {
        initializeElement(block.children[i] as HTMLElement, `DrafterBlock${i}`, defaultBlock[i]);
      }
    }
  }, [calendar]);

  return (
    <>
      <main className="w-[8.5in] h-[11in] bg-white text-black border p-[1in] flex flex-col items-center">
        <div className="w-[6.5in]">
          <p className="text-center font-bold uppercase">In the Circuit Court of Cook County, Illinois</p>
          <p className="text-center font-bold uppercase mb-5">{department} Department, {division_or_district} {department === 'County' && 'Division'}{department === 'Municipal' && 'District'}</p>
          <div className="grid grid-cols-[1fr_min-content_1fr] leading-none">
            <div>
              <p className="bg-blue-50" id="party-1" contentEditable="plaintext-only"></p>
              <p className="text-end bg-blue-50 mr-10" id="party-type-1" contentEditable="plaintext-only"></p>
              <p className="text-center">v.</p>
              <p className="bg-blue-50" id="party-2" contentEditable="plaintext-only"></p>
              <p className="text-end bg-blue-50 mr-10" id="party-type-2" contentEditable="plaintext-only"></p>
            </div>
            <div className="h-0 min-h-full mr-2 overflow-hidden">
              <p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p>
            </div>
            <div className="grid">
              <div>&nbsp;</div>
              <div>
                <p>
                  Case No.&nbsp;
                  <input className="bg-blue-50" value={caseNumber} onChange={e => setCaseNumber(e.target.value)}/>
                </p>
                {department === 'County' &&
                <p>
                  Calendar: &nbsp;
                  <input className="bg-blue-50" id="calendar" value={calendar} onChange={e => setCalendar(e.target.value)}/>
                </p>
                }
              </div>
            <div></div>
            </div>
          </div>
          <p className="text-center uppercase font-bold underline my-5">Order</p>
          <p className="my-5">This matter coming before the Court <span className="bg-blue-50" id="hearing-type" contentEditable="plaintext-only"></span>, the Court being fully advised in the premises, it is hereby ordered that:</p>
        </div>
        <div className="w-[6.5in] grow">
          <div className="grid grid-cols-[1fr_6fr] leading-[2]" id="order-list"></div>
        </div>
        <div>
          <p className="w-[6.5in]"></p>
          <div className="grid grid-cols-2 break-inside-avoid-page">
            <div id="drafter-block">
              <p className="bg-blue-50" contentEditable="plaintext-only"></p>
              <p className="bg-blue-50" contentEditable="plaintext-only"></p>
              <p className="bg-blue-50" contentEditable="plaintext-only"></p>
              <p className="bg-blue-50" contentEditable="plaintext-only"></p>
              <p className="bg-blue-50" contentEditable="plaintext-only"></p>
              <p className="bg-blue-50" contentEditable="plaintext-only"></p>
            </div>
            <div className="grid grid-rows-[1fr_min-content]">
              <div>
                <p>ENTERED:</p>
              </div>
              <div>
                <p>_____________________________________</p>
                <p>Judge <span className="bg-blue-50" id="judge" contentEditable="plaintext-only">
                </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="control text-center text-black bg-blue-100 my-5">
        <label htmlFor="order-selector">Add an order:</label>
        <select className="bg-gray-100" id="order-selector">
          {...codes.map(c => <option value={c.code}>{c.description}</option>)}
        </select>
        <button className="bg-gray-100 outline-1 px-3 py-1 ml-2" onClick={e => {
          const orderSelector = document.getElementById('order-selector');
          const orderList = document.getElementById('order-list');
          if (orderSelector && orderList) {
            const order = codes.find(
            e => e.code.toString() === (orderSelector as HTMLSelectElement).selectedOptions[0].value
            ) ?? { code: 9999, text: "Undefined order" };
            const bullet = document.createElement('p');
            bullet.innerText = `(${order.code})`;
            orderList.appendChild(bullet);
            const li = document.createElement('p');
            li.contentEditable = "plaintext-only";
            li.className = "bg-blue-50";
            li.innerText = order.text;
            orderList.appendChild(li);
          }
          }}>+</button>
        <br/>
        <button className="bg-gray-100 outline-1 px-3 py-1" onClick={e => window.print()}>Print (or save PDF)</button>
        <button className="bg-gray-100 outline-1 px-3 py-1 ml-2" onClick={e => saveDocx(document.querySelector('main') ?? document.createElement('DIV'))}>Save docx</button>
      </div>
    </>
  );
}

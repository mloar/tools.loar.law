'use client';

import { useState } from 'react';
import saveDocx from '../docx';
import codes from "../codes.json";
import judges from "../judges.json";
import departments from "../departments.json";

function GetDepartmentAndDivision(caseNumber) {
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

export default function Home() {
  const [caseNumber, setCaseNumber] = useState('');
  const [calendar, setCalendar] = useState('');

  const plaintiff = "Plaintiff", defendant = "Defendant";
  const hearingType = "";
  const [department, division_or_district] = GetDepartmentAndDivision(caseNumber);

  return (
    <>
      <main className="w-[8.5in] h-[11in] bg-white text-black border p-[1in] flex flex-col items-center">
        <div className="w-[6.5in]">
          <p className="text-center font-bold uppercase">In the Circuit Court of Cook County, Illinois</p>
          <p className="text-center font-bold uppercase mb-5">{department} Department, {division_or_district} {department === 'County' && 'Division'}{department === 'Municipal' && 'District'}</p>
          <div className="grid grid-cols-[1fr_min-content_1fr] leading-none">
            <div>
              <p className="bg-blue-50" contentEditable="true">PLAINTIFF</p>
              <p className="text-end bg-blue-50 mr-10" contentEditable="plaintext-only">Plaintiff,</p>
              <p className="text-center">v.</p>
              <p className="bg-blue-50" contentEditable="true">DEFENDANT</p>
              <p className="text-end bg-blue-50 mr-10" contentEditable="plaintext-only">Defendant.</p>
            </div>
            <div className="h-0 min-h-full mr-2 overflow-hidden">
              <p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p><p>)</p>
            </div>
            <div className="grid items-center">
              <div>
                <p>
                  Case No.&nbsp;
                  <input className="bg-blue-50" value={caseNumber} onChange={e => setCaseNumber(e.target.value)}/>
                </p>
                {department === 'County' &&
                <p>
                  Calendar: &nbsp;
                  <input className="bg-blue-50" value={calendar} onChange={e => setCalendar(e.target.value)}/>
                </p>
                }
              </div>
            </div>
          </div>
          <p className="text-center uppercase font-bold underline my-5">Order</p>
          <p>This matter coming before the Court <span className="bg-blue-50" contentEditable="plaintext-only">for status</span>, the Court being fully advised in the premises, it is hereby ordered that:</p>
        </div>
        <div className="w-[6.5in] grow my-5">
          <ol className="ml-10 leading-[2] list-decimal" id="order-list"></ol>
        </div>
        <div>
          <p className="w-[6.5in]"></p>
          <div className="grid grid-cols-2 break-inside-avoid-page">
            <div>
              <p className="bg-blue-50" contentEditable="plaintext-only">Attorney Name (ARDC No. XXXXXXX)</p>
              <p className="bg-blue-50" contentEditable="plaintext-only">Firm Name (Cook County Atty No. XXXXX)</p>
              <p className="bg-blue-50" contentEditable="plaintext-only">321 N Clark Street</p>
              <p className="bg-blue-50" contentEditable="plaintext-only">Chicago, IL 60654</p>
              <p className="bg-blue-50" contentEditable="plaintext-only">(312) 988-5000</p>
              <p className="bg-blue-50" contentEditable="plaintext-only">service@americanbar.org</p>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p>ENTERED:</p>
              </div>
              <div>
                <p>_____________________________________</p>
                <p>Judge <span className="bg-blue-50" contentEditable="plaintext-only">
                  {
                    ((e) => `${e.first_name}${e.middle_name ? ' ' + e.middle_name : ''} ${e.last_name}`)(
                    judges.find(e => e.calendar == calendar)
                  )
                  }
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
          const li = document.createElement('li');
          li.contentEditable = "plaintext-only";
          li.className = "bg-blue-50";
          li.innerText = codes.filter(e => e.code == document.getElementById('order-selector').selectedOptions[0].value)[0].text;
          document.getElementById('order-list').appendChild(li);
          }}>+</button>
        <br/>
        <button className="bg-gray-100 outline-1 px-3 py-1" onClick={e => window.print()}>Print (or save PDF)</button>
        <button className="bg-gray-100 outline-1 px-3 py-1 ml-2" onClick={e => saveDocx(document.querySelector('main'))}>Save docx</button>
      </div>
    </>
  );
}

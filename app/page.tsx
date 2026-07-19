'use client';

import { useState } from 'react';
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
    <div className="flex flex-col flex-1 items-center justify-center font-serif leading-[1.16]">
      <main className="flex flex-col justify-between w-full max-w-3xl py-16 px-16 bg-white text-black border">
        <p className="text-center font-bold uppercase">In the Circuit Court of Cook County, Illinois</p>
        <p className="text-center font-bold uppercase">{department} Department, {division_or_district} {department === 'County' && 'Division'}{department === 'Municipal' && 'District'}</p>
        <div className="flex my-5">
          <div className="flex-1 relative mr-2 border-r border-dashed">
            <p className="bg-blue-50" contentEditable="true">PLAINTIFF</p>
            <p className="text-end bg-blue-50 mr-10" contentEditable="plaintext-only">Plaintiff,</p>
            <p className="text-center">v.</p>
            <p className="bg-blue-50" contentEditable="true">DEFENDANT</p>
            <p className="text-end bg-blue-50 mr-10" contentEditable="plaintext-only">Defendant.</p>
          </div>
          <div className="flex flex-1 items-center">
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
        <div>
          <p className="text-center uppercase font-bold underline my-5">Order</p>
          <p>This matter coming before the Court <span className="bg-blue-50" contentEditable="plaintext-only">for status</span>, the Court being fully advised in the premises, it is hereby ordered that:</p>
        </div>
        <div className="flex flex-col my-5">
          <ol className="ml-10 list-decimal" id="order-list"></ol>
          <div>
            <select id="order-selector">
              {...codes.map(c => <option value={c.code}>{c.description}</option>)}
            </select>
            <button onClick={e => {
              const li = document.createElement('li');
              li.contentEditable = "plaintext-only";
              li.className = "bg-blue-50";
              li.innerText = codes.filter(e => e.code == document.getElementById('order-selector').selectedOptions[0].value)[0].text;
              document.getElementById('order-list').appendChild(li);
            }}>+</button>
          </div>
        </div>
        <div className="flex my-5">
          <div className="flex-1 mr-2">
            <p className="bg-blue-50" contentEditable="plaintext-only">Attorney Name (ARDC No. XXXXXXX)</p>
            <p className="bg-blue-50" contentEditable="plaintext-only">Firm Name (Cook County Atty No. XXXXX)</p>
            <p className="bg-blue-50" contentEditable="plaintext-only">321 N Clark Street</p>
            <p className="bg-blue-50" contentEditable="plaintext-only">Chicago, IL 60654</p>
            <p className="bg-blue-50" contentEditable="plaintext-only">(312) 988-5000</p>
            <p className="bg-blue-50" contentEditable="plaintext-only">service@americanbar.org</p>
          </div>
          <div className="flex flex-col flex-1 justify-between">
            <div>
              <p>ENTERED:</p>
            </div>
            <div>
              <p>_______________________________________</p>
              <p>Judge 
                <select>
                  {...judges.filter(e => e.division === division_or_district).map(e => <option>{e.first_name + " " + e.last_name}</option>)}
                </select>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

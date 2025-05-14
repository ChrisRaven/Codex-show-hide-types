// ==UserScript==
// @name         Hide annotated types
// @namespace    KrzysztofKruk-BANC
// @version      2025-04-17
// @description  Hides the types, that I've already annotated
// @author       KrzysztofKruk
// @match        https://codex.flywire.ai/app/optic_lobe_catalog*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=flywire.ai
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const completedTypes = [
    'aMe4', 'aMe17a1',
    'C2', 'C3', 'cL01', 'cLM01', 'cLP01', 'cLP02', 'cLP03', 'cLP04', 'cLPL01',
    'cM01a', 'cM01b', 'cM01c', 'cM01d', 'cM02a', 'cM02b', 'cM03', 'cM04', 'cM05', 'cM06', 'cM07', 'cM08a', 'cM08b', 'cM08c', 'cM09', 'cM12', 'cM13', 'cM14', 'cM15', 'cM16', 'cM17', 'cM18',
    'Dm2', 'Dm3p', 'Dm3q', 'Dm3v', 'Dm10', 'Dm15',
    'LC12', 'LC17', 'LLPt', 'LMa1', 'LMa5', 'LPC1', 'LPC2', 'LPLC1', 'LPLC2', 'LPLC4', 'LPi09', 'Li06', 'Li14', 'Li33',
    'MLt1', 'Mi1', 'Mi4', 'Mi9', 'Mi13',
    'PDt', 'Pm05', 'Pm12', 'Pm14',
    'Sm32', 'Sm33', 'Sm39',
    'T2', 'T2a', 'T3', 'T4a', 'T4b', 'T4c', 'T4d', 'T5a', 'T5b', 'T5c', 'T5d',
    'Tm1', 'Tm2', 'Tm3', 'Tm4', 'Tm9', 'Tm20',
    'TmY3', 'TmY4', 'TmY14', 'TmY10', 'TmY20',
    'Y1', 'Y3', 'Y4', 'Y11', 'Y12'
  ]

  function hide() {
    document.querySelectorAll('.card.card-body').forEach(el => {
      const typeName = el.parentElement.id.replace('collapse', '')
      if (completedTypes.includes(typeName)) {
        el.closest('.type_div').style.display = 'none'
      }
    })
  }

  function show() {
    document.querySelectorAll('.card.card-body').forEach(el => {
      const typeName = el.parentElement.id.replace('collapse', '')
      if (completedTypes.includes(typeName)) {
        el.closest('.type_div').style.display = 'block'
      }
    })
  }

  const button = document.createElement('button')
  button.textContent = 'Show'
  button.style.cssText = `
    position: fixed;
    right: 10px;
    top: 0px;
    color: white;
    background-color: orange;
    border: 1px solid #ff8c00;
    outline: none;
  `
  document.body.appendChild(button)

  let state = localStorage.getItem('show-hide-button-state') === 'true' || false
  changeState()

  function changeState() {
    if (state) {
      button.textContent = 'Show'
      hide()
    }
    else {
      button.textContent = 'Hide'
      show()
    }
  }

  button.addEventListener('click', e => {
    state = !state
    changeState()
    localStorage.setItem('show-hide-button-state', state)
  })
})();

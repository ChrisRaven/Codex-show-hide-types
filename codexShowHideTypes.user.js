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
    'Am1', 'aMe4', 'aMe17a1',
    'C2', 'C3', 'cL01', 'cLM01', 'cLP01', 'cLP02', 'cLP03', 'cLP04', 'cLPL01',
    'cM01a', 'cM01b', 'cM01c', 'cM01d', 'cM02a', 'cM02b', 'cM03', 'cM04', 'cM05', 'cM06', 'cM07', 'cM08a', 'cM08b', 'cM08c', 'cM09', 'cM12', 'cM13', 'cM14', 'cM15', 'cM16', 'cM17', 'cM18',
    'CT1',
    'Dm1', 'Dm2', 'Dm3p', 'Dm3q', 'Dm3v', 'Dm4', 'Dm10', 'Dm12', 'Dm13', 'Dm14', 'Dm15', 'Dm16', 'Dm17', 'Dm18', 'Dm20',
    'LC12', 'LC17', 'LLPt', 'LMa1', 'LMa5', 'LPC1', 'LPC2', 'LPLC1', 'LPLC2', 'LPLC4',
    'Li06', 'Li14', 'Li18', 'Li19', 'Li21', 'Li22', 'Li23', 'Li25', 'Li26', 'Li27', 'Li28', 'Li29', 'Li30', 'Li31', 'Li32', 'Li33',
    'LPi01', 'LPi02', 'LPi09', 'LPi12', 'LPi13', 'LPi14', 'LPi15',
    'MLt1', 'Mi1', 'Mi4', 'Mi9', 'Mi10', 'Mi13',
    'PDt', 'Pm01', 'Pm02', 'Pm05', 'Pm06', 'Pm07', 'Pm10', 'Pm11', 'Pm12', 'Pm13', 'Pm14',
    'Sm32', 'Sm33', 'Sm39', 'Sm40', 'Sm41',
    'T2', 'T2a', 'T3', 'T4a', 'T4b', 'T4c', 'T4d', 'T5a', 'T5b', 'T5c', 'T5d',
    'Tm1', 'Tm2', 'Tm3', 'Tm4', 'Tm9', 'Tm16', 'Tm20', 'Tm21',
    'TmY3', 'TmY4', 'TmY5a', 'TmY14', 'TmY10', 'TmY20',
    'Y1', 'Y3', 'Y4', 'Y11', 'Y12'
  ]

  function hide() {
    Array.from(document.getElementsByTagName('h2')).forEach(el => {
      const typeName = el.firstChild.textContent.trim()
      console.log(typeName)
      if (completedTypes.includes(typeName)) {
        el.closest('.type_div').style.display = 'none'
      }
    })
    /*document.querySelectorAll('.card.card-body').forEach(el => {
      const typeName = el.parentElement.id.replace('collapse', '')
      if (completedTypes.includes(typeName)) {
        el.closest('.type_div').style.display = 'none'
      }
    })*/
  }

  function show() {
    Array.from(document.getElementsByTagName('h2')).forEach(el => {
      const typeName = el.firstChild.textContent.trim()
      if (completedTypes.includes(typeName)) {
        el.closest('.type_div').style.display = 'block'
      }
    })
    /*document.querySelectorAll('.card.card-body').forEach(el => {
      const typeName = el.parentElement.id.replace('collapse', '')
      if (completedTypes.includes(typeName)) {
        el.closest('.type_div').style.display = 'block'
      }
    })*/
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

  const sections = document.querySelectorAll('.card-body>div')

  sections.forEach(section => {
    section.style.position = 'relative'

    const switchButton = document.createElement('button')
    switchButton.style.cssText = `
      position: absolute;
      right: 10px;
      top: 0px;
      color: white;
      background-color: orange;
      border: 1px solid #ff8c00;
      outline: none;
    `
    switchButton.textContent = 'Switch'
    switchButton.dataset.state = 'visible'
    section.appendChild(switchButton)
    switchButton.addEventListener('click', () => {
      if (switchButton.dataset.state === 'visible') {
        section.style.height = '25px'
        section.style.overflow = 'hidden'
        section.style.marginBottom = '0'
        switchButton.dataset.state = 'hidden'
      }
      else {
        section.style.height = 'revert'
        section.style.overflow = 'revert'
        section.style.marginBottom = 'revert'
        switchButton.dataset.state = 'visible'
      }
    })
  })


})();

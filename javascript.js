// Data Structures
class Character {
    constructor(
        title = 'Unknown',
        AC = '0',
        hitPoints = '0'
    ) {
        this.title = title
        this.AC = AC
        this.hitPoints = hitPoints
    }
}

class Initiative {
    constructor() {
        this.characters = []
    }
    
    addCharacter(newCharacter) {
        this.characters.push(newCharacter)
    }
    removeCharacter(title) {
        this.characters = this.characters.filter((character) => character.title !== title)
    }
    getCharacter(title)  {
        return this.characters.find((character) => character.title === title)
    }
}

const initiative = new Initiative()



// User Interface

const addCharBtn = document.getElementById('addCharBtn')
const addCharModal = document.getElementById('addCharModal')
const addCharForm = document.getElementById('addCharForm')
const initiativeGrid = document.getElementById('initiativeGrid')
const overlay = document.getElementById('overlay')

const openAddCharModal = () => {
    addCharForm.reset()
    addCharModal.classList.add('active')
    overlay.classList.add('active')
}

const closeAddCharModal = () => {
    addCharModal.classList.remove('active')
    overlay.classList.remove('active')
}

const closeAllModals = () => {
    closeAddCharModal()
}

const handleKeyboardInput = (e) => {
    if (e.key === 'Escape') 
    closeAllModals()
}

const updateInitiativeGrid = () => {
    resetInitiativeGrid()
    for (let character of initiative.characters) {
        createCharacterCard(character)
    }
}

const resetInitiativeGrid = () => {
    initiativeGrid.innerHTML = ''
}

const createCharacterCard = (character) => {
    const characterCard = document.createElement('div')
    const title = document.createElement('p')
    const AC = document.createElement('p')
    const hitPoints = document.createElement('p')
    const buttonGroup = document.createElement('div')
    const removeBtn = document.createElement('button')

    characterCard.classList.add('character-card')
    buttonGroup.classList.add('button-group')
    removeBtn.classList.add('btn')
    removeBtn.onclick = removeCharacter

    title.textContent = `${character.title}`
    AC.textContent = `${character.AC} AC`
    hitPoints.textContent = `${character.hitPoints} Hitpoints`
    removeBtn.textContent = 'Remove'

    characterCard.appendChild(title)
    characterCard.appendChild(AC)
    characterCard.appendChild(hitPoints)
    buttonGroup.appendChild(removeBtn)
    characterCard.appendChild(buttonGroup)
    initiativeGrid.appendChild(characterCard)
}

const getCharacterFromInput = () => {
    const title = document.getElementById('title').value
    const AC = document.getElementById('AC').value
    const hitPoints = document.getElementById('hitPoints').value
    return new Character(title, AC, hitPoints)
}


const addCharacter = (e) => {
    e.preventDefault()
    const newCharacter = getCharacterFromInput()

    initiative.addCharacter(newCharacter)
    saveLocal()
    updateInitiativeGrid()
    

    closeAddCharModal()
}

const removeCharacter = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        ''
    )
    initiative.removeCharacter(title)
    saveLocal()
    updateInitiativeGrid()
}


addCharBtn.onclick = openAddCharModal
overlay.onclick = closeAddCharModal
addCharForm.onsubmit = addCharacter
window.onkeydown = handleKeyboardInput





//Local Storage

const saveLocal = () => {
    localStorage.setItem('initiative', JSON.stringify(initiative.characters))
  }
  
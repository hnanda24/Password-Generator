const myHeading = document.querySelector('.heading');
const myPasswordDisplay = document.querySelector("[data-passwordDisplay]");
const copyPassword = document.querySelector("[data-copyMsg]");
const inputSlider = document.querySelector(".slider");
const dataLength = document.querySelector(".lenNo");
const dataStrength = document.querySelector(".strengthIndicator"); 
const generatedPassword = document.querySelector(".generatePasword");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");
const sym = '~`!@#$%^&*(){}[]|:;"<>?/+_-=';
const copyBtnText = document.querySelector('.copyBtn')

let password = "";
let passLength = 10;
let checkCount = 0;

handleslider(passLength);
//strength circle color default grey
// let a = generateRandomNumber();
// console.log(a);
//set pass length
strengthIndicator("#ccc");

function handleslider(val)
{
    inputSlider.value = val;
    dataLength.innerHTML = val;
    

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passLength  -min) * 100/(max/min)) + '% 100%';

    passLength = val;
}

function strengthIndicator(color)
{ 
    dataStrength.style.backgroundColor = color;
    //shadow
} 

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {
       return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol() {
    const randNum = getRndInteger(0, sym.length);
    return sym.charAt(randNum);
}

function strengthChecker()
{
    let hasLower = false;
    let hasUpper = false;
    let hasSymbol= false;
    let hasNumber = false;

    if(uppercaseCheck.ariaChecked) hasUpper = true;
    if(lowercaseCheck.ariaChecked) hasLower  = true;
    if(numbersCheck.ariaChecked) hasNumber = true;
    if(symbolsCheck.ariaChecked) hasSymbol = true;

    if(hasLower == true && hasNumber == true && hasUpper == true && hasSymbol == true && passLength >= 8)
    {
        strengthIndicator("#0f0");
    }

    else if((hasLower || hasUpper) && (hasNumber || hasSymbol))
    {
        strengthIndicator("#ff0");
    }

    else
        strengthIndicator("#f00");
}

async function copyContent()
{
    try
    {
        await navigator.clipboard.writeText(myPasswordDisplay.value);
        copyPassword.innerText = 'Copied'
    }
    catch(e)
    {
        copyPassword.innerText = 'Failed';
    }

    copyPassword.classList.add("active");

    setTimeout(() => {
        copyPassword.classList.remove("active");
    },2000);
} 

function shufflePassword(array)
{
    console.log(array);
    //Fisher Yates Method(for shuffling)
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange()
{
    checkCount = 0;
    allCheckbox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;
    })

    //special condition
    if(passLength < checkCount)
    {
        passLength = checkCount;
        handleslider(passLength);
    }
}

allCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change' , handleCheckBoxChange)
})

inputSlider.addEventListener('change' , (e) => {
    passLength = e.target.value;
    inputSlider.value = passLength;
    dataLength.innerHTML = passLength;
})

copyBtnText.addEventListener('click', () => 
{
    if(myPasswordDisplay.value)
    {
        copyContent();
    }
})

generatedPassword.addEventListener('click' , () => 
{
    console.log(passLength);

    if(checkCount == 0)
        alert('Select a checkbox');
    //special case
    if(passLength <= checkCount)
    {
        passLength = checkCount;
        handleslider(passLength);
    }

    // ab naya pass bnayenge

    //remove old pass
    password = "";

    //lets put the stuff into it
    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase());

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase());

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber());

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol());

        let len = funcArr.length;
        
    //compulsary addition

    for(let i=0; i<len;++i)
    {
        password += funcArr[i];
    }
   
    //remaining addition 
    for(let i=0; i<passLength-len;i++)
    {
        let randomIndex = getRndInteger(0,funcArr.length);
        password += funcArr[randomIndex];
    }

    //shuffle password
    
    password = shufflePassword(Array.from(password));

    myPasswordDisplay.value = password;
    
    strengthChecker();
})
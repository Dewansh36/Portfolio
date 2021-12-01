const backToTop=document.getElementById('back-to-top');

window.onscroll=function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop>20||document.documentElement.scrollTop>20) {
        backToTop.style.display='block';
    }
    else {
        backToTop.style.display='none';
    }
}
// When the user clicks on the button, scroll to the top of the document
backToTop.addEventListener('click', () => {
    document.body.scrollTop=0;
    document.documentElement.scrollTop=0;
});

function timeout(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

async function typeSentence(sentence, delay=100) {
    for (let i=0; i<sentence.length; i++) {
        document.getElementById("sentence").innerHTML+=sentence.charAt(i);
        await timeout(delay);
    }
    return new Promise(resolve => setTimeout(resolve, 1000));
}

async function deleteSentence(delay) {
    const element=document.getElementById("sentence");
    const letters=element.innerText.split("");
    console.log(letters);
    while (letters.length>0) {
        await timeout(delay);
        letters.pop();
        element.innerText=letters.join("");
    }
    return new Promise(resolve => setTimeout(resolve, 1000));
}

const bio=[
    {
        text: "an IT K20 Undergrad", color: "#caf0f8"
    },
    {
        text: "an Avid Compitive Programmer", color: "#e0c3fc"
    },
    {
        text: "an aspiring Full-Stack Web Developer", color: "#e0c3fc"
    }
];

function updateFontColor(color) {
    document.querySelector('.typing-container').style.color=color;
}

async function write() {
    let i=0;
    while (true) {
        updateFontColor(bio[i].color);
        await typeSentence(bio[i].text, 100);
        await deleteSentence(100);
        i++;
        if (i>=bio.length) {
            i=0;
        }
    }
}
write();
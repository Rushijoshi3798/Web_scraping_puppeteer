const puppeteer = require("puppeteer");

const fs = require("fs/promises");

/*
const startBrowser = async () => {
    // making virtual browser
    const browser = await puppeteer.launch( { headless: 'new' } );
    // (headless - if you don't want a warning in terminal)
    
    //for opening a new page
    const page = await browser.newPage();

    // set Viewport for height & width requirement for screenshort
    await page.setViewport( { width:  1280, height:1080 });

    // Go to any website/URL
    await page.goto('https://www.masaischool.com/');

    // take a screen short of home page
    await page.screenshot( {path: 'masaiSchoolHomePage.png', fullPage: true} )

    // close the Browser - Important
    await browser.close();

}





const startBrowser = async () => {
  // making virtual browser
  const browser = await puppeteer.launch({ headless: "new" });
  // (headless - if you don't want a warning in terminal)

  //for opening a new page
  const page = await browser.newPage();

  // Go to any website/URL
  await page.goto("https://example.cypress.io/todo");

  // get all the Images listed on website
  const todos = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".view label")).map(
      (el) => el.textContent
    );
  });

 console.log(todos); 
 // --> get All the todos

 await fs.writeFile('todos.txt', todos.join('\n')); 
 // Save all the todos in the todos.txt file

  // close the Browser - Important
  await browser.close();
};






// can we extract the images from any site using src arrtibute? Let's try it out: -- 

const startBrowser = async () => {
    // making virtual browser
    const browser = await puppeteer.launch({ headless: "new" });
    // (headless --> if you don't want a warning in terminal)
  
    //for opening a new page
    const page = await browser.newPage();
  
    // Go to any website/URL
    await page.goto("https://unsplash.com/");
  
    // get all the Images listed on website (unsplash.com)
    const images = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".MorZF img")).map(
        (el) =>{
            return el.src
            }
      );
    });
  
   
   // --> get All the Images
  
   await fs.writeFile('images.txt', images.join('\n'));
   // Save all the Images in the Images.txt file
  
    // close the Browser - Important
    await browser.close();
  };






const startBrowser = async () => {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();
  await page.goto("https://unsplash.com/");

  const images = await page.$$eval(".MorZF img", (el) => {
    return el.map((el) => el.src);
  });

  //console.log(images);

  for (let i = 0; i < images.length; i++) {
    const obj = {
      id: i + 1,
      image: images[i],
    };

    fs.writeFile(
      "images.json",
      `\n${JSON.stringify(obj)},`,
      { flag: "a+" },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  await browser.close();
};




const startBrowser = async () => {
    const browser = await puppeteer.launch({ headless: "new" });
  
    const page = await browser.newPage();
    await page.goto("https://unsplash.com/");
  
    const images = await page.$$eval(".MorZF img", (el) => {
      return el.map((el) => el.src);
    });
  
    //console.log(images);

    let index = 0;
  
    for(let img of images){
        const realImage = await page.goto(img);

        fs.writeFile(
            `images/image${++index}.jpeg`,
            await realImage.buffer(),
            { flag: "a+" },
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );

    }
  
    await browser.close();
  };



const startBrowser = async () => {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();
  await page.goto("https://unsplash.com/");

  const links = await page.$$(".p7ajO");

  for (let link of links) {
    const linkText = await link.evaluate((el) => el.textContent);

    if (linkText.trim() === "Animals") {
      await link.click();
      // see many asynchronous calls are above like click & evaluate inside a loop so it may happen that click is applied before evaluate, so we didn't get Animals images with this code.

      // we can do something kind of setTimout here to avoid & wait for the completion of asynchronour request. (Explained Below)

      await new Promise((r) => setTimeout(r, 2000));

      break;
    }
  }

  const images = await page.$$eval(".MorZF img", (el) => {
    return el.map((el) => el.src);
  });

  //console.log(images);

  let index = 0;

  for (let img of images) {
    const realImage = await page.goto(img);

    fs.writeFile(
      `images/image${++index}.jpeg`,
      await realImage.buffer(),
      { flag: "a+" },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  await browser.close();
};

*/

// Now, go to search box type car & get images & then download it
const startBrowser = async () => {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();
  await page.goto("https://unsplash.com/");

  const searchInput = await page.$("input[type='search']");
  await searchInput.type("cars");
  await searchInput.press('Enter');

  await new Promise((r) => setTimeout(r, 2000));


  const images = await page.$$eval(".MorZF img", (el) => {
    return el.map((el) => el.src);
  });

  //console.log(images);

  let index = 0;

  for (let img of images) {
    const realImage = await page.goto(img);

    fs.writeFile(
      `images/image${++index}.jpeg`,
      await realImage.buffer(),
      { flag: "a+" },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  await browser.close();
};

startBrowser();

const puppeteer = require("puppeteer");
const fs = require("fs/promises");

(async () => {
  // Optional: load HTML from file or string
  const html = `
    <html>
      <head>
        <style>
          body {color:white; font-family: sans-serif; margin: 40px; background: #222; }
          h1 { color: #4488aa; }
          a{
          padding:0.5rem 1rem;
          border-radius:9999rem;
          display:flex;
          width:fit-content;
          background:linear-gradient(to bottom, #444, #333);
          border: 1px solid #111;
          color:white;
          text-decoration:none;
          text-shadow: 0 -1px 1px #000, 0 1px 1px #fff4;
          box-shadow: 0 -2px 2px #000, 0 3px 2px #fff2, inset 0 0 10px #0007;

          &:active{
          color:#4488aa;
                    box-shadow: 0 -2px 2px #000, 0 3px 2px #fff2, inset 0 0 10px #000;

          }
          }
        </style>
      </head>
      <body>
        <h1>Hello from Puppeteer!</h1>
        <p>This is a sample PDF rendered from HTML.</p>
        
        <p>This uses the Puppeteer library.</p>

        <p>Effects such as box-shadow and linear-gradient are supported.</p>

        <p>Try clicking the link below!</p>

        <a href='https://www.example.com/' target="_blank">Visit Example</a>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load HTML as a data URI
  await page.setContent(html, { waitUntil: "networkidle0" });

  // Generate PDF
  await page.pdf({
    path: "output.pdf",
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  console.log("PDF saved as output.pdf");
})();

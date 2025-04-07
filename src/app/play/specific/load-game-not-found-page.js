export default function loadGameNotFoundPage() {
  const gameNotFoundHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clicky Latin - Game Not Found</title>
    <link rel="preload" as="image" href="/assets/404-game-rabbit.svg">
    <link rel="icon" href="/assets/favicon-404.svg" type="image/svg+xml">
    <style>
      body, html {
        user-select: none;
        margin: 0;
        padding: 0;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #333;
      }
      .container {
        position: relative;
        width: 100vmin;
        height: 100vmin;
      }
      img {
        pointer-events: none;
        user-select: none;
        width: 100vmin;
        height: 100vmin;
        display: block;
      }
      #back-to-home {
        position: absolute;
        top: 75%;
        left: 50%;
        transform: translate(-50%, -50%); /* accounts for the top-left corner anchor */
        color: white;
        font-size: 3vmin;
        text-decoration: none;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
        padding: 1vmin;
        border-radius: 1vmin;
        text-align: center;
      }
      #back-to-home:hover {
        background-color: rgba(0, 0, 0, 0.9);
      }
      #play-another {
        position: absolute;
        top: 82.5%;
        left: 50%;
        transform: translate(-50%, -50%); /* accounts for the top-left corner anchor */
        color: white;
        font-size: 3vmin;
        text-decoration: none;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
        padding: 1vmin;
        border-radius: 1vmin;
        text-align: center;
      }
      #play-another:hover {
        background-color: rgba(0, 0, 0, 0.9);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img viewBox="0 0 2048 2048" src="/assets/404-game-rabbit.svg"></img>
      <a href="/" id="back-to-home">Back to Home</a>
      <a href="/play" id="play-another">Play A Different Game</a>
    </div>
  </body>
  </html>`;
  document.documentElement.setHTMLUnsafe(gameNotFoundHtml);
}
:root {
  --main-color: #ffffff;
  --background-color: #000000;
  --star-color-1: #001ade;
  --star-color-2: #de00ae;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

body {
  font-family: 'Syne', sans-serif;
  background-color: var(--background-color);
  color: var(--main-color);
  overflow-x: hidden;
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}

header {
  text-align: center;
  padding: 4rem 1rem 2rem;
  position: relative;
  z-index: 2;
}

.video-placeholder {
  margin: 3rem auto;
  width: 80%;
  max-width: 800px;
  height: 450px;
  background-color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--main-color);
  font-style: italic;
  z-index: 2;
  position: relative;
}

.section {
  padding: 3rem 1rem;
  text-align: center;
  position: relative;
  z-index: 2;
}

.socials {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.socials a {
  text-decoration: none;
  color: var(--main-color);
  font-size: 1.5rem;
  text-transform: lowercase;
  transition: transform 0.2s ease, color 0.3s ease;
}

.socials a:hover {
  color: var(--star-color-2);
  animation: wobble 0.4s ease-in-out;
}

@keyframes wobble {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  50% { transform: rotate(-2deg); }
  75% { transform: rotate(2deg); }
  100% { transform: rotate(0deg); }
}

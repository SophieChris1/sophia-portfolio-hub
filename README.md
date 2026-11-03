# Sophia Portfolio Hub

**Project type:** Personal Portfolio Website

Sophia Aniekwe's portfolio presents her education, research, teaching experience, writing, digital skills and ongoing learning. Existing photographs, project imagery and the botanical design are preserved.

## Technologies and development

The page uses HTML elements, CSS, Flexbox and JavaScript. The existing Lovable application also uses React, TypeScript, TanStack Start and Vite for rendering, routing and secure server execution. It is not a standalone static HTML site: retaining these required files keeps the existing website working and protects AI credentials.

The portfolio was developed in Lovable, with iterative visual refinement, supplied personal information, a real profile photograph, illustrative project images, accessible controls and mobile/desktop testing. Courses are presented as completed training areas, not as verified certificates. Illustrative project pictures are not research evidence.

## Main sections

Home, About, My Journey, Skills, Projects, Education, Courses & Training, Experience, Why Work With Me, What I'm Currently Learning, My GitHub, Ask Sophia – AI Portfolio Assistant, and Contact.

## AI integration

Ask Sophia is a real AI-powered assistant using Lovable AI and the workspace default text model. Visitors can type questions or select suggested questions. Answers stream into the conversation with a loading state and friendly failure messages.

`src/script.js` manages the browser's streaming interaction. It calls a same-origin server function in `src/lib/assistant.functions.ts`; model calls and credentials stay on the server. The assistant receives shared portfolio data and instructions to answer only from that data, decline unsupported questions and never invent personal facts. User messages cannot supply system instructions. There is no web search or external data source. AI can still make mistakes; review important answers against the portfolio.

Each visitor has one conversation, held only in page memory. Refreshing clears it. Nothing is saved to browser storage or a chat database. Conversation history is passed on follow-up questions. Lovable AI requests consume workspace AI credits. No private API key belongs in source code or this README.

## Source structure

```text
sophia-portfolio-hub/
├── README.md
├── package.json
├── src/
│   ├── routes/index.tsx             # HTML page structure rendered by React
│   ├── routes/__root.tsx           # Document shell, fonts and global styles
│   ├── styles.css                  # Colour and shadow tokens
│   ├── portfolio.css               # Existing layout and responsive styling
│   ├── script.js                   # JavaScript AI interaction
│   ├── script.d.ts                 # Types for the JavaScript module
│   ├── assets/sophie.jpg           # Supplied profile photo
│   ├── assets/research-workspace.jpg
│   ├── components/SophiaAssistant.tsx
│   ├── components/ai-elements/     # Accessible chat primitives
│   ├── lib/portfolio-data.ts       # Shared portfolio content
│   ├── lib/portfolio-contact.ts    # Verified contact links
│   ├── lib/portfolio-assistant.ts  # Trusted facts and input validation
│   ├── lib/assistant.functions.ts # Server-only AI generation
│   ├── generated/ai-gateway/      # Generated AI contracts
│   └── test/                      # Contact and grounding tests
└── public/images/projects/        # Unchanged research, portfolio, data, writing images
```

The requested simple structure is represented within the existing application rather than adding a second `index.html` or duplicating images. Do not delete framework configuration, generated integrations or server files. Maintain this source in GitHub.

## Contact

- Email: [sophiaaniekwe@gmail.com](mailto:sophiaaniekwe@gmail.com)
- Phone: 07053084945
- GitHub: https://github.com/SophieChris1/sophia-portfolio-hub
- LinkedIn: https://www.linkedin.com/in/sophia-aniekwe-238391385

## Run locally

Install Bun, then run from the project folder:

```sh
bun install
bun run dev -- --port 8080
```

Open http://localhost:8080. The public portfolio can render without AI credentials. Outside Lovable, configure the required AI Gateway server credential in your local secret environment (never commit it); the live assistant requires server access to Lovable AI. Keep `.env` and credentials out of GitHub.

```sh
bun run test
```

## Test the assistant

Scroll to Ask Sophia, select “What did Sophia study?” or type a question and press Ask. Confirm the University of Calabar and Agricultural Economics degree. Ask about her research: the answer should mention women farmers in Calabar South. Ask “What is Sophia's age?”: the assistant should say the portfolio does not provide that information. Try a follow-up, then refresh to confirm the conversation clears.

Publish the updated app when ready to make the changes available on the public website.
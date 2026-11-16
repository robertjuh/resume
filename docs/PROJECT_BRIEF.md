# Project: Interactive Developer Portfolio / Resume

**Public-copy audit decisions, 16 November 2026:** Replace CV-reference/editorial placeholders with owner-confirmed experience. CI/CD is professional pipeline use/maintenance, including GitLab for BEX; n8n is a professional VHBP WordPress SEO workflow with SEO API integrations. Google Cloud experience at WDD/Fresh-IQ includes service accounts, Cloud SQL, BigQuery, Firestore, logging and SQL queries. Doctrine/Twig/Stimulus/Tailwind descriptions should state their confirmed dashboard uses. The AI Campaign App describes the owner-selected dndCampaignLLM repository: TypeScript/React/Fastify/SQLite/Zod, multiplayer, player actions, AI narration, server-sent events and saved campaigns. Retain a gallery ready for later real game-flow screenshots without public placeholder messages. Full decisions and provenance are recorded in CONTENT_REVIEW.md.

**Latest owner decisions, 16 November 2026:** Remove CV downloads, public PDF files, the PDF generator and hidden print-CV view for privacy; this overrides earlier CV requirements in this brief. Use the owner's exact Dutch full-stack role preference from the content reference. Show the three confirmed WDD contributions in the work history. Describe Symfony positively as personal projects and three SymfonyCasts courses. VHBP is an ongoing, occasional collaboration for JavaScript/PHP WordPress template customization. Both qualifications are completed: HZ bachelor in Computer Software Engineering, 2012–2017; MBO ICT PDO, 2008–2011, as confirmed by the owner and LinkedIn screenshot. Keep private PDF copies outside the upload and block retired CV URLs in the app-scoped hosting configuration.

Build a complete, polished, interactive personal portfolio and resume website for **Robert Walhout**, a fullstack software developer based in Goes, Netherlands.

Implement the application, not just a proposal or mockup. Create the necessary Angular project files, components, styling, content models, configuration, and documentation.

The result should feel like a carefully designed personal project by an experienced developer. It should demonstrate frontend engineering ability while presenting professional experience, personal projects, technical knowledge, and interests.

## 1. Core requirements

**Technology**
- Angular with TypeScript, using a current stable Angular version.
- Standalone components and modern Angular conventions.
- SCSS or CSS with clean, maintainable architecture.
- Responsive, mobile-first layout.
- Static client-side application.
- No server-side rendering.
- No required backend, database, or server processes.
- Avoid unnecessary libraries and dependencies.

**Hosting**
- Hosting provider: WebReus shared hosting.
- Domain: `https://www.freerunnl.nl`
- Portfolio URL: `https://www.freerunnl.nl/resume/`
- Deployment directory: `resume`
- The application must work by uploading the compiled static files through FTP or the hosting file manager.
- No VPS, Node.js runtime, Docker, or running application server is available in production.
- Other applications already exist on the domain. Do not interfere with them.

**Language**
- English throughout the UI.
- Natural, concise writing.
- Professional but informal and approachable.
- Avoid generic corporate language, exaggerated claims, and marketing copy.

## 2. Critical content accuracy rules

These requirements take priority over visual design.

**DO NOT INVENT FACTS.**

Do not fabricate:
- Employment history or dates.
- Professional experience with particular frameworks.
- Software features I have personally implemented.
- Project metrics or performance improvements.
- Business results, revenue, or user counts.
- Certifications, degrees, or qualifications.
- Programming languages or technology proficiency.
- Screenshots, testimonials, GitHub statistics, or references.
- Software architectures or implementation details for projects whose source code is unavailable.

Distinguish between:
1. Verified information from my resume.
2. Publicly available information about employers.
3. Personal projects I have described.
4. Details that require my confirmation.

Employer information may be used to explain the industry and purpose of the software I worked on. It must never be used to imply I personally developed every product or feature offered by that employer.

Where information is missing, use clearly marked TODO comments or typed content fields.

Example:

```ts
// TODO(REVIEW): Describe a specific technical challenge
// you personally solved while working at WDD.
technicalChallenges: []
```

Keep unverified content out of the public-facing UI until populated.

Maintain a `CONTENT_REVIEW.md` containing all missing details, unverifiable assumptions, and information requiring my approval.

If source files or an existing project are available in the workspace, inspect them before writing descriptions of their architecture.

Do not silently fill missing information with plausible-sounding content.

## 3. Visual direction

Create a dark, purple-themed website with a sleek, slightly playful and smooth visual style.

Imagine a combination of:
- A modern developer portfolio.
- A well-designed SaaS dashboard.
- A subtle science-fiction interface.
- A creative, personal website.

It should feel relaxed, technically sophisticated, and distinctive.

**Suggested palette**

```css
--background: #100e18;
--background-secondary: #191526;
--surface: #221b32;
--surface-hover: #302541;
--primary: #a78bfa;
--primary-bright: #c4b5fd;
--text: #f3efff;
--text-muted: #a9a2b9;
--border: #3a304b;
--accent: #79cfc3;
```

These are starting points, not rigid requirements.

Design characteristics:
- Rounded but restrained components.
- Subtle gradients.
- Smooth hover effects.
- Soft purple glows used sparingly.
- Elegant typography.
- Strong spacing and visual hierarchy.
- Cards with clean borders and thoughtful interactions.
- Subtle background details.
- Smooth section transitions.
- A small amount of personality and humor.

Avoid:
- Excessive glassmorphism.
- Generic AI-generated landing-page aesthetics.
- Constant moving gradients.
- Overwhelming animations.
- Fake terminal output.
- Neon overload.
- Emoji-filled interfaces.
- Excessive decorative icons.
- Huge empty sections.
- An obviously AI-generated visual style.

**Writing style**

Avoid typical LLM-generated phrases and rhetorical structures, including:
- "This isn't X, it's Y."
- "More than just..."
- "From X to Y..."
- "Crafting innovative solutions."
- "Passionate about leveraging technology."
- "Bridging the gap between..."
- "Turning coffee into code."
- Generic motivational or sales language.

Use straightforward, human-sounding descriptions.

Do not exaggerate my accomplishments or describe me as a visionary, expert, thought leader, or similar.

## 4. Main landing section

Create an attractive hero section introducing me immediately.

Known information:

**Name:** Robert Walhout  
**Location:** Goes, Netherlands  
**Profession:** Fullstack JavaScript / TypeScript developer  
**Experience:** Over 7 years of professional software development.

My strongest professional background:
- Angular
- TypeScript / JavaScript
- Node.js
- NestJS
- ERP and business software
- API development and integration
- Google Cloud

The hero should be short and direct.

Owner-approved update, 16 November 2026: show “7+ years of professional experience”, a compact Angular/TypeScript/Node.js/NestJS list and a short introduction about ERP systems, APIs and data-heavy business applications. Translate the experience headline and introduction into Dutch. Retain the existing section order, CV-link visibility and footer wording. Strengthen the WDD/Fresh-IQ project with the confirmed generic Angular table component for CRUD/custom modules, contribution to setting up a new NestJS backend replacing vanilla JavaScript, and collaboration with data scientists on API access and frontend presentation. Use the existing Bex screenshot; no further code or screenshots are available. Keep the archival explanation out of public copy. Also replace the economic dashboard's self-deprecating caption with learning-focused wording and give the Projects introduction an English source key with its existing Dutch translation.

Use a headline such as:

"Robert Walhout"

And a subtitle such as:

"Fullstack software developer based in Goes, Netherlands."

Add a brief description grounded in my actual experience with enterprise web applications, frontend development, backend services, and APIs.

Avoid long paragraphs.

Include clear navigation to:
- Experience
- Projects
- Skills
- About
- Contact

Also provide access to a printable or downloadable resume.

If the PDF file is not available, implement a well-formatted print stylesheet and a working "Print CV" action. Do not create a nonfunctional download button.

## 5. Work experience

Create an interactive professional timeline.

Each entry should have:
- Company name.
- Role.
- Employment dates.
- Industry or company description.
- Technology stack.
- Short description of my responsibilities.
- Optional expanded technical information.
- Space for screenshots and additional details.
- Optional public company website.

Use verified details below.

### WDD / Fresh-IQ

**February 2022 – November 2025**  
**Role:** Fullstack JavaScript Web Developer  
**Location:** Remote

My resume confirms that I worked on ERP/business software specializing in stock-inventory forecasting and market data for fresh produce.

Technologies listed in my resume:
- Angular
- TypeScript
- JavaScript
- Node.js
- NestJS
- Google Cloud
- GitHub
- GitLab

Company background from public sources:

WDD (WeDoDigital) developed data-driven software solutions for the floriculture and fresh produce industries.

The business focused on operational insights, forecasting, market information, and helping growers and trading companies make better-informed decisions.

In 2024, WeDoDigital, GreenMatch, and Dataresultz were brought together under the Fresh IQ brand.

Fresh IQ's publicly described solutions included Smart Growing, Smart Trading, and Market Intelligence.

Sources:
- https://wdd.nl/
- https://www.agf.nl/article/9683958/wedodigital-greenmatch-en-dataresultz-bundelen-krachten-tot-fresh-iq/

Important:

These are company-level descriptions. Do not claim that I developed all these products.

My resume only establishes my role, technologies, and work on the relevant ERP, inventory, and market-data applications.

Create expandable sections for additional details I can supply later:
- Specific features I built.
- Backend/API responsibilities.
- Angular components.
- Database and cloud services.
- Technical challenges.
- Architectural decisions.
- Screenshots, if publication is permitted.

Do not invent any of these details.

### Colijn IT

**June 2018 – December 2021**  
**Role:** Frontend Developer  
**Location:** Goes, Netherlands

My resume confirms that I worked on a large ERP system as part of a team of approximately 17 developers.

The ERP included functionality relating to:
- Relationship management.
- Article management.
- Absence management.
- Transactions.

Technologies:
- Angular
- TypeScript
- JavaScript
- Tabris / Cordova
- SVN
- Jira

Additional confirmed work:
- Collaboration with international colleagues.
- Development and publication of a mobile application for order signatures across Android, Windows, and Apple application platforms.

Company background:

Colijn IT develops ERP and related business software for the home furnishing industry.

Its iONE platform supports business processes such as product management, customer relationships, purchasing, stock management, warehouse operations, and sales.

It also offers product configurators and web integrations.

Sources:
- https://www.colijn-it.nl/en/
- https://www.colijn-it.nl/en/about-us/

Do not claim I developed the 3D product configurator, Magento integrations, or other specific company products unless verified.

Present company background separately from my confirmed contributions.

### Colijn IT — Internship

**June 2017 – January 2018**  
**Role:** Web Development Intern

Confirmed work:
- Research into augmented reality frameworks.
- Development of an augmented reality mobile application prototype.
- Six-month internship.

Include this in the timeline, preferably as an earlier stage in my career.

### VHBP — Van Herk Business Promotions

**October 2013 – Present, ongoing occasional collaboration**<br>
**Role:** WordPress Customization

The owner confirmed the collaboration continues occasionally, with WordPress template customization using JavaScript and PHP. Describe the individual tasks only to the extent confirmed by the owner.

The owner also confirmed that WP_Query, ACF/custom fields, taxonomies, content filtering and responsive CSS/layout fixes belong to this collaboration. Show these in four concise work-history bullets, with WordPress, PHP, JavaScript, CSS, ACF and WP_Query as technologies; keep PHP/WordPress skill descriptions aligned with this confirmed professional context.

PHP is explicitly listed in connection with this work.

Company background:

VHBP provides business websites, web design, branding, and online marketing services.

Its public website also lists Robert as a programmer associated with CSS, PHP, and JavaScript.

Source:
- https://www.vhbp.nl/

Do not invent individual client projects or responsibilities.

The ongoing status is confirmed; do not imply continuous full-time or part-time employment.

### Earlier technical experience

Include these in a compact expandable timeline section:

**Admiraal de Ruyter Ziekenhuis**  
2011 — Internship in second-line IT service and support, followed by holiday work.

**ROC Zeeland**  
Network management internship. The dates in the original resume appear inconsistent and require verification.

**ADZ, Middelburg**  
February – June 2009 — Network management internship and IT support.

These should remain accessible without dominating the professional experience section.

## 6. Project showcase

This is one of the most important sections of the website.

Create a visually interesting grid of interactive project cards.

Each project should support:
- Project title.
- Short description.
- Category.
- Verified technologies.
- Project link, if available.
- Screenshot gallery.
- Expanded case study.
- Optional technical explanation.
- Notes about what I personally implemented.

Use local image assets when available.

If screenshots are missing, create tasteful placeholder containers without invented screenshots or stock images pretending to show the product.

### Project 1: Bitcoin Index

URL:
https://freerunnl.nl/btc-index/#/

This is a personal application I developed before generative AI coding assistants became widespread.

I want this project to demonstrate my earlier independent programming work.

Try inspecting the actual application if network access is available.

If it cannot be inspected, use only the confirmed information:
- The project is called Bitcoin Index.
- I developed it myself.
- It is a publicly accessible personal project.
- It predates widespread generative AI coding assistance.

Do not assume the application uses particular frameworks, data providers, chart libraries, trading indicators, or APIs.

Do not invent its features.

Provide:
- A link to the live application.
- An image gallery ready for screenshots.
- An expandable technical case study.
- TODO fields for its purpose, stack, architecture, development date, and notable challenges.

Do not embed the live site in an iframe unless embedding actually works and looks appropriate.

### Project 2: AI Campaign App

A personal Dungeons & Dragons-like AI-assisted RPG campaign application.

The application concept involves:
- Creating and participating in RPG campaigns.
- Customizable campaign settings and themes.
- AI-generated narration and game-master behavior.
- Players submitting actions.
- Campaign context influencing the evolving narrative.

The project has been used for different settings, including fantasy, science fiction, cyberpunk, and horror.

Only describe these high-level concepts unless more detailed implementation information is available from the source code or documentation.

I will provide screenshots and further technical details later.

**IMPORTANT: No live AI inference in the portfolio.**

Do not:
- Make requests to OpenAI, Anthropic, or other inference services.
- Implement a chatbot.
- Implement live AI narration.
- Use API keys.
- Require a backend for this showcase.
- Generate fake AI responses and imply they are from the actual project.

Instead, build an interactive **technical walkthrough**.

For example, a visitor could select sections such as:
- Campaign configuration.
- Player actions.
- AI game-master concept.
- Narrative and campaign context.
- Technical implementation.

These sections can expand or change the visible content.

Use explanatory diagrams, cards, and spaces for screenshots.

Do not assert implementation specifics such as event sourcing, database schemas, validation pipelines, multiplayer synchronization methods, or persistence architecture until confirmed.

If an actual flowchart cannot be verified, keep it conceptual and label it appropriately in the content model.

I will add screenshots and actual implementation details myself.

### Project 3: Economic Data Dashboard

Personal learning project using PHP and Symfony.

Context:

I have been developing a dashboard for economic and financial indicators using Symfony.

The work discussed so far includes:
- Symfony.
- Doctrine ORM.
- Twig.
- Stimulus.
- Tailwind CSS.
- Integration with external data APIs.
- Gold and silver price data.
- Economic/labor-market data.

This is a learning and experimentation project.

Do not describe it as a completed commercial product.

Create a project card and expandable case study.

Leave space for:
- Screenshots.
- Git repository.
- Exact data sources.
- Current implementation status.
- Architecture notes.
- Future development.

### Project 4: Professional ERP Work

This is a collection or case-study section for my enterprise software experience.

It should complement the professional timeline.

Present the business problems and technical domains associated with WDD/Fresh-IQ and Colijn IT.

Avoid publishing proprietary source code or confidential company data.

Create clearly marked areas for my own screenshots, diagrams, and specific contributions.

### Additional projects

Use an extensible project data structure so I can easily add future projects.

Do not create imaginary portfolio projects just to fill the grid.

## 7. Technology and skills section

Build an interactive skill explorer.

Prefer a curated layout rather than a wall of technology logos or meaningless progress bars.

Visitors should be able to select a technology and see related projects and professional experience.

Group the skills by area.

### Primary professional technologies

- Angular.
- TypeScript.
- JavaScript.
- Node.js.
- NestJS.
- REST APIs.
- Google Cloud.
- Git / version control.

### Additional technologies and learning

- PHP.
- Symfony.
- WordPress.
- Doctrine ORM.
- Twig.
- Stimulus.
- Tailwind CSS.
- CI/CD.
- n8n.

Important:

My Symfony experience comes from personal study and development, including **three SymfonyCasts courses**.

I have not yet used Symfony professionally in a workplace.

Represent this distinction clearly.

### Framework and software-design interests - owner update, 12 November 2026

I have actual professional experience with Angular. I want to learn more about React, Symfony, Laravel and Vue, and about software design patterns.

Keep Angular in professional experience. Preserve the personal Symfony development and three SymfonyCasts courses, with an interest in learning more. React, Laravel, Vue and software design patterns belong under learning interests, without invented employer or completed-project links.

Do not imply professional React, Vue or Laravel experience.

### AI tooling and interests

Owner clarification, 12 November 2026: I am interested in learning more about RAG because I find it interesting. Present it as a learning interest only, without experience, implementation or project attribution. Economic Data Dashboard is a personal learning project and must appear in the Learning filter.

My resume lists:
- Claude Code.
- Codex.
- Cursor.
- LLMs.

Present these as tooling, knowledge, or interests where appropriate.

Do not invent specific commercial AI products I have built.

Do not assign arbitrary skill scores or percentages.

If useful, distinguish:
- Professional experience.
- Personal project experience.
- Currently learning.

## 8. Education and certifications

Include the following:

**HBO-ICT**  
University of Applied Sciences, Vlissingen  
2012–2018

**MBO 4-ICT — Private Digital Researcher**  
ROC Zeeland ICT, Vlissingen  
2007–2011

**Certifications**
- Cisco Exploration — 2017.
- EXIN Cloud Computing — 2017.

Do not claim graduation distinctions, degree awards, or additional certifications.

Preserve the original qualification wording unless I confirm corrections.

## 9. About me

Create a personal section that adds character without becoming overly informal.

My documented interests include:
- Music production using software and hardware.
- Programming and personal projects.
- Gaming, especially strategy, competitive, and cooperative games.
- Psychology.
- Philosophy, including existentialism.
- Language learning.
- Large language models and AI.

A few playful interactions are welcome.

For example:
- A small expandable music-related section.
- A subtle terminal-inspired easter egg.
- A mini command palette.
- A personal project discovery section.

Do not invent personal anecdotes or personality traits.

Use short, honest descriptions or leave content fields for me to complete.

Owner clarification, 16 November 2026: add a visible “How I approach development” block in About, with the exact quote “An engineer is somebody who understands constraints imposed by reality”. Express these supplied personal principles naturally in Dutch and English: understand an LLM's limits; keep a human responsible for its code; recognize technical, economic and practical constraints early in customer discussions; and explore whether AI can make a game genuinely fun rather than merely generate more content. Keep the quote in English, without an invented author attribution. This is personal philosophy, not a claim of shipped AI-game functionality.

### Languages

- Dutch: C2.
- English: C1.
- German: A2.
- Russian: A1.

## 10. Interactive functionality

Prioritize interactions that are useful and technically well implemented.

Implement:

1. Smooth section navigation.
2. Interactive work-experience timeline.
3. Expandable company case studies.
4. Project filters.
5. Project detail panels or modal views.
6. Technology explorer with project/experience relationships.
7. Screenshot galleries with support for images I add later.
8. Responsive navigation.
9. Working contact and external links.
10. Printable resume view.

Optional:
- `Ctrl+K` / `Cmd+K` command palette.
- Subtle animated timeline transitions.
- Small hover-based visual effects.
- Dark-purple themed loading transitions, only where genuinely needed.

All visible controls must work.

Avoid fake UI interactions and dead buttons.

Keep motion subtle and respect `prefers-reduced-motion`.

## 11. Content architecture

Keep resume and project content separate from presentation components.

Use strongly typed TypeScript interfaces.

Suggested organization:

```text
src/
  app/
    components/
      navigation/
      hero/
      experience-timeline/
      experience-card/
      project-grid/
      project-detail/
      skill-explorer/
      about/
      contact/
      footer/

    content/
      profile.ts
      experience.ts
      projects.ts
      skills.ts
      education.ts
      certifications.ts
      interests.ts
      links.ts

    models/
      profile.model.ts
      experience.model.ts
      project.model.ts

  assets/
    projects/
      bitcoin-index/
      ai-campaign/
      economic-dashboard/
      professional-work/
```

Adapt the structure if Angular's current conventions suggest a better organization.

Make it easy to:
- Edit text.
- Add screenshots.
- Add projects.
- Update employment details.
- Add verified technologies.
- Replace placeholders.
- Add project URLs.

Use appropriate Angular state management, such as signals for local interactive state.

No complex global state library is necessary.

## 12. Search visibility, accessibility, and performance

Because this portfolio will be used for job applications:

- Implement proper semantic HTML.
- Add appropriate meta tags and Open Graph metadata.
- Use descriptive page titles.
- Ensure all primary content is accessible and readable.
- Support keyboard navigation.
- Add visible focus indicators.
- Ensure adequate contrast.
- Support reduced motion.
- Use lazy loading where helpful.
- Optimize image sizes.
- Avoid unnecessary JavaScript dependencies.
- Keep the main landing content immediately available.
- Add a print-friendly resume layout.

Do not make important information accessible only through hover or animation.

The site should be understandable within approximately 30 seconds, while still rewarding deeper exploration.

## 13. Static deployment to WebReus

This is a hard technical requirement.

The finished Angular application must work at:

`https://www.freerunnl.nl/resume/`

It must be possible to deploy by uploading static files to a folder named `resume` within the domain's existing web root.

Do not assume a VPS, reverse proxy, or Node.js production runtime.

Configure production builds with:

```bash
ng build --configuration production --base-href /resume/
```

If useful, create:

```json
{
  "scripts": {
    "build:resume": "ng build --configuration production --base-href /resume/"
  }
}
```

Ensure:
- Production asset paths resolve under `/resume/`.
- No application asset incorrectly points to `/assets/` at the domain root.
- Refreshing and navigating the deployed site does not cause 404 errors.
- The site works without server rewrite rules.
- Other existing applications on `freerunnl.nl` remain untouched.

Prefer a single-page layout with section navigation.

If Angular Router is required for separate views, use hash-based navigation with `withHashLocation()` rather than depending on server-side URL rewrites.

The production output must contain the files needed for static hosting.

With Angular's application builder, this will typically be the contents of:

```text
dist/<project-name>/browser/
```

Verify the actual output path instead of assuming it.

Document how to upload the **contents** of the browser build directory into the existing website's `resume` directory, so that the resulting structure is:

```text
<website-web-root>/
  resume/
    index.html
    main-....js
    styles-....css
    ...
```

The actual location of `<website-web-root>` must be determined from my WebReus hosting configuration. Do not assume it is named `public_html`.

Include a `DEPLOYMENT.md` with:
- Installation instructions.
- Development commands.
- Production build command.
- Exact build-output location.
- FTP upload instructions.
- The expected live URL.
- A checklist for testing after deployment.
- Troubleshooting for asset-path issues, missing files, and blank pages.

Do not configure SSR or a production Node server.

Do not delete or overwrite files belonging to existing applications.

## 14. Resume and contact links

Known public links:

GitHub:
https://github.com/robertjuh

LinkedIn:
https://www.linkedin.com/in/robert-walhout-85852849

Bitcoin Index:
https://freerunnl.nl/btc-index/#/

Use my resume for the contact email and phone number if the file is available in the workspace.

Place contact details in a centralized configuration file.

Do not invent social media accounts.

Use `mailto:` for email contact rather than a backend contact form.

## 15. Implementation quality

This website is itself a portfolio piece.

Write production-quality Angular code.

Requirements:
- Reusable components.
- Strong TypeScript typing.
- Sensible separation of concerns.
- Minimal code duplication.
- Clear naming.
- Readable templates.
- Responsive layouts.
- Working UI interactions.
- No unhandled runtime errors.
- No secrets or API credentials.
- No unnecessary dependencies.
- No fake backend integrations.

Prefer simple, reliable implementations over excessive abstraction.

Use CSS transitions where suitable instead of pulling in a large animation library.

Do not implement functionality solely to demonstrate that a library can be used.

## 16. Deliverables

Create the actual working application.

Include:

1. Complete Angular application source code.
2. Responsive UI and styling.
3. Interactive experience timeline.
4. Project showcase.
5. AI Campaign App explanatory walkthrough without inference.
6. Interactive technology explorer.
7. Education and personal information sections.
8. Working contact links.
9. Printable resume view.
10. Production build configuration for `/resume/`.
11. `README.md`.
12. `DEPLOYMENT.md`.
13. `CONTENT_REVIEW.md`.

Run the relevant build, type checking, and any applicable tests.

Resolve build errors before finishing.

If a browser-preview or screenshot tool is available, inspect the actual rendered application and correct visual or responsive issues.

If no browser tool is available, do not claim visual testing has occurred.

## 17. Execution instructions

Start by inspecting the existing repository.

If the repository already contains an Angular application, preserve useful existing configuration and extend it where possible.

If it is empty, initialize a new Angular project.

Inspect any resume, notes, project documentation, source code, or screenshots available locally.

Then:

1. Establish the content data models.
2. Implement the application shell and visual design.
3. Build the professional experience timeline.
4. Build the project showcase and case-study components.
5. Implement the skill explorer and other interactions.
6. Add education, interests, and contact information.
7. Implement the print layout.
8. Configure static deployment under `/resume/`.
9. Run a production build and validate the output.
10. Document remaining content TODOs.

Make reasonable design and engineering decisions independently.

Do not interrupt implementation with unnecessary questions when a placeholder or TODO is sufficient.

At completion, summarize:
- What was implemented.
- How to run it locally.
- Where the compiled static files are located.
- How to deploy it to WebReus.
- Which details I still need to review or provide.

**Overall goal:** Create a distinctive, technically competent, interactive developer portfolio that reflects my actual experience, work, projects, and personality. Keep it polished, smooth, and easy to navigate. Every factual statement must be traceable to my resume, supplied project information, or an identified public source.

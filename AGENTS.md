<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio structure
- Keep the portfolio as a single anchored page in the existing TanStack route; its sections form one continuous personal narrative.
- Define portfolio color and shadow tokens in src/styles.css and layout rules in src/portfolio.css so presentation remains consistently themed.
- Keep verified contact destinations in src/lib/portfolio-contact.ts and test them independently so email and phone actions remain correct.
- Use the supplied portrait as the homepage image without face alteration; never generate a replacement likeness, so the portfolio represents its real owner.
- Share portfolio content in a browser-safe data module between page rendering and server AI grounding so facts stay consistent.
- Keep assistant transport interaction in src/script.js and model calls in a server function so credentials never enter the browser.
- Compose the single-session assistant with AI Elements and no saved history; retain the existing TanStack application rather than duplicating a static site.

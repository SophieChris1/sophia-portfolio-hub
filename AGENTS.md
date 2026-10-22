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
- Use illustrative workspace imagery until a user portrait is supplied; never generate a replacement person's likeness.

# 🔥 Am I Cooked?

A tiny viral-style React/Vite website: the internet's least qualified life crisis detector.

## Fastest GitHub Pages deployment

1. Create a GitHub repository, e.g. `am-i-cooked`.
2. Upload **all files in this project** to the repository root.
3. Commit/push to the `main` branch.
4. Go to **Settings → Pages**.
5. Under **Build and deployment**, choose **GitHub Actions**.
6. The included workflow `.github/workflows/deploy.yml` will build and deploy the site.
7. Wait for the green workflow run.
8. Open the Pages URL shown by GitHub.

### Custom domain

The project includes `public/CNAME` set to:

`cooked.riyasalian.net`

If you want a different domain/subdomain, change that file before pushing.

Then in your DNS provider create the appropriate CNAME record for the GitHub Pages hostname GitHub gives you. GitHub's Pages settings will show the exact target for your repository/account.

### Local run

```bash
npm install
npm run dev
```

### Production build

```bash
npm install
npm run build
```

The production site is generated in `dist/`.

## Why there is no API

The score is deterministic and local. That keeps the site:
- free to run
- instant
- privacy-friendly
- backend-free
- deployable in minutes

The fake "AI" is part of the joke. 😌

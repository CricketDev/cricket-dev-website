# CricketDev Website

Standalone static website for CricketDev and Elevia, ready to publish as a GitHub Pages site.

## Contents

- `index.html`: landing page for CricketDev and Elevia
- `elevia-privacy-policy/`: direct route for the Elevia app privacy policy
- `assets/`: local brand assets used by the site
- `.github/workflows/deploy-pages.yml`: GitHub Actions workflow to deploy the site to GitHub Pages

## Local preview

From this folder:

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000/`
- `http://localhost:8000/elevia-privacy-policy/`

## GitHub Pages publish steps

1. Create a new GitHub repository for this folder, for example `cricket-dev-website`.
2. Move into this folder:

   ```bash
   cd cricket-dev-website
   ```

3. Initialize git and commit the site:

   ```bash
   git init
   git add .
   git commit -m "Initial Elevia website"
   ```

4. Create the GitHub repository in your account, then connect it:

   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/cricket-dev-website.git
   git branch -M main
   git push -u origin main
   ```

5. On GitHub, go to `Settings > Pages`.
6. Under `Build and deployment`, choose `GitHub Actions` as the source.
7. Wait for the `Deploy CricketDev Website` workflow to finish.
8. Your live URLs will be:

   - `https://YOUR-USERNAME.github.io/cricket-dev-website/`
   - `https://YOUR-USERNAME.github.io/cricket-dev-website/elevia-privacy-policy/`

## Notes

- The Google Play buttons intentionally open a "Coming soon!" modal until the app listing exists.
- The privacy policy route is implemented as a real folder path and is not linked from the homepage.
- All asset references are relative so the site works on a GitHub Pages project URL.

# Mekhla Bhowmick — personal site

Plain HTML and CSS, no build step. Based on the same template as
manmatha-roy.github.io. Live at https://mekhlabhowmick.github.io/

```
index.html       About (landing) — intro, looking-for, contact
bio.html         Bio — background, education, experience
research.html    Interests, doctoral research, publications, working papers, talks
teaching.html    Visiting faculty
misc.html        Conferences & workshops, skills & languages
style.css        The whole theme
links.js         Optional — adds links to co-author names and papers
photo.jpg        Portrait (square)
assets/cv/       CV PDF
```

## Publish on GitHub Pages

Repo: https://github.com/mekhlabhowmick/mekhlabhowmick.github.io

1. Push these files to the `main` branch of that repo.
2. Settings → Pages → Build and deployment → Source: **Deploy from a branch**,
   branch **main**, folder **/ (root)**. The `.nojekyll` file is already here
   so GitHub serves the HTML as-is.
3. The site goes live at https://mekhlabhowmick.github.io/

```bash
git clone https://github.com/mekhlabhowmick/mekhlabhowmick.github.io.git
# copy these files in, then:
git add .
git commit -m "Initial site"
git push
```

## Optional, later

- Add paper/preprint links in `links.js` as they appear (the venue text
  becomes the link automatically); co-author homepages can go there too.
- Check the advisor name and the teaching years.

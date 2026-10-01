/* ------------------------------------------------------------------
   links.js — the ONE place to edit links.

   Two lists below:
     PEOPLE  : co-author name  ->  where their name should link
     PAPERS  : paper key       ->  a URL for the paper / slides / ...

   Leave a value as "" and that link simply does not appear. The page
   works fine even if this file is missing.
   ------------------------------------------------------------------ */


/* ---------- 1. Co-authors ------------------------------------------
   Every time one of these names appears in an author line, it becomes a
   link. Fill in a homepage, Google Scholar, or ORCID URL when you have
   one; a blank value means the name just stays plain text.            */

const PEOPLE = {
  "Aryaman Roy":       "",
  "Kaustav Saha":      "",
  "Deepro Majumder":   "",
  "Sayonee Majumdar":  "",
};


/* ---------- 2. Papers ----------------------------------------------
   The key on the left matches data-key="..." on each entry in
   research.html. Fill in whichever URL you have (a DOI, a publisher
   page, a PDF in assets/, a preprint). The venue text then becomes the
   link. Blank entries are skipped.                                    */

const PAPERS = {
  /* published */
  "philosophy-praxis":       { link: "" },
  "domestic-labour-class":   { link: "" },
  "economic-crisis":         { link: "" },

  /* in preparation — fill in once a preprint or draft is online */
  "surplus-home":                 { link: "", pdf: "" },
  "non-commodity-household":      { link: "", pdf: "" },
  "paid-domestic-work":           { link: "", pdf: "" },
  "domestic-capitalist-boundary": { link: "", pdf: "" },
  "capitalism-back-home":         { link: "", pdf: "" },
};


/* ==================================================================
   Below this line is the machinery. You should not need to edit it.
   ================================================================== */

(function () {

  /* --- link the co-author names ------------------------------------ */

  const names = Object.keys(PEOPLE)
    .filter(n => PEOPLE[n])
    .sort((a, b) => b.length - a.length);

  if (names.length) {
    const pattern = new RegExp(
      "(" + names.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")",
      "g"
    );

    document.querySelectorAll(".pub-authors").forEach(el => {
      el.childNodes.forEach(node => {
        if (node.nodeType !== Node.TEXT_NODE) return;
        if (!pattern.test(node.nodeValue)) return;
        pattern.lastIndex = 0;

        const frag = document.createDocumentFragment();
        let last = 0, m;
        while ((m = pattern.exec(node.nodeValue)) !== null) {
          frag.appendChild(
            document.createTextNode(node.nodeValue.slice(last, m.index))
          );
          const a = document.createElement("a");
          a.href = PEOPLE[m[1]];
          a.textContent = m[1];
          a.className = "author-link";
          frag.appendChild(a);
          last = m.index + m[1].length;
        }
        frag.appendChild(document.createTextNode(node.nodeValue.slice(last)));
        node.parentNode.replaceChild(frag, node);
      });
    });
  }

  /* --- add the link row under each paper ---------------------------- */

  document.querySelectorAll("[data-key]").forEach(li => {
    const spec = PAPERS[li.getAttribute("data-key")];
    if (!spec) return;

    const filled = Object.keys(spec).filter(k => spec[k]);
    if (!filled.length) return;

    const ORDER = ["link", "DOI", "doi", "arXiv", "ePrint", "pdf", "PDF"];
    let primary = ORDER.find(k => spec[k]) || filled[0];

    const venue = li.querySelector(".pub-venue");
    if (venue && !venue.closest("a")) {
      const a = document.createElement("a");
      a.href = spec[primary];
      a.className = "pub-venue";
      a.innerHTML = venue.innerHTML;
      venue.replaceWith(a);
    } else {
      primary = null;
    }

    const LABELS = { pdf: "PDF", doi: "DOI", eprint: "ePrint", arxiv: "arXiv", link: "paper" };

    const rest = filled.filter(k => k !== primary);
    if (!rest.length) return;

    const row = document.createElement("span");
    row.className = "pub-links";
    rest.forEach(key => {
      const a = document.createElement("a");
      a.href = spec[key];
      a.textContent = LABELS[key.toLowerCase()] || key;
      row.appendChild(a);
    });

    (li.querySelector(".pub-meta") || li).appendChild(row);
  });

})();

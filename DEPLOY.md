# Deployment plan

The app is a static site. That is the whole reason this is simple: there is no
server to run, no database, no scaling, and no ongoing cost.

---

## 1. Recommended: GitHub + Cloudflare Pages

**Why Cloudflare Pages over the alternatives**

| | Cloudflare Pages | Netlify | GitHub Pages | Vercel |
|---|---|---|---|---|
| Cost at any traffic | Free | Free to 100 GB/month, then paid | Free | Free for non-commercial |
| Bandwidth limit | **None** | 100 GB/month | Soft 100 GB/month | 100 GB/month |
| Global edge network | 300+ cities | Good | US-centric | Good |
| Custom domain + TLS | Free | Free | Free | Free |
| Custom response headers | Yes (`_headers`) | Yes | **No** | Yes |
| Builds from GitHub | Yes | Yes | Yes | Yes |

Two of those rows decide it. **Bandwidth**: if this gets picked up by a training
programme and a few thousand clinicians use it, Netlify's 100 GB cap becomes a
bill; Cloudflare's does not. **Custom headers**: GitHub Pages cannot serve the
Content-Security-Policy, and that header is what makes "nothing leaves your
device" enforceable rather than merely claimed.

### Does a personal account cope with heavy traffic?

Yes, and the reason is that **GitHub never serves your visitors**. It stores the
source; Cloudflare serves the site from its own edge network. A personal free
account is under no more strain from a popular project than an empty one.

Cloudflare Pages' free tier has no bandwidth cap and no visitor limit. Its only
relevant limit is 500 builds a month, and a build happens when *you* push, not
when someone visits.

For scale: the app is about 255 KB gzipped and is cached after the first visit.

| Monthly visits | Transfer | Cost |
|---|---|---|
| 10,000 | ~2.7 GB | Free |
| 100,000 | ~27 GB | Free |
| 1,000,000 | ~270 GB | Free |

The same numbers on Netlify's free tier would exceed its 100 GB cap somewhere
around 350,000 visits and start costing money, which is the main reason to
prefer Cloudflare.

### Steps

1. **Create the repository.** Public, MIT licensed, on your own GitHub account.

   ```bash
   cd "PBT Mapping Tool/app"
   git init && git add -A
   git commit -m "PBT Mapping Tool"
   git branch -M main
   git remote add origin https://github.com/KeanSian/pbt-mapping-tool.git
   git push -u origin main
   ```

   `node_modules/` and `dist/` are already in `.gitignore`.

2. **Connect Cloudflare Pages.** Dashboard → Workers & Pages → Create → Pages →
   Connect to Git. Build command `npm run build`, output directory `dist`.
   Leave environment variables empty.

3. **Custom domain.** Pages → Custom domains. If the domain is registered with
   Cloudflare the certificate is automatic; otherwise add the CNAME they give
   you.

4. **Check the headers landed**, since this is the one thing that is silently
   easy to get wrong:

   ```bash
   curl -sI https://your-domain/ | grep -i content-security-policy
   ```

Every push to `main` redeploys. You never need Node installed locally.

---

## 2. Domain — later, not now

Launching on the free `pbt-mapping-tool.pages.dev` is the right call to start
with. It costs nothing and it works.

The one thing worth doing in the meantime: **be careful where you share the
pages.dev link**. A URL in a published paper, a printed workshop handout, or the
tutorial PDF is effectively permanent, and moving to a custom domain later will
break it. For anything durable, buy the domain first.

When you are ready, it is roughly £10–15 a year through Cloudflare (at cost, no
markup) or Namecheap. Candidates, in rough order of how well they age:

- `pbtmap.org` — short, says what it is, and `.org` fits a free clinical tool
- `processmap.app`
- `pbtmapping.org`

Avoid tying it to a university or a study, since the tool should outlive both.
Moving is painless: add the domain in Cloudflare Pages, and the old pages.dev
address keeps working alongside it.

---

## 3. Before announcing it

- [ ] **Pilot with 3–5 clinicians.** Watch them use it without helping. Every
      remaining usability problem will surface in the first ten minutes.
- [ ] **Email Joseph Ciarrochi** with the link, as discussed.
- [ ] **Archive a release on Zenodo** for a citable DOI. Connect the GitHub repo
      to Zenodo, then cut a `v1.0.0` release; the DOI is minted automatically and
      each later release gets its own, with a concept DOI covering all versions.
- [ ] **Decide about the ethics amendment.** The public tool stores nothing, so
      it raises no data questions. Study mode is a separate deployment and is the
      one the committee needs to hear about.

## 4. Getting it used

In rough order of effort against reach:

1. **The process-based SIG** you are already part of. Highest signal, lowest
   effort, and the people most likely to give useful feedback.
2. **ACBS** — the listserv and the annual World Conference. A poster or a short
   demo session reaches exactly the right audience.
3. **A tool paper.** *Journal of Contextual Behavioral Science* is the natural
   home. With a Zenodo DOI and an open repository this is a modest write-up, and
   it is what makes the tool citable in other people's methods sections.
4. **Link it from the tutorial material** clinicians already use, if Ciarrochi
   is willing.

Two things worth doing early because they compound: keep a short CHANGELOG so
returning users can see it is maintained, and enable GitHub Issues so feedback
lands somewhere you can track rather than in your inbox.

## 5. Running costs

Nothing except the domain. Static hosting on Cloudflare's free tier has no
bandwidth ceiling, and the app has no backend. If study mode ever needs a server,
that is a separate deployment with a separate bill, and it does not affect the
public tool.

## 6. What to keep an eye on

- **Do not add analytics.** The privacy claim is a large part of why a clinician
  can open this with a real client in the room. A pageview counter would cost
  more than it is worth.
- **Keep `connect-src 'none'`** in `public/_headers` on the public build.
- **Keep the caveats** wherever the leverage and amplification numbers appear.
  They are a heuristic, and the interface saying so is what keeps the tool
  honest.

---

## Appendix: the exact commands

The repository is already initialised and committed locally. Three steps remain.

**1. Create an empty repository on GitHub** named `pbt-mapping-tool`. Public. Do
not let GitHub add a README, licence or `.gitignore` — they already exist here
and would conflict.

**2. Push it.** From the `app` folder. The remote is already configured.

```bash
cd "/Users/xiang/Desktop/Study 7/PBT Mapping Tool/app"
git remote add origin https://github.com/KeanSian/pbt-mapping-tool.git
git push -u origin main
```

If you already ran that once with the placeholder still in, git will say
`remote origin already exists`. Point it at the right address instead of adding
another:

```bash
git remote set-url origin https://github.com/KeanSian/pbt-mapping-tool.git
git remote -v      # check it reads back correctly before pushing
git push -u origin main
```

The branch is already named `main`, so there is no need to rename it.

**3. Connect Cloudflare.**

- dash.cloudflare.com → Workers & Pages → Create → Connect to Git
- Pick the repository
- Build command: `npm run build`
- Environment variables: none
- Save and Deploy

Cloudflare's current flow creates a **Worker** rather than a Pages project, even
though this is a purely static site. That is fine, and `wrangler.jsonc` in the
repository tells it so: the built `dist/` folder is declared as static assets,
which skips Wrangler's framework auto-detection.

Without that file the build succeeds and the *deploy* fails with:

```
[ERROR] The version of Vite used in the project ("5.4.21") cannot be
automatically configured. Please update the Vite version to at least ...
```

That error is about Cloudflare's own Vite plugin, which this project does not
use and does not need. The fix is the config file, not a Vite upgrade.

It builds in about a minute and gives you a `*.workers.dev` URL.

**Then check the security header actually landed**, since this is the one thing
that fails silently:

```bash
curl -sI https://pbt-mapping-tool.pages.dev/ | grep -i content-security-policy
```

You should see `connect-src 'none'` in the output. If the header is missing,
`public/_headers` did not make it into `dist/` — confirm the build output
directory is `dist` and not `app/dist`.

After that, every `git push` to `main` redeploys automatically.

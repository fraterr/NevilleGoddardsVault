---

# 📂 Vault

vault:
  kit_folder: /Users/simonebardini/Desktop/output
  include: 
    - '^(kitrc|index|navbar).md$'
    - '^blog/'
    - '^notes/'
  exclude: 
    - '^kit/'
    - '^templates/'
    - '^blog/draft'


# 🧰 Kit

kit:
  version: latest
  dirs: false


# 🖥️ Site

site:
  id: ngv_777
  name: Neville Goddard's Vault
  description: Welcome to Neville Goddard's Vault
  url: https://fraterr.github.io/neville
  keyswords: neville goddard, the law, imagination

og:
  image: https://publishkit.dev/attachements/og-image.png


# 🔌 Plugins

plugins: 
  theme: "@default"
  header: true
  darkmode: true
  navbar: true
  toc: true
  search: true
  social: true


# ⚙️  Plugins settings

social:
  github: https://publishkit.dev
  discord: https://publishkit.dev

dg-publish: true
---
# KITRC

KITRC stands for Kit **R**un **C**ommands.
It holds your app global configuration. 


Edit settings or add plugins, and export the file in your kit. If the file is valid frontmatter wise, you should see a `kitrc.json` at the root of your kit folder.


Check out https://publishkit.dev
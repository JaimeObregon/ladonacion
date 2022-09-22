# _La Donación_ full source code and documentation

[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)
<span class="badge-patreon"><a href="https://patreon.com/jaime_gomez_obregon" title="Apoya este proyecto en Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Botón para donar en Patreon" /></a></span>

---

_This documentation draft is a work in progress. I expect to have it completed
by September 24, 2022._

---

⭐ **Like it? Then star it on GitHub**. It only costs you a click and it greatly
helps discoverabilty. ❤️

---

[La donación](https://ladonacion.es) (Spanish for "the donation") is a
data-driven set of rich interactive visualizations exposing all the known
details about the donation in 2012 of 65 million euros from the then King of
Spain, Juan Carlos I, to businesswoman and socialite Corinna zu
Sayn-Wittgenstein.

The whole project, from the design of the data model to the coding itself, has
been done in 2021 by me, [Jaime Gómez-Obregón](https://jaime.gomezobregon.com).

This repository holds the full source code of the website at `ladonacion.es` and
the documentation needed to understand its architecture. By open sourcing it I
aim to encourage and pave the road for other data and investigative journalists
to share their own stories of public interest by reusing and building upon my
work.

While the web application is intended for a Spanish audience, both the source
code and this documentation are written in English.

|                       |                             |                          |
| --------------------- | --------------------------- | ------------------------ |
| ![](/docs/graph.webp) | ![](/docs/carto.webp)       | ![](/docs/search.webp)   |
| ![](/docs/docs.webp)  | ![](/docs/methodology.webp) | ![](/docs/timeline.webp) |

I have gathered all of the data exclusively from public sources. Most of it
comes from the legal proceedings, mainly in Geneve, Switzerland, leaked to and
published by the European press. Other sources the featured in the application's
extensive library ("[Biblioteca](https://ladonacion.es/biblioteca)") include:

- The Panama and Paradise papers and the Bahamas Leaks, all three published by
  the International Consortium of Investigative Journalists (ICIJ)
- The United Kingdom Companies House
- The Spanish Official Gazette ("Boletín Oficial del Estado")
- The Spanish Royal Household itself

I haver collected, analyzed and connected these documents with the help of a
custom methodoly and tooling available under [`/bin`](/bin).

This is a highly relevant and polarizing story in Spain and it has been one of
my goals from the very beginning to approach it from a document-driven and
opinion free framework.

The information architecture behind the application is laid out in a fashion
which makes it impossible to assert a fact if there is not at least one document
in the library providing evidence. So no claim is made and no position is taken
from me as a storyteller, and this is by design.

# Reuse and adapt it to convey your story!

This GitHub repository contains both the web application powering the
interactive visualizations and the details around this particular story. Both
—code and data— are separated and decoupled.

This means **the application can be easily reused and adapted to power other
investigations**. It best fits one which has can be clearly expressed in the
following four planes:

|                                                     |                                                                                                                             |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| <img src="docs/graph.webp" width="280" alt="" />    | 1. **A network of relations between persons or business entities**. ("[Who is who](https://ladonacion.es/entramado)")       |
| <img src="docs/timeline.webp" width="280" alt="" /> | 2. **A sequential set of events**. ("[The facts](https://ladonacion.es/cronologia)")                                        |
| <img src="docs/carto.webp" width="280" alt="" />    | 3. **A geographical dimension**. ("[The places](https://ladonacion.es/mapa)")                                               |
| <img src="docs/docs.webp" width="280" alt="" />     | 4. **A repository of documents** from which the whole story is derived. ("[The library](https://ladonacion.es/biblioteca)") |

# Technical overview

The technological stack comprises only web standards. The application is fully
static and writen in modern JavaScript (ECMAScript 6), web components, ES
modules, shadow DOM, HTML5, CSS3. Therefore there are no other user requisites
than a modern web browser.

The user interface is fully componentized. Other of my goals with this project
has been to demonstrate that it is possible to build a reasonably complex web
application [without frontend frameworks](https://www.frameworklessmovement.org)
such as React, Vue or Angular, and in the absence of transpilers such as Babel
and complex build processes.

The _Who is who_ dynamic graph is built upon Mike Bostock's excelent
[D3](https://d3js.org) charting library. The rest of the site if manually
crafted.

# Deployment

Deploy to production is done via `rsync` with every _push_ to the `master`
branch. See the provided GitHub action at
[`/.github/workflows/main.yml`](/.github/workflows/main.yml).

# How to contact, ask and contribute

Like in any open source software project, contributions to this repository are
very welcome. However, before submitting your contribution please note the
following:

- If you detect any issue in the software or have any questions, comments or
  requests, please
  **[open an issue](https://github.com/jaimeobregon/ladonacion.es/issues)** here
  on Github and I or the community will try to resolve it or respond to you.

- If your contribution or comment is about the plot of the story, please keep in
  mind that **I will only incorporate factual data that is supported by public
  sources or documents, ideally official sources and sufficiently established
  and recognized public media**. This is not a place for opinions,
  subjectivities or untested assumptions.

- Feel free to
  **[submit pull requests](https://github.com/jaimeobregon/ladonacion.es/pulls)**
  with your contributions, but before contributing, please open an issue first
  and share your plans. I have a very clear vision for this project and its
  goals, as well as high standards for merging contributions, so sharing your
  plans in an issue beforehand will maximize the chances of it being accepted.

- If you want to specifically address me as the original author of this project,
  you can **[reach me on Twitter](https://twitter.com/JaimeObregon)**.

# How to help

1. ⭐ **Star this project on GitHub**. It costs you only a click and it greatly
   helps its discoverabilty.

1. Contribute code or documentation.

1. [Support me on Patreon](https://www.patreon.com/jaime_gomez_obregon).

# License

This project is released under the GNU Affero General Public License (see
[`/LICENSE`](/LICENSE)).

    La donación
    Copyright (C) 2021-2022 Jaime Gómez-Obregón

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>.

---

_This documentation draft is a work in progress. I expect to have it completed
by September 24, 2022._

---

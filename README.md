# T'n'T Gym Ljubljana – Sodobna spletna stran

Sodobna, odzivna in na mobilne naprave osredotočena (mobile-first) spletna stran za borilni klub **T'n'T Gym Ljubljana** (Črnuče), specializiran za brazilski jiu-jitsu (BJJ), mešane borilne veščine (MMA), boks, kickbox/Muay Thai ter otroški boks.

Glavni cilj spletne strani je konverzija obiskovalcev v prijave na brezplačen prvi trening s primarnim pozivom k dejanju: **»Rezerviraj brezplačen prvi trening«**.

---

## 📁 Struktura projekta

```text
tnt-gym-ljubljana/
├── index.html              # Glavna vstopna stran (Homepage z vsemi 11 sekcijami)
├── bjj.html                # Podstran: Brazilski jiu-jitsu (BJJ)
├── mma.html                # Podstran: MMA (Mešane borilne veščine)
├── boks.html               # Podstran: Boks & Boks dame
├── kickbox.html            # Podstran: Kickbox in Muay Thai
├── otroci.html             # Podstran: Boks za otroke (5–12 let)
├── urnik.html              # Interaktivni urnik treningov s filtriranjem
├── cenik.html              # Pregleden cenik članarin in ugodnosti
├── trenerji.html           # Predstavitev strokovne trenerske ekipe
├── kontakt.html            # Lokacija, navodila za pot in obrazec za rezervacijo
├── css/
│   └── style.css           # Celovit CSS oblikovalski sistem (temna tema, tipografija, animacije)
├── js/
│   ├── schedule-data.js    # Verodostojni podatki o urnikih (za hitro posodabljanje)
│   └── main.js             # Skripte za meni, modalno okno, filtriranje urnika in FAQ
└── assets/
    └── images/             # Vektorske (SVG) grafike in prostori za fotografije
        ├── hero-gym.svg
        ├── bjj-program.svg
        ├── mma-program.svg
        ├── boks-program.svg
        ├── muaythai-program.svg
        ├── kids-program.svg
        ├── coach-gasper.svg
        ├── coach-ziga.svg
        ├── coach-tomi.svg
        ├── coach-luka.svg
        └── coach-ana.svg
```

---

## 🎨 Oblikovalska smer & blagovna znamka (Brand Direction)

- **Športno, energično, profesionalno in toplo sprejemajoče:** Klub je resen in visoko kakovosten, vendar primeren za začetnike in nevsiljiv.
- **Temna tema (Dark Theme):** Barvna paleta z globoko črno (`#0b0c10`), grafitnimi površinami (`#12141a`, `#181b24`), belim kontrastnim besedilom ter močnim rdeče-oranžnim poudarkom (`#ff3b30`, `#ff7a18`).
- **SEO & Structured Data:** Vključeni JSON-LD podatki po standardih Schema.org za `SportsActivityLocation`, `ExerciseGym`, `Course` in `FAQPage`.
- **Mobilna prijaznost:** Gladka navigacija na dotik, hamburger meni, prilagojena preglednica urnika ter hitro modalno okno za rezervacijo.

---

## 📸 Kje in kako zamenjati slike z realnimi fotografijami?

Vse slike v mapi `assets/images/` so trenutno izdelane kot visoko kakovostni SVG predlogi z jasnimi oznakami. Za uporabo realnih fotografij iz kluba preprosto shranite fotografije v mapo `assets/images/` ali zamenjajte poti v HTML datotekah:

| Lokacija | Priporočena slika / format | Referenca iz tnt-gym.si |
| :--- | :--- | :--- |
| **Hero ozadje** | `assets/images/hero-gym.jpg` ali `.webp` | `img/tnt/rupa1-2.jpg` (dvorana) |
| **MMA program** | `assets/images/mma-program.jpg` | `img/tnt/jakob-ring.jpg` (kletka / ring) |
| **BJJ program** | `assets/images/bjj-program.jpg` | `img/tnt/ziga.jpg` (tatami / parter) |
| **Boks program** | `assets/images/boks-program.jpg` | `img/tnt/jakob-coach.jpg` ali `tomi.jpg` |
| **Muay Thai** | `assets/images/muaythai-program.jpg` | `img/tnt/luka-martinec.jpg` |
| **Otroški boks** | `assets/images/kids-program.jpg` | `img/tnt/ana.jpg` |
| **Gašper Sodnik** | `assets/images/coach-gasper.jpg` | `img/tnt/gasper.jpg` |
| **Žiga Očko** | `assets/images/coach-ziga.jpg` | `img/tnt/ziga.jpg` |
| **Tomislav Šude** | `assets/images/coach-tomi.jpg` | `img/tnt/tomi.jpg` |
| **Luka Martinec** | `assets/images/coach-luka.jpg` | `img/tnt/luka-martinec.jpg` |
| **Ana Lipovšek** | `assets/images/coach-ana.jpg` | `img/tnt/ana.jpg` |

---

## 🕒 Kako posodobiti urnik treningov?

Vsi podatki o tedenskem urniku se nahajajo na enem mestu v datoteki **`js/schedule-data.js`**.
Za dodajanje ali spremembo termina preprosto uredite vnos v tabeli `SCHEDULE_DATA`:

```javascript
{
  day: "tue",                    // "mon", "tue", "wed", "thu", "fri", "sat"
  dayName: "Torek",
  time: "16:30 - 18:00",
  sport: "mma",                  // "mma", "bjj", "box", "mt", "kids", "open-mat"
  title: "MMA začetniki",
  coach: "Luka Martinec",
  level: "Začetniki (brez predznanja)",
  location: "Glavna dvorana"
}
```
Sprememba se samodejno odraža na interaktivnem urniku na vstopni strani in podstrani `urnik.html`.

---

## 📞 Realni kontaktni podatki (izvlečeni iz vira)

- **Naslov:** Cesta 24. junija 23, 1231 Ljubljana-Črnuče
- **Telefon:** 031 784 174 (Toni / Tomislav Šude)
- **E-pošta:** info@tnt-gym.si / tonisude@gmail.com
- **Družbena omrežja:**
  - Facebook: [facebook.com/tntcrnuce](https://www.facebook.com/tntcrnuce)
  - Instagram: [instagram.com/tntcrnuce](https://www.instagram.com/tntcrnuce/)

---

## 🚀 Zagon in ogled

Spletno stran lahko odprete neposredno z dvoklikom na `index.html` v kateremkoli sodobnem brskalniku (Chrome, Firefox, Safari, Edge) ali z lokalnim statičnim strežnikom (npr. z razširitvijo *Live Server* v VS Code).

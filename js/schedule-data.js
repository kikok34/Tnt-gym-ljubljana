/**
 * T'N'T GYM LJUBLJANA - SCHEDULE DATA
 * Verodostojni podatki o urniku treningov iz uradne spletne strani tnt-gym.si
 * 
 * VSEBINA ZA UREJANJE:
 * Spodaj lahko kadarkoli dodate, spremenite ali odstranite treninge in urnike.
 */

const SCHEDULE_DATA = [
  // PONEDELJEK
  {
    day: "mon",
    dayName: "Ponedeljek",
    time: "16:30 - 17:15",
    sport: "kids",
    title: "Boks otroci",
    sub: "od 5 do 12 let",
    coach: "Anita Krapež",
    level: "Otroci / Začetniki",
    location: "Glavna dvorana"
  },
  {
    day: "mon",
    dayName: "Ponedeljek",
    time: "17:00 - 18:00",
    sport: "box",
    title: "Boks dame",
    sub: "Ženska skupina",
    coach: "Tomislav Šude",
    level: "Vsi nivoji",
    location: "Ring dvorana"
  },
  {
    day: "mon",
    dayName: "Ponedeljek",
    time: "18:00 - 19:30",
    sport: "box",
    title: "Boks",
    sub: "Tehnika in kondicija",
    coach: "Tomislav Šude",
    level: "Začetniki & nadaljevalci",
    location: "Glavna dvorana"
  },
  {
    day: "mon",
    dayName: "Ponedeljek",
    time: "19:30 - 21:00",
    sport: "open-mat",
    title: "Odprt trening",
    sub: "Open Mat za člane",
    coach: "Dežurni trener",
    level: "Vsi člani",
    location: "Dvorana z blazinami"
  },

  // TOREK
  {
    day: "tue",
    dayName: "Torek",
    time: "16:30 - 18:00",
    sport: "mma",
    title: "MMA začetniki",
    sub: "Osnove mešanih borilnih veščin",
    coach: "Luka Martinec",
    level: "Začetniki (brez predznanja)",
    location: "Glavna dvorana"
  },
  {
    day: "tue",
    dayName: "Torek",
    time: "18:00 - 19:30",
    sport: "mma",
    title: "MMA",
    sub: "Nadaljevalna & tekmovalna skupina",
    coach: "Gašper Sodnik",
    level: "Nadaljevalci & tekmovalci",
    location: "Glavna dvorana & kletka"
  },
  {
    day: "tue",
    dayName: "Torek",
    time: "19:30 - 21:00",
    sport: "bjj",
    title: "BJJ (Brazilski Jiu-Jitsu)",
    sub: "No-Gi grappling & parter",
    coach: "Žiga Očko",
    level: "Začetniki & napredni",
    location: "Tatami dvorana"
  },

  // SREDA
  {
    day: "wed",
    dayName: "Sreda",
    time: "16:30 - 17:15",
    sport: "kids",
    title: "Boks otroci",
    sub: "od 5 do 12 let",
    coach: "Anita Krapež",
    level: "Otroci / Začetniki",
    location: "Glavna dvorana"
  },
  {
    day: "wed",
    dayName: "Sreda",
    time: "17:00 - 18:00",
    sport: "box",
    title: "Boks dame",
    sub: "Ženska skupina",
    coach: "Tomislav Šude",
    level: "Vsi nivoji",
    location: "Ring dvorana"
  },
  {
    day: "wed",
    dayName: "Sreda",
    time: "18:00 - 19:30",
    sport: "box",
    title: "Boks",
    sub: "Tehnika, vreče in sparingi",
    coach: "Tomislav Šude",
    level: "Vsi nivoji",
    location: "Glavna dvorana"
  },
  {
    day: "wed",
    dayName: "Sreda",
    time: "19:30 - 21:00",
    sport: "mma",
    title: "MMA",
    sub: "Rokoborba & prehodi ob kletki",
    coach: "Gašper Sodnik",
    level: "Vsi nivoji",
    location: "Glavna dvorana"
  },

  // ČETRTEK
  {
    day: "thu",
    dayName: "Četrtek",
    time: "16:00 - 18:00",
    sport: "mt",
    title: "Muay Thai za MMA",
    sub: "Tajski boks, klinč in udarci",
    coach: "Luka Martinec",
    level: "Začetniki & nadaljevalci",
    location: "Glavna dvorana"
  },
  {
    day: "thu",
    dayName: "Četrtek",
    time: "18:00 - 19:30",
    sport: "box",
    title: "Boks",
    sub: "Kondicija in koordinacija",
    coach: "Tomislav Šude",
    level: "Vsi nivoji",
    location: "Glavna dvorana"
  },
  {
    day: "thu",
    dayName: "Četrtek",
    time: "19:30 - 21:00",
    sport: "bjj",
    title: "BJJ (Brazilski Jiu-Jitsu)",
    sub: "No-Gi tehnika & sparing (rolanje)",
    coach: "Žiga Očko",
    level: "Začetniki & napredni",
    location: "Tatami dvorana"
  },

  // PETEK
  {
    day: "fri",
    dayName: "Petek",
    time: "16:30 - 18:00",
    sport: "mma",
    title: "MMA začetniki",
    sub: "Kombinacije in sparing nadzor",
    coach: "Luka Martinec",
    level: "Začetniki",
    location: "Glavna dvorana"
  },
  {
    day: "fri",
    dayName: "Petek",
    time: "18:00 - 19:30",
    sport: "mma",
    title: "MMA",
    sub: "Kompletna borba in kondicija",
    coach: "Gašper Sodnik",
    level: "Nadaljevalci",
    location: "Glavna dvorana"
  },
  {
    day: "fri",
    dayName: "Petek",
    time: "19:30 - 21:00",
    sport: "bjj",
    title: "BJJ (Brazilski Jiu-Jitsu)",
    sub: "No-Gi podreditve in prehodi garde",
    coach: "Žiga Očko",
    level: "Začetniki & napredni",
    location: "Tatami dvorana"
  },

  // SOBOTA
  {
    day: "sat",
    dayName: "Sobota",
    time: "10:00 - 11:00",
    sport: "mt",
    title: "Muay Thai za MMA",
    sub: "Tehnika udarcev & timing",
    coach: "Luka Martinec",
    level: "Vsi nivoji",
    location: "Glavna dvorana"
  },
  {
    day: "sat",
    dayName: "Sobota",
    time: "11:00 - 12:30",
    sport: "open-mat",
    title: "Odprt trening (Open Mat)",
    sub: "Prosti sparingi (BJJ, MMA, Boks)",
    coach: "Dežurni trener",
    level: "Vsi člani kluba",
    location: "Tatami dvorana"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SCHEDULE_DATA };
}

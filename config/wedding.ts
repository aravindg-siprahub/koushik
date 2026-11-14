/**
 * Central wedding configuration.
 * Every name, date, timing, venue, image and audio path used on the site lives here.
 * Venue text comes from the family's printed invitation — never invent addresses.
 */

export type EventIcon =
  | "haldi"
  | "sangeeth"
  | "eduru"
  | "groom"
  | "upanayanam"
  | "wedding"
  | "vratham"
  | "reception";

export type VenueKey = "chirala" | "home" | "kalyanaVedika" | "megaConvention";

export interface Venue {
  key: VenueKey;
  name: string;
  /** Address lines exactly as given by the family. */
  address: string[];
  city: string;
  /** Used to build a Google Maps search/directions link. Set `mapsUrl` to override. */
  mapsQuery: string;
  mapsUrl?: string;
  events: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  telugu: string;
  /** ISO 8601 with IST offset. */
  start: string;
  timeLabel: string;
  note?: string;
  icon: EventIcon;
  venue?: VenueKey;
  highlight?: boolean;
}

export interface EventDay {
  date: string; // YYYY-MM-DD
  month: string;
  day: string;
  weekday: string;
  events: WeddingEvent[];
}

export const couple = {
  groom: {
    firstName: "Koushik",
    fullName: "Penugonda Koushik",
    telugu: "కౌశిక్",
    qualification: "B.Tech",
    parents: "Sri Penugonda Venkata Seshagiri & Smt. Sowjanya",
    relation: "Beloved son of",
  },
  bride: {
    firstName: "Srija",
    fullName: "Thatavarthy Valli Srija",
    telugu: "శ్రీజ",
    qualification: "B.Tech",
    parents: "Sri Thatavarthy Suresh & Smt. Lakshmi",
    relation: "Beloved daughter of",
    hometown: "Bapatla",
  },
  /** Display name — always KOUSHIK & SRIJA. */
  display: "Koushik & Srija",
  monogram: "K S",
} as const;

export const blessing = {
  telugu: "శ్రీరస్తు  శుభమస్తు  అవిఘ్నమస్తు",
  short: "శ్రీరస్తు శుభమస్తు",
  transliteration: "Sri Rastu · Shubhamastu · Avighnamastu",
  invocation: "ఓం శ్రీ గణేశాయ నమః",
  invocationEnglish: "Om Sri Ganeshaya Namah",
  shloka: ["వక్రతుండ మహాకాయ సూర్యకోటి సమప్రభ ।", "నిర్విఘ్నం కురు మే దేవ సర్వకార్యేషు సర్వదా ॥"],
  shlokaMeaning:
    "O Lord with the curved trunk and mighty form, radiant as a million suns — remove every obstacle from all our undertakings, always.",
  /**
   * Deities invoked for blessings. Set `image` to a photo path (e.g. "/images/ganesha.jpg")
   * to show a photograph; otherwise the hand-drawn gold emblem is used.
   */
  deities: [
    { id: "ganesha", name: "Sri Vighneshwara", mantra: "ఓం శ్రీ గణేశాయ నమః", english: "Om Sri Ganeshaya Namah", image: null as string | null },
    { id: "venkateswara", name: "Sri Venkateswara Swamy", mantra: "ఓం నమో వేంకటేశాయ", english: "Om Namo Venkatesaya", image: null as string | null },
    { id: "shiva", name: "Sri Shiva Parvathi", mantra: "ఓం నమః శివాయ", english: "Om Namah Shivaya", image: null as string | null },
  ],
};

export const dateRangeLabel = "November 15 – 22, 2026";

/** The muhurtham — used for the live countdown (Asia/Kolkata, UTC+05:30). */
export const muhurtham = {
  iso: "2026-11-21T20:52:00+05:30",
  timeZone: "Asia/Kolkata",
  label: "Saturday, 21 November 2026 · 8:52 PM IST",
  telugu:
    "శ్రీ పరాభవ నామ సంవత్సర కార్తీక శుద్ధ ద్వాదశి, శనివారం రాత్రి గం॥ 8-52 ని॥లకు రేవతి నక్షత్ర యుక్త మిథున లగ్న శుభ పుష్కరాంశమున",
};

export const venues: Record<VenueKey, Venue> = {
  chirala: {
    key: "chirala",
    name: "Aarna Resorts",
    address: ["Chirala"],
    city: "Chirala",
    mapsQuery: "Aarna Resorts, Chirala, Andhra Pradesh",
    events: "Haldi & Sangeeth · Nov 15",
  },
  home: {
    key: "home",
    name: "Our Residence",
    address: ["Flat 302, A Block, Thirumala Palace", "Kota Bazaar, Narasaraopet – 522601"],
    city: "Narasaraopet",
    mapsQuery: "Thirumala Palace, Kota Bazaar, Narasaraopet 522601",
    events: "Eduru Nadavadam, Groom Making & Upanayanam · Nov 19",
  },
  kalyanaVedika: {
    key: "kalyanaVedika",
    name: "Sai Grand Function Hall",
    address: ["Hanumantharao Colony", "Bapatla"],
    city: "Bapatla",
    mapsQuery: "Sai Grand Function Hall, Hanumantharao Colony, Bapatla",
    events: "Wedding Ceremony · Nov 21",
  },
  megaConvention: {
    key: "megaConvention",
    name: "Mega Convention",
    address: ["Chilakaluripet Road", "Narasaraopet"],
    city: "Narasaraopet",
    mapsQuery: "Mega Convention, Chilakaluripet Road, Narasaraopet",
    events: "Vratham & Reception · Nov 22",
  },
};

export const schedule: EventDay[] = [
  {
    date: "2026-11-15",
    month: "Nov",
    day: "15",
    weekday: "Sunday",
    events: [
      { id: "haldi", name: "Haldi", telugu: "పసుపు", start: "2026-11-15T09:00:00+05:30", timeLabel: "9:00 AM", icon: "haldi", venue: "chirala" },
      { id: "sangeeth", name: "Sangeeth", telugu: "సంగీత్", start: "2026-11-15T19:00:00+05:30", timeLabel: "7:00 PM", icon: "sangeeth", venue: "chirala" },
    ],
  },
  {
    date: "2026-11-19",
    month: "Nov",
    day: "19",
    weekday: "Thursday",
    events: [
      { id: "eduru", name: "Eduru Nadavadam", telugu: "ఎదురు నడవడం", start: "2026-11-19T07:00:00+05:30", timeLabel: "7:00 AM", icon: "eduru", venue: "home" },
      { id: "groom-making", name: "Groom Making", telugu: "పెళ్ళికొడుకును చేయడం", start: "2026-11-19T09:00:00+05:30", timeLabel: "9:00 AM", icon: "groom", venue: "home" },
      { id: "upanayanam", name: "Upanayanam", telugu: "ఉపనయనం", start: "2026-11-19T11:40:00+05:30", timeLabel: "11:40 AM", icon: "upanayanam", venue: "home" },
    ],
  },
  {
    date: "2026-11-21",
    month: "Nov",
    day: "21",
    weekday: "Saturday",
    events: [
      { id: "wedding", name: "Wedding Ceremony", telugu: "శుభ ముహూర్తం", start: muhurtham.iso, timeLabel: "8:52 PM", note: "Muhurtham", icon: "wedding", venue: "kalyanaVedika", highlight: true },
    ],
  },
  {
    date: "2026-11-22",
    month: "Nov",
    day: "22",
    weekday: "Sunday",
    events: [
      { id: "vratham", name: "Sri Satyanarayana Swamy Vratham", telugu: "సత్యనారాయణ వ్రతం", start: "2026-11-22T09:00:00+05:30", timeLabel: "9:00 AM", icon: "vratham", venue: "megaConvention" },
      { id: "reception", name: "Reception", telugu: "రిసెప్షన్ & విందు", start: "2026-11-22T20:00:00+05:30", timeLabel: "8:00 PM", icon: "reception", venue: "megaConvention" },
    ],
  },
];

export const hospitality = {
  items: ["Accommodation", "Breakfast", "Lunch", "Dinner"],
  note: "Arrangements are made on all days for the comfort and convenience of our guests.",
};

/**
 * Text of the family's printed invitation card — reproduced exactly as printed.
 * Do not add or rephrase lines here.
 */
export const printedCard = {
  photo: "/images/printed-invitation.jpg",
  blessing: "శ్రీరస్తు - శుభమస్తు - అవిఘ్నమస్తు",
  title: "వివాహ మహోత్సవ ఆహ్వాన శుభపత్రిక",
  shloka: ["శ్లో॥ శ్రీరామపత్నీ జనకస్య పుత్రీ సీతాంగనా సుందర కోమలాంగీ ।", "భూగర్భజాతా భువనైకమాతా, వధూవరాభ్యాం వరదాస్తు నిత్యమ్ ॥"],
  upanayanam: {
    heading: "ఉపనయనం",
    lines: ["ది. 19-11-2026 గురువారం", "ఉదయం గం॥ 11-40 ని॥లకు", "నరసరావుపేట, కోట బజారులోని", "మా స్వగృహము నందు"],
  },
  onlySon: "మా ఏకైక పుత్రుడు",
  groom: { label: "వరుడు :", prefix: "చి॥", name: "కౌశిక్", suffix: "B.Tech. కు" },
  bride: { label: "వధువు :", prefix: "చి॥ల॥సౌ॥", name: "వల్లీ శ్రీజ", suffix: "B.Tech. ను" },
  brideParents: "(బాపట్ల పట్టణ వాస్తవ్యులు శ్రీ తటవర్తి సురేష్ & శ్రీమతి లక్ష్మి గార్ల ఏకైక పుత్రిక)",
  decided: "ఇచ్చి వివాహము జరుపుటకు దైవజ్ఞులు సుముహూర్తం నిశ్చయించినారు.",
  muhurthamHeading: "సుముహూర్తం",
  muhurtham: [
    "స్వస్తి శ్రీ చాంద్రమానేన శ్రీ పరాభవ నామ సంవత్సర కార్తీక శుద్ధ ద్వాదశి ది. 21-11-2026 శనివారం రాత్రి గం॥ 8-52 ని॥లకు",
    "రేవతీ నక్షత్ర యుక్త - మిథున లగ్న శుభ పుష్కరాంశము నందు.",
  ],
  vedika: { label: "కళ్యాణ వేదిక :", value: "సాయి గ్రాండ్ ఫంక్షన్ హాల్, హనుమంతరావు కాలనీ, బాపట్ల" },
  vratham: {
    heading: "శ్రీ సత్యనారాయణ స్వామివారి వ్రతం :",
    lines: ["ది. 22-11-2026 ఆదివారం", "ఉదయం 9-00 గంటలకు నరసరావుపేట,", "చిలకలూరిపేట రోడ్‌లోని మెగా కన్వెన్షన్ నందు"],
  },
  reception: {
    heading: "రిసెప్షన్ & విందు :",
    lines: ["ది. 22-11-2026 ఆదివారం", "రాత్రి 8-00 గంటలకు నరసరావుపేట,", "చిలకలూరిపేట రోడ్‌లోని మెగా కన్వెన్షన్ నందు"],
  },
  requestHeading: "విన్నపము",
  request: "ముత్యాల పందిరిలో వేదమంత్రాలు, మంగళ హారతుల మధ్య పవిత్రమైన మీ ఆశీర్వాదాలే మా చిన్నారులకు శ్రీరామరక్ష!",
  grandparents: { label: "తాతయ్య-నాయనమ్మ :", value: "కీ॥శే॥ పెనుగొండ కబ్బయ్య & నాగాంజమ్మ గార్ల ఆశీస్సులతో..." },
  hosts: { label: "ఆహ్వానించువారు :", value: "శ్రీ పెనుగొండ వెంకట శేషగిరి & శ్రీమతి సౌజన్య" },
  sibling: "మా అన్నయ్య పెళ్లికి రారండి! సందడి చేద్దాం! - సహిత్",
  relatives: [
    "తాతయ్య-అమ్మమ్మ: శ్రీ కొప్పరావూరి కనకారావు & శ్రీమతి చెంచులక్ష్మి; మామయ్య-మేనత్త: శ్రీ అన్నా శ్రీనివాసరావు & శ్రీమతి రమాదేవి;",
    "పెదనాన్న-పెద్దమ్మ: శ్రీ పెనుగొండ రమణారావు & శ్రీమతి లీలావతి; బాబాయిలు-పిన్నిలు: శ్రీ వక్కలగడ్డ సురేష్ & శ్రీమతి ప్రతిమ;",
    "శ్రీ ఆరమడక శశాంక్ & శ్రీమతి దీప్తి గార్లు మరియు బంధుమిత్రుల అభినందనలతో...",
  ],
};

/**
 * Images. Set a value to `null` to fall back to an illustrated placeholder.
 * Real photographs supplied by the family are in /public/images.
 */
export const images = {
  /** Only photographs of the couple together are used (no solo portraits). */
  couple: "/images/couple.jpg" as string | null,
  coupleTogether: "/images/gallery-varamala.jpg" as string | null,
  /** Optional photographs — the site uses hand-drawn illustrations when these are null. */
  mandapam: null as string | null, // e.g. "/images/mandapam.jpg"
  temple: null as string | null, // e.g. "/images/temple.jpg"
  gallery: [
    { src: "/images/gallery-together.jpg", alt: "Koushik and Srija beneath a framed painting", w: 1067, h: 1600 },
    { src: "/images/gallery-sweet.jpg", alt: "Koushik and Srija sharing cake on stage", w: 1600, h: 1066 },
    { src: "/images/gallery-fun.jpg", alt: "Koushik and Srija in sunglasses on the stage", w: 1600, h: 1066 },
  ],
  /**
   * Photos that rotate in the hero background and scroll past in gold arch frames.
   * `position` is the CSS object-position that keeps both faces in frame.
   */
  hero: [
    { src: "/images/couple.jpg", alt: "Koushik and Srija holding hands", w: 1067, h: 1600, position: "50% 18%" },
    { src: "/images/gallery-varamala.jpg", alt: "Koushik and Srija with lotus and jasmine garlands", w: 1067, h: 1600, position: "50% 28%" },
    { src: "/images/gallery-sweet.jpg", alt: "Koushik and Srija sharing cake on stage", w: 1600, h: 1066, position: "52% 40%" },
    { src: "/images/gallery-together.jpg", alt: "Koushik and Srija beneath a framed painting", w: 1067, h: 1600, position: "50% 72%" },
    { src: "/images/gallery-fun.jpg", alt: "Koushik and Srija in sunglasses on the stage", w: 1600, h: 1066, position: "50% 45%" },
  ],
};

/** The family's invitation video: a silent loop for the hero background, and the full version with sound. */
export const video = {
  background: "/videos/invitation-bg.mp4",
  full: "/videos/invitation.mp4",
  poster: "/videos/invitation-poster.jpg",
  title: "Our wedding invitation video",
};

/**
 * Background music. Any audio file placed in /public/audio is detected automatically
 * and plays when the site opens (or on the guest's first tap, if the browser blocks sound
 * until then). With no file in that folder, the music button stays hidden.
 */
export const audio = {
  /** Display titles by filename; other files are titled from their filename. */
  titles: {
    "wedding-song.mp3": "Kalyanam Vaibhogam · Srinivasa Kalyanam",
    "wedding-music.mp3": "Koushik weds Srija",
  } as Record<string, string>,
  volume: 0.6,
};

export const site = {
  title: "Koushik & Srija · Wedding Invitation · November 2026",
  description:
    "With the blessings of our elders, we warmly invite you to celebrate the wedding of Koushik & Srija — November 15–22, 2026.",
};

export function mapsLink(v: Venue): string {
  return v.mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.mapsQuery)}`;
}

export function directionsLink(v: Venue): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(v.mapsQuery)}`;
}

/**
 * ──────────────────────────────────────────────────────────────
 *  EDIT THIS FILE – every link and text on the page comes from here.
 *  Values marked "REPLACE" are placeholders.
 * ──────────────────────────────────────────────────────────────
 */
export interface Profile {
  name: string;
  title: string;
  /** Public URL of this page (QR code + share buttons). "" = the URL the page is opened from. */
  shareUrl: string;
  shareMessage: string;
  social: {
    instagram: string;
    facebook: string;
  };
  contact: {
    phones: [string, string];
    /** International format, digits only */
    whatsapp: string;
    whatsappGreeting: string;
    email: string;
    website: string;
    hoursSummary: string;
    hours: [day: string, time: string][];
    address: string;
    /** Text used to centre the embedded Google map */
    mapQuery: string;
    /** "Open in Google Maps" link */
    mapUrl: string;
  };
  /** Google "write a review" link – used by the Google logo */
  reviewUrl: string;
  /** Use \n for the manual line breaks shown in the design */
  about: string;
  credit: { text: string; byline: string };
}

export const profile: Profile = {
  name: "Lympha Resto",
  title: "Restaurant",

  shareUrl: "", // REPLACE with your live address, e.g. "https://lympha.example.com"
  shareMessage: "Check out Lympha Resto – delicious food and warm hospitality.",

  social: {
    instagram: "https://www.instagram.com/lympha_resto?vrfl=cjVtM2ttaWVrZGps", // REPLACE
    facebook: "https://www.facebook.com/share/19cmRH2D2s/", // REPLACE
  },

  contact: {
    phones: ["+91 91436 62111", "+91 91436 63111"], // REPLACE
    whatsapp: "919143662111", // REPLACE
    whatsappGreeting: "Hello Lympha Resto!",
    email: "lympharesto@gmail.com",
    website: "https://www.lympharesto.com", // REPLACE
    hoursSummary: "Open daily · 8:00 AM – 1:00 AM",
        hours: [
      ["Monday – Sunday", "8:00 AM – 1:00 AM"],
    ],
    address: "Lympha Resto, Ollur Kadavu, Ulliyeri, Kozhikode, Kerala", // REPLACE
    mapQuery: "Lympha Resto, Ollur Kadavu, Ulliyeri, Kozhikode, Kerala", // REPLACE
    mapUrl: "https://www.google.com/maps/@11.4265117,75.738212,20.02z?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D", // REPLACE
  },

  reviewUrl: "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID", // REPLACE

  about:
    "At Lympha Resto, every visit brings a sense of comfort,\n connection and joy. A welcoming space \nwhere moments turn into memories and \nevery visit feels special.",

  credit: { text: "Lympha Resto. All rights reserved.", byline: "Developed and designed by Fadil" },
};

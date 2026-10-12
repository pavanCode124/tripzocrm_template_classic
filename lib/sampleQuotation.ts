import type { QuotationData } from "@/components/quotation-template/types";

/**
 * Sample data for the preview app only — shaped exactly like what your CRM
 * would fetch for quotation #2625 (Anudeep Reddy / Kerala) and pass into
 * <QuotationTemplate data={...} />. Swap this for a real API/DB call when
 * wiring the component into your CRM (see lib/tripzoAdapter.ts).
 */
export const sampleQuotation: QuotationData = {
  quotationNumber: "2625",
  quotationDate: "12 Oct 2026",
  heroImageUrl:
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
  destinationTag: "KERALA",
  title: "Kerala Package for Anudeep Reddy",
  heroSummary: "5 Nights / 6 Days | 21 Oct 2026 | 4 Adults",

  agency: {
    name: "Offbeat Compass",
    phone: "9866502095",
    email: "offbeatsrikanth@gmail.com",
    website: "https://offbeatcompass.com/",
  },

  trip: {
    customerName: "Anudeep Reddy",
    destination: "Munnar, Thekkady, Alleppey, Kovalam",
    duration: "5 Nights / 6 Days",
    travelDate: "21 Oct 2026",
    pax: "4 Adults",
    rooms: "2 Rooms",
    preparedBy: "Swarupa",
  },

  price: {
    perPersonLabel: "Per Adult",
    pax: 4,
    rate: "₹10",
    perPersonAmount: "₹40",
    totalLabel: "Total Package Cost",
    totalAmount: "₹40",
  },

  servicesInclude: ["Hotels", "Tours"],

  hotels: [
    {
      name: "Trivers",
      location: "Munnar, India",
      stars: 4,
      nights: 2,
      roomType: "Deluxe A/C",
      mealPlan: "Breakfast Only (CP)",
      checkInDate: "21 Oct 2026",
      checkInTime: "14:00",
      checkOutDate: "23 Oct 2026",
      checkOutTime: "12:00",
    },
    {
      name: "Aura Thekkady",
      location: "Thekkady, India",
      stars: 3,
      nights: 1,
      roomType: "Standard",
      mealPlan: "Breakfast Only (CP)",
      checkInDate: "23 Oct 2026",
      checkInTime: "14:00",
      checkOutDate: "24 Oct 2026",
      checkOutTime: "12:00",
    },
    {
      name: "Royal Houseboats",
      location: "Alleppey, India",
      stars: 3,
      nights: 1,
      roomType: "Deluxe Houseboat (Sharing)",
      mealPlan: "Breakfast Only (CP)",
      checkInDate: "24 Oct 2026",
      checkInTime: "14:00",
      checkOutDate: "25 Oct 2026",
      checkOutTime: "12:00",
    },
    {
      name: "Hotel Paradise",
      location: "Kovalam, India",
      stars: 3,
      nights: 1,
      roomType: "Standard A/C",
      mealPlan: "Breakfast Only (CP)",
      checkInDate: "25 Oct 2026",
      checkInTime: "14:00",
      checkOutDate: "26 Oct 2026",
      checkOutTime: "12:00",
    },
  ],

  itinerary: [
    {
      day: 1,
      title: "Cochin To Munnar and Sightseeing",
      location: "Munnar",
      date: "Wed, 21 Oct 2026",
      bullets: [
        "Pick up from Cochin Airport or Railway Station.",
        "Proceed towards Munnar (140 km / 4.30 hrs) through scenic routes",
        "Visit the Spice Plantation en route.",
        "Stop at the stunning **Cheeyappara Waterfalls**, **Valara Waterfalls** (seasonal), Karadippara Viewpoint, and enjoy the view of lush Tea Gardens.",
        "Optional adventure: Zip Lining for a thrilling experience.",
        "Upon arrival, check-in at your hotel in **Munnar**.",
        "Overnight stay in **Munnar**.",
      ],
      transferTag: "Shared Transfer",
      meals: ["Breakfast (Hotel)"],
    },
    {
      day: 2,
      title: "Cochin To Munnar Via Athirapally",
      location: "Munnar",
      date: "Thu, 22 Oct 2026",
      bullets: [
        "Arrival at Cochin (Kochi) airport by 10:00 AM",
        "Pick up from Cochin and drive to Munnar via **Athirappilly Waterfalls**",
        "Spend some time at Falls and Drive to Munnar.",
        "Reach **Munnar** and rest for the day at the hotel.",
      ],
      transferTag: "Shared Transfer",
      meals: ["Breakfast (Hotel)"],
    },
    {
      day: 3,
      title: "Munnar to Thekkady (3hrs)",
      location: "Thekkady",
      date: "Fri, 23 Oct 2026",
      bullets: [
        "Enjoy a **breakfast** and check out from the houseboat.",
        "Proceed towards the lively town of **Thekkady**.",
        "On arrival, check in to your hotel and take some time to **relax and refresh**.",
        "Head out for an exciting **Jeep Safari in Periyar National Park** _(at your own cost)_ — a renowned wildlife sanctuary home to:",
        "Elephants",
        "Sambar deer",
        "Tigers",
        "Gaur",
        "Lion-tailed macaques",
        "Nilgiri langurs and more",
        "After the safari, enjoy a serene **boat ride on Periyar Lake** _(at your own cost)_ to spot wildlife up close.",
        "Post boating, visit nearby **spice plantations** and enjoy some **local shopping**.",
        "If time permits, you may also watch:",
        "**Kathakali Show** _(at your own cost)_",
        "**Kalarippayattu Show** _(at your own cost)_",
        "Return to your hotel for a **comfortable overnight stay in Thekkady**.",
      ],
      note: {
        heading: "Important Note:",
        lines: [
          "To avoid rush, please book in advance:",
          "https://www.periyartigerreserve.org",
          "https://boating.ktdcbooking.com/",
        ],
      },
      transferTag: "Shared Transfer",
      meals: ["Breakfast (Hotel)"],
    },
    {
      day: 4,
      title: "Munnar to Alleppey and Check-into Houseboat",
      location: "Alleppey",
      date: "Sat, 24 Oct 2026",
      bullets: [
        "Wake up and freshen up and have breakfast.",
        "Check-out from the hotel and drive towards Alleppey; the backwater capital of Kerala also known as the 'Venice of the East'",
        "Upon arrival in Alleppey, Check in to the Hotel / Houseboat.",
        "Have traditional Kerala cuisine for Lunch.",
        "Post this, you can take an exciting backwater cruise and discover the lush beauty of Alleppey's amazing network of canals, evergreen paddy fields, coconut lagoons, and coir villages.",
        "Dinner and Overnight stay will be at the houseboat.",
      ],
      transferTag: "Shared Transfer",
      meals: ["Breakfast (Hotel)"],
    },
    {
      day: 5,
      title: "Trivendrum Sightseeing & Stay at Kovalam",
      location: "Kovalam",
      date: "Sun, 25 Oct 2026",
      bullets: [
        "On this day, we can either go for **Trivandrum city** tour or spend time at **Kovalam beach** till evening.",
        "Trivandrum sightseeing includes Sree Padmanabha Swami Temple, Kuthiramalika Palace Museum, Napier Museum, Sree Chithra Art Gallery, Zoological Park, Kanakakunnu Palace, Azhimala Temple and Planetarium.",
        "Overnight stay at Kovalam.",
      ],
      italicNote:
        "Sree Padmanabha Temple opens from 5 am to 11 am and 3 pm to 6:30 pm. Museum, Palace, Art gallery, Zoo, and Planetarium are closed on Mondays.",
      transferTag: "Shared Transfer",
      meals: ["Breakfast (Hotel)"],
    },
    {
      day: 6,
      title: "Check-out and Departure Transfer",
      location: "Kovalam",
      date: "Mon, 26 Oct 2026",
      bullets: ["After breakfast, check-out and transfer to airport/station."],
      transferTag: "Shared Transfer",
      meals: ["Breakfast (Hotel)"],
    },
  ],

  policies: {
    inclusions: [
      "Accommodation in Double sharing basis all the above Mentioned Hotels",
      "All Hotel Taxes & Service Taxes.",
      "All transfers and sightseeing by A/c Etios or equivalent as per Itinerary from Garage to Garage",
      "All Toll and Parking Charges",
    ],
    exclusions: [
      "All entrances,(Boat ride & Guide charges and cultural programs entrance/attraction entrance)",
      "All other meals not mentioned above.",
      "All other personal expenses.",
      "Air Fare/Train Charges",
    ],
    payment: [
      "**50% advance payment** must be made to hold the booking on a confirmed basis and then the balance amount should be paid **3 days** prior to commencement of the services.",
      "Still, the company reserves the right to make a decision upon the amount that need be paid as an advance money, according to the type of services as well as the time left over for the commencement of your services.",
      "Besides the terms mentioned above all the bookings beginning during the peak season a 100% amount must be paid to us on confirmation.",
    ],
    cancellation: [
      "If cancellations are made **30 days** before the start date of the trip, **50 %** of the Total Package Cost will be charged as cancellation fees.",
      "If cancellations are made **15-30 days** before the start date of the trip, **70%** of the Total Package Cost will be charged as cancellation fees.",
      "If cancellations are made within **0-10 days** before the start date of the trip, **85%** of the Total Package cost will be charged as cancellation fees.",
      "In case of unforeseen weather conditions or government restrictions, certain activities may be cancelled and, in such cases, we will try our best to provide an alternate feasible activity. However, no refund will be provided for the same.",
      "100% cancellation would be charged from the total booking amount in case of last-minute booking cancellation due to flight cancellation, any natural calamity, and change in flight schedule/ferry due to technical/weather and high tides and sea conditions.",
      "In case of a Lockdown in Kerala due to Covid 19, will provide a credit note that a traveller can redeem within 1 year from the date of issuance of the Credit Note. As such Scenarios revised package will be provided as per the current applicable season and off-season rate. Do check the final cost with the reservation team.",
    ],
    bookingTerms: [
      "Slight alterations in the accommodation may become unavoidable due to unavailability of rooms in mentioned hotels, but the accommodation so provided will be of the same class.",
      "At all the Hotels Check-in time is 14:00 hrs.& Check-out time 11:00 hrs.In all hotels the base category rooms are provided.",
      "Child below 5 yrs. stay complimentary",
      "Munnar & Thekkady Non A/C Rooms are provided due to Low Temp.",
      "Car & Chauffer service are provided from 8.00 am to 8.00 Pm, except during Political bandh & medical emergencies.",
    ],
  },

  thankYou: {
    heading: "Thank You for Choosing Us!",
    subheading: "We look forward to making your travel dreams come true.",
    message:
      "Dear Anudeep Reddy, we truly appreciate your trust in us. Our team is committed to crafting an unforgettable travel experience for you. Should you have any questions, feel free to reach out anytime.",
    consultantName: "Swarupa",
    consultantPhone: "91542 96693",
    consultantEmail: "swarupa.offbeat@gmail.com",
    website: "https://offbeatcompass.com/",
    quotationUrl:
      "https://quotation.offbeatcompass.com/weblink/c0f486c7ae85e834d97a7318d86b5d",
  },
};

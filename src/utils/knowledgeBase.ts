// This is the "brain" of our AI, now living securely in the backend.
// It's structured as an array of objects for easy expansion.

interface IKnowledgeEntry {
  keywords: string[];
  answer: string;
}

export const knowledgeBase: IKnowledgeEntry[] = [
  {
    keywords: ["mission", "vision", "about", "company", "what do you do", "purpose"],
    answer: "Our mission is to contribute to the spread of the kingdom of God by helping people through jobs, good services, and charitable works. Our vision is to become a leader in the creative industry by delivering exceptional design and IT solutions.",
  },
  {
    keywords: ["services", "offer", "what can you do", "products"],
    answer: "We offer a wide range of services in two main categories: Technology Solutions (like website design, networking, and visa assistance) and Graphic Design Services (like logo design, printing, and custom apparel). What specific area are you interested in?",
  },
  {
    keywords: ["phone", "track", "stolen", "lost"],
    answer: "We offer a specialized Stolen Phone Tracking service. We can assist in the process of locating a lost or stolen phone using its serial number. This involves providing guidance on coordinating with the proper authorities and advice on data protection.",
  },
  {
    keywords: ["visa", "study abroad", "scholarship", "travel", "residence"],
    answer: "Yes, we provide comprehensive assistance for visa applications, including for studying abroad, tourism, and permanent residence. We help connect students with international universities and guide them through the scholarship application process.",
  },
  {
    keywords: ["internship", "career", "job", "experience", "apply"],
    answer: "We are passionate about nurturing talent! We offer an internship program for individuals looking to gain real-world experience in Technology or Graphic Design. You can find our smart application form on the 'Careers' page of our website.",
  },
  {
    keywords: ["printing", "uv printing", "heat press", "mug", "t-shirt", "engraving"],
    answer: "Our Graphic Design department offers many advanced printing services, including UV printing on various surfaces, heat press sublimation for apparel like T-shirts and mugs, and precision engraving. You can see a full list on our Services page.",
  },
  {
    keywords: ["location", "address", "where are you", "office"],
    answer: "BHT Corporation is located in Musanze, Rwanda. You can find our exact location and a map on our 'Contact Us' page on the website.",
  },
  {
    keywords: ["contact", "phone number", "email", "whatsapp"],
    answer: "You can reach us by phone at +250 784 589 508, or by email at bhtcorpor@gmail.com. We also have a contact form and a direct WhatsApp link on our 'Contact Us' page.",
  },
  {
    keywords: ["price", "cost", "quote", "how much"],
    answer: "The cost of our services depends on the specific project. For a detailed price, please visit our 'Contact Us' page and fill out the form with your project details. We'll get back to you with a personalized quote."
  },
  {
    keywords: ["login", "client", "dashboard", "portal"],
    answer: "The client login provides access to a personal dashboard for our loyal customers. Accounts are created by our administrators. If you are a recurring client and would like an account, please get in touch with us."
  },
  {
    keywords: ["portfolio", "gallery", "work", "examples", "projects"],
    answer: "You can see examples of our work in the 'Gallery' (or Portfolio) section of our website. We showcase a variety of projects in both technology and design."
  },
  {
    keywords: ["god", "faith", "mission statement"],
    answer: "Our core mission is rooted in our faith. We believe in contributing to the spread of the kingdom of God by serving our community with integrity, providing opportunities, and performing charitable works."
  }
];
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      navbar: {
        title: "AgriGuide",
        tagline: "Smart Crop Recommendation",
        home: "Home",
        recommender: "Crop Recommender",
        results: "Results",
        languageLabel: "Language"
      },
      landing: {
        badge: "Next-Gen Agricultural AI",
        headlineMain: "Grow Smarter,",
        headlineAccent: " Harvest Better",
        description:
          "Unlock the power of artificial intelligence to make informed crop decisions. Our platform analyzes soil conditions, climate data, and agricultural patterns to deliver personalized recommendations for maximum yield and sustainability.",
        ctaPrimary: "Get Started",
        scrollMore: "Discover more",
        featuresTitle: "Why Choose Our Platform",
        featureSmartTitle: "Smart Recommendations",
        featureSmartDesc: "AI-powered analysis for optimal crop selection",
        featureDataTitle: "Data-Driven Insights",
        featureDataDesc: "Real-time soil and climate analysis",
        featureSustainTitle: "Sustainable Growth",
        featureSustainDesc: "Maximize yield while protecting the environment",
        finalCtaTitle: "Ready to Transform Your Farming?",
        finalCtaText: "Join thousands of farmers making smarter decisions with AI",
        finalCtaButton: "Start Your Journey Now"
      },
      recommender: {
        title: "🌾 Crop Recommendation",
        subtitle: "Enter your soil and climate data to get AI-powered crop recommendations",
        sectionTitle: "Enter Your Data",
        sectionSubtitle: "Provide soil and climate information to get personalized crop recommendations",
        cityPlaceholder: "🌆 City",
        nPlaceholder: "🌿 Nitrogen (N)",
        pPlaceholder: "🧪 Phosphorus (P)",
        kPlaceholder: "🧂 Potassium (K)",
        tempPlaceholder: "🌡 Temperature (°C)",
        humidityPlaceholder: "💧 Humidity (%)",
        phPlaceholder: "⚗️ pH Value",
        rainfallPlaceholder: "🌧 Rainfall (mm)",
        seasonLabel: "🌦 Season (optional)",
        seasonKharif: "Kharif (Monsoon)",
        seasonRabi: "Rabi (Winter)",
        seasonAll: "All seasons",
        predictButton: "🌱 Predict Best Crops",
        alertMissingTitle: "Missing Values",
        alertMissingText: "Please fill all fields!",
        alertErrorTitle: "Error",
        alertErrorText: "Backend not responding!"
      },
      results: {
        title: "🌾 Top Recommended Crops",
        emptyTitle: "⚠️ Please Enter Details First",
        emptyMessage: "You need to fill in the crop prediction form on the Home page to see results.",
        backHome: "⬅ Back to Prediction",
        seasonLabel: "Season:",
        seasonKharif: "Kharif (Monsoon)",
        seasonRabi: "Rabi (Winter)",
        seasonAll: "All seasons",
        regionLabel: "Region:",
        regionAllStates: "All top states",
        comparisonTitle: "Compare Recommended Crops",
        comparisonSubtitle:
          "Quickly see how each recommended crop differs in cost, water need, duration, and season so you can pick the one that fits your farm best.",
        factor: {
          duration: "Duration",
          water: "Water Need",
          cost: "Cost / Acre",
          season: "Best Season",
          topStates: "Top States"
        }
      },
      cropCard: {
        confidenceLabel: "Confidence",
        confidenceHint: "Higher bar = better match for your soil & climate"
      }
    }
  },
  hi: {
    translation: {
      navbar: {
        title: "AgriGuide",
        tagline: "स्मार्ट फ़सल सुझाव",
        home: "होम",
        recommender: "फ़सल सुझाव",
        results: "परिणाम",
        languageLabel: "भाषा"
      },
      landing: {
        badge: "नेक्स्ट‑जेन कृषि AI",
        headlineMain: "सोच‑समझकर खेती करें,",
        headlineAccent: " बेहतर फ़सल पाएं",
        description:
          "हम कृत्रिम बुद्धिमत्ता की मदद से आपकी मिट्टी और मौसम का विश्लेषण करके सही फ़सल चुनने में मदद करते हैं। हमारा प्लेटफ़ॉर्म मिट्टी की जाँच, मौसम और खेती के पैटर्न को देखकर आपके खेत के लिए व्यक्तिगत सुझाव देता है।",
        ctaPrimary: "शुरू करें",
        scrollMore: "और जानें",
        featuresTitle: "हमारा प्लेटफ़ॉर्म क्यों?",
        featureSmartTitle: "स्मार्ट सिफ़ारिशें",
        featureSmartDesc: "AI की मदद से आपकी स्थिति के लिए सही फ़सलें चुनता है",
        featureDataTitle: "डेटा‑आधारित विश्लेषण",
        featureDataDesc: "मिट्टी और मौसम के डेटा का रीयल‑टाइम विश्लेषण",
        featureSustainTitle: "सस्टेनेबल उत्पादन",
        featureSustainDesc: "पर्यावरण की रक्षा करते हुए बेहतर उपज में मदद",
        finalCtaTitle: "क्या आप अपनी खेती बदलने के लिए तैयार हैं?",
        finalCtaText: "हज़ारों किसान पहले से ही AI की मदद से बेहतर निर्णय ले रहे हैं",
        finalCtaButton: "अपनी यात्रा अभी शुरू करें"
      },
      recommender: {
        title: "🌾 फ़सल सिफ़ारिश",
        subtitle: "अपनी मिट्टी और मौसम की जानकारी डालें, AI आपको सबसे उपयुक्त फ़सलें सुझाएगा",
        sectionTitle: "अपना डेटा दर्ज करें",
        sectionSubtitle: "व्यक्तिगत फ़सल सिफ़ारिशों के लिए मिट्टी और मौसम की जानकारी दें",
        cityPlaceholder: "🌆 शहर / गाँव",
        nPlaceholder: "🌿 नाइट्रोजन (N)",
        pPlaceholder: "🧪 फ़ॉस्फोरस (P)",
        kPlaceholder: "🧂 पोटैशियम (K)",
        tempPlaceholder: "🌡 तापमान (°C)",
        humidityPlaceholder: "💧 आर्द्रता (%)",
        phPlaceholder: "⚗️ pH मान",
        rainfallPlaceholder: "🌧 वर्षा (mm)",
        seasonLabel: "🌦 सीज़न (ऐच्छिक)",
        seasonKharif: "खरीफ़ (बरसात)",
        seasonRabi: "रबी (सर्दी)",
        seasonAll: "सभी सीज़न",
        predictButton: "🌱 सबसे अच्छी फ़सलें दिखाएँ",
        alertMissingTitle: "वैल्यूज़ नहीं भरी गईं",
        alertMissingText: "कृपया सभी फ़ील्ड भरें!",
        alertErrorTitle: "त्रुटि",
        alertErrorText: "बैकएंड से संपर्क नहीं हो पाया!"
      },
      results: {
        title: "🌾 सुझाई गई सर्वोत्तम फ़सलें",
        emptyTitle: "⚠️ कृपया पहले विवरण भरें",
        emptyMessage: "होम पेज पर फ़सल फ़ॉर्म भरने के बाद ही परिणाम दिखेंगे।",
        backHome: "⬅ वापस फ़ॉर्म पर जाएँ",
        seasonLabel: "सीज़न:",
        seasonKharif: "खरीफ़ (बरसात)",
        seasonRabi: "रबी (सर्दी)",
        seasonAll: "सभी सीज़न",
        regionLabel: "क्षेत्र:",
        regionAllStates: "सभी प्रमुख राज्य",
        comparisonTitle: "सुझाई गई फ़सलों की तुलना",
        comparisonSubtitle:
          "खर्च, पानी की ज़रूरत, अवधि और सीज़न के आधार पर फ़सलों की तुलना करें और अपने खेत के लिए सबसे उपयुक्त विकल्प चुनें।",
        factor: {
          duration: "खेती की अवधि",
          water: "पानी की ज़रूरत",
          cost: "एकड़ का खर्च",
          season: "सबसे अच्छा सीज़न",
          topStates: "मुख्य राज्य"
        }
      },
      cropCard: {
        confidenceLabel: "विश्वास स्तर",
        confidenceHint: "जितनी लंबी पट्टी, आपकी स्थिति के लिए उतनी बेहतर फ़सल"
      }
    }
  },
  te: {
    translation: {
      navbar: {
        title: "AgriGuide",
        tagline: "స్మార్ట్ పంట సిఫార్సులు",
        home: "హోమ్",
        recommender: "పంట సూచిక",
        results: "ఫలితాలు",
        languageLabel: "భాష"
      },
      landing: {
        badge: "తరువాతి తరాల వ్యవసాయ AI",
        headlineMain: "మేథావంతంగా సాగు చేయండి,",
        headlineAccent: " మంచి దిగుబడిని పొందండి",
        description:
          "మేధోసాంకేతికాన్ని ఉపయోగించి సరైన పంట ఎంచుకోవడంలో మీకు సహాయం చేస్తాము. మట్టి, వాతావరణం మరియు పంటల చరిత్రను విశ్లేషించి, మీ పొలానికి తగిన ప్రత్యేక సిఫార్సులు ఇస్తాము.",
        ctaPrimary: "ప్రారంభించండి",
        scrollMore: "ఇంకా తెలుసుకోండి",
        featuresTitle: "ఎందుకు మా ప్లాట్‌ఫాం?",
        featureSmartTitle: "స్మార్ట్ సిఫార్సులు",
        featureSmartDesc: "మీ పొలం పరిస్థితులకు సరిపోయే పంటలను AI ద్వారా గుర్తిస్తుంది",
        featureDataTitle: "డేటా ఆధారిత విశ్లేషణ",
        featureDataDesc: "మట్టి మరియు వాతావరణ సమాచారాన్ని ప్రత్యక్షంగా విశ్లేషిస్తుంది",
        featureSustainTitle: "సుస్థిర ఉత్పత్తి",
        featureSustainDesc: "పర్యావరణాన్ని కాపాడుతూ ఎక్కువ దిగుబడికి సహాయం చేస్తుంది",
        finalCtaTitle: "మీ వ్యవసాయాన్ని మార్చడానికి సిద్ధంగా ఉన్నారా?",
        finalCtaText: "వేలాది రైతులు ఇప్పటికే AI తో మంచి నిర్ణయాలు తీసుకుంటున్నారు",
        finalCtaButton: "మీ ప్రయాణాన్ని ఇప్పుడే ప్రారంభించండి"
      },
      recommender: {
        title: "🌾 పంట సిఫార్సు",
        subtitle: "మీ మట్టి మరియు వాతావరణ వివరాలు ఇస్తే, AI మీకు సరైన పంటలను సూచిస్తుంది",
        sectionTitle: "మీ డేటాను నమోదు చేయండి",
        sectionSubtitle: "వ్యక్తిగత పంట సిఫార్సుల కోసం మట్టి మరియు వాతావరణ వివరాలు ఇవ్వండి",
        cityPlaceholder: "🌆 ఊరు / గ్రామం",
        nPlaceholder: "🌿 నైట్రోజన్ (N)",
        pPlaceholder: "🧪 ఫాస్ఫరస్ (P)",
        kPlaceholder: "🧂 పొటాషియం (K)",
        tempPlaceholder: "🌡 ఉష్ణోగ్రత (°C)",
        humidityPlaceholder: "💧 ఆర్ద్రత (%)",
        phPlaceholder: "⚗️ pH విలువు",
        rainfallPlaceholder: "🌧 వర్షపాతం (mm)",
        seasonLabel: "🌦 సీజన్ (ఐచ్చికం)",
        seasonKharif: "ఖరీఫ్ (వర్షాకాలం)",
        seasonRabi: "రబీ (చలికాలం)",
        seasonAll: "అన్ని సీజన్లు",
        predictButton: "🌱 ఉత్తమ పంటలను చూపించు",
        alertMissingTitle: "విలువలు లేవు",
        alertMissingText: "దయచేసి అన్ని ఫీల్డ్స్ ని పూర్తి చేయండి!",
        alertErrorTitle: "లోపం",
        alertErrorText: "బ్యాక్‌ఎండ్ స్పందించడం లేదు!"
      },
      results: {
        title: "🌾 సిఫార్సు చేసిన ఉత్తమ పంటలు",
        emptyTitle: "⚠️ దయచేసి ముందుగా వివరాలు నమోదు చేయండి",
        emptyMessage: "హోమ్ పేజీలో పంట ఫారం పూర్తి చేసిన తర్వాత మాత్రమే ఫలితాలు కనిపిస్తాయి.",
        backHome: "⬅ మళ్లీ పంట ఫారంకు వెళ్లండి",
        seasonLabel: "సీజన్:",
        seasonKharif: "ఖరీఫ్ (వర్షాకాలం)",
        seasonRabi: "రబీ (చలికాలం)",
        seasonAll: "అన్ని సీజన్లు",
        regionLabel: "ప్రాంతం:",
        regionAllStates: "అన్ని ప్రధాన రాష్ట్రాలు",
        comparisonTitle: "సిఫార్సు చేసిన పంటల పోలిక",
        comparisonSubtitle:
          "ఖర్చు, నీటి అవసరం, వ్యవసాయ కాలం మరియు సీజన్ ఆధారంగా పంటలను సరిపోల్చుకుని, మీ పొలానికి సరిపోయేదాన్ని ఎంచుకోండి.",
        factor: {
          duration: "వ్యవసాయ కాలం",
          water: "నీటి అవసరం",
          cost: "ఎకరాకు ఖర్చు",
          season: "ఉత్తమ సీజన్",
          topStates: "ప్రధాన రాష్ట్రాలు"
        }
      },
      cropCard: {
        confidenceLabel: "నమ్మకం శాతం",
        confidenceHint: "పెద్ద బార్ అంటే మీ పరిస్థితులకు ఎక్కువ సరిపడే పంట"
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;


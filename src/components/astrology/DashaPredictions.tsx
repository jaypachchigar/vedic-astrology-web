/**
 * Detailed Dasha Predictions Component
 * Provides in-depth analysis of Maha Dasha and Antar Dasha periods
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Clock, AlertCircle, Sparkles, Star, Heart, Briefcase, Activity, DollarSign, BookOpen } from "lucide-react";

interface DashaPredictionsProps {
  mahaDasha: string;
  antarDasha: string;
  mahaDashaStart: string;
  mahaDashaEnd: string;
  antarDashaStart: string;
  antarDashaEnd: string;
}

// Comprehensive Maha Dasha predictions
const mahaDashaPredictions: Record<string, {
  overview: string;
  characteristics: string[];
  career: string;
  relationships: string;
  health: string;
  finance: string;
  spiritual: string;
  challenges: string;
  opportunities: string;
  remedies: string[];
}> = {
  Sun: {
    overview: "Sun Maha Dasha is a 6-year period that brings you into the spotlight and emphasizes leadership, authority, and self-expression. This period is ruled by the King of planets, bestowing royal qualities, confidence, and vitality. Your sense of identity strengthens, and you naturally attract positions of power and recognition. This is a transformative period where your soul's purpose becomes clearer, and you are called to shine your unique light in the world.",
    characteristics: [
      "Increased confidence and self-esteem",
      "Recognition from authority figures",
      "Enhanced leadership abilities",
      "Strong willpower and determination",
      "Desire for independence and autonomy",
      "Improved relationship with father figures",
      "Natural magnetism and charisma"
    ],
    career: "Professional life flourishes during Sun Dasha. You naturally rise to leadership positions and gain recognition for your work. Government jobs, administrative roles, and positions of authority become accessible. Your entrepreneurial spirit is strong, making this an excellent time to start your own business or take on independent projects. You command respect from colleagues and superiors. Promotions and career advancements come naturally as your work quality and leadership shine. Fields related to administration, politics, medicine, and public service are particularly favored.",
    relationships: "Your relationships are marked by clarity and honesty during this period. You attract confident, ambitious partners who respect your independence. However, ego issues may arise if not managed consciously. Father and authority figures play important roles in your life. You may need to balance your desire for independence with partnership needs. Your magnetic personality attracts social attention, but you must ensure your confidence doesn't turn into arrogance. Family relationships improve, especially with male family members.",
    health: "Physical vitality and energy levels are generally high during Sun Dasha. Your immune system strengthens, and you have the energy to accomplish ambitious goals. However, pay attention to heart health, blood pressure, and eye-related issues. The right side of the body needs more care. Overwork and ego-driven stress can affect health negatively. Regular cardiovascular exercise, yoga, and meditation help maintain balance. Spending time in sunlight and practicing Surya Namaskar enhances well-being. Maintain regular sleep schedules to support sustained energy.",
    finance: "Financial growth through authority-based work and leadership roles is significant. You may receive financial support from government, authority figures, or established institutions. Investments in gold, precious metals, and stable ventures show good returns. Your earning capacity increases as you take on more responsibility. However, avoid ego-driven spending on luxury items to display status. Long-term financial planning during this period creates lasting wealth. Real estate and land investments are favorable. Business partnerships with influential people bring monetary success.",
    spiritual: "Sun Dasha awakens your spiritual identity and soul purpose. You develop a clearer understanding of your true self beyond social roles and material achievements. This is an excellent period for meditation on your inner divine light. Study of Vedic scriptures, especially Bhagavad Gita, brings profound insights. Your spiritual practices become more disciplined and regular. You may feel drawn to serve humanity through your unique talents. Connection with spiritual teachers and gurus strengthens. Practice humility alongside spiritual growth to avoid spiritual ego.",
    challenges: "The main challenges during Sun Dasha include managing ego and pride, which can create conflicts in relationships and work environments. You may become overly authoritative or domineering if not conscious. Conflicts with authority figures or government bodies may arise if Sun is afflicted. Overconfidence can lead to hasty decisions and mistakes. Health issues related to heat, inflammation, and circulation need attention. Balancing independence with cooperation requires conscious effort. Father-related issues or separations may surface for healing.",
    opportunities: "This period offers tremendous opportunities for establishing yourself as a leader in your field. Starting your own business or independent ventures is highly favored. You can build a strong reputation and personal brand that lasts beyond this dasha. Opportunities to work with government, large organizations, or in positions of authority are abundant. Your creative self-expression finds powerful outlets. You can mentor others and create lasting impact through your leadership. Spiritual awakening and self-realization accelerate significantly.",
    remedies: [
      "Offer water to the rising Sun every morning while chanting Surya mantras",
      "Practice Surya Namaskar (Sun Salutations) daily, ideally 12 rounds",
      "Wear a Ruby gemstone (3-5 carats) in gold on your ring finger after proper energization",
      "Donate wheat, jaggery, red cloth, and copper items on Sundays",
      "Chant 'Om Suryaya Namaha' or Aditya Hridayam Stotra daily",
      "Serve and respect your father and male authority figures",
      "Maintain regular sleep schedule and wake up before sunrise",
      "Avoid ego-driven behaviors and practice humility in leadership",
      "Wear red, orange, or gold colors, especially on Sundays",
      "Feed cows with wheat mixed with jaggery on Sundays"
    ]
  },
  Moon: {
    overview: "Moon Maha Dasha spans 10 years and brings a period of emotional depth, intuitive development, and nurturing experiences. As the planet of mind and emotions, Moon Dasha profoundly affects your inner world, relationships, and domestic life. This period heightens sensitivity, creativity, and the need for emotional security. You become more receptive to others' feelings and develop strong intuitive abilities. Your connection with mother, women, and feminine energy deepens. This dasha teaches you about emotional intelligence and the power of nurturing.",
    characteristics: [
      "Heightened emotional sensitivity and intuition",
      "Strong connection with mother and female figures",
      "Enhanced imagination and creativity",
      "Desire for comfort, security, and home",
      "Mood fluctuations and emotional depth",
      "Increased psychic and intuitive abilities",
      "Nurturing and caring nature becomes prominent"
    ],
    career: "Professional life during Moon Dasha often involves public dealing, hospitality, healthcare, counseling, or creative fields. Your empathetic approach makes you excellent in people-oriented careers. Businesses related to food, beverages, hotels, dairy, textiles, and women's products flourish. Creative pursuits like writing, poetry, music, and arts are highly favored. Your intuitive decision-making serves you well in investments and business. Frequent changes in career or multiple income sources may occur. Working with liquids, travel, and import-export shows success. Public relations and customer service roles are beneficial.",
    relationships: "Relationships take center stage during Moon Dasha, becoming more emotionally intense and meaningful. You seek deep emotional connection and nurturing partnerships. Your relationship with mother becomes particularly significant, influencing your emotional well-being. You attract sensitive, caring partners but must manage emotional dependency. Marriage prospects improve, especially if Moon is well-placed. Family and home life receive much attention and investment. You become more nurturing toward children and family members. However, emotional mood swings can create challenges in relationships, requiring conscious emotional management.",
    health: "Health during Moon Dasha is closely tied to emotional state. Mental peace directly impacts physical well-being. Pay special attention to digestive system, chest area, and reproductive health. Water retention, colds, and chest congestion may occur more frequently. Women should be attentive to menstrual and hormonal health. Emotional stress can manifest as physical ailments, making stress management essential. The left side of the body needs more care. Staying near water bodies, proper sleep, and emotional release through creative expression support health. Avoid cold and damp environments.",
    finance: "Financial situations during Moon Dasha tend to fluctuate with your emotional state and market conditions. Income may come through multiple sources rather than one fixed source. Businesses involving liquids, food, hospitality, real estate (especially near water), and items used by women are profitable. Your intuitive sense helps in timing investments well. Property and vehicle purchases are favored. However, emotional spending and impulsive purchases need conscious control. Savings may vary with mood; establishing automatic savings helps. Partnership businesses, especially with women, show good returns. Rental income and passive income sources grow.",
    spiritual: "Moon Dasha awakens deep spiritual yearning and devotion. Your connection with divine feminine energy strengthens through worship of goddesses, especially forms of Shakti and Lakshmi. Meditation on the mind and emotions brings profound insights. Study of mystical and devotional texts resonates deeply. Your psychic and intuitive abilities expand significantly, possibly leading to prophetic dreams and visions. This period is excellent for mantra practice, especially Moon-related mantras and chanting. Connection with spiritual mother figures or female gurus is beneficial. Pilgrimages to sacred water sites enhance spiritual growth.",
    challenges: "The primary challenges include emotional instability, mood swings, and excessive sensitivity to criticism or negative environments. Overthinking and mental anxiety can become problematic if not managed. Dependency issues in relationships may surface for resolution. Mother-related stress or separation can occur. Financial instability due to fluctuating income requires careful budgeting. You may become overly emotional in decision-making, affecting practical judgment. Psychic sensitivity can be overwhelming without proper grounding. Managing the balance between caring for others and self-care is crucial.",
    opportunities: "This dasha offers beautiful opportunities for emotional healing and developing emotional intelligence. Your creative abilities can flourish and bring both fulfillment and income. Starting businesses related to hospitality, food, childcare, or counseling is highly favorable. You can build deep, nurturing relationships that last a lifetime. Your intuitive abilities can guide you to make excellent life decisions. This period supports marriage, starting a family, and creating a beautiful home environment. Developing your artistic talents, especially in music, poetry, or painting, brings joy and recognition. Teaching, healing, and nurturing work is deeply fulfilling.",
    remedies: [
      "Worship the Moon on Mondays by offering white flowers and rice",
      "Wear a Pearl gemstone (5-7 carats) in silver on your little finger",
      "Chant 'Om Chandraya Namaha' 108 times daily, especially on Monday evenings",
      "Spend time near water bodies like lakes, rivers, or ocean for emotional peace",
      "Maintain regular sleep schedule and ensure adequate rest (8 hours minimum)",
      "Drink water stored in silver vessel for mental clarity and emotional balance",
      "Respect and serve your mother and maternal figures",
      "Donate white items, rice, milk, and silver on Mondays",
      "Practice meditation focusing on emotional balance and peace",
      "Wear white, cream, or light pastel colors, especially on Mondays"
    ]
  },
  Mars: {
    overview: "Mars Maha Dasha is a dynamic 7-year period filled with energy, action, courage, and transformation. As the planet of warriors, Mars brings intense drive, competitive spirit, and the power to overcome obstacles. This period demands action, physical activity, and facing challenges head-on. Your courage, determination, and leadership in crisis situations strengthen significantly. You feel compelled to fight for what you believe in and protect those you love. This dasha tests your ability to channel aggressive energy constructively and manage anger wisely.",
    characteristics: [
      "High energy levels and physical vitality",
      "Courageous and warrior-like mindset",
      "Competitive spirit and desire to win",
      "Quick decision-making and action-oriented approach",
      "Increased passion and intensity in all areas",
      "Strong protective instincts",
      "Leadership abilities in crisis situations"
    ],
    career: "Career during Mars Dasha involves dynamic, action-oriented fields requiring courage and physical or mental strength. Military, police, security, sports, surgery, engineering, real estate, construction, and mechanical fields flourish. You excel in competitive environments and crisis management. Entrepreneurial ventures, especially in manufacturing, machinery, or defense-related areas, show success. Your leadership shines in challenging situations. Technical skills development is favored. You may change jobs more frequently, seeking roles with greater challenge and independence. Business partnerships may face conflicts requiring diplomatic handling.",
    relationships: "Relationships during Mars Dasha are passionate and intense but may experience more conflicts and arguments. Your assertive nature can be perceived as aggressive if not balanced with patience. You attract strong-willed, independent partners, creating dynamic but sometimes volatile relationships. Physical attraction and chemistry are strong. Issues with siblings, especially younger brothers, may surface. You become fiercely protective of loved ones. Managing anger and impulsive reactions in relationships requires conscious effort. Sports, adventure activities, or physical projects done together strengthen bonds. Passion in marriage increases but so does the need for individual space.",
    health: "Physical energy is abundant during Mars Dasha, making this excellent for building strength and athletic abilities. However, you're prone to accidents, injuries, cuts, burns, and inflammatory conditions. Fevers, infections, and blood-related issues need attention. Head injuries, muscle strains, and surgical procedures may occur. The right side of body and areas ruled by Mars (head, muscles, blood) require care. Channel excess energy through regular vigorous exercise, martial arts, or sports. Practice anger management to avoid stress-related health issues. Adequate protein intake and iron-rich foods support high energy demands.",
    finance: "Financial growth comes through bold ventures, real estate, property dealings, and engineering or technical fields. Your courage to take calculated risks often pays off. Investments in land, property, machinery, and infrastructure show good returns. Income through physical labor, sports, military, or security-related work is strong. However, impulsive financial decisions and aggressive investments can lead to losses. Legal disputes over property or money may arise. Business involving fire, metals, or sharp instruments is profitable. Loans for property or business are accessible but manage debt wisely.",
    spiritual: "Mars Dasha awakens spiritual warrior qualities and the pursuit of dharma through action (Karma Yoga). Worship of Hanuman, Kartikeya (Murugan), and fierce forms of divine brings protection and spiritual strength. This period is excellent for developing physical discipline through yoga asanas, especially power yoga or martial arts. Study of Bhagavad Gita, particularly the teachings on righteous action and warrior dharma, resonates deeply. Your spiritual practice becomes more disciplined and goal-oriented. Tantric practices and fire ceremonies (Homa/Havan) are beneficial. Learning to transmute anger and aggression into spiritual power is a key lesson.",
    challenges: "Primary challenges include managing anger, aggression, and impulsive behavior that can damage relationships and opportunities. Conflicts with authority, legal troubles, and property disputes may arise. Tendency toward accidents and injuries requires extra caution. Overconfidence and reckless decisions can lead to financial losses. Sibling relationships may experience strain. Health issues related to inflammation, fever, and blood need attention. Balancing assertiveness with diplomacy is crucial. Excessive competition and ego battles waste energy. Learning patience and strategic thinking alongside action is important.",
    opportunities: "This dasha offers tremendous opportunities for achieving ambitious goals through determined effort and courage. You can overcome longstanding obstacles and enemies. Physical fitness and athletic achievements reach new heights. Real estate investments and property acquisition are highly favorable. Starting businesses in construction, engineering, sports, or security fields brings success. Your leadership in challenging situations gains recognition. Developing technical skills and mechanical aptitude opens career doors. You can protect and provide for your family effectively. Spiritual practices involving discipline and physical mastery accelerate growth.",
    remedies: [
      "Worship Lord Hanuman every Tuesday by offering red flowers and sindoor",
      "Wear a Red Coral gemstone (5-7 carats) in gold or copper on your ring finger",
      "Chant 'Om Mangalaya Namaha' or Hanuman Chalisa daily",
      "Practice anger management through meditation, deep breathing, and physical exercise",
      "Donate red items, red lentils (masoor dal), and copper on Tuesdays",
      "Engage in regular physical activity like gym, sports, or martial arts",
      "Practice patience and think before acting impulsively",
      "Respect siblings, especially younger brothers, and resolve conflicts peacefully",
      "Wear red or maroon colors, especially on Tuesdays",
      "Feed jaggery or sweet paan (betel leaves) to cows on Tuesdays"
    ]
  },
  Rahu: {
    overview: "Rahu Maha Dasha is the longest planetary period, spanning 18 years, bringing profound transformation, material ambition, and unconventional experiences. As the North Node of the Moon, Rahu represents worldly desires, foreign influences, technology, and breaking boundaries. This period pushes you toward your karmic destiny, often through unexpected events and unconventional paths. Your ambitions intensify, and you're drawn to explore taboo subjects, foreign cultures, or cutting-edge fields. This dasha can bring sudden rise to fame and fortune but requires conscious ethical choices to avoid its shadowy influence.",
    characteristics: [
      "Intense ambitions and desire for worldly success",
      "Attraction to foreign cultures, people, and places",
      "Interest in occult, technology, and unconventional fields",
      "Tendency toward sudden changes and unexpected events",
      "Breaking social conventions and traditional boundaries",
      "Enhanced intuitive and psychic abilities",
      "Material obsessions and worldly achievements"
    ],
    career: "Career during Rahu Dasha often takes unconventional turns, leading to unique positions or innovative fields. Technology, computer science, aviation, foreign trade, import-export, and digital businesses flourish. You may work in multinational companies or relocate abroad. Research, occult sciences, astrology, media, advertising, and speculative businesses show success. Your innovative approach and ability to think outside conventional frameworks brings recognition. Sudden career changes, sometimes multiple times, are common. You excel in positions requiring manipulation of data, technology, or public perception. Politics and positions involving mass appeal are favorable.",
    relationships: "Relationships during Rahu Dasha are often unconventional, intense, and sometimes complicated. You may attract partners from different cultures, religions, or backgrounds. Office romances or relationships breaking social norms are common. There's a tendency toward multiple relationships or difficulty committing. Obsessive attraction and desire can cloud judgment. Relationships may involve deception or hidden aspects requiring transparency. You're drawn to mysterious, unusual, or powerful partners. Managing expectations and staying grounded in reality is crucial. Family may not approve of your relationship choices. Spiritual approach to relationships brings clarity.",
    health: "Health during Rahu Dasha can be mysterious and difficult to diagnose accurately. Anxiety, phobias, and psychological issues may surface. Addictive tendencies toward drugs, alcohol, or other substances need conscious management. Skin problems, allergies, and auto-immune conditions may occur. Sudden health crises followed by equally sudden recoveries are possible. Mental health requires particular attention as overthinking and obsessive thoughts increase. Mysterious illnesses that traditional medicine struggles to treat may respond to alternative healing. Grounding practices are essential. Avoid self-medication and seek proper diagnosis for persistent symptoms.",
    finance: "Financial situation during Rahu Dasha is often unpredictable with sudden gains and unexpected losses. Speculative investments, stock market, gambling, and lottery may bring windfall gains but carry high risks. Foreign income, technology businesses, and innovative ventures show promise. You may become wealthy through unconventional means or industries. However, financial obsession can lead to unethical choices with karmic consequences. Sudden expenses or financial crises may occur unexpectedly. Multiple income sources and diversification protect against instability. Avoid get-rich-quick schemes. Long-term wealth requires ethical business practices.",
    spiritual: "Rahu Dasha brings intense spiritual seeking alongside material pursuits. Your interest in occult sciences, astrology, tantra, and mystical practices deepens. This is an excellent period for exploring consciousness through meditation, though maintaining discrimination between genuine spiritual experiences and illusions is crucial. Study of Buddhist or tantric philosophies resonates. You may encounter unusual spiritual teachers or experiences. Rahu can grant siddhis (spiritual powers) but attachment to them can become an obstacle. The key lesson is transcending worldly illusions while fulfilling material duties. Serving the underprivileged and outcasts brings spiritual merit.",
    challenges: "Challenges include managing intense material desires that can lead to unethical behavior, deception, and karmic consequences. Addiction tendencies to substances, technology, or unhealthy patterns require vigilance. Anxiety, overthinking, and mental instability can become severe. Sudden unexpected problems in any life area cause stress. You may face social criticism for unconventional choices. Relationship complications due to deception or unusual circumstances create difficulties. Legal troubles and disputes with authorities are possible. Health issues may be mysterious and hard to diagnose. Maintaining ethical standards despite temptations is the primary challenge.",
    opportunities: "This dasha offers extraordinary opportunities for material success, especially in modern, technological, and international fields. You can achieve fame and recognition through innovative approaches. Foreign travel, residence, or business becomes accessible. You can master cutting-edge technologies and build successful digital businesses. Research in unconventional fields may bring breakthrough discoveries. Your intuitive and psychic abilities can develop significantly if channeled properly. This period allows you to break free from limiting social conventions and create a unique life path. Significant wealth accumulation through legal, innovative means is possible.",
    remedies: [
      "Worship Goddess Durga, especially on Saturdays and during Navratri",
      "Wear a Hessonite Garnet (Gomed) gemstone (5-8 carats) in silver on your middle finger",
      "Chant 'Om Rahave Namaha' or Rahu Beej Mantra 108 times daily",
      "Donate blue or black items, blankets, mustard oil, and iron to the underprivileged on Saturdays",
      "Practice daily meditation to calm mental restlessness and anxiety",
      "Avoid alcohol, drugs, and all addictive substances completely",
      "Serve lepers, outcasts, and marginalized communities",
      "Keep coconut under your pillow and flow it in running water every Saturday",
      "Maintain ethical standards in all dealings despite temptations",
      "Wear blue or black colors, especially on Saturdays"
    ]
  },
  Jupiter: {
    overview: "Jupiter Maha Dasha is a blessed 16-year period bringing wisdom, expansion, prosperity, and spiritual growth. As the Guru (teacher) of the gods and the most benefic planet, Jupiter bestows knowledge, dharma (righteousness), and fortune. This period expands your horizons intellectually, spiritually, and materially. Your natural wisdom and ethical sense strengthen, making you a guide to others. Opportunities for higher learning, teaching, and spiritual advancement are abundant. Your sense of optimism and faith in divine providence increases. This is generally considered one of the most auspicious dashas, bringing blessings and protection.",
    characteristics: [
      "Expanded wisdom and philosophical understanding",
      "Natural optimism and faith in divine providence",
      "Teaching and mentoring abilities strengthen",
      "Attraction to higher learning and spiritual studies",
      "Ethical and righteous decision-making",
      "Generosity and desire to help others",
      "Growth in all life areas - financial, spiritual, intellectual"
    ],
    career: "Professional life flourishes during Jupiter Dasha, especially in fields related to education, teaching, law, counseling, philosophy, publishing, and advisory roles. You become a respected authority in your field. Academic achievements and higher qualifications come naturally. Working in universities, religious institutions, legal systems, or financial advisory brings success and satisfaction. International business, especially in education or consultancy, is highly favored. Your ethical approach and wisdom attract important clients and opportunities. Promotions and positions of respect come without much struggle. Businesses related to knowledge, wisdom, or spirituality prosper.",
    relationships: "Relationships during Jupiter Dasha are harmonious, based on mutual respect, shared values, and spiritual compatibility. Marriage prospects are excellent, with potential to meet life partners through educational settings, spiritual gatherings, or through family arrangements. Your relationship with father, teachers, and mentors deepens significantly. You become a guide and counselor to family members. Children bring joy and may be born during this period. Your generous and forgiving nature improves all relationships. However, avoid becoming preachy or overly philosophical, which can create distance. Shared learning and spiritual pursuits strengthen bonds.",
    health: "Overall health is generally good during Jupiter Dasha, with strong immunity and vitality. However, tendency toward weight gain, obesity, and related complications requires attention. Liver health, fat metabolism, and blood sugar levels need monitoring. Overindulgence in food and drink can lead to digestive issues. Thyroid and hormonal balance may need attention. Despite physical concerns, mental and emotional health remains positive due to Jupiter's optimistic influence. Regular exercise, moderate eating habits, and avoiding excessive rich foods maintain well-being. The right side of body, especially liver and hip area, needs care.",
    finance: "Financial prosperity is a hallmark of Jupiter Dasha, with wealth coming through ethical means and wise decisions. Your income increases steadily through righteous work. Investments in education, gold, and traditional stable ventures show excellent returns. You may receive financial blessings through father, teachers, or spiritual mentors. Generosity attracts more abundance, following the principle of 'give and receive.' Business in consulting, teaching, publishing, or spiritual services is highly profitable. Financial planning and long-term investments work exceptionally well. Inherited wealth or property may come. However, avoid overconfidence and maintain practical approach.",
    spiritual: "Jupiter Dasha is the most spiritually beneficial period, accelerating your spiritual evolution significantly. Study of sacred scriptures, especially Vedas, Upanishads, and Bhagavad Gita, brings profound realizations. Initiation into spiritual practices and mantras is highly auspicious. Connection with authentic spiritual teachers (Satguru) transforms your understanding. Your dharma (life purpose) becomes clear, guiding all decisions. Practice of daily meditation, japa (mantra chanting), and study deepens naturally. Pilgrimages to sacred places bring powerful experiences. You may become a spiritual teacher yourself. Philosophical understanding of life's meaning develops. Devotional practices and worship flow naturally.",
    challenges: "The main challenges during Jupiter Dasha include tendency toward overconfidence, over-optimism, and unrealistic expectations that can lead to disappointments. You may become overly philosophical or preachy, alienating others. Weight gain and lifestyle diseases require conscious health management. Over-expansion in business or taking on too many responsibilities can cause stress. Excessive generosity without discrimination may be exploited by others. Complacency due to generally favorable circumstances can lead to missed opportunities. Balancing spiritual pursuits with material responsibilities requires attention. Self-righteousness and judging others need conscious awareness.",
    opportunities: "This dasha offers magnificent opportunities for higher education, obtaining advanced degrees, and academic excellence. You can become a respected teacher, author, or thought leader in your field. Starting educational institutions, publishing ventures, or consultancy businesses brings success. International travel and residence for education or work is highly favorable. You can build lasting wealth through wise investments and ethical business practices. Marriage and starting a family are beautifully supported. Your spiritual practices can lead to significant realizations and possibly enlightenment. Mentoring others and sharing wisdom brings deep fulfillment.",
    remedies: [
      "Worship Lord Vishnu, Shiva, or your chosen deity with devotion every Thursday",
      "Wear a Yellow Sapphire gemstone (5-7 carats) in gold on your index finger",
      "Chant 'Om Gurave Namaha' or Guru Beej Mantra 108 times daily",
      "Donate yellow items, turmeric, gram dal, and yellow clothes on Thursdays",
      "Study sacred scriptures and spiritual texts regularly",
      "Respect and serve teachers, gurus, and your father",
      "Practice gratitude daily for all blessings received",
      "Share knowledge generously and teach those who seek learning",
      "Wear yellow or gold colors, especially on Thursdays",
      "Feed Brahmins or donate to educational causes"
    ]
  },
  Venus: {
    overview: "Venus Maha Dasha is a beautiful 20-year period emphasizing love, beauty, luxury, creativity, and material comforts. As the planet of love and aesthetics, Venus brings grace, charm, and refined tastes into your life. This is the longest benefic dasha, offering abundant opportunities for romantic fulfillment, artistic expression, and material prosperity. Your appreciation for beauty in all forms increases. Relationships, especially romantic ones, take center stage. Creative abilities flourish, and you're drawn to arts, music, fashion, and luxurious experiences. This period generally brings comfort, pleasure, and harmonious experiences.",
    characteristics: [
      "Enhanced charm, beauty, and attractive personality",
      "Strong focus on relationships and romantic love",
      "Artistic and creative abilities flourish",
      "Refined taste for luxury, beauty, and comfort",
      "Diplomatic and harmonious approach to life",
      "Material prosperity and love for fine things",
      "Sensual pleasures and enjoyment of life"
    ],
    career: "Professional life during Venus Dasha thrives in artistic, creative, and aesthetic fields. Careers in fashion, design, jewelry, beauty, entertainment, music, dance, and arts flourish exceptionally. Hospitality, luxury goods, perfumes, cosmetics, and women-oriented businesses are highly successful. Your diplomatic skills make you excellent in public relations, counseling, mediation, and customer-facing roles. Partnership-based businesses work beautifully. Interior design, architecture, and any field requiring aesthetic sense prospers. Media, advertising, and creative agencies provide fulfilling work. Your charm and networking abilities open doors to opportunities. International business, especially luxury imports, is favorable.",
    relationships: "Relationships are the highlight of Venus Dasha, bringing romance, love, and emotional fulfillment. Marriage prospects are excellent, often resulting in love marriages with attractive, refined partners. Multiple romantic interests and proposals may create pleasant dilemmas. Physical attraction and chemistry in relationships are strong. Your charm attracts admirers easily. Marital life is generally happy with mutual affection and understanding. However, tendency toward multiple relationships or affairs requires conscious commitment. Female relationships, especially with wife or life partner, are harmonious. Friendships, especially with women, deepen. Luxury experiences shared with loved ones strengthen bonds.",
    health: "Health during Venus Dasha is generally good with a pleasant physical appearance and glowing skin. However, tendency toward overindulgence in food, sweets, and sensual pleasures can affect health. Reproductive health, kidneys, and urinary system need attention. Hormonal balance, especially in women, requires care. Diabetes and weight gain due to sweet foods are possible. Throat, neck, and thyroid areas are sensitive. Sexually transmitted diseases require precaution. Maintaining balance in pleasure-seeking prevents health issues. Regular exercise balances sedentary, luxurious lifestyle. Beauty treatments and self-care enhance well-being. The left side of body needs more attention.",
    finance: "Financial prosperity is excellent during Venus Dasha, with wealth coming through artistic work, luxury businesses, and partnership ventures. Income increases steadily, allowing for comfortable lifestyle and luxury purchases. Investments in jewelry, precious stones, art, fashion, and beauty-related businesses show good returns. Your financial intuition regarding aesthetic and luxury items is sharp. Real estate, especially beautiful properties, and vehicle purchases are favorable. Partnership businesses and collaborations are financially successful. However, tendency toward expensive lifestyle and luxury spending requires budgeting. Money comes easily but also goes easily on pleasures and comforts.",
    spiritual: "Venus Dasha brings spiritual growth through devotion, beauty, and refined practices. Worship of Goddess Lakshmi, Parvati, and divine feminine forms brings blessings. Bhakti (devotional) path resonates deeply, expressing love for the divine through music, dance, and artistic offerings. Study of texts emphasizing love and devotion, like Narada Bhakti Sutra, brings insights. Your spiritual practices are aesthetic and pleasurable rather than austere. Visiting beautiful temples and sacred art spaces enhances devotion. Understanding the divine nature of beauty and love transforms material experiences into spiritual ones. Tantric practices honoring the divine feminine are beneficial.",
    challenges: "Primary challenges include overindulgence in sensual pleasures leading to health issues and financial drain. Multiple romantic interests can create complicated situations and hurt others. Excessive focus on external beauty and material comforts may neglect inner development. Dependency on relationships for happiness makes you vulnerable to emotional pain. Laziness and resistance to hard work due to preferring comfortable lifestyle limit growth. Expensive tastes can create financial stress. Superficial relationships focused only on attraction lack depth. Balancing pleasure with discipline is crucial. Sexual indiscretions can create karmic complications.",
    opportunities: "This dasha offers wonderful opportunities for marriage to a loving, beautiful partner and creating a harmonious family life. Your artistic talents can bring both creative fulfillment and financial success. Starting businesses in fashion, beauty, arts, or luxury goods is highly favorable. You can become known for your refined taste and creative vision. Building beautiful, comfortable home and acquiring luxury items becomes possible. International travel and residence in beautiful places is accessible. Learning and mastering arts like music, dance, or painting brings joy. Strong female mentors and partnerships enhance success. Material comforts and pleasures are abundant.",
    remedies: [
      "Worship Goddess Lakshmi on Fridays by offering white flowers and sweets",
      "Wear a Diamond or White Sapphire gemstone (1+ carat) in silver/platinum on your middle or ring finger",
      "Chant 'Om Shukraya Namaha' or Mahalakshmi Mantra 108 times daily",
      "Donate white items, rice, sugar, and white clothes on Fridays",
      "Maintain cleanliness, wear clean clothes, and use pleasant fragrances",
      "Practice moderation in sensual pleasures and luxury consumption",
      "Respect women and serve your wife or partner lovingly",
      "Support arts, artists, and creative endeavors",
      "Wear white, cream, or pastel colors, especially on Fridays",
      "Feed white cows with green fodder and offer white flowers at temples"
    ]
  },
  Mercury: {
    overview: "Mercury Maha Dasha is a 17-year period emphasizing communication, intellect, learning, and adaptability. As the planet of intelligence and commerce, Mercury sharpens your mental faculties, analytical abilities, and communication skills. This period is marked by curiosity, versatility, and engagement in multiple activities simultaneously. Your logical thinking, problem-solving abilities, and capacity to learn new subjects increases significantly. Business acumen strengthens, making this excellent for commerce and trade. Writing, speaking, teaching, and all forms of information exchange flourish during this period.",
    characteristics: [
      "Sharp intellect and analytical thinking",
      "Excellent communication and writing skills",
      "Versatility and ability to multitask",
      "Business and commercial acumen",
      "Quick learning and adaptability",
      "Youthful energy and playfulness",
      "Networking and social connectivity"
    ],
    career: "Professional life during Mercury Dasha excels in communication-based fields, writing, journalism, publishing, teaching, accounting, data analysis, and business. You thrive in roles requiring intellectual work rather than physical labor. Technology, software, coding, and digital businesses are highly successful. Sales, marketing, advertising, and public relations showcase your persuasive skills. Commerce, trading, broker services, and financial analysis are profitable. Your ability to process information quickly and communicate clearly makes you valuable. Multiple sources of income through different intellectual pursuits are common. Consulting, advisory services, and knowledge-based businesses flourish.",
    relationships: "Relationships during Mercury Dasha are based on intellectual compatibility, communication, and shared interests rather than purely emotional or physical connection. You attract witty, intelligent partners who stimulate your mind. Conversations and mental rapport form the foundation of romantic bonds. However, excessive analysis and rationalization of feelings can create emotional distance. Sibling relationships, especially with sisters and younger siblings, become significant. Friendships based on intellectual exchange flourish. Your playful, youthful approach keeps relationships fresh. Communication is key to relationship success; unexpressed thoughts create problems. Cousins and extended family interactions increase.",
    health: "Health during Mercury Dasha is generally good, with a youthful appearance and agile body. However, nervous system, respiratory system, and mental health require attention. Anxiety, overthinking, and mental stress from information overload can affect well-being. Insomnia and sleep disturbances due to overactive mind are common. Shoulder, arms, hands, and nervous system are sensitive areas. Allergies, skin issues, and respiratory problems may occur. Speech and communication-related issues need care. Practice mental relaxation through meditation, breathing exercises, and limiting information consumption. Physical exercise helps ground excess mental energy. Adequate sleep and digital detox periods maintain balance.",
    finance: "Financial prosperity during Mercury Dasha comes through intellectual work, communication skills, and commercial ventures. Business, trading, and broker services are highly profitable. Multiple income streams from different sources rather than one fixed income is typical. Investments in technology, communication companies, and intellectual property show good returns. Your analytical skills help you spot market trends and profitable opportunities. Writing, teaching, consulting, and knowledge-based services generate good income. Short-term investments and trading can be profitable. However, scattered focus on too many income sources may limit maximum earnings. Focused commercial efforts bring wealth.",
    spiritual: "Mercury Dasha brings spiritual growth through knowledge, study, and intellectual understanding of spiritual truths. Study of Vedanta, Upanishads, and philosophical texts brings insights. Your approach to spirituality is logical and questioning rather than purely devotional. Writing about spiritual experiences and teaching spiritual concepts to others enhances your own understanding. Worship of Lord Vishnu in his form as Hayagriva (bestower of knowledge) or Narasimha is beneficial. Mantra practice and understanding the science behind spiritual practices appeals to you. Learning multiple spiritual traditions and comparative study deepens wisdom. Service through teaching and sharing knowledge is your spiritual path.",
    challenges: "Main challenges include mental restlessness, scattered focus, and starting many projects without completing them. Overthinking and analysis paralysis can prevent decisive action. Tendency to be too rational and logical may disconnect you from emotions and intuition. Nervous anxiety and worry about multiple matters create stress. Communication can become manipulative or deceptive if ethical boundaries weaken. Information overload and constant mental activity prevent inner peace. Superficial knowledge of many subjects without depth in any may limit expertise. Difficulty making firm commitments due to seeing multiple options simultaneously can affect relationships and career.",
    opportunities: "This dasha offers excellent opportunities for establishing successful businesses, especially in communication, technology, or commerce. Your writing and speaking abilities can bring fame and income through books, blogs, or public speaking. Learning new languages, skills, and subjects comes easily. Higher education and multiple degrees are favorable. Networking expands your social and professional circles significantly. You can become an expert in your field through dedicated study. Consulting and advisory roles showcase your analytical abilities. Teaching and mentoring younger people brings fulfillment. Travel related to business, education, or communication is abundant and profitable.",
    remedies: [
      "Worship Lord Vishnu or Lord Krishna every Wednesday",
      "Wear an Emerald gemstone (5-7 carats) in gold on your little finger",
      "Chant 'Om Budhaya Namaha' or Vishnu Sahasranama regularly",
      "Donate green items, green moong dal, and books to students on Wednesdays",
      "Practice pranayama and breathing exercises to calm the nervous system",
      "Read and study sacred texts regularly to channel intellectual energy spiritually",
      "Respect teachers, relatives, and siblings",
      "Help students and support education for underprivileged children",
      "Wear green colors, especially on Wednesdays",
      "Feed green grass to cows and offer green leaves at Vishnu temples"
    ]
  },
  Saturn: {
    overview: "Saturn Maha Dasha is the second-longest period, spanning 19 years, bringing discipline, responsibility, and karmic lessons. As the taskmaster of the zodiac, Saturn demands hard work, patience, and perseverance. This period is marked by delays, obstacles, and tests that build character and spiritual maturity. Your sense of duty, discipline, and commitment to long-term goals strengthens significantly. Initial years may bring challenges and restrictions, but steady effort leads to lasting achievements. This dasha teaches you about structure, boundaries, and the value of patience. Results come slowly but are permanent and well-earned.",
    characteristics: [
      "Increased responsibility and sense of duty",
      "Patient and disciplined approach to life",
      "Practical, realistic, and grounded thinking",
      "Delayed but permanent results",
      "Tests of character and perseverance",
      "Maturity and wisdom through challenges",
      "Focus on long-term goals and legacy"
    ],
    career: "Professional life during Saturn Dasha involves hard work, responsibility, and gradual rise through merit. You excel in structured environments requiring discipline like government service, administration, management, or labor-oriented fields. Mining, iron and steel, real estate, construction, and industries dealing with masses are favorable. Slow, steady career growth is typical rather than sudden jumps. Positions requiring patience like research, archeology, or long-term projects suit you. You may supervise large workforces or handle significant responsibilities. Recognition comes later in the dasha after proving your reliability. Industries involving elderly care, death, or chronic issues may attract you.",
    relationships: "Relationships during Saturn Dasha are serious, committed, and based on duty rather than passion or romance. You may marry later in life or to someone older, more mature, or from humble background. Relationships require work and commitment to sustain. Responsibilities toward family members, especially parents and elderly relatives, increase significantly. Your relationship approach is loyal and committed once established. However, emotional expression may be limited, creating distance. Loneliness or separation from loved ones may occur for karmic reasons. Patience and effort in relationships eventually create stable, lasting bonds. Service to partner and family becomes important.",
    health: "Health during Saturn Dasha requires attention as you may experience chronic conditions, joint problems, and bone-related issues. Arthritis, dental problems, and skeletal issues are common. Tendency toward depression, melancholy, and pessimistic thinking affects mental health. Deficiency diseases related to calcium, vitamin D, or minerals occur. Knees, bones, teeth, and skin need care. The left side of body is more affected. Chronic rather than acute illnesses characterize this period. However, disciplined health routines and consistent care prevent serious problems. Regular exercise, calcium-rich diet, sunlight, and positive thinking maintain well-being. Traditional and patience-requiring treatments work better.",
    finance: "Financial growth during Saturn Dasha is slow and steady through hard work rather than speculation or sudden gains. Income comes through labor-intensive work, government employment, or industries dealing with masses. Real estate, property, land, and long-term investments eventually bring good returns. Initial years may involve financial struggles and restrictions. However, disciplined saving and investment create lasting wealth over time. Avoid speculative investments or quick-profit schemes. Conservative financial planning and patient wealth accumulation work best. Responsibilities toward elderly family members may require financial support. Investing in tangible assets like property provides security.",
    spiritual: "Saturn Dasha brings profound spiritual growth through detachment, renunciation, and understanding of life's temporary nature. Worship of Lord Shiva, especially in his ascetic forms, and Hanuman brings blessings and removes obstacles. Study of texts emphasizing dharma, karma, and life's impermanent nature brings deep insights. Meditation and solitary spiritual practices come naturally. Service to elderly, poor, underprivileged, and suffering beings brings spiritual merit and Saturn's blessings. Pilgrimages to remote, ancient temples and sacred mountains are beneficial. Understanding and accepting your karma leads to liberation. Discipline in spiritual practices brings remarkable progress. This period often awakens vairagya (dispassion) and genuine spiritual seeking.",
    challenges: "The primary challenges include delays, obstacles, and frustrations in all life areas requiring immense patience. Depression, pessimism, and feeling of being burden by responsibilities can be overwhelming. Loneliness, isolation, and lack of support characterize difficult periods. Health issues, especially chronic conditions, require ongoing management. Financial restrictions and slow income growth create stress. Relationship coldness and emotional distance affect happiness. Fear of failure or criticism can prevent taking necessary risks. Tendency to become overly serious and rigid limits joy. Learning to balance duty with self-care is crucial. Early years of dasha are typically hardest.",
    opportunities: "This dasha offers opportunities to build lasting foundations in all life areas through dedicated effort. You can acquire property, land, and tangible assets that provide long-term security. Government positions and authoritative roles become accessible through merit. Your reputation as reliable, hardworking, and responsible attracts important opportunities. Mastering your field through sustained effort makes you an expert. Spiritual growth through discipline, service, and renunciation can be profound. Building character, patience, and inner strength prepares you for life's challenges. Later years of dasha bring well-earned success and recognition. Legacy-building work done now lasts beyond your lifetime.",
    remedies: [
      "Worship Lord Shiva and Hanuman every Saturday with devotion",
      "Wear a Blue Sapphire gemstone (5-7 carats) in silver/gold on your middle finger (only after astrological verification)",
      "Chant 'Om Shanaischaraya Namaha' or Hanuman Chalisa daily",
      "Donate black items, sesame seeds, mustard oil, and iron to the poor on Saturdays",
      "Serve elderly people, disabled, and underprivileged with compassion",
      "Practice patience and accept delays as opportunities for perfection",
      "Maintain discipline in all life areas and honor your commitments",
      "Respect workers, servants, and people in humble positions",
      "Wear dark colors like black, navy blue, or dark grey, especially on Saturdays",
      "Light sesame oil lamp under peepal tree on Saturdays"
    ]
  },
  Ketu: {
    overview: "Ketu Maha Dasha is a 7-year period of intense spiritual seeking, detachment, and karmic completion. As the South Node of the Moon representing past life karma and moksha (liberation), Ketu brings a natural pull away from material world toward spiritual truth. This period is marked by mystical experiences, intuitive insights, and dissolution of ego attachments. Your interest in meditation, yoga, and spiritual practices intensifies. Worldly ambitions lose appeal as inner search gains priority. This dasha can bring sudden events that force introspection and spiritual growth. Results are often unexpected and seemingly fated.",
    characteristics: [
      "Intense spiritual seeking and detachment",
      "Mystical experiences and intuitive insights",
      "Dissolution of material attachments",
      "Interest in occult, meditation, and yoga",
      "Sudden events and unexpected changes",
      "Completion of past karmic patterns",
      "Difficulty with material focus and worldly success"
    ],
    career: "Career during Ketu Dasha often involves spiritual, healing, or research-oriented fields. Your interest in conventional corporate careers diminishes. Astrology, spiritual counseling, alternative healing, meditation teaching, and yoga instruction become appealing. Research requiring deep investigation, computer programming, and work in isolation suits you. Forensic fields, detective work, and uncovering hidden knowledge are favored. You may leave stable positions for spiritual pursuits or uncertain paths. Frequent job changes or career instability is common. Success comes in fields requiring intuition and spiritual awareness. Material ambition reduces, making career advancement challenging if your field requires aggressive pursuit.",
    relationships: "Relationships during Ketu Dasha are characterized by detachment, spiritual seeking, and difficulty maintaining conventional bonds. You may feel emotionally distant even in close relationships. Separations, breakups, or physical distance from loved ones occur for spiritual growth. Your focus shifts from seeking fulfillment in relationships to finding completeness within. Partners may not understand your spiritual intensity and need for solitude. You attract spiritually oriented or mysterious partners. However, you may also face deception or confusion in relationships. Accepting relationships as temporary and practicing detached love prevents suffering. Spiritual companionship becomes more important than romantic partnership.",
    health: "Health during Ketu Dasha can be mysterious with symptoms difficult to diagnose through conventional medicine. Sudden unexplained health issues followed by equally sudden recoveries occur. Mental health challenges including confusion, disorientation, and lack of clarity affect daily functioning. Accidents and injuries, especially to feet and lower body, are possible. Skin diseases, allergies, and mysterious ailments respond better to alternative healing. Drug allergies and adverse reactions to medications require caution. Spiritual practices, energy healing, and alternative medicine work better than conventional approaches. Grounding exercises and being present in the physical body maintain balance. Mental fog and spaciness need conscious management.",
    finance: "Financial situation during Ketu Dasha is often unstable and detached. Material wealth holds little appeal compared to spiritual riches. Sudden losses, unexpected expenses, and financial instability are common. You may give away money, donate excessively, or invest in spiritual pursuits rather than material accumulation. Income sources may dry up unexpectedly. However, money may also come from unexpected sources or spiritual work. Traditional business pursuits face challenges. Spiritual services, healing work, and teaching metaphysical subjects provide income but usually not abundance. Minimalist lifestyle and reduced material needs come naturally. Trusting divine providence becomes necessary.",
    spiritual: "Ketu Dasha is the most spiritually intense period, offering profound opportunities for enlightenment and liberation. Your meditation practice deepens significantly with spontaneous mystical experiences. Past life memories and karmic patterns surface for resolution. Study of Vedanta, Buddhism, and non-dual philosophies brings direct realization. Detachment from worldly illusions happens naturally. This period can grant moksha (liberation) if spiritual practices are consistent. Worship of Lord Ganesha and forms of Shiva as the destroyer of ignorance is beneficial. Tantric practices and kundalini awakening may occur spontaneously. Isolation, silence, and solitude accelerate spiritual growth. This dasha completes your spiritual seeking of many lifetimes.",
    challenges: "Primary challenges include confusion, disorientation, and lack of clear direction in worldly matters. Material life becomes difficult to manage and sustain. Relationships suffer due to emotional detachment and inability to maintain conventional bonds. Career instability and financial uncertainty create practical difficulties. Health issues may be mysterious and hard to treat. Accidents and sudden negative events cause disruptions. You may feel alienated from society and normal life. Depression from seeing worldly pursuits as meaningless affects motivation. Balancing spiritual seeking with practical responsibilities is very challenging. Grounding in physical reality while pursuing spiritual truth requires conscious effort.",
    opportunities: "This dasha offers extraordinary opportunities for spiritual awakening, enlightenment, and liberation from the cycle of birth and death. You can achieve profound meditative states and mystical experiences. Past karma can be dissolved through awareness and spiritual practice. Mastering occult sciences, astrology, and healing arts becomes possible. Your intuitive and psychic abilities can develop to remarkable levels. You may become a spiritual teacher or healer helping others on their path. Letting go of ego attachments and material illusions brings peace and freedom. This period prepares you for higher spiritual states in future lives. Service through spiritual work creates tremendous merit.",
    remedies: [
      "Worship Lord Ganesha daily to remove obstacles and confusion",
      "Wear a Cat's Eye gemstone (5-7 carats) in silver on your middle finger (only after astrological consultation)",
      "Chant 'Om Ketave Namaha' or Ganesha Mantras regularly",
      "Donate multi-colored items, blankets, and food to dogs and poor people",
      "Practice daily meditation focusing on the third eye and crown chakra",
      "Serve spiritual seekers, sannyasis, and those on spiritual paths",
      "Light ghee lamp in temple and at home altar daily",
      "Practice grounding exercises to remain present in physical reality",
      "Wear earthy colors or gemstone shades; keep a pet dog for grounding",
      "Feed street dogs and donate to animal shelters regularly"
    ]
  }
};

// Antar Dasha (sub-period) descriptions
const antarDashaEffects: Record<string, Record<string, string>> = {
  Sun: {
    Sun: "Double Sun energy amplifies leadership qualities, ego, and authority. This is a powerful time for independent ventures and commanding respect. However, manage pride carefully.",
    Moon: "Sun-Moon combination brings emotional confidence and public recognition. Mother's influence is positive. Balance masculine drive with emotional intelligence.",
    Mars: "Intense energy and aggressive pursuit of goals characterize this period. Excellent for competitive fields but manage anger and impulsiveness carefully.",
    Rahu: "Unconventional authority and innovative leadership emerge. Foreign connections benefit career. Maintain ethical standards despite material temptations.",
    Jupiter: "Wisdom combines with authority creating excellent results. Higher learning and teaching opportunities arise. This is highly auspicious for spiritual and material growth.",
    Saturn: "Authority meets discipline and hard work. Recognition comes slowly but permanently. Health needs attention. Patient effort in career brings lasting success.",
    Mercury: "Intellectual leadership and communication skills shine. Business ventures prosper. Multiple income sources through intelligent work develop well.",
    Ketu: "Spiritual leadership and detachment from ego characterize this period. Mystical insights guide actions. Worldly authority matters less than inner development.",
    Venus: "Creative leadership and attractive personality enhance success. Luxury and comfort improve. Relationships with authority figures are pleasant."
  },
  Moon: {
    Moon: "Double Moon energy intensifies emotions, intuition, and domestic focus. Family matters and mother's influence dominate. Emotional balance is crucial.",
    Mars: "Emotional intensity meets aggressive action. This can create mood-driven impulsive behavior. Channel emotional energy constructively through physical activity.",
    Rahu: "Unusual emotional experiences and unconventional family situations arise. Psychic abilities increase. Manage anxiety and mental restlessness through meditation.",
    Jupiter: "Emotional wisdom and nurturing abundance create beautiful period. Family harmony, spiritual devotion, and material comfort increase. Highly auspicious time.",
    Saturn: "Emotional discipline and responsibilities increase. Possible melancholy requires conscious management. Mother's health needs attention. Patient endurance brings maturity.",
    Mercury: "Emotional intelligence and communication ability combine well. Writing about feelings brings success. Business dealings involving women or domestic items prosper.",
    Ketu: "Emotional detachment and spiritual yearning intensify. Family separations possible. This period supports deep meditation and transcending emotional patterns.",
    Venus: "Emotional fulfillment through relationships and beauty. Marriage prospects excellent. Domestic harmony and luxury improve. Artistic and creative expression flourishes.",
    Sun: "Emotional confidence and public presence strengthen. Leadership in nurturing roles. Relationship with mother improves. Recognition for caring qualities."
  },
  Mars: {
    Mars: "Double Mars creates intense energy, competitiveness, and potential aggression. Excellent for athletics and technical work but manage anger consciously.",
    Rahu: "Explosive combination creating sudden events, technological success, and intense ambitions. Manage impulsiveness and avoid risky ventures.",
    Jupiter: "Courage meets wisdom creating righteous action and successful ventures. This is excellent for new businesses, leadership roles, and protecting others.",
    Saturn: "Forced patience and delayed action create frustration. Persistent effort eventually succeeds. Property matters progress slowly. Health and accident prevention crucial.",
    Mercury: "Technical communication and strategic thinking combine well. Business negotiations succeed. Engineering and mathematical work prospers. Quick decision-making aided by analysis.",
    Ketu: "Aggressive spiritual seeking and sudden mystical experiences. Actions seem destined. Possible accidents requiring caution. Martial arts and yoga benefit spiritual growth.",
    Venus: "Passion and creativity combine beautifully. Romantic relationships are intense and fulfilling. Luxury purchases, especially vehicles. Arts combining action and beauty thrive.",
    Sun: "Leadership and courage create powerful combination for success in competitive fields. Authority and physical vitality increase. Manage ego conflicts.",
    Moon: "Emotional intensity drives actions which can be impulsive. Mood swings affect decision-making. Mother and wife relationships need diplomatic handling."
  },
  Rahu: {
    Rahu: "Double Rahu intensifies material ambitions, foreign connections, and unconventional experiences. Sudden major life changes occur. Maintain ethics and mental balance.",
    Jupiter: "Material ambition meets wisdom creating successful expansion. Foreign education and travel. Ethical success in innovative fields. Excellent for spiritual-material balance.",
    Saturn: "Long-term unconventional ambitions face karmic tests. Delayed but significant results in technology and foreign matters. Patience with unusual circumstances required.",
    Mercury: "Intellectual innovation and technological success characterize this period. Digital businesses, programming, and communication in modern fields flourish remarkably.",
    Ketu: "Intense spiritual experiences alongside material confusion. Sudden mystical insights and unexpected events force spiritual growth. Trust destiny while staying grounded.",
    Venus: "Unconventional relationships and creative success in modern fields. Foreign romance possible. Success in luxury technology and innovative arts. Balance pleasure and spirituality.",
    Sun: "Authoritative innovation and leadership in unconventional fields. Government positions in modern sectors. Foreign authority or residence possible. Maintain humility.",
    Moon: "Emotional confusion and anxiety alongside intuitive insights. Foreign connections affect family. Unusual domestic situations. Meditation crucial for mental peace.",
    Mars: "Aggressive innovation and technical boldness create success or accidents depending on consciousness. Explosive energy needs wise channeling into constructive technological work."
  },
  Jupiter: {
    Jupiter: "Double Jupiter brings maximum wisdom, prosperity, and spiritual growth. Excellent for all endeavors, especially education, teaching, and spiritual practices.",
    Saturn: "Wisdom meets discipline creating deep philosophical understanding and enduring achievements. Teaching traditional subjects. Initial challenges lead to respected position.",
    Mercury: "Intellectual and philosophical harmony creates success in publishing, teaching, and knowledge-based businesses. Multiple income sources through wisdom.",
    Ketu: "Spiritual wisdom and detachment from worldly success. This period can grant enlightenment. Teaching spiritual truths and mystical experiences are common.",
    Venus: "Prosperous and harmonious period bringing wealth, marriage, and luxury. Creative arts flourish. Family happiness and beautiful partnerships form.",
    Sun: "Authoritative wisdom and respected leadership. Recognition from government and established institutions. This is highly auspicious for career and spiritual growth.",
    Moon: "Emotional wisdom and nurturing abundance. Family prosperity and domestic happiness. Excellent for marriage, children, and maternal blessings.",
    Mars: "Courageous dharmic action and righteous battles. Success in competitive fields through ethical means. Technical or legal education benefits career.",
    Rahu: "Expansive material success through innovative means. Foreign education and unconventional wisdom. Balance ethical principles with modern opportunities."
  },
  Saturn: {
    Saturn: "Double Saturn intensifies karmic lessons, responsibilities, and need for patience. Hard work eventually brings permanent success but initial period challenging.",
    Mercury: "Disciplined intellectual work and detailed analysis bring career success. Writing on serious subjects. Business involving labor or masses prospers gradually.",
    Ketu: "Spiritual discipline and karmic completion. Renunciation tendencies and possible isolation. This period supports deep meditation and detachment from material life.",
    Venus: "Creative discipline and structured beauty. Relationships mature and stabilize. Income through arts or luxury requires sustained effort. Marriage may face initial challenges then stabilize.",
    Sun: "Authority through hard work and proven responsibility. Government positions possible. Father's influence significant. Recognition comes late but lasts.",
    Moon: "Emotional discipline and maternal responsibilities. Possible melancholy requires conscious positivity. Nurturing becomes duty. Property and domestic matters need patient attention.",
    Mars: "Frustrated energy and forced patience in action. Property matters face delays but eventually succeed. Technical work requires persistent effort. Prevent accidents through caution.",
    Rahu: "Unconventional delays and karmic tests in modern fields. Technology and foreign matters face obstacles. Persistence in innovative work eventually succeeds.",
    Jupiter: "Karmic wisdom and philosophical maturity. Traditional teaching and counseling. Initial restrictions in growth eventually lead to respected position and lasting achievements."
  },
  Mercury: {
    Mercury: "Double Mercury sharpens intellect, communication, and business acumen. Multiple ventures and income sources. Excellent for learning new skills and networking.",
    Ketu: "Intellectual detachment and mystical communication. Writing on spiritual subjects. Confusion in business matters. Trust intuition over logic during this period.",
    Venus: "Creative communication and artistic business success. Publishing, media, and aesthetic ventures prosper. Pleasant social connections and beneficial friendships.",
    Sun: "Authoritative communication and intellectual leadership. Success in administrative writing and speaking. Government communication roles favor you.",
    Moon: "Emotional intelligence in communication. Writing about feelings and psychology. Business involving women or domestic products. Family communications improve.",
    Mars: "Quick decisions and aggressive business tactics. Technical communication and engineering work succeed. Sales and negotiations are assertive and successful.",
    Rahu: "Innovative communication and digital business success. Technology ventures and social media flourish. International networking and modern commercial methods prosper.",
    Jupiter: "Wise communication and ethical business. Teaching and publishing philosophical or educational content. Commercial ventures grow ethically and successfully.",
    Saturn: "Detailed analytical work and serious writing. Business requires patient effort. Communication with authorities and structured commercial ventures eventually succeed."
  },
  Venus: {
    Venus: "Double Venus brings maximum luxury, beauty, romance, and creative success. Relationships flourish. Material comforts and artistic achievements are abundant.",
    Sun: "Creative authority and beautiful leadership. Recognition for artistic work. Luxury and comfort through leadership. Beneficial relationship with authority figures.",
    Moon: "Emotional and aesthetic harmony. Domestic beauty and family happiness. Excellent for marriage, comfort, and nurturing creative expression.",
    Mars: "Passionate creativity and dynamic relationships. Physical attraction and sports combined with arts. Luxury vehicles and active creative pursuits.",
    Rahu: "Unconventional beauty and foreign creative success. Modern artistic methods and international luxury. Unusual relationships and innovative aesthetic ventures.",
    Jupiter: "Prosperous and harmonious period with wealth, wisdom, and beauty. Marriage, luxury, and spiritual creativity. Excellent for all artistic and relationship matters.",
    Saturn: "Creative discipline and lasting beauty. Relationships mature through challenges. Artistic work requires sustained effort but creates lasting value.",
    Mercury: "Intellectual creativity and commercial artistic success. Writing, design, and aesthetic business ventures prosper. Pleasant communication enhances relationships.",
    Ketu: "Spiritual creativity and detachment from sensual pleasures. Mystical arts and transcendent beauty. Relationships serve spiritual growth more than material satisfaction."
  },
  Ketu: {
    Ketu: "Double Ketu creates intense spiritual seeking, mystical experiences, and worldly detachment. This period can grant enlightenment but creates material confusion.",
    Venus: "Spiritual relationships and transcendent beauty. Creative work in mystical arts. Detachment from sensual pleasures while appreciating divine beauty.",
    Sun: "Spiritual leadership and egoless authority. Recognition in mystical or healing fields. Father may influence spiritual path. Unusual career directions.",
    Moon: "Mystical emotions and spiritual intuition. Family detachment and possible separations. Psychic abilities develop. Meditation deepens significantly.",
    Mars: "Aggressive spiritual seeking and sudden mystical experiences. Warrior-saint energy. Yoga and martial arts serve spiritual awakening. Accidents possible; practice caution.",
    Rahu: "Intense confusion followed by spiritual clarity. Unusual mystical experiences. Complete reversal of life direction possible. Trust surrendering to divine will.",
    Jupiter: "Spiritual wisdom and detachment from material success. This period may grant moksha. Teaching mystical truths and profound philosophical understanding develop.",
    Saturn: "Karmic spiritual completion and disciplined renunciation. Isolation serves deep meditation. Material challenges support spiritual growth. Patience through mystical confusion.",
    Mercury: "Intellectual mysticism and communication of spiritual truths. Writing on occult subjects. Business confusion but intuitive insights. Trust spiritual guidance over logic."
  }
};

export default function DashaPredictions({
  mahaDasha,
  antarDasha,
  mahaDashaStart,
  mahaDashaEnd,
  antarDashaStart,
  antarDashaEnd
}: DashaPredictionsProps) {
  const mahaPrediction = mahaDashaPredictions[mahaDasha] || mahaDashaPredictions.Sun;
  const antarEffect = antarDashaEffects[mahaDasha]?.[antarDasha] || "";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {/* Maha Dasha Prediction Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Your {mahaDasha} Maha Dasha Period</span>
            </span>
            <Clock className="w-5 h-5 text-muted-foreground" />
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {formatDate(mahaDashaStart)} to {formatDate(mahaDashaEnd)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overview */}
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Complete Overview</span>
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{mahaPrediction.overview}</p>
          </div>

          {/* Key Characteristics */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h4 className="font-semibold text-sm mb-3">Key Characteristics of This Period</h4>
            <ul className="space-y-2">
              {mahaPrediction.characteristics.map((char, idx) => (
                <li key={idx} className="text-xs text-muted-foreground flex items-start space-x-2">
                  <Star className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                  <span>{char}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Life Areas in Detail */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Detailed Predictions by Life Area</h4>

            {/* Career */}
            <div className="p-3 bg-card rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <h5 className="font-semibold text-sm">Career & Professional Life</h5>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{mahaPrediction.career}</p>
            </div>

            {/* Relationships */}
            <div className="p-3 bg-card rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <h5 className="font-semibold text-sm">Relationships & Love</h5>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{mahaPrediction.relationships}</p>
            </div>

            {/* Health */}
            <div className="p-3 bg-card rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-green-500" />
                <h5 className="font-semibold text-sm">Health & Wellness</h5>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{mahaPrediction.health}</p>
            </div>

            {/* Finance */}
            <div className="p-3 bg-card rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-4 h-4 text-gold" />
                <h5 className="font-semibold text-sm">Finance & Wealth</h5>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{mahaPrediction.finance}</p>
            </div>

            {/* Spiritual */}
            <div className="p-3 bg-card rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="w-4 h-4 text-purple" />
                <h5 className="font-semibold text-sm">Spiritual Growth</h5>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{mahaPrediction.spiritual}</p>
            </div>
          </div>

          {/* Challenges and Opportunities */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-orange-500/5 rounded-lg border border-orange-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-4 h-4 text-orange-500" />
                <h5 className="font-semibold text-sm">Challenges to Navigate</h5>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{mahaPrediction.challenges}</p>
            </div>

            <div className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-green-500" />
                <h5 className="font-semibold text-sm">Opportunities to Seize</h5>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{mahaPrediction.opportunities}</p>
            </div>
          </div>

          {/* Remedies */}
          <div className="p-4 bg-gold/5 rounded-lg border border-gold/20">
            <h4 className="font-semibold text-sm mb-3 text-gold-foreground">Vedic Remedies for {mahaDasha} Dasha</h4>
            <div className="space-y-2">
              {mahaPrediction.remedies.map((remedy, idx) => (
                <div key={idx} className="text-xs text-muted-foreground flex items-start space-x-2">
                  <span className="text-gold font-semibold mt-0.5">{idx + 1}.</span>
                  <span className="leading-relaxed">{remedy}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Antar Dasha Period */}
      <Card className="border-purple/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-purple" />
            <span>Current {mahaDasha}-{antarDasha} Antar Dasha</span>
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {formatDate(antarDashaStart)} to {formatDate(antarDashaEnd)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-purple/5 rounded-lg border border-purple/20">
            <h4 className="font-semibold text-sm mb-3">Combined Planetary Influence</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {antarEffect}
            </p>
            <p className="text-xs text-muted-foreground mt-3 italic">
              The Antar Dasha creates a sub-period within your Maha Dasha where the energies of both {mahaDasha} and {antarDasha}
              combine to influence your experiences. This period lasts a specific duration and then moves to the next planetary
              sub-period in sequence, each bringing its unique flavor to your overall {mahaDasha} Maha Dasha journey.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Daily Horoscope Component
 * Generates detailed personalized horoscope based on user's birth chart
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Sun, Moon, Star, TrendingUp, Heart, Briefcase, DollarSign, Activity } from "lucide-react";

interface DailyHoroscopeProps {
  moonSign: string;
  nakshatra: string;
  mahaDasha: string;
  antarDasha: string;
  ascendant: string;
}

// Detailed horoscope data based on Moon sign
const moonSignHoroscopes: Record<string, {
  general: string;
  career: string;
  love: string;
  health: string;
  finance: string;
  remedy: string;
  luckyTime: string;
  luckyColor: string;
  luckyNumber: number;
}> = {
  Aries: {
    general: "Your natural leadership qualities are heightened today. Mars, your ruling planet, energizes you with courage and determination. This is an excellent time to take bold initiatives and start new projects. Your competitive spirit will help you overcome any obstacles that come your way.",
    career: "Professional opportunities knock at your door today. Your dynamic energy and assertive approach will impress superiors. Take initiative on new projects and showcase your leadership abilities. Collaboration with colleagues will yield excellent results.",
    love: "Passion runs high in your relationships. Express your feelings openly and honestly. Single natives may encounter someone exciting through sports or competitive activities. Married couples should plan something adventurous together to reignite the spark.",
    health: "High energy levels demand physical activity. Channel your aggressive energy through sports, gym, or yoga. Be cautious of minor injuries due to haste. Practice anger management and avoid confrontational situations that may cause stress.",
    finance: "Financial prospects look promising for new investments, especially in real estate or business ventures. Your bold financial decisions could pay off well. However, avoid impulsive purchases and maintain a balanced approach to spending.",
    remedy: "Recite Mars mantras and donate red lentils to strengthen your planetary influences. Wear red or orange colors to enhance your energy. Practice meditation to balance your aggressive tendencies.",
    luckyTime: "11:00 AM - 1:00 PM",
    luckyColor: "Red, Orange",
    luckyNumber: 9
  },
  Taurus: {
    general: "Venus, your ruling planet, blesses you with harmony and stability today. Your practical approach and patient nature will help you make steady progress. Focus on building long-term foundations rather than seeking quick results. Your aesthetic sense is particularly sharp.",
    career: "Steady progress in professional matters is indicated. Your reliability and attention to detail will be recognized. This is an excellent time for negotiations, signing contracts, and building business relationships. Financial planning projects will benefit from your systematic approach.",
    love: "Romance blooms gently and beautifully. Your sensual and affectionate nature attracts positive attention. Those in relationships will experience deeper emotional bonding. Single natives may meet someone through art, music, or cultural events.",
    health: "Your physical constitution remains strong. Focus on maintaining balance through proper diet and regular exercise. Throat and neck areas need attention. Indulge in relaxing activities like spa treatments or nature walks to reduce stress.",
    finance: "Financial stability is your strength today. Investments in land, property, or luxury items show promise. Your practical financial sense helps you make sound decisions. Avoid lending large sums and focus on building personal savings.",
    remedy: "Worship Venus by offering white flowers and sweets. Wear white or pastel colors to enhance peace. Practice gratitude and donate food to strengthen your Venus.",
    luckyTime: "2:00 PM - 4:00 PM",
    luckyColor: "White, Pink, Pastel Blue",
    luckyNumber: 6
  },
  Gemini: {
    general: "Mercury empowers your intellect and communication abilities today. Your quick wit and adaptability help you navigate complex situations effortlessly. This is an ideal time for networking, learning new skills, and engaging in intellectual pursuits. Multiple opportunities may present themselves simultaneously.",
    career: "Communication-related work flourishes today. Your networking skills and ability to multitask will be highly valuable. Presentations, negotiations, and business correspondence will go exceptionally well. Consider starting new learning initiatives or training programs.",
    love: "Intellectual connection takes priority in relationships. Engage in meaningful conversations with your partner. Single natives may attract someone through social media, workshops, or educational settings. Keep communication open and honest.",
    health: "Mental activity is high, but remember to rest your nervous system. Breathing exercises and meditation will help calm your overactive mind. Pay attention to respiratory health and maintain good posture while working on devices.",
    finance: "Multiple income sources show promise. Your analytical skills help you spot good investment opportunities in stocks or mutual funds. Communication-based business ventures will prove profitable. Avoid scattering financial resources too thin.",
    remedy: "Strengthen Mercury by donating green vegetables and books to students. Wear green colors to enhance mental clarity. Practice pranayama for nervous system balance.",
    luckyTime: "9:00 AM - 11:00 AM",
    luckyColor: "Green, Light Yellow",
    luckyNumber: 5
  },
  Cancer: {
    general: "The Moon, your ruling planet, enhances your intuitive and nurturing qualities today. Your emotional intelligence helps you connect deeply with others. Trust your instincts in decision-making. This is an excellent time for family matters, home improvements, and emotional healing.",
    career: "Your empathetic approach wins you support from colleagues and superiors. Careers in counseling, healthcare, hospitality, or creative fields flourish. Use your intuition in business decisions. Team collaboration brings excellent results.",
    love: "Deep emotional bonding is highlighted in relationships. Your nurturing nature creates a warm, secure environment for your loved ones. Single natives may reconnect with someone from the past. Express your feelings through caring gestures.",
    health: "Emotional health directly impacts physical well-being today. Practice emotional release through journaling or talking to trusted friends. Pay attention to digestive health and maintain a balanced diet. Adequate rest and hydration are essential.",
    finance: "Financial security through traditional investments is favored. Real estate, family business, or food-related ventures show promise. Your protective instinct helps you make safe financial decisions. Create an emergency fund for peace of mind.",
    remedy: "Worship the Moon by offering white flowers and rice. Wear white or silver colors to enhance emotional balance. Practice meditation near water bodies for mental peace.",
    luckyTime: "7:00 PM - 9:00 PM",
    luckyColor: "White, Silver, Pearl",
    luckyNumber: 2
  },
  Leo: {
    general: "The Sun, your ruling planet, illuminates your path with confidence and vitality today. Your natural charisma and leadership abilities are at their peak. This is your time to shine and take center stage. Your creative expression finds perfect outlets for manifestation.",
    career: "Recognition and appreciation come your way in professional spheres. Your leadership qualities inspire others. This is ideal for presentations, public speaking, and taking charge of important projects. Authority figures notice your capabilities.",
    love: "Romance is passionate and expressive. Your magnetic personality attracts admiration. Plan grand gestures to show your affection. Single natives may attract someone through creative pursuits or social events. Be generous with praise for your partner.",
    health: "Vitality is strong, but don't overexert yourself. Regular exercise, especially outdoor activities, keeps you energized. Pay attention to heart health and spinal alignment. Maintain a confident but not arrogant attitude to avoid stress.",
    finance: "Financial growth through speculative investments or creative ventures is possible. Your confidence attracts monetary opportunities. However, avoid ego-driven spending on luxury items. Invest in gold or sun-related assets for long-term benefits.",
    remedy: "Strengthen the Sun by offering water at sunrise and reciting Surya mantras. Wear gold, orange, or red colors to enhance vitality. Practice humility alongside confidence.",
    luckyTime: "12:00 PM - 2:00 PM",
    luckyColor: "Gold, Orange, Red",
    luckyNumber: 1
  },
  Virgo: {
    general: "Mercury blesses you with analytical precision and practical wisdom today. Your attention to detail and organizational skills are exceptional. This is perfect for completing pending tasks, organizing your space, and planning for the future. Your service-oriented nature brings fulfillment.",
    career: "Your meticulous work ethic and problem-solving abilities shine in the workplace. This is ideal for quality control, data analysis, research work, and process improvements. Your systematic approach impresses superiors and brings opportunities for advancement.",
    love: "Practical expressions of love take precedence. Show your care through helpful actions and attention to your partner's needs. Single natives may attract someone through work or health-related settings. Communication needs to be both practical and heartfelt.",
    health: "Focus on preventive healthcare and maintaining healthy routines. Your body responds well to systematic exercise and balanced nutrition. Digestive health is important; maintain a clean, organized diet. Mental health benefits from decluttering your environment.",
    finance: "Detailed financial planning brings excellent results. Your analytical skills help you spot both opportunities and risks. Investments in healthcare, service sectors, or technology show promise. Budget carefully and maintain detailed financial records.",
    remedy: "Strengthen Mercury through donation of green vegetables and helping students. Wear green or navy blue colors for mental clarity. Practice mindfulness to balance overthinking tendencies.",
    luckyTime: "10:00 AM - 12:00 PM",
    luckyColor: "Green, Navy Blue, Grey",
    luckyNumber: 5
  },
  Libra: {
    general: "Venus graces you with harmony, beauty, and diplomatic abilities today. Your natural sense of balance helps you navigate relationships smoothly. This is an excellent time for artistic pursuits, relationship building, and creating beautiful environments. Your charm attracts positive opportunities.",
    career: "Your diplomatic skills and ability to mediate conflicts make you invaluable in the workplace. Careers in law, design, counseling, or partnership-based businesses flourish. Negotiations and contract signings are favored. Your aesthetic sense benefits creative projects.",
    love: "Romantic energy flows beautifully today. Your charm and grace attract positive attention. This is perfect for planning romantic dates, having important relationship discussions, or meeting new people. Balance giving and receiving in relationships.",
    health: "Overall health is balanced and harmonious. Focus on activities that bring pleasure and relaxation. Kidney health and hormonal balance need attention. Beauty treatments, spa visits, or aesthetic activities enhance well-being. Avoid overindulgence.",
    finance: "Financial partnerships and collaborations show promise. Investments in art, fashion, luxury goods, or beauty-related businesses are favored. Your balanced approach to money helps avoid extremes. Maintain fair financial dealings in all transactions.",
    remedy: "Worship Venus by offering white flowers and sweets on Fridays. Wear white, pink, or pastel colors to enhance harmony. Practice gratitude and maintain balance in all areas of life.",
    luckyTime: "3:00 PM - 5:00 PM",
    luckyColor: "White, Pink, Light Blue",
    luckyNumber: 6
  },
  Scorpio: {
    general: "Mars energizes your transformative and investigative nature today. Your intensity and determination help you dive deep into matters others avoid. This is powerful for research, investigation, healing work, and profound personal transformation. Trust your powerful intuition.",
    career: "Your investigative abilities and strategic thinking are exceptional today. Careers in research, psychology, surgery, occult sciences, or financial analysis flourish. Your ability to uncover hidden information brings success. Don't fear diving into complex projects.",
    love: "Passion and intensity characterize your relationships. Deep emotional and physical connection is highlighted. Your magnetic personality attracts intense encounters. Be open about your feelings while respecting boundaries. Jealousy needs conscious management.",
    health: "Strong regenerative powers aid healing today. Focus on detoxification and elimination. Pay attention to reproductive health and lower body areas. Channel intense emotions through physical activity or therapeutic practices. Avoid holding grudges.",
    finance: "Investments in insurance, inheritance matters, or joint financial ventures show promise. Your research skills help you find hidden financial opportunities. Avoid impulsive financial decisions driven by emotional intensity. Long-term strategic planning brings wealth.",
    remedy: "Strengthen Mars by reciting mantras and donating red items on Tuesdays. Wear red or maroon colors for protection. Practice forgiveness and emotional release for transformation.",
    luckyTime: "11:00 AM - 1:00 PM",
    luckyColor: "Red, Maroon, Black",
    luckyNumber: 9
  },
  Sagittarius: {
    general: "Jupiter expands your horizons and brings optimism today. Your philosophical nature and adventurous spirit guide you toward growth opportunities. This is excellent for learning, teaching, travel planning, and exploring new belief systems. Your wisdom inspires others.",
    career: "Professional growth through expansion and learning is highlighted. Teaching, publishing, international business, or legal work flourishes. Your optimistic approach and broad vision attract opportunities. This is ideal for strategic planning and long-term goal setting.",
    love: "Freedom and adventure in relationships are important today. Share philosophical discussions and plan future adventures with your partner. Single natives may meet someone through travel, education, or spiritual pursuits. Maintain honesty and openness.",
    health: "Overall vitality is good, but avoid overindulgence and excess. Pay attention to liver health and hip areas. Outdoor activities and sports benefit your well-being. Maintain optimism while staying grounded. Balance adventurous activities with adequate rest.",
    finance: "Financial expansion through education, publishing, travel, or international ventures is favored. Your optimistic outlook attracts abundance, but avoid overextending resources. Investments in higher education or spiritual pursuits bring long-term benefits.",
    remedy: "Strengthen Jupiter by donating yellow items and helping teachers or students. Wear yellow or gold colors to enhance wisdom. Practice gratitude and share knowledge generously.",
    luckyTime: "10:00 AM - 12:00 PM",
    luckyColor: "Yellow, Gold, Orange",
    luckyNumber: 3
  },
  Capricorn: {
    general: "Saturn blesses you with discipline, patience, and practical wisdom today. Your ambitious nature and strong work ethic pave the way for lasting success. This is excellent for long-term planning, building structures, and working toward career goals. Persistence pays off.",
    career: "Your professional dedication and responsible approach bring recognition. This is ideal for taking on leadership roles, managing projects, and demonstrating reliability. Hard work invested now yields results over time. Authority figures notice your commitment.",
    love: "Relationships deepen through loyalty and commitment. Your practical approach to love builds solid foundations. Express affection through actions and reliability rather than just words. Single natives may attract someone serious and mature.",
    health: "Focus on bone health, teeth, and joint areas. Regular exercise and proper posture are essential. Don't let work stress accumulate; practice regular relaxation. Your disciplined approach to health routines brings excellent long-term results.",
    finance: "Long-term financial planning and conservative investments are strongly favored. Real estate, traditional business, or government-related financial matters show promise. Your patient approach to wealth building brings steady growth. Avoid get-rich-quick schemes.",
    remedy: "Strengthen Saturn by donating black items and serving elderly people on Saturdays. Wear black, navy blue, or dark colors for grounding. Practice patience and discipline in all endeavors.",
    luckyTime: "6:00 AM - 8:00 AM",
    luckyColor: "Black, Navy Blue, Dark Grey",
    luckyNumber: 8
  },
  Aquarius: {
    general: "Saturn gifts you with innovative thinking and humanitarian vision today. Your unique perspective and progressive ideas attract attention. This is excellent for networking, community work, technological pursuits, and implementing reforms. Your individuality is your strength.",
    career: "Unconventional career paths and innovative projects flourish. Your ability to think outside the box brings solutions to complex problems. Technology, social work, research, or group-based ventures are favored. Network with like-minded professionals.",
    love: "Friendship forms the foundation of romantic relationships today. Intellectual connection and shared ideals are important. Your independent nature needs space within relationships. Single natives may meet someone through social causes or group activities.",
    health: "Circulation and nervous system health need attention. Regular movement and mental relaxation are essential. Your innovative approach to health may lead you to alternative healing methods. Balance social activity with alone time for recharging.",
    finance: "Investments in technology, innovation, or socially conscious ventures show promise. Your unconventional financial strategies may work well. Group investments or crowdfunding projects could be beneficial. Maintain financial independence and avoid rigid traditional approaches.",
    remedy: "Strengthen Saturn through service to humanity and innovation. Wear electric blue or unusual color combinations. Practice meditation and maintain your unique identity while serving the collective.",
    luckyTime: "4:00 PM - 6:00 PM",
    luckyColor: "Electric Blue, Turquoise, Violet",
    luckyNumber: 8
  },
  Pisces: {
    general: "Jupiter enhances your intuitive and compassionate nature today. Your spiritual awareness and creative imagination are at their peak. This is perfect for artistic pursuits, healing work, meditation, and connecting with your higher self. Your empathy touches hearts.",
    career: "Creative and healing professions flourish. Your intuitive approach helps you understand situations beyond surface appearances. Careers in art, music, counseling, spirituality, or healthcare are especially favored. Trust your creative instincts in professional decisions.",
    love: "Deep emotional and spiritual connection characterizes relationships today. Your romantic and idealistic nature creates magical moments. Express love through poetry, music, or spiritual sharing. Single natives may experience karmic encounters leading to soulful connections.",
    health: "Emotional and spiritual well-being directly impact physical health. Spend time near water, practice meditation, and engage in creative expression for healing. Feet and lymphatic system need attention. Avoid escapist tendencies through unhealthy habits.",
    finance: "Intuitive financial decisions may prove correct, but balance intuition with practical analysis. Creative ventures, spiritual services, or healing businesses show promise. Charitable giving brings unexpected returns. Avoid being overly idealistic in money matters.",
    remedy: "Strengthen Jupiter by donating yellow items and helping spiritual seekers. Wear yellow, gold, or sea green colors. Practice meditation and maintain boundaries to protect your sensitive energy.",
    luckyTime: "5:00 PM - 7:00 PM",
    luckyColor: "Yellow, Sea Green, Lavender",
    luckyNumber: 3
  }
};

// Nakshatra-specific guidance
const nakshatraGuidance: Record<string, string> = {
  Ashwini: "Your pioneering spirit and healing abilities are activated. Take swift action on new beginnings and trust your instincts.",
  Bharani: "Transformation and creative power flow through you. This is a time for birth of new ideas and managing responsibilities.",
  Krittika: "Your discriminating intellect and purifying energy are strong. Cut away what no longer serves and focus on excellence.",
  Rohini: "Creativity and material growth are highlighted. Nurture your projects with patience and artistic sensibility.",
  Mrigashira: "Curiosity and search for truth guide you. Explore new knowledge and communicate your discoveries.",
  Ardra: "Transformative storms bring necessary change. Embrace emotional processing and breakthrough insights.",
  Punarvasu: "Renewal and return to harmony are your themes. Focus on philosophical wisdom and generous giving.",
  Pushya: "Nourishment and spiritual growth are emphasized. This is ideal for learning, teaching, and nurturing others.",
  Ashlesha: "Deep psychological insight and mystical awareness are heightened. Use wisdom to navigate complex emotional terrains.",
  Magha: "Ancestral power and royal authority flow through you. Honor traditions while exercising leadership with dignity.",
  "Purva Phalguni": "Creativity, pleasure, and prosperity are favored. Enjoy life's beauty while maintaining relationships.",
  "Uttara Phalguni": "Generosity and contracted partnerships bring success. Focus on agreements, commitments, and helping others.",
  Hasta: "Skillful manifestation and detailed craftsmanship are your gifts. Use your hands to create tangible results.",
  Chitra: "Artistic brilliance and architectural vision shine through. Build something beautiful and lasting.",
  Swati: "Independence and flexibility serve you well. Balance freedom with responsibility in all endeavors.",
  Vishakha: "Determined focus and goal achievement are highlighted. Channel intense energy toward meaningful objectives.",
  Anuradha: "Devotion and deep friendship bring rewards. Cultivate loyalty and work within organized structures.",
  Jyeshtha: "Seniority and protective power are your strengths. Take responsibility while managing pride and possessiveness.",
  Mula: "Deep investigation and root-level transformation occur. Destroy old foundations to build anew.",
  "Purva Ashadha": "Invincibility and purification bring victories. Your confidence and optimism attract success.",
  "Uttara Ashadha": "Leadership and permanent achievement are within reach. Focus on creating lasting impact.",
  Shravana: "Learning and listening bring wisdom. Absorb knowledge and share it with others for collective benefit.",
  Dhanishta: "Wealth, music, and group activities flourish. Your ability to synchronize with others brings prosperity.",
  Shatabhisha: "Healing and mystical revelation are powerful. Your unconventional approach brings breakthrough solutions.",
  "Purva Bhadrapada": "Spiritual transformation and idealistic vision guide you. Your intensity serves higher purposes.",
  "Uttara Bhadrapada": "Deep wisdom and compassionate service bring fulfillment. Connect earthly reality with cosmic consciousness.",
  Revati: "Completion and safe passage are themes. Your nurturing guidance helps others reach their destinations."
};

export default function DailyHoroscope({
  moonSign,
  nakshatra,
  mahaDasha,
  antarDasha,
  ascendant
}: DailyHoroscopeProps) {
  const horoscope = moonSignHoroscopes[moonSign] || moonSignHoroscopes.Aries;
  const nakshatraMessage = nakshatraGuidance[nakshatra] || "";

  return (
    <div className="space-y-4">
      {/* Main Horoscope Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Sun className="w-5 h-5 text-primary" />
              <span>Today's Detailed Horoscope</span>
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* General Overview */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-sm">General Overview</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{horoscope.general}</p>
          </div>

          {/* Nakshatra Influence */}
          <div className="p-3 bg-purple/5 rounded-lg border border-purple/20">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-4 h-4 text-purple" />
              <h4 className="font-semibold text-sm text-purple">Your {nakshatra} Nakshatra Energy</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{nakshatraMessage}</p>
          </div>

          {/* Life Areas */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Career */}
            <div className="p-3 bg-card rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-sm">Career & Work</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{horoscope.career}</p>
            </div>

            {/* Love */}
            <div className="p-3 bg-card rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <h4 className="font-semibold text-sm">Love & Relationships</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{horoscope.love}</p>
            </div>

            {/* Health */}
            <div className="p-3 bg-card rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-green-500" />
                <h4 className="font-semibold text-sm">Health & Wellness</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{horoscope.health}</p>
            </div>

            {/* Finance */}
            <div className="p-3 bg-card rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-4 h-4 text-gold" />
                <h4 className="font-semibold text-sm">Finance & Money</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{horoscope.finance}</p>
            </div>
          </div>

          {/* Dasha Influence */}
          <div className="p-4 bg-gradient-to-r from-primary/5 to-purple/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-sm">Current Dasha Influence</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              You are currently in <strong className="text-foreground">{mahaDasha} Maha Dasha</strong> and{" "}
              <strong className="text-foreground">{antarDasha} Antar Dasha</strong>. This period influences your experiences and growth patterns.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The combined energy of {mahaDasha} and {antarDasha} creates a unique life phase. Your actions during this period
              shape your destiny according to Vedic principles. Align your daily activities with the natural qualities of these
              planetary periods for optimal results.
            </p>
          </div>

          {/* Daily Remedies & Guidance */}
          <div className="p-4 bg-gold/5 rounded-lg border border-gold/20">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-gold" />
              <h4 className="font-semibold text-sm text-gold-foreground">Remedies & Recommendations</h4>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-foreground mb-1">Vedic Remedies:</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{horoscope.remedy}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 bg-background rounded">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Lucky Time</p>
                  <p className="text-xs font-semibold text-foreground">{horoscope.luckyTime}</p>
                </div>
                <div className="p-2 bg-background rounded">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Lucky Color</p>
                  <p className="text-xs font-semibold text-foreground">{horoscope.luckyColor}</p>
                </div>
                <div className="p-2 bg-background rounded">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Lucky Number</p>
                  <p className="text-xs font-semibold text-foreground">{horoscope.luckyNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

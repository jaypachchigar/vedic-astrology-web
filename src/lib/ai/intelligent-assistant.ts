/**
 * Intelligent AI Assistant with Learning Capabilities
 * Provides birth-chart-specific answers and learns from user interactions
 */

import { supabase } from '../supabase/client';

export interface BirthChartContext {
  moonSign: string;
  moonNakshatra: string;
  ascendant: string;
  sunSign: string;
  mahaDasha: string;
  antarDasha: string;
  dateOfBirth: string;
  timeOfBirth: string;
  latitude: number;
  longitude: number;
  planetPositions?: any[];
  houses?: any[];
  yogas?: string[];
}

export interface AIQuestion {
  question: string;
  context: BirthChartContext;
  userId: string;
}

export interface AIResponse {
  answer: string;
  confidence: number;
  source: 'generated' | 'learned' | 'template';
  relatedTopics: string[];
  suggestedFollowUps: string[];
}

export interface ConversationFeedback {
  conversationId: string;
  rating: number; // 1-5
  wasHelpful: boolean;
  feedback?: string;
}

class IntelligentAssistant {
  private readonly API_ENDPOINT = process.env.NEXT_PUBLIC_OPENAI_API_KEY
    ? 'https://api.openai.com/v1/chat/completions'
    : null;

  /**
   * Ask a question and get detailed answer based on birth chart
   */
  async ask(question: AIQuestion): Promise<AIResponse> {
    console.log('🤖 Processing question:', question.question);

    // Step 1: Create/update chart insights for this user (study the birth chart)
    // This happens in the background and stores insights for future use
    const cachedInsights = await this.getCachedInsights(question.userId);
    if (!cachedInsights) {
      console.log('📚 First time analyzing this chart - creating insights...');
      // Don't await - let it run in background
      this.createChartInsights(question.context, question.userId);
    } else {
      console.log('✅ Using cached chart insights from previous analysis');
    }

    // Step 2: Categorize question
    const category = this.categorizeQuestion(question.question);

    // Step 3: Check if we have learned patterns for this type of question
    const learnedPattern = await this.findLearnedPattern(question.question, question.context);

    // Step 4: Get current planetary transits
    const transits = await this.getCurrentTransits();

    // Step 5: Generate detailed response (uses cached insights if available)
    const response = await this.generateResponse(
      question,
      category,
      learnedPattern,
      transits
    );

    // Step 6: Store conversation for learning
    await this.storeConversation(question, response, category, transits);

    return response;
  }

  /**
   * Categorize question into astrological topics
   */
  private categorizeQuestion(question: string): string {
    const lowerQuestion = question.toLowerCase();

    const categories = {
      career: ['career', 'job', 'work', 'business', 'profession', 'employment', 'promotion'],
      finance: ['money', 'wealth', 'finance', 'income', 'profit', 'loss', 'investment', 'salary'],
      relationships: ['love', 'marriage', 'relationship', 'partner', 'spouse', 'dating', 'romance'],
      health: ['health', 'disease', 'illness', 'medical', 'body', 'wellness', 'cure'],
      education: ['education', 'study', 'exam', 'learning', 'knowledge', 'degree', 'course'],
      spiritual: ['spiritual', 'meditation', 'god', 'divine', 'moksha', 'enlightenment', 'prayer'],
      family: ['family', 'parent', 'child', 'sibling', 'mother', 'father', 'son', 'daughter'],
      timing: ['when', 'timing', 'date', 'period', 'time', 'month', 'year'],
      remedies: ['remedy', 'solution', 'fix', 'improve', 'overcome', 'reduce'],
    };

    for (const [cat, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerQuestion.includes(keyword))) {
        return cat;
      }
    }

    return 'general';
  }

  /**
   * Find learned patterns from previous interactions
   */
  private async findLearnedPattern(question: string, context: BirthChartContext): Promise<any | null> {
    try {
      const { data, error } = await supabase
        .from('ai_learned_patterns')
        .select('*')
        .gte('success_rate', 0.7) // Only use patterns with 70%+ success
        .order('success_rate', { ascending: false })
        .limit(5);

      if (error || !data || data.length === 0) {
        return null;
      }

      // Find best matching pattern
      const keywords = this.extractKeywords(question);
      let bestMatch: any = null;
      let bestScore = 0;

      for (const pattern of (data as any[])) {
        const matchingKeywords = pattern.question_keywords.filter((k: string) =>
          keywords.includes(k.toLowerCase())
        );
        const score = matchingKeywords.length / pattern.question_keywords.length;

        if (score > bestScore) {
          bestScore = score;
          bestMatch = pattern;
        }
      }

      return bestScore > 0.5 ? bestMatch : null;
    } catch (error) {
      console.error('Error finding learned pattern:', error);
      return null;
    }
  }

  /**
   * Extract keywords from question
   */
  private extractKeywords(question: string): string[] {
    const commonWords = ['is', 'are', 'was', 'were', 'will', 'shall', 'can', 'could', 'should', 'would', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'my', 'me', 'i', 'you'];

    return question
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.includes(word));
  }

  /**
   * Get current planetary transits
   */
  private async getCurrentTransits(): Promise<any> {
    // In production, calculate actual transits
    // For now, return current date-based simple transit info
    const now = new Date();

    return {
      date: now.toISOString(),
      // Add actual transit calculations here
      // This would call your astrology calculation library
    };
  }

  /**
   * Generate detailed response based on birth chart
   */
  private async generateResponse(
    question: AIQuestion,
    category: string,
    learnedPattern: any | null,
    transits: any
  ): Promise<AIResponse> {
    const { context } = question;

    // If we have a learned pattern with high success rate, use it
    if (learnedPattern && learnedPattern.success_rate > 0.8) {
      return this.generateFromPattern(question, learnedPattern, transits);
    }

    // Otherwise, generate detailed response based on birth chart
    return this.generateDetailedResponse(question, category, transits);
  }

  /**
   * Generate response from learned pattern
   */
  private generateFromPattern(
    question: AIQuestion,
    pattern: any,
    transits: any
  ): AIResponse {
    const { context } = question;

    // Fill in template variables
    let answer = pattern.response_template;

    const variables: Record<string, string> = {
      '{moonSign}': context.moonSign,
      '{nakshatra}': context.moonNakshatra,
      '{ascendant}': context.ascendant,
      '{mahaDasha}': context.mahaDasha,
      '{antarDasha}': context.antarDasha,
    };

    for (const [placeholder, value] of Object.entries(variables)) {
      answer = answer.replace(new RegExp(placeholder, 'g'), value);
    }

    return {
      answer,
      confidence: pattern.success_rate,
      source: 'learned',
      relatedTopics: this.extractRelatedTopics(question.question, context),
      suggestedFollowUps: this.generateFollowUpQuestions(question.question, context),
    };
  }

  /**
   * Generate detailed response based on astrological analysis
   */
  private generateDetailedResponse(
    question: AIQuestion,
    category: string,
    transits: any
  ): Promise<AIResponse> {
    const { context } = question;

    // Build comprehensive answer based on birth chart
    let answer = this.buildDetailedAnswer(question.question, context, category);

    return Promise.resolve({
      answer,
      confidence: 0.75,
      source: 'generated',
      relatedTopics: this.extractRelatedTopics(question.question, context),
      suggestedFollowUps: this.generateFollowUpQuestions(question.question, context),
    });
  }

  /**
   * Build detailed answer with minute astrological details
   */
  private buildDetailedAnswer(question: string, context: BirthChartContext, category: string): string {
    // Check if we have complete birth chart data
    if (!context.moonSign || !context.ascendant || !context.mahaDasha) {
      return this.buildProfileIncompleteMessage(context);
    }

    const parts: string[] = [];

    // Opening with personalization
    parts.push(`Based on your complete birth chart analysis:\n`);

    // Include relevant birth chart details
    parts.push(`🌙 **Your Cosmic Blueprint:**`);
    parts.push(`- Moon Sign (Rashi): ${context.moonSign}`);
    parts.push(`- Nakshatra: ${context.moonNakshatra}`);
    parts.push(`- Ascendant (Lagna): ${context.ascendant}`);
    parts.push(`- Current Dasha: ${context.mahaDasha} Maha Dasha → ${context.antarDasha} Antar Dasha\n`);

    // Category-specific analysis
    switch (category) {
      case 'career':
        parts.push(this.getCareerAnalysis(context));
        break;
      case 'finance':
        parts.push(this.getFinanceAnalysis(context));
        break;
      case 'relationships':
        parts.push(this.getRelationshipAnalysis(context));
        break;
      case 'health':
        parts.push(this.getHealthAnalysis(context));
        break;
      case 'education':
        parts.push(this.getEducationAnalysis(context));
        break;
      case 'spiritual':
        parts.push(this.getSpiritualAnalysis(context));
        break;
      case 'timing':
        parts.push(this.getTimingAnalysis(context, question));
        break;
      case 'remedies':
        parts.push(this.getRemediesAnalysis(context, question));
        break;
      default:
        parts.push(this.getGeneralAnalysis(context, question));
    }

    // Always include current dasha influence
    parts.push(`\n🔮 **Current Dasha Influence:**`);
    parts.push(this.getDashaInfluence(context));

    // Actionable guidance
    parts.push(`\n✨ **Actionable Guidance:**`);
    parts.push(this.getActionableGuidance(context, category));

    // Remedies
    parts.push(`\n🙏 **Recommended Remedies:**`);
    parts.push(this.getSpecificRemedies(context, category));

    return parts.join('\n');
  }

  private getCareerAnalysis(context: BirthChartContext): string {
    if (!context.moonSign || !context.ascendant) {
      return "📊 **Career & Professional Life:**\nTo provide detailed career analysis, please ensure your birth chart has been calculated. Visit the Astrology page to generate your complete chart.";
    }

    const moonCareer = this.getMoonSignCareerTraits(context.moonSign);
    const ascendantCareer = this.getAscendantCareerTraits(context.ascendant);
    const dashaCareer = context.mahaDasha ? this.getDashaCareerInfluence(context.mahaDasha, context.antarDasha) : '';
    const nakshatraCareer = context.moonNakshatra ? this.getNakshatraCareerGuidance(context.moonNakshatra) : '';

    return `📊 **Career & Professional Life:**

**Moon Sign Influence (${context.moonSign}):**
${moonCareer}

**Ascendant Influence (${context.ascendant}):**
${ascendantCareer}

${dashaCareer}

${nakshatraCareer}

**Favorable Career Timing:**
- Best days: Days when Moon transits ${context.moonSign} (every 27-28 days)
- Nakshatra days: ${context.moonNakshatra} repeats every 13-14 days - ideal for important meetings
- Peak productivity: Early morning hours during your Nakshatra period

**Career Recommendations:**
Based on your chart configuration, focus on building expertise in areas that align with your natural strengths. The current planetary period supports professional growth through consistent effort and strategic networking.`;
  }

  private getFinanceAnalysis(context: BirthChartContext): string {
    return `💰 **Financial Prospects:**
Your ${context.moonSign} Moon sign suggests wealth accumulation through ${this.getWealthSource(context.moonSign)}.

Current ${context.mahaDasha} Maha Dasha brings financial energy related to ${this.getDashaFinanceImpact(context.mahaDasha)}.

**Wealth Building Strategy:**
- Focus on investments related to ${this.getInvestmentSuggestion(context.moonSign)}
- Best days for financial transactions: ${this.getLuckyDays(context.moonNakshatra)}
- Avoid major financial decisions during ${context.antarDasha} Antar Dasha peak intensity periods`;
  }

  private getRelationshipAnalysis(context: BirthChartContext): string {
    return `❤️ **Relationships & Love Life:**
Your ${context.moonSign} Moon sign brings emotional nature characterized by ${this.getEmotionalNature(context.moonSign)}.

${context.moonNakshatra} Nakshatra influences your approach to relationships with ${this.getNakshatraRelationshipStyle(context.moonNakshatra)}.

**Compatibility Insights:**
- Most compatible Moon signs: ${this.getCompatibleSigns(context.moonSign)}
- Communication style: ${this.getCommunicationStyle(context.moonSign)}
- Love language: ${this.getLoveLanguage(context.moonNakshatra)}

Current ${context.mahaDasha}-${context.antarDasha} Dasha period affects relationships by ${this.getDashaRelationshipImpact(context.mahaDasha, context.antarDasha)}.`;
  }

  private getHealthAnalysis(context: BirthChartContext): string {
    return `🏥 **Health & Wellness:**
Based on your ${context.moonSign} Moon sign, areas requiring attention include: ${this.getHealthFocus(context.moonSign)}.

Your Ascendant ${context.ascendant} indicates constitutional strength in: ${this.getConstitutionalStrength(context.ascendant)}.

**Preventive Care:**
- Practice ${this.getYogaRecommendation(context.ascendant)} yoga style
- Focus on ${this.getDietRecommendation(context.moonSign)} diet
- Best time for healing: ${this.getHealingTime(context.moonNakshatra)}

Current ${context.mahaDasha} Maha Dasha may bring attention to ${this.getDashaHealthFocus(context.mahaDasha)}.`;
  }

  private getEducationAnalysis(context: BirthChartContext): string {
    return `📚 **Education & Learning:**
Your ${context.moonNakshatra} Nakshatra indicates natural aptitude for ${this.getLearningAptitude(context.moonNakshatra)}.

Best learning style: ${this.getLearningStyle(context.moonSign)}
Favorable subjects: ${this.getFavorableSubjects(context.moonSign)}

**Study Schedule:**
- Peak focus hours: ${this.getPeakStudyHours(context.moonNakshatra)}
- Best days for exams: ${this.getExamDays(context.moonNakshatra)}
- Memory enhancement: Practice ${this.getMemoryTechnique(context.moonSign)}`;
  }

  private getSpiritualAnalysis(context: BirthChartContext): string {
    return `🕉️ **Spiritual Growth:**
Your ${context.moonSign} Moon sign's spiritual path involves ${this.getSpiritualPath(context.moonSign)}.

${context.moonNakshatra} Nakshatra connects you to deity: ${this.getNakshatraDeity(context.moonNakshatra)}.

**Spiritual Practices:**
- Primary practice: ${this.getPrimaryPractice(context.moonNakshatra)}
- Meditation style: ${this.getMeditationStyle(context.moonSign)}
- Best time: ${this.getSpiritualTime(context.moonNakshatra)}
- Mantra: ${this.getPersonalMantra(context.moonSign, context.moonNakshatra)}`;
  }

  private getTimingAnalysis(context: BirthChartContext, question: string): string {
    return `⏰ **Timing Analysis:**
Based on your current ${context.mahaDasha}-${context.antarDasha} Dasha period:

**Favorable Periods:**
- Next 3 months: ${this.getNextThreeMonthsForecast(context)}
- Peak opportunity window: ${this.getPeakPeriod(context)}
- Auspicious dates this month: ${this.getAuspiciousDates(context)}

**Timing Recommendations:**
${this.getSpecificTimingGuidance(context, question)}`;
  }

  private getRemediesAnalysis(context: BirthChartContext, question: string): string {
    return `🌟 **Personalized Remedies:**
Based on your ${context.mahaDasha} Maha Dasha and ${context.moonSign} Moon sign:

${this.getDetailedRemedies(context)}

**Quick Daily Practices:**
${this.getDailyPractices(context)}

**Gemstone Recommendation:**
${this.getGemstoneGuidance(context)}`;
  }

  private getGeneralAnalysis(context: BirthChartContext, question: string): string {
    return `🔍 **Comprehensive Analysis:**
Let me analyze your question in the context of your complete birth chart.

${this.getContextualAnalysis(context, question)}

Your current planetary period (${context.mahaDasha}-${context.antarDasha}) suggests this is ${this.getPeriodNature(context)} time for such matters.`;
  }

  // Helper methods for generating specific content
  private getCareerInclination(moonSign: string): string {
    const inclinations: Record<string, string> = {
      Aries: 'leadership, entrepreneurship, military, sports, engineering',
      Taurus: 'finance, arts, agriculture, luxury goods, real estate',
      Gemini: 'communication, media, writing, teaching, trading',
      Cancer: 'hospitality, healthcare, counseling, food industry',
      Leo: 'administration, politics, entertainment, management',
      Virgo: 'analysis, healthcare, accounting, service industry',
      Libra: 'law, diplomacy, arts, fashion, partnerships',
      Scorpio: 'research, investigation, occult sciences, surgery',
      Sagittarius: 'education, philosophy, travel, publishing, law',
      Capricorn: 'administration, engineering, long-term projects',
      Aquarius: 'technology, social work, innovation, humanitarian work',
      Pisces: 'spirituality, healing arts, creative fields, charity'
    };
    return inclinations[moonSign] || 'diverse professional fields';
  }

  private getAscendantCareerTraits(ascendant: string): string {
    const traits: Record<string, string> = {
      Aries: 'boldness, quick decision-making, and pioneering spirit',
      Taurus: 'stability, persistence, and practical approach',
      Gemini: 'versatility, communication skills, and adaptability',
      Cancer: 'nurturing leadership and emotional intelligence',
      Leo: 'commanding presence and natural authority',
      Virgo: 'attention to detail and analytical thinking',
      Libra: 'diplomacy, balance, and partnership skills',
      Scorpio: 'intensity, depth of focus, and transformative abilities',
      Sagittarius: 'vision, optimism, and philosophical approach',
      Capricorn: 'discipline, structure, and long-term planning',
      Aquarius: 'innovation, independence, and humanitarian vision',
      Pisces: 'intuition, compassion, and creative problem-solving'
    };
    return traits[ascendant] || 'unique professional qualities';
  }

  private getDashaCareerFocus(mahaDasha: string): string {
    const focus: Record<string, string> = {
      Sun: 'leadership roles, government positions, and authority-building',
      Moon: 'public-facing roles, nurturing positions, and emotional intelligence',
      Mars: 'technical fields, competitive environments, and action-oriented work',
      Mercury: 'communication, business, intellectual pursuits, and skill development',
      Jupiter: 'teaching, advisory roles, expansion, and wisdom-sharing',
      Venus: 'creative fields, luxury sectors, and relationship-oriented work',
      Saturn: 'structured environments, long-term projects, and disciplined effort',
      Rahu: 'unconventional paths, technology, foreign connections, and innovation',
      Ketu: 'spiritual work, research, technical expertise, and detachment from mainstream'
    };
    return focus[mahaDasha] || 'professional development';
  }

  private getAntarDashaCareerModification(antarDasha: string): string {
    const modifications: Record<string, string> = {
      Sun: 'increased visibility and leadership opportunities',
      Moon: 'emotional connection to work and public interaction',
      Mars: 'dynamic action, competition, and energy to projects',
      Mercury: 'intellectual stimulation and communication enhancement',
      Jupiter: 'growth opportunities and wisdom application',
      Venus: 'creative expression and harmonious partnerships',
      Saturn: 'disciplined approach and focus on fundamentals',
      Rahu: 'innovative methods and unexpected opportunities',
      Ketu: 'spiritual dimension and technical mastery'
    };
    return modifications[antarDasha] || 'specific energy to your professional life';
  }

  private getDashaInfluence(context: BirthChartContext): string {
    return `The ${context.mahaDasha} Maha Dasha (major period) creates the overall life theme, while ${context.antarDasha} Antar Dasha (sub-period) provides the specific flavor of experiences.

This combination suggests that your current life focus should be on ${this.getCombinedDashaFocus(context.mahaDasha, context.antarDasha)}.

**Period Duration:**
- ${context.mahaDasha} Maha Dasha continues for: [Calculate based on birth chart]
- ${context.antarDasha} Antar Dasha runs for: [Sub-period calculation]

**Expected Outcomes:**
${this.getDashaOutcomes(context.mahaDasha, context.antarDasha)}`;
  }

  private getCombinedDashaFocus(maha: string, antar: string): string {
    return `integrating ${maha}'s energy of ${this.getPlanetEssence(maha)} with ${antar}'s influence of ${this.getPlanetEssence(antar)}`;
  }

  private getPlanetEssence(planet: string): string {
    const essences: Record<string, string> = {
      Sun: 'self-expression and authority',
      Moon: 'emotions and nurturing',
      Mars: 'action and courage',
      Mercury: 'intelligence and communication',
      Jupiter: 'wisdom and expansion',
      Venus: 'harmony and pleasure',
      Saturn: 'discipline and structure',
      Rahu: 'innovation and worldly desires',
      Ketu: 'spirituality and detachment'
    };
    return essences[planet] || 'transformation';
  }

  private getActionableGuidance(context: BirthChartContext, category: string): string {
    const guidance = [
      `1. Align your actions with your ${context.moonNakshatra} Nakshatra's natural rhythm - work during peak energy times`,
      `2. Leverage your ${context.moonSign} Moon sign's strength in ${this.getMoonSignStrength(context.moonSign)}`,
      `3. Use ${context.ascendant} Ascendant's public image to ${this.getAscendantAdvantage(context.ascendant)}`,
      `4. Navigate current ${context.mahaDasha} period by focusing on ${this.getDashaStrategy(context.mahaDasha)}`,
    ];

    return guidance.join('\n');
  }

  private getMoonSignStrength(moonSign: string): string {
    const strengths: Record<string, string> = {
      Aries: 'initiating projects and leadership',
      Taurus: 'building lasting value and stability',
      Gemini: 'communication and networking',
      Cancer: 'emotional intelligence and nurturing',
      Leo: 'creative expression and influence',
      Virgo: 'organization and problem-solving',
      Libra: 'relationship-building and diplomacy',
      Scorpio: 'deep transformation and research',
      Sagittarius: 'vision and expansion',
      Capricorn: 'strategic planning and execution',
      Aquarius: 'innovation and social impact',
      Pisces: 'intuition and compassion'
    };
    return strengths[moonSign] || 'personal development';
  }

  private getAscendantAdvantage(ascendant: string): string {
    return `project confidence and capability in your chosen field`;
  }

  private getDashaStrategy(dasha: string): string {
    const strategies: Record<string, string> = {
      Sun: 'building authority and taking leadership',
      Moon: 'emotional connection and public service',
      Mars: 'bold action and overcoming obstacles',
      Mercury: 'learning, communication, and skill mastery',
      Jupiter: 'expansion, teaching, and wisdom sharing',
      Venus: 'creative pursuits and harmonious relationships',
      Saturn: 'patient effort and long-term building',
      Rahu: 'unconventional approaches and technology',
      Ketu: 'spiritual growth and letting go of attachments'
    };
    return strategies[dasha] || 'personal growth';
  }

  // Comprehensive Vedic Astrology Methods
  private getMoonSignCareerTraits(moonSign: string): string {
    const traits: Record<string, string> = {
      Aries: 'Your Aries Moon gives you natural leadership abilities and pioneering spirit. You excel in careers requiring initiative, courage, and quick decision-making. Best suited for: entrepreneurship, military, sports, engineering, emergency services, or any role where you can lead and innovate. Your competitive nature and high energy make you thrive in fast-paced environments.',
      Taurus: 'Your Taurus Moon provides stability, patience, and an appreciation for quality. You have a natural talent for building lasting value and working with tangible resources. Ideal careers: finance, banking, real estate, agriculture, luxury goods, culinary arts, or music. Your persistence and practical approach ensure long-term success in wealth-building ventures.',
      Gemini: 'Your Gemini Moon makes you intellectually curious and versatile. You have exceptional communication skills and adapt easily to change. Perfect for: journalism, teaching, writing, sales, marketing, public relations, or any field requiring mental agility and interpersonal skills. Your ability to multitask and network opens many professional doors.',
      Cancer: 'Your Cancer Moon gives you nurturing abilities and emotional intelligence. You naturally care for others and create comfortable environments. Excellent careers: healthcare, counseling, hospitality, food industry, childcare, social work, or interior design. Your intuitive understanding of people\'s needs makes you invaluable in service-oriented roles.',
      Leo: 'Your Leo Moon provides charisma, creativity, and natural authority. You shine in positions of leadership and creative expression. Best suited for: entertainment, politics, management, teaching, event planning, luxury brands, or any role in the spotlight. Your confidence and warmth inspire others and attract success.',
      Virgo: 'Your Virgo Moon gives you analytical abilities, attention to detail, and service orientation. You excel at improving systems and solving complex problems. Ideal for: healthcare, accounting, editing, quality control, research, nutrition, or technical services. Your perfectionism and dedication ensure excellence in your work.',
      Libra: 'Your Libra Moon provides diplomatic skills, aesthetic sense, and partnership abilities. You excel at creating harmony and beauty. Perfect careers: law, diplomacy, art, fashion, counseling, human resources, or design. Your fair-mindedness and social grace make you successful in relationship-focused professions.',
      Scorpio: 'Your Scorpio Moon gives you intense focus, research abilities, and transformative power. You excel at uncovering hidden truths and managing resources. Best for: psychology, investigation, surgery, occult sciences, mining, insurance, research, or crisis management. Your depth and determination lead to profound professional achievements.',
      Sagittarius: 'Your Sagittarius Moon provides philosophical thinking, optimism, and love for expansion. You thrive in roles involving teaching, travel, or higher knowledge. Excellent for: education, publishing, law, international business, travel industry, philosophy, or religious work. Your vision and enthusiasm inspire growth and exploration.',
      Capricorn: 'Your Capricorn Moon gives you ambition, discipline, and organizational mastery. You excel at building lasting structures and achieving long-term goals. Ideal careers: administration, engineering, architecture, government, corporate leadership, or any field requiring systematic planning. Your patience and perseverance guarantee eventual success.',
      Aquarius: 'Your Aquarius Moon provides innovative thinking, humanitarian vision, and technological aptitude. You excel at creating progressive solutions. Perfect for: technology, science, social work, innovation consulting, astrology, or humanitarian organizations. Your unique perspective and forward-thinking bring revolutionary changes.',
      Pisces: 'Your Pisces Moon gives you intuitive abilities, compassion, and creative imagination. You excel at healing and artistic expression. Best suited for: healing arts, spirituality, music, poetry, film, charity work, or psychology. Your sensitivity and empathy make you a natural healer and creative visionary.'
    };
    return traits[moonSign] || 'Your Moon sign indicates diverse career potential based on your unique chart configuration.';
  }

  private getDashaCareerInfluence(mahaDasha: string, antarDasha: string): string {
    const mahaInfluence: Record<string, string> = {
      Sun: 'The Sun Maha Dasha (6 years total) brings opportunities for leadership, recognition, and authority. This is a time when your professional identity strengthens, and you may take on government positions, administrative roles, or become known in your field. Focus on building your reputation and personal brand.',
      Moon: 'The Moon Maha Dasha (10 years total) enhances emotional intelligence and public connections. This period favors careers involving people, nurturing, or public service. Your sensitivity to others\' needs becomes your professional strength. Excellent for building a loyal client base or audience.',
      Mars: 'The Mars Maha Dasha (7 years total) brings dynamic energy and competitive drive to your career. This period favors technical fields, real estate, military, sports, or any work requiring courage and action. You have the energy to overcome obstacles and achieve ambitious goals through persistent effort.',
      Mercury: 'The Mercury Maha Dasha (17 years total) is one of the longest and most intellectually productive periods. Excellent for business, communication, writing, teaching, or skill development. This is your time to learn, network, and build multiple income streams through your mental abilities.',
      Jupiter: 'The Jupiter Maha Dasha (16 years total) brings expansion, wisdom, and opportunities for growth. This period favors teaching, advisory roles, finance, law, or spiritual professions. Your knowledge becomes valuable to others. Expect career growth through ethical practices and generous sharing of wisdom.',
      Venus: 'The Venus Maha Dasha (20 years total) is the longest period, bringing success in creative fields, luxury sectors, entertainment, or relationship-oriented work. Your aesthetic sense and social charm open doors. This is excellent for building partnerships and enjoying the fruits of your labor.',
      Saturn: 'The Saturn Maha Dasha (19 years total) requires patience and disciplined effort but brings lasting achievements. Success comes through hard work, responsibility, and serving in structured environments. This period builds strong foundations for long-term career stability. Avoid shortcuts; embrace slow, steady progress.',
      Rahu: 'The Rahu Maha Dasha (18 years total) brings unconventional opportunities, foreign connections, and technological advancement. This period favors innovation, entrepreneurship, or breaking traditional career boundaries. You may suddenly rise in fields related to mass media, politics, or emerging technologies.',
      Ketu: 'The Ketu Maha Dasha (7 years total) brings spiritual insights and technical mastery. This period may involve behind-the-scenes work, research, or spiritual pursuits. While worldly ambitions may decrease, your technical expertise and inner wisdom deepen. Good for consulting or specialized technical roles.'
    };

    const antarMod: Record<string, string> = {
      Sun: 'The Sun Antar Dasha adds leadership opportunities and increased visibility to your current major period.',
      Moon: 'The Moon Antar Dasha brings emotional depth and public interaction to your professional activities.',
      Mars: 'The Mars Antar Dasha injects dynamic energy and competitive spirit into your career efforts.',
      Mercury: 'The Mercury Antar Dasha enhances communication, learning opportunities, and business acumen.',
      Jupiter: 'The Jupiter Antar Dasha brings growth opportunities, wisdom, and beneficial guidance to your career.',
      Venus: 'The Venus Antar Dasha adds creative expression, harmonious partnerships, and enjoyment to your work.',
      Saturn: 'The Saturn Antar Dasha requires focused discipline but brings lasting results to your professional efforts.',
      Rahu: 'The Rahu Antar Dasha brings unexpected opportunities and innovative approaches to your career path.',
      Ketu: 'The Ketu Antar Dasha adds spiritual dimension and technical depth to your professional activities.'
    };

    const mahaDesc = mahaInfluence[mahaDasha] || `The ${mahaDasha} Maha Dasha influences your overall career direction during this major life period.`;
    const antarDesc = antarMod[antarDasha] || `The ${antarDasha} Antar Dasha modifies this experience.`;

    return `**Current Dasha Period (${mahaDasha}-${antarDasha}):**\n${mahaDesc}\n\n${antarDesc}\n\nThis combination creates a unique professional environment where you should combine the long-term themes of ${mahaDasha} with the immediate opportunities brought by ${antarDasha}.`;
  }

  private getNakshatraCareerGuidance(nakshatra: string): string {
    const guidance: Record<string, string> = {
      Ashwini: 'Ashwini Nakshatra (ruled by Ketu) gives healing abilities and pioneering spirit. Excel in: medicine, veterinary science, transportation, or quick-result fields. Your swift action and healing touch are your professional strengths.',
      Bharani: 'Bharani Nakshatra (ruled by Venus) provides creative and transformative abilities. Perfect for: entertainment, hospitality, law, or managing life-death transitions. Your ability to handle intensity makes you valuable in challenging professions.',
      Krittika: 'Krittika Nakshatra (ruled by Sun) gives sharp intellect and purifying abilities. Ideal for: criticism, cooking, military, surgery, or any field requiring precision and courage. Your critical eye and determination drive professional excellence.',
      Rohini: 'Rohini Nakshatra (ruled by Moon) provides material success and creative abundance. Best for: arts, agriculture, fashion, luxury goods, or beauty industry. Your aesthetic sense and growth-oriented approach attract wealth.',
      // Add all 27 nakshatras...
    };

    const defaultGuidance = `**Nakshatra Influence (${nakshatra}):**\nYour birth Nakshatra provides specific timing for professional success. The days when Moon transits ${nakshatra} (every 27-28 days) are particularly powerful for career initiatives, important meetings, or launching new projects.`;

    const specificGuidance = guidance[nakshatra];
    return specificGuidance ? `**Nakshatra Influence (${nakshatra}):**\n${specificGuidance}` : defaultGuidance;
  }

  private buildProfileIncompleteMessage(context: BirthChartContext): string {
    if (!context.dateOfBirth || !context.timeOfBirth) {
      return `🙏 **Complete Your Birth Profile**

To provide accurate, personalized astrological insights based on your actual birth chart, I need your complete birth details.

**What's Missing:**
${!context.dateOfBirth ? '❌ Date of Birth\n' : ''}${!context.timeOfBirth ? '❌ Time of Birth\n' : ''}${!context.latitude || context.latitude === 0 ? '❌ Place of Birth (with coordinates)\n' : ''}

**How to Complete:**
1. Go to your **Profile** page
2. Enter your birth date, time, and place
3. Save your profile

Once your profile is complete, return here and I'll provide detailed predictions based on your:
• Moon Sign (Rashi) - Your emotional nature and instincts
• Nakshatra - Your birth star and its specific qualities
• Ascendant (Lagna) - Your physical appearance and life approach
• Current Dasha Periods - The planetary periods influencing your life
• Planetary Positions - Complete analysis of all 9 planets in your chart

**In the meantime**, I can answer general questions about Vedic astrology, but personalized predictions require your birth chart.

What would you like to know about Vedic astrology?`;
    }

    // Has birth details but no chart calculated yet
    return `📊 **Generate Your Birth Chart**

I can see you've entered your birth details:
📅 Birth Date: ${context.dateOfBirth}
⏰ Birth Time: ${context.timeOfBirth}
📍 Location: Available

However, your complete birth chart hasn't been calculated yet. To get personalized astrological insights, you need to:

**Next Steps:**
1. Go to the **Astrology** tab/page
2. Your chart will be automatically calculated using your saved birth details
3. This will determine your:
   • Moon Sign (Rashi)
   • Nakshatra (Birth Star)
   • Ascendant (Lagna)
   • Current Maha Dasha and Antar Dasha
   • All planetary positions

Once your chart is generated (takes about 10 seconds), come back here and ask your question again. I'll then provide detailed, personalized guidance based on YOUR specific planetary positions!

**Alternative:** I can provide general astrological guidance now if you'd like, but it won't be based on your actual chart. Would you like general guidance, or would you prefer to generate your chart first for personalized insights?`;
  }

  private getSpecificRemedies(context: BirthChartContext, category: string): string {
    const remedies = [
      `🕯️ Light a lamp of ${this.getRemedialOil(context.mahaDasha)} oil every ${this.getRemedialDay(context.mahaDasha)}`,
      `📿 Chant "${this.getRemedialMantra(context.mahaDasha)}" 108 times daily`,
      `🎨 Wear ${this.getRemedialColor(context.moonSign)} color on ${this.getLuckyDay(context.moonNakshatra)}`,
      `💎 Consider wearing ${this.getRemedialGemstone(context.mahaDasha)} after proper muhurta`,
      `🙏 Perform charity on ${this.getRemedialDay(context.mahaDasha)} by donating ${this.getRemedialItem(context.mahaDasha)}`
    ];

    return remedies.join('\n');
  }

  private getRemedialOil(dasha: string): string {
    const oils: Record<string, string> = {
      Sun: 'sesame', Moon: 'ghee', Mars: 'mustard',
      Mercury: 'coconut', Jupiter: 'ghee', Venus: 'sesame',
      Saturn: 'mustard', Rahu: 'coconut', Ketu: 'sesame'
    };
    return oils[dasha] || 'ghee';
  }

  private getRemedialDay(dasha: string): string {
    const days: Record<string, string> = {
      Sun: 'Sunday', Moon: 'Monday', Mars: 'Tuesday',
      Mercury: 'Wednesday', Jupiter: 'Thursday', Venus: 'Friday',
      Saturn: 'Saturday', Rahu: 'Saturday', Ketu: 'Tuesday'
    };
    return days[dasha] || 'Thursday';
  }

  private getRemedialMantra(dasha: string): string {
    const mantras: Record<string, string> = {
      Sun: 'Om Suryaya Namah',
      Moon: 'Om Chandraya Namah',
      Mars: 'Om Mangalaya Namah',
      Mercury: 'Om Budhaya Namah',
      Jupiter: 'Om Gurave Namah',
      Venus: 'Om Shukraya Namah',
      Saturn: 'Om Shanaye Namah',
      Rahu: 'Om Rahave Namah',
      Ketu: 'Om Ketave Namah'
    };
    return mantras[dasha] || 'Om Namah Shivaya';
  }

  private getRemedialColor(moonSign: string): string {
    const colors: Record<string, string> = {
      Aries: 'red', Taurus: 'white', Gemini: 'green',
      Cancer: 'white', Leo: 'orange', Virgo: 'green',
      Libra: 'white', Scorpio: 'red', Sagittarius: 'yellow',
      Capricorn: 'blue', Aquarius: 'blue', Pisces: 'yellow'
    };
    return colors[moonSign] || 'white';
  }

  private getRemedialGemstone(dasha: string): string {
    const gemstones: Record<string, string> = {
      Sun: 'Ruby (Manik)',
      Moon: 'Pearl (Moti)',
      Mars: 'Red Coral (Moonga)',
      Mercury: 'Emerald (Panna)',
      Jupiter: 'Yellow Sapphire (Pukhraj)',
      Venus: 'Diamond (Heera)',
      Saturn: 'Blue Sapphire (Neelam)',
      Rahu: 'Hessonite (Gomed)',
      Ketu: 'Cat\'s Eye (Lehsunia)'
    };
    return gemstones[dasha] || 'appropriate gemstone';
  }

  private getRemedialItem(dasha: string): string {
    const items: Record<string, string> = {
      Sun: 'wheat or jaggery',
      Moon: 'white rice or milk',
      Mars: 'red lentils or jaggery',
      Mercury: 'green vegetables or books',
      Jupiter: 'yellow items or educational materials',
      Venus: 'white items or sweets',
      Saturn: 'black items or iron',
      Rahu: 'blue cloth or coconuts',
      Ketu: 'blankets or warm clothes'
    };
    return items[dasha] || 'food to the needy';
  }

  // Additional helper methods (simplified for brevity)
  private extractRelatedTopics(question: string, context: BirthChartContext): string[] {
    return ['Planetary transits', 'Dasha periods', 'Nakshatra influence'];
  }

  private generateFollowUpQuestions(question: string, context: BirthChartContext): string[] {
    return [
      'What remedies can strengthen my current planetary period?',
      'When is the best time to start new initiatives?',
      'How can I maximize the potential of my birth chart?'
    ];
  }

  private getDashaOutcomes(maha: string, antar: string): string {
    return 'This period brings opportunities for growth in specific areas related to your birth chart configuration.';
  }

  private getWealthSource(moonSign: string): string { return 'strategic investments and career growth'; }
  private getDashaFinanceImpact(dasha: string): string { return 'financial opportunities'; }
  private getInvestmentSuggestion(moonSign: string): string { return 'stable, long-term assets'; }
  private getLuckyDays(nakshatra: string): string { return 'Thursdays and Fridays'; }
  private getEmotionalNature(moonSign: string): string { return 'sensitivity and intuition'; }
  private getNakshatraRelationshipStyle(nakshatra: string): string { return 'deep emotional connection'; }
  private getCompatibleSigns(moonSign: string): string { return 'complementary signs'; }
  private getCommunicationStyle(moonSign: string): string { return 'expressive and clear'; }
  private getLoveLanguage(nakshatra: string): string { return 'quality time and words of affirmation'; }
  private getDashaRelationshipImpact(maha: string, antar: string): string { return 'bringing depth and transformation'; }
  private getHealthFocus(moonSign: string): string { return 'mental health and digestive system'; }
  private getConstitutionalStrength(ascendant: string): string { return 'overall vitality'; }
  private getYogaRecommendation(ascendant: string): string { return 'Hatha Yoga'; }
  private getDietRecommendation(moonSign: string): string { return 'balanced, wholesome'; }
  private getHealingTime(nakshatra: string): string { return 'early morning hours'; }
  private getDashaHealthFocus(dasha: string): string { return 'specific body areas'; }
  private getLearningAptitude(nakshatra: string): string { return 'analytical subjects'; }
  private getLearningStyle(moonSign: string): string { return 'visual and practical'; }
  private getFavorableSubjects(moonSign: string): string { return 'sciences and mathematics'; }
  private getPeakStudyHours(nakshatra: string): string { return '5-7 AM and 4-6 PM'; }
  private getExamDays(nakshatra: string): string { return 'Wednesdays and Thursdays'; }
  private getMemoryTechnique(moonSign: string): string { return 'mind mapping and visualization'; }
  private getSpiritualPath(moonSign: string): string { return 'meditation and self-inquiry'; }
  private getNakshatraDeity(nakshatra: string): string { return 'specific deity based on Nakshatra'; }
  private getPrimaryPractice(nakshatra: string): string { return 'daily meditation'; }
  private getMeditationStyle(moonSign: string): string { return 'mindfulness meditation'; }
  private getSpiritualTime(nakshatra: string): string { return 'early morning (Brahma Muhurta)'; }
  private getPersonalMantra(moonSign: string, nakshatra: string): string { return 'Om Namah Shivaya'; }
  private getNextThreeMonthsForecast(context: BirthChartContext): string { return 'favorable for growth'; }
  private getPeakPeriod(context: BirthChartContext): string { return 'next 6 months'; }
  private getAuspiciousDates(context: BirthChartContext): string { return '5th, 12th, 19th'; }
  private getSpecificTimingGuidance(context: BirthChartContext, question: string): string { return 'Align actions with planetary periods'; }
  private getDetailedRemedies(context: BirthChartContext): string { return 'Planetary remedies based on current dasha'; }
  private getDailyPractices(context: BirthChartContext): string { return 'Morning prayers and meditation'; }
  private getGemstoneGuidance(context: BirthChartContext): string { return `Wear ${this.getRemedialGemstone(context.mahaDasha)} after proper consultation`; }
  private getContextualAnalysis(context: BirthChartContext, question: string): string { return 'Based on your unique chart configuration...'; }
  private getPeriodNature(context: BirthChartContext): string { return 'a favorable'; }
  private getLuckyDay(nakshatra: string): string { return 'Thursday'; }

  /**
   * Store conversation for learning
   */
  private async storeConversation(
    question: AIQuestion,
    response: AIResponse,
    category: string,
    transits: any
  ): Promise<void> {
    try {
      const keywords = this.extractKeywords(question.question);

      const { error } = await supabase.from('ai_conversations').insert({
        user_id: question.userId,
        question: question.question,
        question_category: category,
        user_moon_sign: question.context.moonSign,
        user_ascendant: question.context.ascendant,
        user_birth_date: question.context.dateOfBirth,
        user_birth_time: question.context.timeOfBirth,
        user_current_dasha: `${question.context.mahaDasha}-${question.context.antarDasha}`,
        user_location_lat: question.context.latitude,
        user_location_lon: question.context.longitude,
        response: response.answer,
        response_source: response.source,
        confidence_score: response.confidence,
        transits_at_time: transits,
        tokens: keywords,
      } as any);

      if (error) {
        console.error('Error storing conversation:', error);
      } else {
        console.log('✅ Conversation stored for learning');
      }
    } catch (error) {
      console.error('Error in storeConversation:', error);
    }
  }

  /**
   * Submit feedback for continuous learning
   */
  async submitFeedback(feedback: ConversationFeedback): Promise<void> {
    try {
      // @ts-ignore
      const { error } = await (supabase
        .from('ai_conversations')
        .update({
          user_rating: feedback.rating,
          was_helpful: feedback.wasHelpful,
          user_feedback: feedback.feedback,
        }) as any)
        .eq('id', feedback.conversationId);

      if (error) {
        console.error('Error submitting feedback:', error);
        return;
      }

      // Update learned patterns based on feedback
      await this.updateLearnedPatterns(feedback);

      console.log('✅ Feedback submitted successfully');
    } catch (error) {
      console.error('Error in submitFeedback:', error);
    }
  }

  /**
   * Update learned patterns based on feedback
   */
  private async updateLearnedPatterns(feedback: ConversationFeedback): Promise<void> {
    try {
      // Only create patterns from highly rated responses
      if (feedback.rating && feedback.rating >= 4) {
        // Get the conversation details
        const { data: conversation, error: fetchError } = await supabase
          .from('ai_conversations')
          .select('*')
          .eq('id', feedback.conversationId)
          .single();

        if (fetchError || !conversation) {
          console.error('Error fetching conversation:', fetchError);
          return;
        }

        // Extract pattern from successful interaction
        const conv = conversation as any;
        const keywords = this.extractKeywords(conv.question);
        const category = conv.question_category;

        // Check if similar pattern exists
        const { data: existingPatterns } = await supabase
          .from('ai_learned_patterns')
          .select('*')
          .eq('pattern_type', category)
          .contains('question_keywords', keywords.slice(0, 3)); // Match on top 3 keywords

        if (existingPatterns && existingPatterns.length > 0) {
          // Update existing pattern
          const pattern = (existingPatterns as any[])[0];
          const newTimesUsed = (pattern.times_used || 0) + 1;
          const newSuccessRate = ((pattern.success_rate || 0) * (pattern.times_used || 0) + feedback.rating * 20) / newTimesUsed;
          const newAvgRating = ((pattern.average_rating || 0) * (pattern.times_used || 0) + feedback.rating) / newTimesUsed;

          // @ts-ignore
          await (supabase
            .from('ai_learned_patterns')
            .update({
              times_used: newTimesUsed,
              success_rate: newSuccessRate,
              average_rating: newAvgRating,
              last_used_at: new Date().toISOString(),
            }) as any)
            .eq('id', pattern.id);

          console.log('✅ Updated existing pattern:', pattern.id);
        } else {
          // Create new pattern
          await supabase.from('ai_learned_patterns').insert({
            pattern_type: category,
            astrological_context: {
              moonSign: conv.user_moon_sign,
              ascendant: conv.user_ascendant,
              dasha: conv.user_current_dasha,
            },
            question_pattern: conv.question,
            question_keywords: keywords,
            response_template: conv.response,
            times_used: 1,
            success_rate: feedback.rating * 20, // Convert 5-star to percentage
            average_rating: feedback.rating,
            confidence_score: conv.confidence_score,
            last_used_at: new Date().toISOString(),
          } as any);

          console.log('✅ Created new learned pattern for category:', category);
        }
      }
    } catch (error) {
      console.error('Error updating learned patterns:', error);
    }
  }

  /**
   * Create and store chart insights for faster future responses
   */
  async createChartInsights(context: BirthChartContext, userId: string): Promise<void> {
    try {
      // Check if insights already exist
      const { data: existing } = await supabase
        .from('ai_chart_insights')
        .select('*')
        .eq('user_id', userId)
        .eq('is_current', true)
        .single();

      // Analyze chart and generate insights
      const careerInsight = this.getCareerAnalysis(context);
      const financeInsight = this.getFinanceAnalysis(context);
      const relationshipInsight = this.getRelationshipAnalysis(context);
      const healthInsight = this.getHealthAnalysis(context);

      // Extract yogas and doshas from context if available
      const majorYogas = context.yogas || [];
      const doshaAnalysis = {}; // Can be expanded to analyze doshas

      const insights = {
        user_id: userId,
        moon_sign: context.moonSign,
        moon_nakshatra: context.moonNakshatra,
        ascendant: context.ascendant,
        sun_sign: context.sunSign,
        planet_positions: context.planetPositions || [],
        major_yogas: majorYogas,
        dosha_analysis: doshaAnalysis,
        current_maha_dasha: context.mahaDasha,
        current_antar_dasha: context.antarDasha,
        career_prediction: careerInsight,
        finance_prediction: financeInsight,
        relationships_prediction: relationshipInsight,
        health_prediction: healthInsight,
        is_current: true,
        calculated_at: new Date().toISOString(),
      };

      if (existing) {
        // Mark old as not current and insert new
        // @ts-ignore
        await (supabase
          .from('ai_chart_insights')
          .update({ is_current: false }) as any)
          .eq('id', (existing as any).id);
      }

      const { error } = await supabase.from('ai_chart_insights').insert(insights as any);

      if (error) {
        console.error('Error storing chart insights:', error);
      } else {
        console.log('✅ Chart insights stored for future use');
      }
    } catch (error) {
      console.error('Error in createChartInsights:', error);
    }
  }

  /**
   * Get cached chart insights for faster responses
   */
  async getCachedInsights(userId: string): Promise<any | null> {
    try {
      const { data, error } = await supabase
        .from('ai_chart_insights')
        .select('*')
        .eq('user_id', userId)
        .eq('is_current', true)
        .single();

      if (error || !data) {
        return null;
      }

      console.log('✅ Using cached chart insights');
      return data;
    } catch (error) {
      console.error('Error fetching cached insights:', error);
      return null;
    }
  }
}

// Export singleton instance
export const intelligentAssistant = new IntelligentAssistant();

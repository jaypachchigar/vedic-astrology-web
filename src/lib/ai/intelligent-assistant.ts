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
   * This method actually ANSWERS the specific question using the birth chart
   */
  private buildDetailedAnswer(question: string, context: BirthChartContext, category: string): string {
    // Check if we have complete birth chart data
    if (!context.moonSign || !context.ascendant || !context.mahaDasha) {
      return this.buildProfileIncompleteMessage(context);
    }

    const parts: string[] = [];

    // Opening - conversational like a real astrologer
    const openings = [
      `Namaste! 🙏 I've carefully studied your Kundli, and here's what the stars reveal for your question...\n`,
      `Greetings! After analyzing your birth chart in detail, I can share some important insights with you...\n`,
      `Namaste! Your question is very relevant to your current planetary phase. Let me explain what your chart indicates...\n`,
      `Welcome! I see you have a ${context.moonSign} Moon with ${context.ascendant} rising - this gives you unique qualities that directly relate to your question...\n`,
    ];
    parts.push(openings[Math.floor(Math.random() * openings.length)]);

    // Brief chart reference (not overwhelming with technical details)
    parts.push(`*Based on: ${context.moonSign} Moon • ${context.moonNakshatra} Nakshatra • ${context.ascendant} Ascendant • ${context.mahaDasha}-${context.antarDasha} Dasha*\n`);

    // MAIN ANSWER: Address the specific question directly
    parts.push(this.analyzeSpecificQuestion(question, context, category));

    // Category-specific SUPPLEMENTARY analysis (not the main answer)
    parts.push(`\n📚 **Additional Insights for ${this.getCategoryName(category)}:**\n`);
    switch (category) {
      case 'career':
        parts.push(this.getCareerSupplementaryInsights(context, question));
        break;
      case 'finance':
        parts.push(this.getFinanceSupplementaryInsights(context, question));
        break;
      case 'relationships':
        parts.push(this.getRelationshipSupplementaryInsights(context, question));
        break;
      case 'health':
        parts.push(this.getHealthSupplementaryInsights(context, question));
        break;
      case 'education':
        parts.push(this.getEducationSupplementaryInsights(context, question));
        break;
      case 'spiritual':
        parts.push(this.getSpiritualSupplementaryInsights(context, question));
        break;
      case 'timing':
        parts.push(this.getTimingSupplementaryInsights(context, question));
        break;
      case 'remedies':
        parts.push(this.getRemediesSupplementaryInsights(context, question));
        break;
      default:
        parts.push(this.getGeneralSupplementaryInsights(context, question));
    }

    // Current dasha influence on the specific question
    parts.push(`\n🪐 **How Current Planetary Period Affects This:**`);
    parts.push(this.getDashaInfluenceOnQuestion(context, question, category));

    // Actionable guidance specific to the question
    parts.push(`\n💫 **Practical Steps You Can Take:**`);
    parts.push(this.getQuestionSpecificGuidance(context, question, category));

    // Remedies specific to the question
    parts.push(`\n🙏 **Recommended Remedies for Your Situation:**`);
    parts.push(this.getQuestionSpecificRemedies(context, question, category));

    // Closing - varied and conversational
    const closings = [
      `\n---\nFeel free to ask any follow-up questions about this reading. The stars are always there to guide you! 🌟`,
      `\n---\nRemember, these insights are based on your unique Kundli. Your actions and intentions also shape your path. Om Shanti! 🙏`,
      `\n---\nI hope this helps clarify your question. The planets show tendencies, but your free will shapes the outcome. Blessings! ✨`,
      `\n---\nThis is what your chart reveals. If you have more questions about specific aspects, feel free to ask! 🪐`,
    ];
    parts.push(closings[Math.floor(Math.random() * closings.length)]);

    return parts.join('\n');
  }

  /**
   * Analyze the specific question using birth chart data
   * This is the MAIN answer that directly addresses what the user asked
   */
  private analyzeSpecificQuestion(question: string, context: BirthChartContext, category: string): string {
    const lowerQuestion = question.toLowerCase();

    // Extract key elements from the question
    const isAboutTiming = lowerQuestion.includes('when') || lowerQuestion.includes('timing');
    const isAboutSuccess = lowerQuestion.includes('success') || lowerQuestion.includes('achieve');
    const isAboutProblems = lowerQuestion.includes('problem') || lowerQuestion.includes('issue') || lowerQuestion.includes('difficulty');
    const isAboutAdvice = lowerQuestion.includes('should i') || lowerQuestion.includes('what to do');
    const isAboutFuture = lowerQuestion.includes('will') || lowerQuestion.includes('going to');

    let answer = '';

    // Build answer based on question type and category
    if (category === 'career') {
      if (isAboutTiming && (lowerQuestion.includes('promotion') || lowerQuestion.includes('job') || lowerQuestion.includes('change'))) {
        answer = `Based on your ${context.moonSign} Moon sign and ${context.ascendant} Ascendant, combined with your current ${context.mahaDasha}-${context.antarDasha} Dasha period:\n\n`;
        answer += this.analyzeCareerTiming(context, lowerQuestion);
      } else if (lowerQuestion.includes('promotion')) {
        answer = this.analyzePromotionProspects(context);
      } else if (lowerQuestion.includes('job change') || lowerQuestion.includes('new job')) {
        answer = this.analyzeJobChange(context);
      } else if (lowerQuestion.includes('business') || lowerQuestion.includes('entrepreneur')) {
        answer = this.analyzeBusinessProspects(context);
      } else {
        answer = `Regarding your career question, let me analyze your birth chart:\n\n`;
        answer += `Your ${context.moonSign} Moon sign gives you ${this.getMoonSignCareerNature(context.moonSign)}. `;
        answer += `With ${context.ascendant} Ascendant, you project ${this.getAscendantCareerImage(context.ascendant)}.\n\n`;
        answer += `Currently in ${context.mahaDasha} Maha Dasha with ${context.antarDasha} Antar Dasha, `;
        answer += this.getCurrentCareerPhase(context);
      }
    } else if (category === 'finance') {
      if (lowerQuestion.includes('investment') || lowerQuestion.includes('invest')) {
        answer = this.analyzeInvestmentTiming(context);
      } else if (lowerQuestion.includes('money') || lowerQuestion.includes('wealth')) {
        answer = this.analyzeWealthProspects(context);
      } else if (lowerQuestion.includes('loan') || lowerQuestion.includes('debt')) {
        answer = this.analyzeLoanSituation(context);
      } else {
        answer = `Analyzing your financial question through your birth chart:\n\n`;
        answer += this.getFinancialOverview(context);
      }
    } else if (category === 'relationships') {
      if (lowerQuestion.includes('marriage') || lowerQuestion.includes('married')) {
        answer = this.analyzeMarriageProspects(context);
      } else if (lowerQuestion.includes('love') || lowerQuestion.includes('partner')) {
        answer = this.analyzeLoveLife(context);
      } else if (lowerQuestion.includes('compatibility')) {
        answer = this.analyzeCompatibility(context);
      } else {
        answer = `Examining your relationship question:\n\n`;
        answer += this.getRelationshipOverview(context);
      }
    } else if (category === 'health') {
      answer = `Based on your birth chart health indicators:\n\n`;
      answer += this.analyzeHealthQuestion(context, lowerQuestion);
    } else if (category === 'timing') {
      answer = this.analyzeTimingQuestion(context, question);
    } else {
      // General question - provide thoughtful answer based on chart
      answer = this.analyzeGeneralQuestion(context, question);
    }

    return answer;
  }

  private getCategoryName(category: string): string {
    const names: Record<string, string> = {
      career: 'Career & Professional Life',
      finance: 'Finance & Wealth',
      relationships: 'Relationships & Love',
      health: 'Health & Wellness',
      education: 'Education & Learning',
      spiritual: 'Spiritual Growth',
      timing: 'Timing & Planning',
      remedies: 'Remedies & Solutions',
      general: 'Your Situation'
    };
    return names[category] || 'Your Question';
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
    // Provide a thoughtful, conversational response like a real astrologer
    const lowerQuestion = question.toLowerCase();

    // Detect if it's a simple greeting or basic question
    if (lowerQuestion.match(/^(hi|hello|hey|namaste|good)/)) {
      return `🙏 **Astrological Insight:**
Thank you for reaching out. I'm here to guide you through the wisdom of Vedic astrology.

**About Your Chart:**
With ${context.moonSign} as your Moon sign (Chandra Rashi) and ${context.ascendant} Ascendant, your emotional nature and life approach are beautifully balanced. Your birth Nakshatra ${context.moonNakshatra} adds unique qualities to your personality and destiny.

Currently, you're experiencing the ${context.mahaDasha} Maha Dasha with ${context.antarDasha} Antar Dasha period, which brings specific energies and opportunities into your life.

Feel free to ask me anything about your career, relationships, health, timing, or any other aspect of your life. I'm here to provide guidance based on your unique astrological blueprint.`;
    }

    return `🔍 **Astrological Analysis:**
Let me examine your question through the lens of your birth chart...

${this.getContextualAnalysis(context, question)}

**Current Planetary Influence:**
You're in the ${context.mahaDasha} Maha Dasha period, combined with ${context.antarDasha} Antar Dasha. This planetary period ${this.getPeriodNature(context)} for the matters you're asking about.

**Your Chart's Perspective:**
With ${context.moonSign} Moon and ${context.ascendant} Ascendant, your approach to this situation is influenced by ${this.getMoonAscendantCombination(context.moonSign, context.ascendant)}.`;
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

  private getMoonAscendantCombination(moonSign: string, ascendant: string): string {
    return `the emotional sensitivity of ${moonSign} combined with the outward expression of ${ascendant}. This creates a unique blend where your inner feelings and outer persona work together to shape your life experiences.`;
  }

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
      const { error } = await (supabase
        .from('ai_conversations') as any)
        .update({
          user_rating: feedback.rating,
          was_helpful: feedback.wasHelpful,
          user_feedback: feedback.feedback,
        })
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

          await (supabase
            .from('ai_learned_patterns') as any)
            .update({
              times_used: newTimesUsed,
              success_rate: newSuccessRate,
              average_rating: newAvgRating,
              last_used_at: new Date().toISOString(),
            })
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
        await (supabase
          .from('ai_chart_insights') as any)
          .update({ is_current: false })
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
  // ============================================================================
  // QUESTION-SPECIFIC ANALYSIS METHODS
  // These methods provide ACTUAL answers to specific questions using birth chart
  // ============================================================================

  private analyzeCareerTiming(context: BirthChartContext, question: string): string {
    const { mahaDasha, antarDasha, moonSign, ascendant } = context;

    let analysis = '';

    // Current period favorability
    const careerDashas = ['Sun', 'Jupiter', 'Mercury', 'Saturn'];
    const mahaFavorable = careerDashas.includes(mahaDasha);
    const antarFavorable = careerDashas.includes(antarDasha);

    if (mahaFavorable && antarFavorable) {
      analysis += `✅ EXCELLENT TIMING: Your current ${mahaDasha}-${antarDasha} period is highly favorable for career advancement. Both your major and sub-periods support professional growth.\n\n`;
      analysis += `The next 6-12 months are particularly auspicious for:\n`;
      analysis += `• Asking for promotions or raises\n`;
      analysis += `• Starting new projects or ventures\n`;
      analysis += `• Taking on leadership roles\n`;
      analysis += `• Making strategic career moves\n\n`;
    } else if (mahaFavorable || antarFavorable) {
      analysis += `🟡 MODERATE TIMING: Your ${mahaDasha}-${antarDasha} period has mixed energies for career matters. ${mahaFavorable ? mahaDasha + ' Maha Dasha supports growth' : antarDasha + ' Antar Dasha provides opportunities'}, but requires consistent effort.\n\n`;
      analysis += `Best approach: Take measured steps, prepare thoroughly, and time important moves during favorable transits.\n\n`;
    } else {
      analysis += `⚠️ CHALLENGING TIMING: Your current ${mahaDasha}-${antarDasha} period requires patience in career matters. Focus on building skills and relationships rather than expecting immediate breakthroughs.\n\n`;
      analysis += `This is a time for:\n`;
      analysis += `• Strengthening your foundation\n`;
      analysis += `• Learning new skills\n`;
      analysis += `• Building professional networks\n`;
      analysis += `• Preparing for future opportunities\n\n`;
    }

    // Moon sign specific timing
    analysis += `**Based on your ${moonSign} Moon sign:**\n`;
    analysis += `Your best days for career initiatives are when Moon transits ${moonSign} (every 27-28 days). `;
    analysis += `Mark these days in your calendar for important meetings, interviews, or career discussions.\n\n`;

    // Specific timing advice
    if (question.includes('promotion')) {
      analysis += `For promotion specifically: Jupiter's current transit and your Dasha period suggest `;
      if (mahaFavorable && antarFavorable) {
        analysis += `the next 3-6 months are ideal. Initiate conversations with management now.`;
      } else {
        analysis += `waiting for the next favorable period (when Jupiter transits your 10th house from Moon or Ascendant) would be wise.`;
      }
    }

    return analysis;
  }

  private analyzePromotionProspects(context: BirthChartContext): string {
    const { mahaDasha, antarDasha, moonSign, ascendant } = context;

    let analysis = `Analyzing promotion prospects based on your birth chart:\n\n`;

    // Dasha analysis
    const promotionFavorable = ['Sun', 'Jupiter', 'Mercury'].includes(mahaDasha) ||
                               ['Sun', 'Jupiter', 'Mercury'].includes(antarDasha);

    if (promotionFavorable) {
      analysis += `🌟 **Promotion Outlook: FAVORABLE**\n\n`;
      analysis += `Your current planetary periods support career advancement. `;
      if (mahaDasha === 'Sun' || antarDasha === 'Sun') {
        analysis += `Sun's influence brings recognition and authority. `;
      }
      if (mahaDasha === 'Jupiter' || antarDasha === 'Jupiter') {
        analysis += `Jupiter expands opportunities and brings beneficial growth. `;
      }
      analysis += `\n\n**Action Steps:**\n`;
      analysis += `1. Document your achievements and contributions\n`;
      analysis += `2. Schedule a meeting with your supervisor within the next 30 days\n`;
      analysis += `3. Express your interest in advancement clearly\n`;
      analysis += `4. Showcase leadership in current projects\n`;
    } else {
      analysis += `⏳ **Promotion Outlook: REQUIRES PATIENCE**\n\n`;
      analysis += `The current period (${mahaDasha}-${antarDasha}) is not the strongest for immediate promotion. `;
      analysis += `However, this doesn't mean you should stop trying. Use this time to:\n\n`;
      analysis += `1. Build a strong track record\n`;
      analysis += `2. Develop relationships with decision-makers\n`;
      analysis += `3. Acquire new skills and certifications\n`;
      analysis += `4. Position yourself for the next opportunity\n`;
    }

    // Moon sign specific
    analysis += `\n\n**${moonSign} Moon Sign Advantage:**\n`;
    analysis += this.getMoonSignPromotionStrategy(moonSign);

    return analysis;
  }

  private getMoonSignPromotionStrategy(moonSign: string): string {
    const strategies: Record<string, string> = {
      Aries: 'Take initiative, lead projects, show bold decision-making',
      Taurus: 'Demonstrate reliability, deliver consistent results, show long-term value',
      Gemini: 'Leverage communication skills, network effectively, showcase versatility',
      Cancer: 'Build team relationships, show emotional intelligence, nurture projects',
      Leo: 'Lead with confidence, inspire others, take center stage on important initiatives',
      Virgo: 'Perfect your work quality, solve complex problems, show attention to detail',
      Libra: 'Build consensus, demonstrate diplomacy, create harmonious team dynamics',
      Scorpio: 'Show strategic thinking, handle difficult situations, demonstrate depth',
      Sagittarius: 'Think big picture, bring optimism, expand team capabilities',
      Capricorn: 'Show discipline, deliver long-term results, take responsibility',
      Aquarius: 'Innovate, bring fresh ideas, demonstrate forward thinking',
      Pisces: 'Show creativity, empathy, and ability to adapt to changing circumstances'
    };
    return strategies[moonSign] || 'Play to your natural strengths';
  }

  private analyzeJobChange(context: BirthChartContext): string {
    let analysis = `Regarding job change, based on your birth chart:\n\n`;

    const { mahaDasha, antarDasha } = context;
    const changeFavorable = ['Rahu', 'Mercury', 'Jupiter'].includes(mahaDasha) ||
                           ['Rahu', 'Mercury', 'Jupiter'].includes(antarDasha);

    if (changeFavorable) {
      analysis += `✅ **Job Change Timing: FAVORABLE**\n\n`;
      analysis += `The current ${mahaDasha}-${antarDasha} period supports transitions and new opportunities. `;
      if (mahaDasha === 'Rahu' || antarDasha === 'Rahu') {
        analysis += `Rahu brings unexpected opportunities and desire for change. `;
      }
      if (mahaDasha === 'Mercury' || antarDasha === 'Mercury') {
        analysis += `Mercury supports new learning and skill application. `;
      }
      if (mahaDasha === 'Jupiter' || antarDasha === 'Jupiter') {
        analysis += `Jupiter brings growth through expansion. `;
      }

      analysis += `\n\n**Recommended Timeline:**\n`;
      analysis += `• Start actively looking: Immediately\n`;
      analysis += `• Apply to positions: Next 2-3 months\n`;
      analysis += `• Best interview days: When Moon transits ${context.moonSign}\n`;
      analysis += `• Expected transition: Within 3-6 months\n`;
    } else {
      analysis += `⚠️ **Job Change Timing: PROCEED CAUTIOUSLY**\n\n`;
      analysis += `While changing jobs is always possible, the current planetary period doesn't strongly support transitions. `;
      analysis += `If you must change:\n`;
      analysis += `• Have a solid offer before resigning\n`;
      analysis += `• Negotiate thoroughly\n`;
      analysis += `• Ensure the new role is significantly better\n`;
      analysis += `• Consider waiting for the next favorable period if possible\n`;
    }

    return analysis;
  }

  private analyzeBusinessProspects(context: BirthChartContext): string {
    const { mahaDasha, antarDasha, moonSign, ascendant } = context;

    let analysis = `Business and Entrepreneurship Analysis:\n\n`;

    const businessDashas = ['Sun', 'Mars', 'Mercury', 'Rahu'];
    const favorable = businessDashas.includes(mahaDasha) || businessDashas.includes(antarDasha);

    if (favorable) {
      analysis += `🚀 **Business Prospects: PROMISING**\n\n`;
      analysis += `Your current planetary configuration supports entrepreneurial ventures. `;

      if (mahaDasha === 'Mars' || antarDasha === 'Mars') {
        analysis += `Mars provides courage and action-orientation needed for business. `;
      }
      if (mahaDasha === 'Rahu' || antarDasha === 'Rahu') {
        analysis += `Rahu brings innovative thinking and ability to tap into mass markets. `;
      }

      analysis += `\n\n**Business Type Recommendations for ${moonSign}:**\n`;
      analysis += this.getBusinessTypeRecommendation(moonSign);

      analysis += `\n\n**Action Plan:**\n`;
      analysis += `1. Start with a solid business plan (next 30 days)\n`;
      analysis += `2. Secure funding and partnerships (2-3 months)\n`;
      analysis += `3. Launch during favorable planetary transit\n`;
      analysis += `4. Scale gradually based on market response\n`;
    } else {
      analysis += `⏳ **Business Prospects: BUILD FOUNDATION FIRST**\n\n`;
      analysis += `The current period is better suited for:\n`;
      analysis += `• Building business knowledge\n`;
      analysis += `• Creating detailed plans\n`;
      analysis += `• Networking with potential partners\n`;
      analysis += `• Starting as a side venture while employed\n\n`;
      analysis += `Wait for more favorable planetary periods before full commitment.\n`;
    }

    return analysis;
  }

  private getBusinessTypeRecommendation(moonSign: string): string {
    const types: Record<string, string> = {
      Aries: 'Competitive businesses, sports, fitness, technology startups, emergency services',
      Taurus: 'Finance, real estate, agriculture, luxury goods, food and beverage',
      Gemini: 'Communication, media, education, e-commerce, consulting',
      Cancer: 'Hospitality, food, childcare, real estate, family services',
      Leo: 'Entertainment, luxury brands, leadership consulting, creative services',
      Virgo: 'Healthcare, analysis services, quality control, technical consulting',
      Libra: 'Law, design, fashion, partnerships, diplomatic services',
      Scorpio: 'Research, investigation, transformational services, insurance',
      Sagittarius: 'Education, travel, publishing, import-export, philosophical services',
      Capricorn: 'Corporate services, engineering, long-term projects, government contracts',
      Aquarius: 'Technology, innovation, social enterprises, humanitarian services',
      Pisces: 'Healing arts, creative services, spiritual businesses, charitable work'
    };
    return types[moonSign] || 'Service-oriented businesses aligned with your skills';
  }

  private analyzeInvestmentTiming(context: BirthChartContext): string {
    let analysis = `Investment Timing Analysis:\n\n`;

    const { mahaDasha, antarDasha } = context;
    const wealthDashas = ['Venus', 'Jupiter', 'Mercury'];
    const favorable = wealthDashas.includes(mahaDasha) || wealthDashas.includes(antarDasha);

    if (favorable) {
      analysis += `💰 **Investment Timing: FAVORABLE**\n\n`;
      analysis += `Current planetary periods support wealth accumulation through strategic investments.\n\n`;
      analysis += `**Recommended Investment Types:**\n`;

      if (mahaDasha === 'Venus' || antarDasha === 'Venus') {
        analysis += `• Luxury goods, real estate, art, precious metals\n`;
      }
      if (mahaDasha === 'Jupiter' || antarDasha === 'Jupiter') {
        analysis += `• Education, gold, long-term growth stocks, ethical investments\n`;
      }
      if (mahaDasha === 'Mercury' || antarDasha === 'Mercury') {
        analysis += `• Technology, communication sector, diverse portfolio\n`;
      }

      analysis += `\n**Investment Strategy:**\n`;
      analysis += `• Start with 20-30% of available capital\n`;
      analysis += `• Diversify across asset classes\n`;
      analysis += `• Focus on long-term holdings\n`;
      analysis += `• Best days to invest: Thursdays, when Moon transits ${context.moonSign}\n`;
    } else {
      analysis += `⚠️ **Investment Timing: CONSERVATIVE APPROACH**\n\n`;
      analysis += `Current period favors:\n`;
      analysis += `• Preserving capital\n`;
      analysis += `• Low-risk investments\n`;
      analysis += `• Fixed deposits, government bonds\n`;
      analysis += `• Paying off debts\n`;
      analysis += `• Building emergency fund\n\n`;
      analysis += `Avoid high-risk investments until more favorable planetary periods.\n`;
    }

    return analysis;
  }

  private analyzeWealthProspects(context: BirthChartContext): string {
    return `Your wealth prospects based on ${context.moonSign} Moon sign and current ${context.mahaDasha}-${context.antarDasha} Dasha show ${this.getWealthPhase(context)}. Focus on ${this.getWealthBuildingStrategy(context)}.`;
  }

  private getWealthPhase(context: BirthChartContext): string {
    const wealthDashas = ['Venus', 'Jupiter', 'Mercury'];
    if (wealthDashas.includes(context.mahaDasha) || wealthDashas.includes(context.antarDasha)) {
      return 'strong potential for wealth accumulation';
    }
    return 'steady growth through consistent effort';
  }

  private getWealthBuildingStrategy(context: BirthChartContext): string {
    return `${this.getMoonSignWealthMethod(context.moonSign)} and ${this.getDashaWealthMethod(context.mahaDasha)}`;
  }

  private getMoonSignWealthMethod(moonSign: string): string {
    const methods: Record<string, string> = {
      Aries: 'bold entrepreneurial ventures',
      Taurus: 'steady savings and tangible assets',
      Gemini: 'multiple income streams',
      Cancer: 'real estate and family businesses',
      Leo: 'leadership positions and investments',
      Virgo: 'service businesses and careful planning',
      Libra: 'partnerships and balanced portfolios',
      Scorpio: 'strategic investments and research',
      Sagittarius: 'expansion and international ventures',
      Capricorn: 'disciplined long-term building',
      Aquarius: 'innovative tech investments',
      Pisces: 'creative ventures and intuitive choices'
    };
    return methods[moonSign] || 'strategic planning';
  }

  private getDashaWealthMethod(dasha: string): string {
    const methods: Record<string, string> = {
      Sun: 'authority-based income',
      Moon: 'public-facing businesses',
      Mars: 'real estate and action',
      Mercury: 'trading and intellect',
      Jupiter: 'growth and wisdom',
      Venus: 'luxury and arts',
      Saturn: 'patient accumulation',
      Rahu: 'unconventional methods',
      Ketu: 'technical expertise'
    };
    return methods[dasha] || 'consistent effort';
  }

  private analyzeLoanSituation(context: BirthChartContext): string {
    const { mahaDasha } = context;
    const debtRiskyDashas = ['Saturn', 'Mars', 'Rahu'];

    if (debtRiskyDashas.includes(mahaDasha)) {
      return `⚠️ **Loan Caution**: Your current ${mahaDasha} Maha Dasha requires extreme caution with debt. Avoid new loans if possible. If essential, keep amount minimal and have solid repayment plan. This period can create debt burdens that are difficult to clear. Focus on reducing existing debts rather than taking new ones.`;
    }

    return `💼 **Loan Guidance**: Current period allows for loans if used for productive purposes (education, business, property). Ensure EMI doesn't exceed 40% of income. Best loan approval days: Thursdays and days when Moon transits ${context.moonSign}.`;
  }

  private analyzeMarriageProspects(context: BirthChartContext): string {
    const { mahaDasha, antarDasha, moonSign } = context;
    const marriageDashas = ['Venus', 'Jupiter', 'Moon'];
    const favorable = marriageDashas.includes(mahaDasha) || marriageDashas.includes(antarDasha);

    let analysis = `Marriage Prospects Analysis:\n\n`;

    if (favorable) {
      analysis += `💑 **Marriage Timing: HIGHLY FAVORABLE**\n\n`;
      analysis += `Your current ${mahaDasha}-${antarDasha} period is excellent for marriage. `;

      if (mahaDasha === 'Venus' || antarDasha === 'Venus') {
        analysis += `Venus, the planet of love and relationships, creates ideal conditions for marriage. `;
      }
      if (mahaDasha === 'Jupiter' || antarDasha === 'Jupiter') {
        analysis += `Jupiter brings wisdom and auspicious unions. `;
      }

      analysis += `\n\n**Expected Timeline:**\n`;
      analysis += `• Meeting potential partner: Next 3-6 months\n`;
      analysis += `• Engagement: Within 6-12 months\n`;
      analysis += `• Marriage: Within 12-18 months\n\n`;

      analysis += `**Best Approach for ${moonSign}:**\n`;
      analysis += this.getMoonSignMarriageAdvice(moonSign);
    } else {
      analysis += `⏳ **Marriage Timing: PATIENCE RECOMMENDED**\n\n`;
      analysis += `Current ${mahaDasha}-${antarDasha} period doesn't strongly favor marriage. `;
      analysis += `Use this time to:\n`;
      analysis += `• Work on personal growth\n`;
      analysis += `• Clarify what you want in a partner\n`;
      analysis += `• Build financial stability\n`;
      analysis += `• Develop emotional maturity\n\n`;
      analysis += `The right person may appear in the next favorable period.\n`;
    }

    return analysis;
  }

  private getMoonSignMarriageAdvice(moonSign: string): string {
    const advice: Record<string, string> = {
      Aries: 'Look for partners who match your energy. Be open through social events and active pursuits.',
      Taurus: 'Seek stability and shared values. Traditional matchmaking may work well for you.',
      Gemini: 'Intellectual connection is key. Meet through educational or social networking events.',
      Cancer: 'Emotional compatibility matters most. Family introductions often work best.',
      Leo: 'Look for someone who appreciates your strengths. Social events and celebrations favor you.',
      Virgo: 'Practical compatibility is important. Workplace or service activities may introduce the right person.',
      Libra: 'Balance and beauty matter. Social gatherings and artistic events are favorable.',
      Scorpio: 'Deep emotional connection is essential. Take time to truly know someone before committing.',
      Sagittarius: 'Shared philosophy matters. Educational or travel settings may introduce your partner.',
      Capricorn: 'Long-term compatibility is crucial. Professional settings or traditional matchmaking work well.',
      Aquarius: 'Friendship-based relationships suit you. Social causes or group activities are favorable.',
      Pisces: 'Spiritual and emotional connection matters. Creative or spiritual settings may help.'
    };
    return advice[moonSign] || 'Be open to possibilities while staying true to your values.';
  }

  private analyzeLoveLife(context: BirthChartContext): string {
    const { moonSign, mahaDasha, antarDasha } = context;

    return `Love Life Analysis:\n\nYour ${moonSign} Moon sign brings ${this.getMoonSignLoveNature(moonSign)}. ` +
           `Currently in ${mahaDasha}-${antarDasha} period, which ${this.getLovePeriodInfluence(mahaDasha, antarDasha)}. ` +
           `${this.getLoveLifeGuidance(context)}`;
  }

  private getMoonSignLoveNature(moonSign: string): string {
    const natures: Record<string, string> = {
      Aries: 'passionate, direct, and spontaneous energy to relationships',
      Taurus: 'loyal, sensual, and stable approach to love',
      Gemini: 'intellectual stimulation and variety in romantic connections',
      Cancer: 'deep emotional bonding and nurturing tendencies',
      Leo: 'grand romantic gestures and desire for admiration',
      Virgo: 'practical care and attentive service to partners',
      Libra: 'harmony-seeking and diplomatic approach to relationships',
      Scorpio: 'intense, transformative, and deeply committed love',
      Sagittarius: 'adventurous, optimistic, and freedom-loving romance',
      Capricorn: 'serious, committed, and goal-oriented approach to love',
      Aquarius: 'unconventional, friendship-based romantic connections',
      Pisces: 'dreamy, compassionate, and spiritually connected love'
    };
    return natures[moonSign] || 'unique emotional expression';
  }

  private getLovePeriodInfluence(maha: string, antar: string): string {
    if (maha === 'Venus' || antar === 'Venus') {
      return 'creates highly favorable conditions for romance and relationships';
    }
    if (maha === 'Moon' || antar === 'Moon') {
      return 'enhances emotional connections and romantic feelings';
    }
    if (maha === 'Rahu' || antar === 'Rahu') {
      return 'brings unconventional or unexpected romantic encounters';
    }
    return 'requires mindful approach to romantic matters';
  }

  private getLoveLifeGuidance(context: BirthChartContext): string {
    const loveFavorable = ['Venus', 'Moon', 'Mercury'].includes(context.mahaDasha) ||
                         ['Venus', 'Moon', 'Mercury'].includes(context.antarDasha);

    if (loveFavorable) {
      return '\n\nCurrent period favors:\n• New romantic connections\n• Deepening existing relationships\n• Expressing feelings openly\n• Enjoying romantic experiences';
    }
    return '\n\nFocus on:\n• Building genuine friendships first\n• Working on self-love\n• Understanding your emotional needs\n• Being patient with romantic timing';
  }

  private analyzeCompatibility(context: BirthChartContext): string {
    return `For compatibility analysis, ${context.moonSign} Moon sign is most compatible with other ${this.getCompatibleElements(context.moonSign)} signs. Your ${context.moonNakshatra} Nakshatra adds specific compatibility factors based on traditional Nakshatra matching system (Koota system).`;
  }

  private getCompatibleElements(moonSign: string): string {
    const fireSign = ['Aries', 'Leo', 'Sagittarius'].includes(moonSign);
    const earthSigns = ['Taurus', 'Virgo', 'Capricorn'].includes(moonSign);
    const airSigns = ['Gemini', 'Libra', 'Aquarius'].includes(moonSign);
    const waterSigns = ['Cancer', 'Scorpio', 'Pisces'].includes(moonSign);

    if (fireSign) return 'Fire (Aries, Leo, Sagittarius) and Air (Gemini, Libra, Aquarius)';
    if (earthSigns) return 'Earth (Taurus, Virgo, Capricorn) and Water (Cancer, Scorpio, Pisces)';
    if (airSigns) return 'Air (Gemini, Libra, Aquarius) and Fire (Aries, Leo, Sagittarius)';
    if (waterSigns) return 'Water (Cancer, Scorpio, Pisces) and Earth (Taurus, Virgo, Capricorn)';
    return 'complementary';
  }

  private analyzeHealthQuestion(context: BirthChartContext, question: string): string {
    return `With ${context.moonSign} Moon sign and ${context.ascendant} Ascendant, areas requiring attention include ${this.getHealthFocus(context.moonSign)}. Your current ${context.mahaDasha} period may bring focus to ${this.getDashaHealthFocus(context.mahaDasha)}. Practice ${this.getYogaRecommendation(context.ascendant)} and follow ${this.getDietRecommendation(context.moonSign)} diet for optimal health.`;
  }

  private analyzeTimingQuestion(context: BirthChartContext, question: string): string {
    return `Timing analysis for your question:\n\nBased on ${context.mahaDasha}-${context.antarDasha} period: ${this.getTimingGuidance(context)}.\n\nBest days: When Moon transits ${context.moonSign} (every 27-28 days).\nFavorable months: ${this.getFavorableMonths(context)}.`;
  }

  private getTimingGuidance(context: BirthChartContext): string {
    const favorableDashas = ['Jupiter', 'Venus', 'Mercury'];
    if (favorableDashas.includes(context.mahaDasha)) {
      return 'Current major period is favorable - initiate important matters now';
    }
    if (favorableDashas.includes(context.antarDasha)) {
      return 'Sub-period provides a window of opportunity - act within next 3-6 months';
    }
    return 'Wait for more favorable planetary transits';
  }

  private getFavorableMonths(context: BirthChartContext): string {
    return 'Months when Jupiter transits favorably from your Moon sign';
  }

  private analyzeGeneralQuestion(context: BirthChartContext, question: string): string {
    return `Based on your ${context.moonSign} Moon sign, ${context.ascendant} Ascendant, and current ${context.mahaDasha}-${context.antarDasha} Dasha period:\n\n` +
           this.getContextualAnalysis(context, question);
  }

  private getMoonSignCareerNature(moonSign: string): string {
    return this.getMoonSignStrength(moonSign);
  }

  private getAscendantCareerImage(ascendant: string): string {
    const images: Record<string, string> = {
      Aries: 'confident leadership and pioneering abilities',
      Taurus: 'reliability and steady competence',
      Gemini: 'versatility and communication prowess',
      Cancer: 'nurturing management style',
      Leo: 'commanding presence and authority',
      Virgo: 'meticulous professionalism',
      Libra: 'diplomatic charm and fairness',
      Scorpio: 'intensity and strategic thinking',
      Sagittarius: 'visionary optimism',
      Capricorn: 'disciplined excellence',
      Aquarius: 'innovative leadership',
      Pisces: 'compassionate management'
    };
    return images[ascendant] || 'professional competence';
  }

  private getCurrentCareerPhase(context: BirthChartContext): string {
    return `this phase ${this.getCareerPhaseNature(context.mahaDasha, context.antarDasha)}`;
  }

  private getCareerPhaseNature(maha: string, antar: string): string {
    const careerPositive = ['Sun', 'Jupiter', 'Mercury', 'Saturn'];
    const mahaGood = careerPositive.includes(maha);
    const antarGood = careerPositive.includes(antar);

    if (mahaGood && antarGood) {
      return 'strongly supports career advancement and recognition';
    }
    if (mahaGood || antarGood) {
      return 'offers opportunities for those who work diligently';
    }
    return 'requires patience and persistent effort';
  }

  private getFinancialOverview(context: BirthChartContext): string {
    return `Your financial situation is influenced by ${context.moonSign} Moon sign's natural approach to wealth: ${this.getMoonSignWealthMethod(context.moonSign)}. Combined with ${context.mahaDasha} Dasha, focus on ${this.getDashaWealthMethod(context.mahaDasha)}.`;
  }

  private getRelationshipOverview(context: BirthChartContext): string {
    return `Your ${context.moonSign} Moon sign brings ${this.getMoonSignLoveNature(context.moonSign)} to relationships. Current ${context.mahaDasha}-${context.antarDasha} period ${this.getLovePeriodInfluence(context.mahaDasha, context.antarDasha)}.`;
  }

  // Supplementary insights methods (simplified)
  private getCareerSupplementaryInsights(context: BirthChartContext, question: string): string {
    return `Your ${context.moonSign} Moon sign provides natural career inclinations toward ${this.getCareerInclination(context.moonSign)}, while ${context.ascendant} Ascendant gives you ${this.getAscendantCareerTraits(context.ascendant)}.`;
  }

  private getFinanceSupplementaryInsights(context: BirthChartContext, question: string): string {
    return `${context.moonSign} Moon favors wealth through ${this.getMoonSignWealthMethod(context.moonSign)}. Current ${context.mahaDasha} Dasha suggests focusing on ${this.getDashaWealthMethod(context.mahaDasha)}.`;
  }

  private getRelationshipSupplementaryInsights(context: BirthChartContext, question: string): string {
    return `Your emotional nature (${context.moonSign} Moon) seeks ${this.getMoonSignLoveNature(context.moonSign)}. Most compatible with ${this.getCompatibleSigns(context.moonSign)}.`;
  }

  private getHealthSupplementaryInsights(context: BirthChartContext, question: string): string {
    return `Focus on ${this.getHealthFocus(context.moonSign)}. Practice ${this.getYogaRecommendation(context.ascendant)} and maintain ${this.getDietRecommendation(context.moonSign)} diet.`;
  }

  private getEducationSupplementaryInsights(context: BirthChartContext, question: string): string {
    return `Your learning style: ${this.getLearningStyle(context.moonSign)}. Best subjects: ${this.getFavorableSubjects(context.moonSign)}. Peak study hours: ${this.getPeakStudyHours(context.moonNakshatra)}.`;
  }

  private getSpiritualSupplementaryInsights(context: BirthChartContext, question: string): string {
    return `Spiritual path: ${this.getSpiritualPath(context.moonSign)}. Deity: ${this.getNakshatraDeity(context.moonNakshatra)}. Practice: ${this.getPrimaryPractice(context.moonNakshatra)}.`;
  }

  private getTimingSupplementaryInsights(context: BirthChartContext, question: string): string {
    return `Favorable periods: ${this.getFavorableMonths(context)}. Best days: ${this.getLuckyDays(context.moonNakshatra)}. Auspicious times: ${this.getSpiritualTime(context.moonNakshatra)}.`;
  }

  private getRemediesSupplementaryInsights(context: BirthChartContext, question: string): string {
    return this.getDetailedRemedies(context);
  }

  private getGeneralSupplementaryInsights(context: BirthChartContext, question: string): string {
    return `Your unique combination of ${context.moonSign} Moon and ${context.ascendant} Ascendant creates ${this.getMoonAscendantCombination(context.moonSign, context.ascendant)}.`;
  }

  // Question-specific methods for dasha influence, guidance, and remedies
  private getDashaInfluenceOnQuestion(context: BirthChartContext, question: string, category: string): string {
    return `Your ${context.mahaDasha} Maha Dasha brings ${this.getPlanetEssence(context.mahaDasha)}, while ${context.antarDasha} Antar Dasha adds ${this.getPlanetEssence(context.antarDasha)}. This combination ${this.getDashaQuestionEffect(context, category)}.`;
  }

  private getDashaQuestionEffect(context: BirthChartContext, category: string): string {
    const effects: Record<string, string> = {
      career: 'influences your professional trajectory and opportunities',
      finance: 'affects your wealth accumulation and financial decisions',
      relationships: 'shapes your romantic and interpersonal dynamics',
      health: 'impacts your vitality and wellness focus areas',
      education: 'guides your learning capacity and intellectual pursuits',
      spiritual: 'directs your spiritual growth and inner development'
    };
    return effects[category] || 'influences this aspect of your life';
  }

  private getQuestionSpecificGuidance(context: BirthChartContext, question: string, category: string): string {
    const guidance: Record<string, string> = {
      career: '1. Update your resume highlighting recent achievements\n2. Network actively in your industry\n3. Seek mentorship from senior professionals\n4. Take on visible projects',
      finance: '1. Create a budget and track expenses\n2. Build 6-month emergency fund\n3. Invest systematically in diversified assets\n4. Avoid impulsive purchases',
      relationships: '1. Communicate openly and honestly\n2. Spend quality time together\n3. Show appreciation regularly\n4. Respect boundaries and individuality',
      health: '1. Exercise 30 minutes daily\n2. Follow consistent sleep schedule\n3. Practice stress management techniques\n4. Regular health check-ups',
    };
    return guidance[category] || '1. Analyze the situation clearly\n2. Seek expert advice if needed\n3. Take consistent action\n4. Monitor progress regularly';
  }

  private getQuestionSpecificRemedies(context: BirthChartContext, question: string, category: string): string {
    return `Based on your ${context.mahaDasha} Dasha and the nature of your question:\n\n` +
           `• Chant "${this.getRemedialMantra(context.mahaDasha)}" daily (108 times)\n` +
           `• Light ${this.getRemedialOil(context.mahaDasha)} lamp every ${this.getRemedialDay(context.mahaDasha)}\n` +
           `• Donate ${this.getRemedialItem(context.mahaDasha)} on ${this.getRemedialDay(context.mahaDasha)}\n` +
           `• Wear ${this.getRemedialColor(context.moonSign)} on favorable days\n` +
           `• Consider ${this.getRemedialGemstone(context.mahaDasha)} after astrological consultation`;
  }
}

// Export singleton instance
export const intelligentAssistant = new IntelligentAssistant();

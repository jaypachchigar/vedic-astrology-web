/**
 * Chat History Management with Supabase
 */

import { supabase } from './client';

export interface ChatMessage {
  id: string;
  user_id: string;
  message_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  created_at: string;
}

/**
 * Get all chat history for the current user
 */
export async function getChatHistory(): Promise<ChatMessage[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('No authenticated user');
    }

    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', user.id)
      .order('timestamp', { ascending: true });

    if (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getChatHistory:', error);
    return [];
  }
}

/**
 * Save a single message to chat history
 */
export async function saveChatMessage(
  messageId: string,
  role: 'user' | 'assistant' | 'system',
  content: string,
  timestamp: Date = new Date()
): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('No authenticated user');
    }

    // @ts-ignore
    const { error } = await (supabase
      .from('chat_history')
      .insert({
        user_id: user.id,
        message_id: messageId,
        role,
        content,
        timestamp: timestamp.toISOString(),
      }) as any);

    if (error) {
      console.error('Error saving chat message:', error);
      throw error;
    }

    console.log(`✅ Chat message saved: ${role} - ${messageId}`);
  } catch (error) {
    console.error('Error in saveChatMessage:', error);
    throw error;
  }
}

/**
 * Clear all chat history for the current user
 */
export async function clearChatHistory(): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('No authenticated user');
    }

    const { error } = await supabase
      .from('chat_history')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      console.error('Error clearing chat history:', error);
      throw error;
    }

    console.log('✅ Chat history cleared');
  } catch (error) {
    console.error('Error in clearChatHistory:', error);
    throw error;
  }
}

/**
 * Delete a specific message from chat history
 */
export async function deleteChatMessage(messageId: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('No authenticated user');
    }

    const { error } = await supabase
      .from('chat_history')
      .delete()
      .eq('user_id', user.id)
      .eq('message_id', messageId);

    if (error) {
      console.error('Error deleting chat message:', error);
      throw error;
    }

    console.log(`✅ Chat message deleted: ${messageId}`);
  } catch (error) {
    console.error('Error in deleteChatMessage:', error);
    throw error;
  }
}

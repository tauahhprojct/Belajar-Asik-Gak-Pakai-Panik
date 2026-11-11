import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables for production mode
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-project.supabase.co' &&
    !supabaseUrl.includes('placeholder')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * SQL SCHEMA REFERENCE FOR SUPABASE (Run this in the Supabase SQL Editor for production deployment):
 * 
 * ```sql
 * -- 1. Table for Student Profiles
 * CREATE TABLE IF NOT EXISTS public.profiles (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES auth.users ON DELETE CASCADE,
 *   full_name TEXT NOT NULL,
 *   grade TEXT,
 *   school_name TEXT,
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   updated_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- 2. Table for LKPD Submissions
 * CREATE TABLE IF NOT EXISTS public.lkpd_submissions (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES auth.users ON DELETE CASCADE,
 *   act1_answers JSONB NOT NULL DEFAULT '{}'::jsonb,
 *   act1_score INTEGER,
 *   act2_answers JSONB NOT NULL DEFAULT '{}'::jsonb,
 *   submitted_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- 3. Table for My Study Plans
 * CREATE TABLE IF NOT EXISTS public.study_plans (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES auth.users ON DELETE CASCADE,
 *   habit_to_fix TEXT NOT NULL,
 *   change_target TEXT NOT NULL,
 *   action_plan TEXT NOT NULL,
 *   execution_time TEXT NOT NULL,
 *   support_needed TEXT,
 *   created_at TIMESTAMPTZ DEFAULT NOW(),
 *   updated_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- 4. Table for Quiz Results
 * CREATE TABLE IF NOT EXISTS public.quiz_results (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES auth.users ON DELETE CASCADE,
 *   score NUMERIC(5,2) NOT NULL,
 *   correct_count INTEGER NOT NULL,
 *   wrong_count INTEGER NOT NULL,
 *   selected_answers JSONB NOT NULL,
 *   completed_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- 5. Table for Reflections
 * CREATE TABLE IF NOT EXISTS public.reflections (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES auth.users ON DELETE CASCADE,
 *   q1 TEXT,
 *   q2 TEXT,
 *   q3 TEXT,
 *   saved_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- ROW LEVEL SECURITY (RLS) POLICIES
 * ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.lkpd_submissions ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE public.reflections ENABLE ROW LEVEL SECURITY;
 * 
 * CREATE POLICY "Users can only read their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
 * CREATE POLICY "Users can only update their own profile" ON public.profiles FOR ALL USING (auth.uid() = user_id);
 * 
 * CREATE POLICY "Users can manage own lkpd" ON public.lkpd_submissions FOR ALL USING (auth.uid() = user_id);
 * CREATE POLICY "Users can manage own study plan" ON public.study_plans FOR ALL USING (auth.uid() = user_id);
 * CREATE POLICY "Users can manage own quiz results" ON public.quiz_results FOR ALL USING (auth.uid() = user_id);
 * CREATE POLICY "Users can manage own reflections" ON public.reflections FOR ALL USING (auth.uid() = user_id);
 * ```
 */

export const supabaseSync = {
  async syncStudyPlan(plan: {
    habitToFix: string;
    changeTarget: string;
    actionPlan: string;
    executionTime: string;
    supportNeeded: string;
  }) {
    if (!supabase) return { success: false, mode: 'local' };
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return { success: false, mode: 'unauthenticated' };
      const { error } = await supabase.from('study_plans').upsert({
        user_id: user.user.id,
        habit_to_fix: plan.habitToFix,
        change_target: plan.changeTarget,
        action_plan: plan.actionPlan,
        execution_time: plan.executionTime,
        support_needed: plan.supportNeeded,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      return { success: true, mode: 'supabase' };
    } catch (err) {
      console.error('Supabase sync error:', err);
      return { success: false, error: err };
    }
  },

  async syncQuizResult(quiz: {
    score: number;
    correctCount: number;
    wrongCount: number;
    selectedAnswers: Record<number, string>;
  }) {
    if (!supabase) return { success: false, mode: 'local' };
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return { success: false, mode: 'unauthenticated' };
      const { error } = await supabase.from('quiz_results').insert({
        user_id: user.user.id,
        score: quiz.score,
        correct_count: quiz.correctCount,
        wrong_count: quiz.wrongCount,
        selected_answers: quiz.selectedAnswers,
        completed_at: new Date().toISOString(),
      });
      if (error) throw error;
      return { success: true, mode: 'supabase' };
    } catch (err) {
      console.error('Supabase quiz sync error:', err);
      return { success: false, error: err };
    }
  },

  async syncReflection(reflection: { q1: string; q2: string; q3: string }) {
    if (!supabase) return { success: false, mode: 'local' };
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return { success: false, mode: 'unauthenticated' };
      const { error } = await supabase.from('reflections').upsert({
        user_id: user.user.id,
        q1: reflection.q1,
        q2: reflection.q2,
        q3: reflection.q3,
        saved_at: new Date().toISOString(),
      });
      if (error) throw error;
      return { success: true, mode: 'supabase' };
    } catch (err) {
      console.error('Supabase reflection sync error:', err);
      return { success: false, error: err };
    }
  },
};

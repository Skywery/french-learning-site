// lib/useStudyTimer.ts
import { useEffect, useRef, useState } from 'react';
import { supabase } from './supabaseClient';

export function useStudyTimer() {
  const [isStudying, setIsStudying] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const startTimeRef = useRef<Date | null>(null);

  // 开始学习
  const startStudy = async () => {
    if (isStudying) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const start = new Date();
    startTimeRef.current = start;
    const { data, error } = await supabase
      .from('study_sessions')
      .insert([{ user_id: user.id, start_time: start.toISOString() }])
      .select()
      .single();
    if (error) {
      console.error('开始学习记录失败:', error);
      return;
    }
    setCurrentSessionId(data.id);
    setIsStudying(true);
  };

  // 结束学习
  const endStudy = async () => {
    if (!isStudying || !currentSessionId || !startTimeRef.current) return;
    const end = new Date();
    const durationMs = end.getTime() - startTimeRef.current.getTime();
    const durationMinutes = Math.floor(durationMs / 60000);
    const { error } = await supabase
      .from('study_sessions')
      .update({ end_time: end.toISOString(), duration_minutes: durationMinutes })
      .eq('id', currentSessionId);
    if (error) {
      console.error('结束学习记录失败:', error);
    }
    setIsStudying(false);
    setCurrentSessionId(null);
    startTimeRef.current = null;
  };

  // 页面关闭或刷新时自动结束
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isStudying) {
        // 不能异步，但可以尝试同步方式，或者忽略，因为数据可能会丢失少量
        // 这里简单调用，实际可能来不及，更好的做法是定期保存草稿
        endStudy();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isStudying, endStudy]);

  return { isStudying, startStudy, endStudy };
}
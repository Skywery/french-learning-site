// lib/useStudyTimer.ts
import { useEffect, useRef, useState } from 'react';
import { supabase } from './supabaseClient';

export function useStudyTimer() {
  const [isStudying, setIsStudying] = useState(false);
  const [todayMinutes, setTodayMinutes] = useState(0);
  const startTimeRef = useRef<Date | null>(null);
  const currentSessionIdRef = useRef<number | null>(null);
  const userIdRef = useRef<string | null>(null);

  // 获取当前用户ID
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) userIdRef.current = user.id;
    });
  }, []);

  // 加载今日已学分钟数
  const loadTodayMinutes = async () => {
    if (!userIdRef.current) return;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { data, error } = await supabase
      .from('study_sessions')
      .select('duration_minutes')
      .eq('user_id', userIdRef.current)
      .gte('start_time', todayStart.toISOString());
    if (!error && data) {
      const total = data.reduce((sum, s) => sum + s.duration_minutes, 0);
      setTodayMinutes(total);
    }
  };

  // 开始学习
  const startStudy = async () => {
    if (!userIdRef.current) {
      alert('请先登录');
      return;
    }
    const now = new Date();
    const { data, error } = await supabase
      .from('study_sessions')
      .insert({
        user_id: userIdRef.current,
        start_time: now.toISOString(),
        end_time: null,
        duration_minutes: 0,
      })
      .select('id')
      .single();
    if (error) {
      console.error('开始学习失败:', error);
      return;
    }
    currentSessionIdRef.current = data.id;
    startTimeRef.current = now;
    setIsStudying(true);
  };

  // 结束学习
  const endStudy = async () => {
    if (!isStudying || !startTimeRef.current || !currentSessionIdRef.current || !userIdRef.current) return;
    const endTime = new Date();
    const durationMinutes = Math.floor((endTime.getTime() - startTimeRef.current.getTime()) / 60000);
    if (durationMinutes > 0) {
      await supabase
        .from('study_sessions')
        .update({ end_time: endTime.toISOString(), duration_minutes: durationMinutes })
        .eq('id', currentSessionIdRef.current);
    } else {
      // 时间过短，删除记录
      await supabase.from('study_sessions').delete().eq('id', currentSessionIdRef.current);
    }
    setIsStudying(false);
    startTimeRef.current = null;
    currentSessionIdRef.current = null;
    await loadTodayMinutes();
  };

  // 页面关闭前自动结束
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      if (isStudying && currentSessionIdRef.current && startTimeRef.current) {
        // 不等待异步，简单记录
      }
    });
    return () => {
      if (isStudying) endStudy();
    };
  }, [isStudying]);

  useEffect(() => {
    loadTodayMinutes();
  }, [userIdRef.current]);

  return {
    isStudying,
    todayMinutes,
    startStudy,
    endStudy,
  };
}
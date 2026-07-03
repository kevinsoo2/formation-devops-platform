'use client';
import { useState, useEffect } from 'react';

export function sendBrowserNotification(title, body) {
  if (typeof window === 'undefined') return;
  const permission = localStorage.getItem('notif-permission');
  if (permission !== 'granted') return;
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
    });
  }
}

export default function PushNotificationSettings() {
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('notif-permission');
      if (stored) setPermission(stored);
      else if ('Notification' in window) setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('Votre navigateur ne supporte pas les notifications.');
      return;
    }
    const result = await Notification.requestPermission();
    setPermission(result);
    localStorage.setItem('notif-permission', result);
    if (result === 'granted') {
      sendBrowserNotification('DevOps Academy', 'Les notifications sont activées ! 🎉');
    }
  };

  return (
    <div className="card p-4">
      <h3 className="font-bold text-sm mb-2">🔔 Notifications navigateur</h3>
      <p className="text-xs text-gray-400 mb-3">
        Recevez des notifications quand un quiz quotidien est disponible ou quand vous gagnez un badge.
      </p>
      {permission === 'granted' ? (
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <span>✅</span>
          <span>Notifications activées</span>
        </div>
      ) : permission === 'denied' ? (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <span>❌</span>
          <span>Notifications bloquées (modifiez dans les paramètres du navigateur)</span>
        </div>
      ) : (
        <button onClick={requestPermission} className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg transition">
          Activer les notifications
        </button>
      )}
    </div>
  );
}

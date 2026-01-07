import { createContext, useContext, useState, useCallback } from 'react';
import Notification from '../components/Notification';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((type, message, duration = 3000) => {
        const id = Date.now() + Math.random();
        const notification = { id, type, message, duration };

        setNotifications(prev => [...prev, notification]);

        // Auto remove after duration
        setTimeout(() => {
            removeNotification(id);
        }, duration);

        return id;
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, []);

    // Convenience methods
    const success = useCallback((message, duration) => addNotification('success', message, duration), [addNotification]);
    const error = useCallback((message, duration) => addNotification('error', message, duration), [addNotification]);
    const warning = useCallback((message, duration) => addNotification('warning', message, duration), [addNotification]);
    const info = useCallback((message, duration) => addNotification('info', message, duration), [addNotification]);

    const value = {
        success,
        error,
        warning,
        info,
        addNotification,
        removeNotification
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
            {/* Render all notifications */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
                {notifications.map(notification => (
                    <Notification
                        key={notification.id}
                        type={notification.type}
                        message={notification.message}
                        onClose={() => removeNotification(notification.id)}
                    />
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

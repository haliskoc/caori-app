import React, { createContext, useState, useCallback, ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { Toast, ToastType } from "../components/atoms/Toast";

export interface ToastData {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

export interface ToastContextType {
    show: (toast: Omit<ToastData, "id">) => void;
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

let toastIdCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const show = useCallback((toast: Omit<ToastData, "id">) => {
        const id = `toast-${++toastIdCounter}`;
        const newToast: ToastData = {
            ...toast,
            id,
        };

        setToasts((prev) => [...prev, newToast]);
    }, []);

    const success = useCallback((message: string, duration?: number) => {
        show({ type: "success", message, duration });
    }, [show]);

    const error = useCallback((message: string, duration?: number) => {
        show({ type: "error", message, duration });
    }, [show]);

    const warning = useCallback((message: string, duration?: number) => {
        show({ type: "warning", message, duration });
    }, [show]);

    const info = useCallback((message: string, duration?: number) => {
        show({ type: "info", message, duration });
    }, [show]);

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const contextValue: ToastContextType = {
        show,
        success,
        error,
        warning,
        info,
    };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <View style={styles.toastContainer} pointerEvents="box-none">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onDismiss={() => dismiss(toast.id)}
                    />
                ))}
            </View>
        </ToastContext.Provider>
    );
}

const styles = StyleSheet.create({
    toastContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: "none",
    },
});

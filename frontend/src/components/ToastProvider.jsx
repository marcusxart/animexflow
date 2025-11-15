import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

const toastVariants = {
  success: {
    icon: <CheckCircle className="text-green-400" size={20} />,
    bg: "bg-green-500/10 border-green-500/50",
  },
  error: {
    icon: <XCircle className="text-red-400" size={20} />,
    bg: "bg-red-500/10 border-red-500/50",
  },
  pending: {
    icon: <Loader2 className="text-yellow-400 animate-spin" size={20} />,
    bg: "bg-yellow-500/10 border-yellow-500/50",
  },
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Add toast (returns its id)
  const addToast = useCallback((type, message, duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    if (type !== "pending") {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }

    return id;
  }, []);

  // Update an existing toast by id
  const updateToast = useCallback(
    (id, newType, newMessage, duration = 3000) => {
      setToasts((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, type: newType, message: newMessage } : t
        )
      );

      if (newType !== "pending") {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }
    },
    []
  );

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, updateToast, removeToast }}>
      {children}

      {/* Toast container at bottom */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col-reverse gap-3 w-[300px]">
        <AnimatePresence>
          {toasts.map((toast) => {
            const { icon, bg } = toastVariants[toast.type] || {};
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`flex items-center gap-3 p-3 rounded-lg border ${bg} backdrop-blur-md shadow-lg text-sm text-[var(--color-text)] cursor-pointer`}
                onClick={() => removeToast(toast.id)}
              >
                {icon}
                <span className="flex-1">{toast.message}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

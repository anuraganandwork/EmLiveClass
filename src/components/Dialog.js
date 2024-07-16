function Dialog({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        
          {children}
          <button onClick={onClose}>Close</button>
       
      </div>
    );
  }

  export default Dialog
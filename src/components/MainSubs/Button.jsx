export default function Button({ children, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        "text-white text-md font-semibold py-2 px-4 rounded-full " +
        (disabled ? "bg-slate-600" : "bg-blue-800 hover:bg-blue-600")
      }
    >
      {children}
    </button>
  );
}
